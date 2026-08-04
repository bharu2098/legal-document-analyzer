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
      `Delete "${document.filename}" permanently?`
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://shimmering-sparkle-production-88ac.up.railway.app/documents/${document.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      if (selectedDocument?.id === document.id) {
        setSelectedDocument(null);
        clearChat();
      }

      fetchDocuments();

      alert("✅ Legal document deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to delete document.");
    }
  };

  return (
    <aside className="w-[300px] bg-white border-r border-slate-200 flex flex-col px-4 py-4">

      {/* Minimal Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">Documents</h2>
      </div>

      {/* Upload */}
      <div className="mb-3">
        <FileUpload fetchDocuments={fetchDocuments} setSelectedDocument={setSelectedDocument} />
      </div>

      {/* Clear chat button - always enabled */}
      <button
        onClick={clearChat}
        className="w-full rounded-md bg-red-600 px-4 py-2 text-white text-sm font-semibold mb-4 hover:bg-red-500"
      >
        Clear Chat
      </button>

      {/* Documents list */}
      <div className="flex-1 overflow-auto">
        <p className="text-slate-500 uppercase tracking-wider text-xs font-semibold mb-3">My Documents</p>

        {documents.length === 0 ? (
          <div className="rounded-md border border-slate-200 bg-slate-50 p-6 text-center">
            <div className="text-3xl mb-2 text-slate-500">📂</div>
            <p className="text-sm text-slate-500">No documents — upload one to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDocument(doc)}
                className={`flex items-center justify-between cursor-pointer rounded-md border p-3 transition duration-150 ${
                  selectedDocument?.id === doc.id ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:border-blue-300"
                }`}
              >
                <div className="min-w-0 pr-3">
                  <h3 className="truncate text-sm font-medium text-slate-900">{doc.filename}</h3>
                </div>

                <button
                  onClick={(e) => handleDelete(e, doc)}
                  className="text-slate-400 hover:text-red-500 ml-3"
                  title="Delete document"
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </aside>
  );
}

export default Sidebar;