from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


# ==========================================
# Document Response
# ==========================================
class DocumentResponse(BaseModel):
    """
    Response schema for uploaded documents.
    """

    id: int = Field(
        ...,
        description="Document ID",
        example=1,
    )

    filename: str = Field(
        ...,
        description="Uploaded document name",
        example="Employment_Agreement.pdf",
    )

    file_type: str = Field(
        ...,
        description="Document file extension",
        example=".pdf",
    )

    owner_id: int = Field(
        ...,
        description="Owner User ID",
        example=1,
    )

    created_at: datetime = Field(
        ...,
        description="Document upload time",
    )

    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": 1,
                "filename": "Employment_Agreement.pdf",
                "file_type": ".pdf",
                "owner_id": 1,
                "created_at": "2026-08-01T10:30:00"
            }
        }
    )