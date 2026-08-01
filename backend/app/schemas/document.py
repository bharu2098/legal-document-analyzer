from pydantic import BaseModel


class DocumentResponse(BaseModel):
    id: int
    filename: str
    file_type: str

    model_config = {
        "from_attributes": True
    }