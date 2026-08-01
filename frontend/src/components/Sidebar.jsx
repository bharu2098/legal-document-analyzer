import FileUpload from "./FileUpload";

function Sidebar({
  documents,
  fetchDocuments,
  selectedDocument,
  setSelectedDocument,
  clearChat,
}) {

  const handleDelete = async (e, document) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete the legal document "${document.filename}"?`
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://legal-document-analyzer-production-bf96.up.railway.app/documents/${document.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete document.");
      }

      if (selectedDocument?.id === document.id) {
        setSelectedDocument(null);
        clearChat();
      }

      fetchDocuments();

      alert("✅ Legal document deleted successfully.");

    } catch (error) {
      console.error(error);
      alert("❌ Failed to delete legal document.");
    }
  };

  return (
    <div className="w-80 bg-white border-r flex flex-col">

      {/* Header */}
      <div className="p-5 border-b">

        <h2 className="text-2xl font-bold">
          ⚖️ Legal Documents
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Upload and manage your legal documents
        </p>

      </div>

      {/* Upload */}
      <div className="p-5 border-b">

        <FileUpload
          fetchDocuments={fetchDocuments}
          setSelectedDocument={setSelectedDocument}
        />

        <button
          onClick={clearChat}
          disabled={!selectedDocument}
          className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          🗑 Clear Chat
        </button>

      </div>

      {/* Document List */}
      <div className="flex-1 overflow-y-auto p-5">

        {documents.length === 0 ? (

          <div className="text-center text-gray-500 mt-12">

            <div className="text-5xl mb-3">
              ⚖️
            </div>

            <h3 className="font-semibold text-lg">
              No Legal Documents
            </h3>

            <p className="text-sm mt-2">
              Upload a legal PDF or DOCX document to start AI-powered analysis.
            </p>

          </div>

        ) : (

          <>
            <p className="text-sm text-gray-500 mb-4">
              {documents.length} Legal Document{documents.length > 1 ? "s" : ""}
            </p>

            <div className="space-y-3">

              {documents.map((doc) => (

                <div
                  key={doc.id}
                  onClick={() => setSelectedDocument(doc)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
                    selectedDocument?.id === doc.id
                      ? "bg-blue-100 border-blue-600 shadow-md"
                      : "bg-white border-gray-300 hover:bg-gray-100 hover:shadow"
                  }`}
                >

                  <div className="flex items-start gap-3">

                    <div className="text-2xl">
                      ⚖️
                    </div>

                    <div className="flex-1 overflow-hidden">

                      <p className="font-semibold break-words">
                        {doc.filename}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Legal Document #{doc.id}
                      </p>

                    </div>

                    <button
                      onClick={(e) => handleDelete(e, doc)}
                      title="Delete Legal Document"
                      className="text-red-600 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition"
                    >
                      🗑️
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </>

        )}

      </div>

    </div>
  );
}

export default Sidebar;