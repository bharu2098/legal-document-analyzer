import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import DocumentPanel from "../components/DocumentPanel";
import AIChatPanel from "../components/AIChatPanel";

function Dashboard() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [clearChatTrigger, setClearChatTrigger] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    const token = localStorage.getItem("token");

    setLoading(true);

    try {
      const response = await fetch(
        "https://shimmering-sparkle-production-88ac.up.railway.app/documents/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setDocuments(data);

        if (!selectedDocument && data.length > 0) {
          setSelectedDocument(data[0]);
        }

        if (selectedDocument) {
          const updatedDoc = data.find(
            (doc) => doc.id === selectedDocument.id
          );

          if (updatedDoc) {
            setSelectedDocument(updatedDoc);
          } else {
            setSelectedDocument(null);
          }
        }
      } else {
        alert(data.detail || "Failed to load legal documents.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const clearChat = () => {
    setClearChatTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#0D1117]">

      <Navbar />

      <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-slate-100">

        <SideNav />

        <main className="flex-1 p-8 overflow-hidden">

          <div className="grid h-full w-full grid-cols-[420px_1fr] gap-8">

            <DocumentPanel
              documents={documents}
              fetchDocuments={fetchDocuments}
              selectedDocument={selectedDocument}
              setSelectedDocument={setSelectedDocument}
              clearChat={clearChat}
            />

            {loading ? (
              <div className="flex items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-10 shadow-sm">
                <div className="text-center">
                  <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-blue-500"></div>
                  <h2 className="text-2xl font-semibold text-slate-900">Loading Workspace...</h2>
                  <p className="mt-2 text-sm text-slate-500">Preparing your AI Legal Assistant</p>
                </div>
              </div>
            ) : (
              <AIChatPanel selectedDocument={selectedDocument} clearChatTrigger={clearChatTrigger} />
            )}

          </div>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;