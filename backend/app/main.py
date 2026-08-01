from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.document import Document
from app.database.database import Base, engine
from app.models.user import User
from app.api.auth import router as auth_router
from app.api.upload import router as upload_router
from app.api.chat import router as chat_router
# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Legal Document Analyzer",
    version="1.0.0",
    description="RAG-based Legal Document Analyzer using FastAPI and Gemini",
)

# Register API Routes
app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(chat_router)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "status": "success",
        "message": "AI Legal Document Analyzer API is Running 🚀"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }