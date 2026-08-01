from langchain_chroma import Chroma

from app.services.embedding_service import embeddings

# =====================================================
# ChromaDB Configuration
# =====================================================

COLLECTION_NAME = "legal_documents"

PERSIST_DIRECTORY = "./chroma_db"

# =====================================================
# Vector Store
# =====================================================

vector_store = Chroma(
    collection_name=COLLECTION_NAME,
    embedding_function=embeddings,
    persist_directory=PERSIST_DIRECTORY,
)