from langchain_text_splitters import RecursiveCharacterTextSplitter


def split_text(text: str):
    """
    Split document text into overlapping chunks optimized for
    RAG retrieval from legal and technical documents.
    """

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=200,
        separators=[
            "\n\n",
            "\n",
            ". ",
            "; ",
            ": ",
            ", ",
            " ",
            "",
        ],
        length_function=len,
        is_separator_regex=False,
    )

    return splitter.split_text(text)