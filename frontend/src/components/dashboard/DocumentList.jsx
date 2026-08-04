import { useEffect } from "react";
import { FaFilePdf } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

import { useDocument } from "../../context/DocumentContext";
import useAuth from "../../hooks/useAuth";

function DocumentList() {
  const { token } = useAuth();

  const {
    documents,
    fetchDocuments,
    selectedDocument,
    setSelectedDocument,
    remove,
    loading,
  } = useDocument();

  useEffect(() => {
    if (token) {
      fetchDocuments();
    }
  }, [token]);

  const handleDelete = async (e, document) => {
    e.stopPropagation();

    const confirmed = window.confirm(
      `Delete "${document.filename}"?`
    );

    if (!confirmed) return;

    try {
      await remove(document.id);
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-800/50 p-8 text-center">

        <div className="mb-4 text-4xl">
          📄
        </div>

        <h3 className="font-semibold text-white">
          No Documents
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Upload your first legal document to start chatting.
        </p>

      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pr-1">

      <div className="space-y-3">

        {documents.map((document) => {
          const selected =
            selectedDocument?.id === document.id;

          return (
            <div
              key={document.id}
              onClick={() => setSelectedDocument(document)}
              className={`group cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                selected
                  ? "border-blue-500 bg-slate-800 shadow-lg ring-1 ring-blue-500/30"
                  : "border-slate-700 bg-slate-800 hover:border-blue-500 hover:bg-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                    <FaFilePdf className="text-2xl text-red-500" />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p
                      className="truncate font-semibold text-white"
                      title={document.filename}
                    >
                      {document.filename}
                    </p>

                    <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                      {document.file_type.replace(".", "")}
                    </p>

                  </div>

                </div>

                <button
                  onClick={(e) =>
                    handleDelete(e, document)
                  }
                  title="Delete Document"
                  className="rounded-xl p-2 text-slate-500 opacity-0 transition-all duration-200 hover:bg-red-600 hover:text-white group-hover:opacity-100"
                >
                  <FiTrash2 size={18} />
                </button>

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}

export default DocumentList;