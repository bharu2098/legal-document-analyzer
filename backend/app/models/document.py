from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship

from app.database.database import Base


class Document(Base):
    """
    Uploaded legal document.
    """

    __tablename__ = "documents"

    # ==========================================
    # Primary Key
    # ==========================================
    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    # ==========================================
    # File Information
    # ==========================================
    filename = Column(
        String(255),
        nullable=False,
    )

    file_type = Column(
        String(20),
        nullable=False,
    )

    # ==========================================
    # Extracted Document Text
    # ==========================================
    content = Column(
        Text,
        nullable=False,
    )

    # ==========================================
    # AI Generated Legal Summary
    # ==========================================
    legal_summary = Column(
        Text,
        nullable=True,
    )

    # ==========================================
    # Ownership
    # ==========================================
    owner_id = Column(
        Integer,
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    owner = relationship(
        "User",
        back_populates="documents",
    )

    # ==========================================
    # Timestamps
    # ==========================================
    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    # ==========================================
    # Debug Representation
    # ==========================================
    def __repr__(self):
        return (
            f"<Document("
            f"id={self.id}, "
            f"filename='{self.filename}', "
            f"owner_id={self.owner_id}"
            f")>"
        )