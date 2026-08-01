from langchain_groq import ChatGroq

from app.core.config import settings

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=settings.GROQ_API_KEY,
    temperature=0,
)


def is_legal_document(text: str) -> bool:
    """
    Returns True only if the uploaded document is a legal document.
    """

    # Use beginning and end of the document
    document_text = f"""
Beginning of document:
{text[:2500]}

...

End of document:
{text[-2500:]}
"""

    prompt = f"""
You are an expert legal document classifier.

Your job is to determine whether the uploaded document is a LEGAL DOCUMENT.

Examples of LEGAL documents include:

- Employment Contract
- Service Agreement
- Rental Agreement
- Lease Agreement
- Non-Disclosure Agreement (NDA)
- Memorandum of Understanding (MoU)
- Court Order
- Legal Notice
- Insurance Policy
- Affidavit
- Will
- Power of Attorney
- Government Legal Document
- Terms and Conditions
- Privacy Policy
- Partnership Agreement
- Purchase Agreement
- Vendor Agreement
- Sale Deed

Examples of NON-LEGAL documents include:

- Resume
- Technical Documentation
- Project Report
- Research Paper
- Assignment
- Interview Questions
- Presentation
- User Manual
- Invoice
- Book
- Notes
- Tutorial
- Course Material

Reply with ONLY one word.

YES

or

NO

Document:

{document_text}
"""

    try:
        response = llm.invoke(prompt)

        answer = response.content.strip().upper()

        return answer == "YES"

    except Exception as e:
        print("Legal validation error:", e)
        raise