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
    <aside className="w-[320px] min-h-screen bg-slate-950 border-r border-slate-800 text-slate-100 flex flex-col">
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/20">
            ⚖️
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">AI Legal</p>
            <h2 className="text-xl font-semibold text-white">Document Analyzer</h2>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-inner shadow-slate-950/20">
            <FileUpload fetchDocuments={fetchDocuments} setSelectedDocument={setSelectedDocument} />
          </div>

          <button
            onClick={clearChat}
            className="w-full rounded-3xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            Clear Chat
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-6 py-5">
        <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500 mb-4">My Documents</p>
        {documents.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center text-slate-400">
            <div className="text-3xl mb-3">📄</div>
            <p className="text-sm">No documents yet. Upload one to begin.</p>
          </div>
        ) : (
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-260px)] pr-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDocument(doc)}
                className={`flex items-center justify-between gap-3 cursor-pointer rounded-3xl border px-4 py-3 transition duration-150 ${
                  selectedDocument?.id === doc.id
                    ? "border-sky-500 bg-slate-800"
                    : "border-slate-800 bg-slate-900 hover:border-slate-600"
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{doc.filename}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {doc.filename?.toLowerCase().endsWith(".pdf") ? "PDF document" : "Word document"}
                  </p>
                </div>
                <button
                  onClick={(e) => handleDelete(e, doc)}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-red-400"
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