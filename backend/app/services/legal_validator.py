import json
import re

from langchain_groq import ChatGroq

from app.core.config import settings


llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=settings.GROQ_API_KEY,
    temperature=0,
)


LEGAL_KEYWORDS = [
    "agreement",
    "contract",
    "party",
    "parties",
    "employee",
    "employer",
    "lessor",
    "lessee",
    "tenant",
    "landlord",
    "vendor",
    "purchaser",
    "buyer",
    "seller",
    "confidentiality",
    "non disclosure",
    "nda",
    "governing law",
    "jurisdiction",
    "indemnity",
    "indemnification",
    "liability",
    "termination",
    "breach",
    "notice",
    "legal notice",
    "effective date",
    "expiry date",
    "commencement",
    "payment terms",
    "obligations",
    "rights",
    "whereas",
    "hereby",
    "witnesseth",
    "covenant",
    "arbitration",
    "court",
    "affidavit",
    "deed",
    "will",
    "power of attorney",
    "memorandum of understanding",
    "mou",
    "privacy policy",
    "terms and conditions",
    "licensing agreement",
    "employment contract",
    "lease agreement",
    "service agreement",
]


NON_LEGAL_KEYWORDS = [
    "software",
    "react",
    "angular",
    "vue",
    "javascript",
    "typescript",
    "python",
    "java",
    "c++",
    "nodejs",
    "fastapi",
    "django",
    "flask",
    "spring boot",
    "database design",
    "api documentation",
    "swagger",
    "openapi",
    "system architecture",
    "software architecture",
    "software design",
    "technical documentation",
    "technical interview",
    "interview questions",
    "coding",
    "source code",
    "algorithm",
    "deployment",
    "testing",
    "implementation",
    "future enhancements",
    "chapter 1",
    "chapter 2",
    "chapter 3",
    "table of contents",
    "research paper",
    "project report",
    "assignment",
    "presentation",
    "tutorial",
    "course material",
    "user manual",
    "installation guide",
    "resume",
    "curriculum vitae",
    "cv",
    "student",
    "college",
    "university",
    "abstract",
    "bibliography",
    "references",
]


LEGAL_DOCUMENT_TYPES = [
    "Employment Contract",
    "Service Agreement",
    "Rental Agreement",
    "Lease Agreement",
    "Non-Disclosure Agreement",
    "Memorandum of Understanding",
    "Court Order",
    "Legal Notice",
    "Insurance Policy",
    "Affidavit",
    "Will",
    "Power of Attorney",
    "Privacy Policy",
    "Terms and Conditions",
    "Purchase Agreement",
    "Vendor Agreement",
    "Partnership Agreement",
    "Sale Deed",
    "Licensing Agreement",
]


def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    return text


def keyword_score(text: str, keywords: list[str]) -> int:
    score = 0

    for keyword in keywords:
        if keyword in text:
            score += 1

    return score


def is_legal_document(text: str):
    """
    Returns

    {
        "is_legal": bool,
        "document_type": str,
        "reason": str,
        "confidence": int
    }
    """

    cleaned = clean_text(text)

    legal_score = keyword_score(cleaned, LEGAL_KEYWORDS)
    non_legal_score = keyword_score(cleaned, NON_LEGAL_KEYWORDS)

    # ---------------------------------
    # Strong legal document
    # ---------------------------------

    if legal_score >= 8 and legal_score > non_legal_score:

        return {
            "is_legal": True,
            "document_type": "Legal Document",
            "reason": "Strong legal clauses and terminology detected.",
            "confidence": 98,
        }

    # ---------------------------------
    # Strong non-legal document
    # ---------------------------------

    if non_legal_score >= 6 and non_legal_score > legal_score:

        return {
            "is_legal": False,
            "document_type": "Non-Legal Document",
            "reason": "Technical or educational content detected.",
            "confidence": 99,
        }

    # ---------------------------------
    # Ambiguous -> Ask LLM
    # ---------------------------------

    document_sample = f"""
Beginning:

{text[:3500]}

...

End:

{text[-3500:]}
"""

    prompt = f"""
You are an expert legal document classifier.

Determine whether the uploaded document is legally binding.

A legal document normally contains:

- Parties
- Rights
- Obligations
- Governing Law
- Jurisdiction
- Confidentiality
- Payment Terms
- Effective Date
- Signatures
- Legal Clauses

Do NOT classify software documentation,
research papers,
technical documents,
API documentation,
project reports,
books,
assignments,
presentations,
or resumes as legal documents.

Valid legal document types:

{", ".join(LEGAL_DOCUMENT_TYPES)}

Return ONLY valid JSON.

Example:

{{
    "is_legal": true,
    "document_type": "Employment Contract",
    "reason": "Contains legally enforceable obligations.",
    "confidence": 96
}}

OR

{{
    "is_legal": false,
    "document_type": "Technical Documentation",
    "reason": "Software design document.",
    "confidence": 99
}}

Document:

{document_sample}
"""

    try:

        response = llm.invoke(prompt)

        content = response.content.strip()

        content = (
            content.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        result = json.loads(content)

        return {
            "is_legal": bool(result.get("is_legal", False)),
            "document_type": result.get(
                "document_type",
                "Unknown",
            ),
            "reason": result.get(
                "reason",
                "No reason provided.",
            ),
            "confidence": int(
                result.get("confidence", 50)
            ),
        }

    except Exception as e:

        print("Legal validator error:", e)

        return {
            "is_legal": False,
            "document_type": "Unknown",
            "reason": "Unable to classify the document.",
            "confidence": 0,
        }