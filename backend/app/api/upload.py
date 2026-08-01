from pathlib import Path
import shutil

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.document import Document
from app.models.user import User
from app.core.dependencies import get_current_user

from app.services.pdf_service import extract_pdf_text
from app.services.docx_service import extract_docx_text
from app.services.chroma_service import vector_store
from app.services.legal_validator import is_legal_document
from app.services.legal_insights import generate_legal_insights
from app.utils.helpers import split_text

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)

UPLOAD_DIR = "uploads"
Path(UPLOAD_DIR).mkdir(exist_ok=True)


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    allowed_extensions = [".pdf", ".docx"]

    extension = Path(file.filename).suffix.lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed.",
        )

    file_path = Path(UPLOAD_DIR) / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:

        # ==========================
        # Extract Text
        # ==========================
        if extension == ".pdf":
            extracted_text = extract_pdf_text(str(file_path))
        else:
            extracted_text = extract_docx_text(str(file_path))

        if not extracted_text.strip():

            file_path.unlink(missing_ok=True)

            raise HTTPException(
                status_code=400,
                detail="No readable text found in the uploaded document.",
            )

        # ==========================
        # Validate Legal Document
        # ==========================
        validation = is_legal_document(extracted_text)

        if not validation["is_legal"]:

            file_path.unlink(missing_ok=True)

            raise HTTPException(
                status_code=400,
                detail=(
                    f"Detected document type: {validation['document_type']}\n\n"
                    f"Reason: {validation['reason']}\n\n"
                    "Only legal documents are supported.\n\n"
                    "Please upload one of the following:\n\n"
                    "• Employment Contract\n"
                    "• Service Agreement\n"
                    "• Rental Agreement\n"
                    "• Lease Agreement\n"
                    "• Non-Disclosure Agreement (NDA)\n"
                    "• Memorandum of Understanding (MoU)\n"
                    "• Court Order\n"
                    "• Legal Notice\n"
                    "• Insurance Policy\n"
                    "• Affidavit\n"
                    "• Will\n"
                    "• Power of Attorney\n"
                    "• Partnership Agreement\n"
                    "• Purchase Agreement\n"
                    "• Vendor Agreement\n"
                    "• Sale Deed\n"
                    "• Privacy Policy\n"
                    "• Terms and Conditions\n"
                    "• Government Legal Documents"
                ),
            )

        # ==========================
        # Generate Legal Insights
        # ==========================
        legal_summary = generate_legal_insights(extracted_text)

        # ==========================
        # Save Document
        # ==========================
        document = Document(
            filename=file.filename,
            file_type=extension,
            content=extracted_text,
            legal_summary=legal_summary,
            owner_id=current_user.id,
        )

        db.add(document)
        db.commit()
        db.refresh(document)

        # ==========================
        # Split into Chunks
        # ==========================
        chunks = split_text(extracted_text)

        # ==========================
        # Store in ChromaDB
        # ==========================
        vector_store.add_texts(
            texts=chunks,
            metadatas=[
                {
                    "document_id": document.id,
                    "owner_id": current_user.id,
                    "filename": document.filename,
                    "file_type": extension,
                }
                for _ in chunks
            ],
        )

        return {
            "message": "Legal document uploaded successfully.",
            "document_id": document.id,
            "filename": document.filename,
            "file_type": document.file_type,
            "owner_id": current_user.id,
            "characters_extracted": len(extracted_text),
            "chunks_created": len(chunks),
            "document_type": validation["document_type"],
            "legal_summary": legal_summary,
        }

    except HTTPException:
        raise

    except Exception as e:

        file_path.unlink(missing_ok=True)

        raise HTTPException(
            status_code=500,
            detail=f"Upload failed: {str(e)}",
        )


@router.get("/")
def get_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    documents = (
        db.query(Document)
        .filter(Document.owner_id == current_user.id)
        .order_by(Document.id.desc())
        .all()
    )

    return [
        {
            "id": document.id,
            "filename": document.filename,
            "file_type": document.file_type,
        }
        for document in documents
    ]


@router.delete("/{document_id}")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    document = (
        db.query(Document)
        .filter(
            Document.id == document_id,
            Document.owner_id == current_user.id,
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    file_path = Path(UPLOAD_DIR) / document.filename

    if file_path.exists():
        file_path.unlink()

    try:
        collection = vector_store._collection

        results = collection.get(
            where={
                "$and": [
                    {"document_id": document.id},
                    {"owner_id": current_user.id},
                ]
            }
        )

        ids = results.get("ids", [])

        if ids:
            collection.delete(ids=ids)

    except Exception as e:
        print("Chroma delete error:", e)

    db.delete(document)
    db.commit()

    return {
        "message": "Document deleted successfully."
    }