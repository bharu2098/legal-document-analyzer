from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import settings


# ==========================================
# Database Engine
# ==========================================
DATABASE_URL = settings.DATABASE_URL

engine_kwargs = {}

# SQLite-specific configuration
if DATABASE_URL.startswith("sqlite"):
    engine_kwargs["connect_args"] = {
        "check_same_thread": False
    }

engine = create_engine(
    DATABASE_URL,
    **engine_kwargs,
)


# ==========================================
# Session Factory
# ==========================================
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


# ==========================================
# Base Model
# ==========================================
Base = declarative_base()


# ==========================================
# Database Dependency
# ==========================================
def get_db():
    """
    Provide a database session for each request.
    """

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()