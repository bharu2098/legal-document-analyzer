from langchain_groq import ChatGroq

from app.core.config import settings

# =====================================================
# Production LLM Configuration
# =====================================================

MODEL_NAME = "llama-3.3-70b-versatile"

TEMPERATURE = 0.1

MAX_RETRIES = 3

REQUEST_TIMEOUT = 120


llm = ChatGroq(
    groq_api_key=settings.GROQ_API_KEY,
    model_name=MODEL_NAME,
    temperature=TEMPERATURE,
    max_retries=MAX_RETRIES,
    timeout=REQUEST_TIMEOUT,
)