from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application Settings
    Loads configuration from .env file.
    """

    # ==========================
    # Database
    # ==========================
    DATABASE_URL: str = "sqlite:///./legal_documents.db"

    # ==========================
    # JWT Authentication
    # ==========================
    SECRET_KEY: str = (
        "your_super_secret_key_change_this_in_production"
    )

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # ==========================
    # AI API Keys
    # ==========================
    GEMINI_API_KEY: str = ""

    GROQ_API_KEY: str = ""

    # ==========================
    # Upload Settings
    # ==========================
    MAX_UPLOAD_SIZE: int = 20 * 1024 * 1024  # 20 MB

    ALLOWED_EXTENSIONS: list[str] = [
        ".pdf",
        ".docx",
    ]

    # ==========================
    # ChromaDB
    # ==========================
    CHROMA_DB_PATH: str = "./chroma_db"

    # ==========================
    # Upload Directory
    # ==========================
    UPLOAD_DIR: str = "./uploads"

    # ==========================
    # Environment
    # ==========================
    APP_NAME: str = "AI Legal Document Analyzer"

    APP_VERSION: str = "1.0.0"

    DEBUG: bool = False

    # ==========================
    # Pydantic Settings
    # ==========================
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
        case_sensitive=True,
    )


settings = Settings()