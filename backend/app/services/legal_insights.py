from langchain_groq import ChatGroq

from app.core.config import settings

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=settings.GROQ_API_KEY,
    temperature=0,
)


def generate_legal_insights(text: str) -> str:
    """
    Generate a structured legal summary of the uploaded document.
    """

    prompt = f"""
You are an expert legal analyst.

Analyze the uploaded legal document and extract the following information.

If any field is missing, write "Not Mentioned".

Return ONLY in this format:

Document Type:
Purpose:
Parties:
Effective Date:
Expiration Date:
Contract Duration:
Payment Terms:
Rights:
Obligations:
Confidentiality:
Termination:
Penalty:
Governing Law:
Jurisdiction:
Important Clauses:
Risk Level:
Summary:

Document:

{text[:8000]}
"""

    response = llm.invoke(prompt)

    return response.content.strip()