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
    <aside className="w-[360px] bg-white border-r border-slate-200 flex flex-col px-6 py-6">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-3xl text-slate-700">
          ⚖️
        </div>

        <div>
          <h2 className="text-3xl font-bold text-slate-900">Legal Documents</h2>
          <p className="text-sm text-slate-500 mt-1">Upload and manage your legal documents</p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 mb-5">
        <FileUpload
          fetchDocuments={fetchDocuments}
          setSelectedDocument={setSelectedDocument}
        />
      </div>

      <button
        onClick={clearChat}
        disabled={!selectedDocument}
        className="w-full rounded-2xl bg-red-600 px-5 py-4 text-white text-base font-semibold transition-colors duration-200 hover:bg-red-500 disabled:bg-slate-300 disabled:text-slate-500"
      >
        🗑 Clear Chat
      </button>

      {/* Documents */}
      <div className="mt-8">
        <p className="text-slate-500 uppercase tracking-[0.25em] text-xs font-semibold mb-4">
          {documents.length} Legal Document{documents.length !== 1 ? "s" : ""}
        </p>

        {documents.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
            <div className="text-4xl mb-3 text-slate-500">📂</div>
            <h3 className="text-lg font-semibold text-slate-900">No Documents</h3>
            <p className="text-sm text-slate-500 mt-2">Upload your first legal document.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDocument(doc)}
                className={`flex items-center justify-between cursor-pointer rounded-3xl border p-4 transition duration-200 ${
                  selectedDocument?.id === doc.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-blue-300"
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-xl text-blue-600">
                    📄
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-900">{doc.filename}</h3>
                    <p className="text-xs text-slate-500 mt-1">Legal Document #{doc.id}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => handleDelete(e, doc)}
                  className="rounded-full p-2 text-slate-400 hover:text-red-500"
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