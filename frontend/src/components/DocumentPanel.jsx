import FileUpload from "./FileUpload";

function DocumentPanel({ documents, fetchDocuments, selectedDocument, setSelectedDocument, clearChat }) {
  return (
    <section className="w-[380px] bg-white rounded-3xl border border-slate-200 p-5 shadow-lg shadow-slate-900/5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Documents</p>
          <h2 className="text-xl font-bold text-slate-900">Uploaded Documents</h2>
        </div>
        <button className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">
          ⬆️
        </button>
      </div>

      <div className="mb-5">
        <FileUpload fetchDocuments={fetchDocuments} setSelectedDocument={setSelectedDocument} />
      </div>

      <button
        onClick={clearChat}
        className="mb-5 w-full rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-500"
      >
        Clear Chat
      </button>

      <div className="space-y-3 max-h-[56vh] overflow-auto pr-2">
        {documents.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">No documents yet. Upload one to begin.</p>
          </div>
        ) : (
          documents.map((doc) => (
            <div
              key={doc.id}
              className={`flex items-center justify-between rounded-3xl border p-4 transition ${
                selectedDocument?.id === doc.id ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              <button
                onClick={() => setSelectedDocument(doc)}
                className="flex items-center gap-3 min-w-0 text-left"
              >
                <div className="w-12 h-12 rounded-3xl bg-slate-100 flex items-center justify-center text-xl text-slate-700">
                  {doc.filename?.toLowerCase().endsWith(".pdf") ? "PDF" : "DOC"}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{doc.filename}</p>
                  <p className="text-xs text-slate-500">Legal Document #{doc.id}</p>
                </div>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const confirmDelete = window.confirm(`Delete ${doc.filename}?`);
                  if (!confirmDelete) return;
                  fetch(`https://shimmering-sparkle-production-88ac.up.railway.app/documents/${doc.id}`, {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }).then((res) => {
                    if (res.ok) {
                      fetchDocuments();
                      if (selectedDocument?.id === doc.id) {
                        setSelectedDocument(null);
                        clearChat();
                      }
                    }
                  });
                }}
                className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-500 hover:text-red-500"
              >
                🗑
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default DocumentPanel;
