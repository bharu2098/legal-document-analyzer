import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

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

        // Auto-select first document
        if (!selectedDocument && data.length > 0) {
          setSelectedDocument(data[0]);
        }

        // Keep selected document valid
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
        alert(data.detail || "Failed to load documents.");
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
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">

        <Sidebar
          documents={documents}
          fetchDocuments={fetchDocuments}
          selectedDocument={selectedDocument}
          setSelectedDocument={setSelectedDocument}
          clearChat={clearChat}
        />

        <div className="flex-1">

          {loading ? (

            <div className="h-full flex items-center justify-center">

              <div className="text-center">

                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>

                <h2 className="text-2xl font-bold">
                  Loading Documents...
                </h2>

                <p className="text-gray-500 mt-3">
                  Preparing your legal workspace.
                </p>

              </div>

            </div>

          ) : documents.length === 0 ? (

            <div className="h-full flex items-center justify-center">

              <div className="text-center max-w-2xl px-6">

                <h1 className="text-5xl font-bold mb-6">
                  ⚖️ AI Legal Document Analyzer
                </h1>

                <p className="text-gray-600 text-lg mb-8">
                  Upload legal PDF or DOCX documents and let AI answer
                  questions, summarize contracts, identify obligations,
                  penalties, clauses, dates, risks and much more.
                </p>

                <div className="bg-white rounded-xl shadow-md p-6 text-left">

                  <h3 className="font-bold text-xl mb-4">
                    Supported Legal Documents
                  </h3>

                  <ul className="space-y-2 text-gray-600">

                    <li>📄 Employment Contracts</li>

                    <li>📄 Lease Agreements</li>

                    <li>📄 Rental Agreements</li>

                    <li>📄 Non-Disclosure Agreements (NDA)</li>

                    <li>📄 Court Orders</li>

                    <li>📄 Legal Notices</li>

                    <li>📄 Insurance Policies</li>

                    <li>📄 Affidavits</li>

                    <li>📄 Government Legal Documents</li>

                  </ul>

                </div>

              </div>

            </div>

          ) : (

            <ChatBox
              selectedDocument={selectedDocument}
              clearChatTrigger={clearChatTrigger}
            />

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;