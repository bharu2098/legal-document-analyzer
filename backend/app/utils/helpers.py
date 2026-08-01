from langchain_text_splitters import RecursiveCharacterTextSplitter

# =====================================================
# Chunk Configuration
# =====================================================

CHUNK_SIZE = 1000

CHUNK_OVERLAP = 250

SEPARATORS = [
    "\n\n",
    "\n",
    ". ",
    "; ",
    ": ",
    ", ",
    " ",
    "",
]


# =====================================================
# Split Document into Chunks
# =====================================================

def split_text(text: str):
    """
    Split a legal document into overlapping chunks optimized for
    Retrieval-Augmented Generation (RAG).

    This configuration helps preserve legal clauses,
    definitions, and contextual relationships between sections.
    """

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
        separators=SEPARATORS,
        length_function=len,
        is_separator_regex=False,
    )

    return splitter.split_text(text)