from langchain_groq import ChatGroq
from app.core.config import settings

# ==========================================
# DEBUG (Temporary)
# ==========================================

print("====================================", flush=True)
print("LEGAL INSIGHTS SERVICE LOADED", flush=True)
print("RAW KEY      :", repr(settings.GROQ_API_KEY), flush=True)
print("STRIPPED KEY :", repr(settings.GROQ_API_KEY.strip()), flush=True)
print("====================================", flush=True)

# ==========================================
# LLM Configuration
# ==========================================

llm = ChatGroq(
    model_name="llama-3.3-70b-versatile",
    groq_api_key=settings.GROQ_API_KEY.strip(),
    temperature=0,
    max_retries=3,
    timeout=120,
)

# ==========================================
# Generate Legal Insights
# ==========================================

def generate_legal_insights(text: str) -> str:
    """
    Generate AI Legal Insights for the uploaded document.
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

    try:
        response = llm.invoke(prompt)
        return response.content.strip()

    except Exception as e:
        import traceback

        print("\n========== LEGAL INSIGHTS ERROR ==========", flush=True)
        traceback.print_exc()
        print("==========================================\n", flush=True)

        raise e