from pydantic import BaseModel, ConfigDict, Field


# ==========================================
# Chat Request
# ==========================================
class ChatRequest(BaseModel):
    """
    User question for a specific uploaded document.
    """

    document_id: int = Field(
        ...,
        gt=0,
        description="ID of the uploaded legal document",
        example=1,
    )

    question: str = Field(
        ...,
        min_length=3,
        max_length=2000,
        description="Question about the uploaded legal document",
        example="Summarize the termination clause.",
    )


# ==========================================
# Chat Response
# ==========================================
class ChatResponse(BaseModel):
    """
    AI-generated response.
    """

    answer: str = Field(
        ...,
        description="AI-generated answer based on the uploaded legal document",
    )

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "answer": (
                    "The agreement may be terminated by either party "
                    "with a 30-day written notice."
                )
            }
        }
    )