from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database.database import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    file_type = Column(String(20), nullable=False)
    content = Column(Text, nullable=False)

    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship(
        "User",
        back_populates="documents",
    )