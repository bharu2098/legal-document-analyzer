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
      `Are you sure you want to permanently delete "${document.filename}"?`
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
   <div className="w-80 min-w-[320px] max-w-[320px] flex-shrink-0 bg-gradient-to-b from-[#0B1220] via-[#111827] to-[#0F172A] border-r border-slate-800 flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">

        <div className="flex items-center gap-3">

         <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-900/40">
            <span className="text-2xl">
              ⚖️
            </span>

          </div>

          <div>

            <h2 className="text-2xl font-extrabold tracking-wide text-white">
              Legal Documents
            </h2>

            <p className="text-sm text-slate-400">
              Upload & manage your files
            </p>

          </div>

        </div>

      </div>

      {/* Upload */}
      <div className="p-5 border-b border-slate-800 bg-slate-900/40 backdrop-blur-sm">

        <FileUpload
          fetchDocuments={fetchDocuments}
          setSelectedDocument={setSelectedDocument}
        />

        <button
          onClick={clearChat}
          disabled={!selectedDocument}
          className="
            w-full
            mt-4
            py-3
            rounded-xl
            font-semibold
            bg-gradient-to-r
            from-red-600
            to-red-700
            hover:from-red-500
            hover:to-red-600
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:scale-[1.02]
            disabled:opacity-50
            disabled:hover:scale-100
          "
        >
          🗑 Clear Chat
        </button>

      </div>

      {/* Documents */}
      <div className="flex-1 overflow-y-auto p-5">

        {documents.length === 0 ? (

          <div className="text-center mt-16">

            <div className="w-24 h-24 mx-auto rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-5xl shadow-xl">
📂
</div>

            <h3 className="mt-5 text-xl font-bold text-white">
              No Documents
            </h3>

            <p className="mt-2 text-slate-400 text-sm">
              Upload your first legal document.
            </p>

          </div>

        ) : (

          <>
            <div className="mb-5">
  <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-700 text-indigo-300 text-xs font-semibold">
    📂 {documents.length} Legal Document{documents.length > 1 ? "s" : ""}
  </span>
</div>

            

            

            <div className="space-y-4">

              {documents.map((doc) => (

                <div
                  key={doc.id}
                  onClick={() => setSelectedDocument(doc)}
                  className={`
  cursor-pointer
  rounded-2xl
  border
  p-4
  transition-all
  duration-300
  ${
    selectedDocument?.id === doc.id
      ? "bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-violet-600/20 border-blue-400 shadow-2xl shadow-blue-900/40 scale-[1.02]"
      : "bg-[#111827] border-slate-700 hover:border-blue-400 hover:bg-slate-800 hover:scale-[1.02]"
  }
`}
                >

                  <div className="flex items-start gap-3">

                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-slate-700 flex items-center justify-center">
                      <span className="text-2xl">
                        📄
                      </span>

                    </div>

                    <div className="flex-1 min-w-0">

                      <p className="font-semibold text-white break-words">

                        {doc.filename}

                      </p>

                      <p className="text-xs text-slate-400 mt-2">

                        Legal Document #{doc.id}

                      </p>

                    </div>

                    <button
                      onClick={(e) => handleDelete(e, doc)}
                      title="Delete"
                      className="
                        p-2
                        rounded-lg
                        text-slate-400
                       hover:bg-red-600 hover:scale-110 active:scale-95
                        hover:text-white
                        transition
                      "
                    >
                      🗑
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