import json

from langchain_groq import ChatGroq

from app.core.config import settings


llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=settings.GROQ_API_KEY,
    temperature=0,
)


def is_legal_document(text: str):
    """
    Validate whether the uploaded document is a legal document.

    Returns:
    {
        "is_legal": bool,
        "document_type": str,
        "reason": str
    }
    """

    document_text = f"""
Beginning of document:
{text[:2500]}

...

End of document:
{text[-2500:]}
"""

    prompt = f"""
You are an expert legal document classifier.

Your task is to determine whether the uploaded document is a LEGAL DOCUMENT.

A LEGAL document includes:

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
- Privacy Policy
- Terms and Conditions
- Partnership Agreement
- Purchase Agreement
- Vendor Agreement
- Sale Deed
- Employment Offer Letter
- Employment Policy
- Legal Compliance Document
- Arbitration Agreement
- Intellectual Property Agreement
- Licensing Agreement

A NON-LEGAL document includes:

- Resume
- CV
- Research Paper
- Technical Documentation
- Software Design Document
- Software Requirements Specification
- Project Report
- Assignment
- Presentation
- User Manual
- Tutorial
- Book
- Notes
- Course Material
- Invoice
- Receipt
- Product Catalogue
- Marketing Brochure
- Business Proposal
- Source Code
- API Documentation

Read the ENTIRE document carefully.

Return ONLY valid JSON.

Example for legal document:

{{
    "is_legal": true,
    "document_type": "Employment Contract",
    "reason": "The document establishes legally enforceable obligations between parties."
}}

Example for non-legal document:

{{
    "is_legal": false,
    "document_type": "Software Design Document",
    "reason": "The document describes software architecture rather than legal obligations."
}}

Document:

{document_text}
"""

    try:
        response = llm.invoke(prompt)

        content = response.content.strip()

        result = json.loads(content)

        return {
            "is_legal": bool(result.get("is_legal", False)),
            "document_type": result.get(
                "document_type",
                "Unknown"
            ),
            "reason": result.get(
                "reason",
                "No reason provided."
            ),
        }

    except Exception as e:
        print("Legal validation error:", e)

        return {
            "is_legal": False,
            "document_type": "Unknown",
            "reason": "Unable to classify the uploaded document."
        }