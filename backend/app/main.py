from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine

# Import models
from app.models.user import User
from app.models.document import Document

# Routers
from app.api.auth import router as auth_router
from app.api.upload import router as upload_router
from app.api.chat import router as chat_router
from app.api.insights import router as insights_router


# ============================================
# Application Lifespan
# ============================================
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Runs once when the application starts.
    """

    # Create database tables
    Base.metadata.create_all(bind=engine)

    print("====================================")
    print("AI Legal Document Analyzer Started")
    print("Database Connected")
    print("====================================")

    yield

    print("====================================")
    print("Application Shutdown")
    print("====================================")


# ============================================
# FastAPI App
# ============================================
app = FastAPI(
    title="AI Legal Document Analyzer",
    version="1.0.0",
    description="""
## AI Legal Document Analyzer

An AI-powered Legal Document Analysis platform using:

- FastAPI
- Groq Llama 3.3 70B
- ChromaDB
- LangChain
- RAG Architecture
- JWT Authentication

### Features

- User Registration/Login
- Upload PDF & DOCX Legal Documents
- AI Legal Document Validation
- AI Legal Insights Generation
- Semantic Search (RAG)
- AI Chat with Uploaded Documents
- Delete Documents
- JWT Authentication
""",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)


# ============================================
# CORS
# ============================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",
        # Later replace "*" with:
        # "http://localhost:5173",
        # "https://your-vercel-app.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================
# Register Routers
# ============================================
app.include_router(auth_router)

app.include_router(upload_router)

app.include_router(chat_router)

app.include_router(insights_router)


# ============================================
# Root Endpoint
# ============================================
@app.get("/", tags=["System"])
def root():
    return {
        "status": "success",
        "application": "AI Legal Document Analyzer",
        "version": "1.0.0",
        "message": "API is running successfully 🚀",
    }


# ============================================
# Health Check
# ============================================
@app.get("/health", tags=["System"])
def health():
    return {
        "status": "healthy",
        "database": "connected",
        "api": "running",
    }