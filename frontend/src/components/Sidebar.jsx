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
    <aside className="w-[360px] bg-[#0B1120] border-r border-slate-800 flex flex-col">

      {/* Header */}
      <div className="px-7 py-7 border-b border-slate-800">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
            <span className="text-3xl">⚖️</span>
          </div>

          <div>

            <h2 className="text-3xl font-bold text-white">
              Documents
            </h2>

            <p className="text-slate-400 mt-1">
              Upload and manage your documents
            </p>

          </div>

        </div>

      </div>

      {/* Upload Section */}

      <div className="px-6 py-6 border-b border-slate-800">

        <FileUpload
          fetchDocuments={fetchDocuments}
          setSelectedDocument={setSelectedDocument}
        />

        <button
          onClick={clearChat}
          disabled={!selectedDocument}
          className="
            w-full
            mt-5
            py-4
            rounded-2xl
            border
            border-red-500/40
            bg-gradient-to-r
            from-red-900/20
            to-red-700/20
            text-red-300
            font-semibold
            hover:bg-red-700
            hover:text-white
            transition-all
          "
        >
          🗑 Clear Chat
        </button>

      </div>

      {/* Documents */}

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

        <p className="text-slate-400 uppercase tracking-[0.35em] text-xs font-semibold mb-3">
          {documents.length} Document{documents.length !== 1 ? "s" : ""}
        </p>

        {documents.length === 0 ? (

          <div className="text-center mt-16">

            <div className="text-6xl mb-4">
              📂
            </div>

            <h3 className="text-white text-xl font-bold">
              No Documents
            </h3>

            <p className="text-slate-500 mt-2">
              Upload your first document.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {documents.map((doc) => (

              <div
                key={doc.id}
                onClick={() => setSelectedDocument(doc)}
                className={`
                  cursor-pointer
                  rounded-[28px]
                  border
                  p-5
                  transition-all
                  duration-300
                  ${
                    selectedDocument?.id === doc.id
                      ? "border-indigo-400 bg-gradient-to-br from-indigo-900/50 to-slate-900 shadow-[0_20px_50px_rgba(79,70,229,0.25)]"
                      : "border-slate-700 bg-[#111827]/80 hover:border-indigo-400"
                  }
                `}
              >

                <div className="flex items-start gap-4">

                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 flex items-center justify-center">

                    <span className="text-3xl">
                      📄
                    </span>

                  </div>

                  <div className="flex-1 min-w-0">

                    <h3 className="text-white font-bold break-words leading-6">
                      {doc.filename}
                    </h3>

                    <p className="text-slate-400 text-sm mt-2">
                      Document #{doc.id}
                    </p>

                  </div>

                  <button
                    onClick={(e) => handleDelete(e, doc)}
                    className="
                      text-slate-500
                      hover:text-red-400
                      transition
                      text-lg
                    "
                  >
                    🗑
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </aside>
  );
}

export default Sidebar;