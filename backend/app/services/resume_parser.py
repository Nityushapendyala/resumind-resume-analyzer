
import fitz
from docx import Document
from io import BytesIO


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract text from a PDF resume."""

    text = ""

    pdf = fitz.open(stream=file_bytes, filetype="pdf")

    try:
        for page in pdf:
            text += page.get_text() + "\n"
    finally:
        pdf.close()

    return text.strip()


def extract_text_from_docx(file_bytes: bytes) -> str:
    """Extract text from a DOCX resume."""

    document = Document(BytesIO(file_bytes))

    paragraphs = [
        paragraph.text
        for paragraph in document.paragraphs
        if paragraph.text.strip()
    ]

    return "\n".join(paragraphs)


def extract_resume_text(file_bytes: bytes, filename: str) -> str:
    """Identify file type and extract resume text."""

    extension = filename.lower().split(".")[-1]

    if extension == "pdf":
        return extract_text_from_pdf(file_bytes)

    elif extension == "docx":
        return extract_text_from_docx(file_bytes)

    else:
        raise ValueError("Unsupported file format. Upload PDF or DOCX.")

