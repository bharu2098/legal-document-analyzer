from langchain_huggingface import HuggingFaceEmbeddings

# =====================================================
# Embedding Model Configuration
# =====================================================

MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"

MODEL_KWARGS = {
    "device": "cpu",
}

ENCODE_KWARGS = {
    "normalize_embeddings": True,
}

# =====================================================
# Embedding Model
# =====================================================

embeddings = HuggingFaceEmbeddings(
    model_name=MODEL_NAME,
    model_kwargs=MODEL_KWARGS,
    encode_kwargs=ENCODE_KWARGS,
)