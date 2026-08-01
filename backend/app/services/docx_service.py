import docx


def extract_docx_text(file_path: str) -> str:
    document = docx.Document(file_path)

    text = "\n".join(
        paragraph.text
        for paragraph in document.paragraphs
    )

    return text.strip()