from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.document import Document
from app.models.user import User
from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/insights",
    tags=["Legal Insights"],
)


@router.get("/{document_id}")
def get_legal_insights(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Retrieve AI-generated legal insights for a specific document.
    Only the document owner can access these insights.
    """

    try:
        # ==========================================
        # Verify Ownership
        # ==========================================
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

        # ==========================================
        # Build Response
        # ==========================================
        return {
            "success": True,
            "document": {
                "id": document.id,
                "filename": document.filename,
                "file_type": document.file_type,
                "owner_id": document.owner_id,
                "characters": len(document.content or ""),
                "legal_summary": document.legal_summary,
            },
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve legal insights: {str(e)}",
        )