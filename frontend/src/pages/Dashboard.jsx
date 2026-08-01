import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

function Dashboard() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [clearChatTrigger, setClearChatTrigger] = useState(0);

  const fetchDocuments = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(fetch("https://legal-document-analyzer-production-bf96.up.railway.app/documents/",  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setDocuments(data);

        // Keep selected document valid after refresh/upload
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
        console.error(data.detail);
      }
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Clear current chat
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

        <ChatBox
          selectedDocument={selectedDocument}
          clearChatTrigger={clearChatTrigger}
        />
      </div>
    </div>
  );
}

export default Dashboard;