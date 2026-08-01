from langchain_groq import ChatGroq

from app.core.config import settings

llm = ChatGroq(
    groq_api_key=settings.GROQ_API_KEY,
    model_name="llama-3.3-70b-versatile",
    temperature=0.2,
)