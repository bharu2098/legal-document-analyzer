from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.database import get_db
from app.models.document import Document
from app.models.user import User

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chroma_service import vector_store
from app.services.gemini_service import llm
from app.prompts.legal_prompt import LEGAL_PROMPT

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Ask questions about a selected uploaded legal document.
    """

    # Verify document ownership
    document = (
        db.query(Document)
        .filter(
            Document.id == request.document_id,
            Document.owner_id == current_user.id,
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    try:

        question = request.question.strip().lower()

        # Broad questions need more retrieved chunks
        broad_keywords = [
            "summary",
            "summarize",
            "overview",
            "complete",
            "entire",
            "all",
            "chapter",
            "chapters",
            "architecture",
            "workflow",
            "design",
            "benefits",
            "objectives",
            "requirements",
            "future",
            "modules",
            "database",
            "deployment",
            "testing",
            "technology",
            "compare",
            "describe",
            "explain",
            "list",
        ]

        k = 10 if any(word in question for word in broad_keywords) else 6

        # Retrieve relevant chunks
        docs = vector_store.similarity_search(
            query=request.question,
            k=k,
            filter={
                "$and": [
                    {"document_id": document.id},
                    {"owner_id": current_user.id},
                ]
            },
        )

        if not docs:
            return ChatResponse(
                answer="I couldn't find that information in the uploaded document."
            )

        # Build context
        context_parts = []

        for index, doc in enumerate(docs, start=1):
            context_parts.append(
                f"Document Section {index}:\n{doc.page_content}"
            )

        context = "\n\n".join(context_parts)

        # Debug retrieved chunks
        print("\n" + "=" * 80)
        print("QUESTION:")
        print(request.question)
        print("=" * 80)

        for index, doc in enumerate(docs, start=1):
            print(f"\nChunk {index}\n")
            print(doc.page_content)
            print("-" * 80)

        print("=" * 80)

        # Build prompt
        prompt = LEGAL_PROMPT.format(
            context=context,
            question=request.question,
        )

        # Generate response
        response = llm.invoke(prompt)

        answer = response.content.strip()

        if not answer:
            answer = (
                "I couldn't generate a response from the uploaded document."
            )

        return ChatResponse(answer=answer)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Chat processing failed: {str(e)}",
        )