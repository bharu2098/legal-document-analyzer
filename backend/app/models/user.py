from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base


class User(Base):
    """
    User model.
    Stores authentication and user profile information.
    """

    __tablename__ = "users"

    # ==========================================
    # Primary Key
    # ==========================================
    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    # ==========================================
    # User Information
    # ==========================================
    username = Column(
        String(100),
        unique=True,
        nullable=False,
        index=True,
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    hashed_password = Column(
        String(255),
        nullable=False,
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
    # Relationships
    # ==========================================
    documents = relationship(
        "Document",
        back_populates="owner",
        cascade="all, delete-orphan",
    )

    # ==========================================
    # Debug Representation
    # ==========================================
    def __repr__(self):
        return (
            f"<User(id={self.id}, "
            f"username='{self.username}', "
            f"email='{self.email}')>"
        )