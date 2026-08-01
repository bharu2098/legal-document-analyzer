from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./legal_documents.db"

    SECRET_KEY: str = "your_secret_key"

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    GEMINI_API_KEY: str = ""

    GROQ_API_KEY: str = ""

    class Config:
        env_file = ".env"


settings = Settings()