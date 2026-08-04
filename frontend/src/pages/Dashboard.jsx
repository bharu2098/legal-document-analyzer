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

      <div className="flex h-[calc(100vh-80px)] overflow-hidden">

        <Sidebar
          documents={documents}
          fetchDocuments={fetchDocuments}
          selectedDocument={selectedDocument}
          setSelectedDocument={setSelectedDocument}
          clearChat={clearChat}
        />

        <main className="flex-1 flex justify-center bg-[#0D1117] overflow-hidden">

          <div className="w-full max-w-7xl flex overflow-hidden">

            {loading ? (

              <div className="flex-1 flex items-center justify-center">

                <div className="text-center">

                  <div className="flex justify-center mb-8">

                    <div className="w-16 h-16 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>

                  </div>

                  <h2 className="text-3xl font-bold text-white">
                    Loading Workspace...
                  </h2>

                  <p className="text-slate-400 mt-3 text-lg">
                    Preparing your AI Legal Assistant
                  </p>

                </div>

              </div>

            ) : documents.length === 0 ? (
              <div className="flex-1 flex items-center justify-center px-10 py-10">
                <div className="max-w-6xl w-full">

                  {/* Hero */}
                  <div className="text-center mb-14">
                    <div className="w-28 h-28 mx-auto rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center shadow-2xl shadow-blue-900/30 mb-8">
                      <span className="text-6xl">📄</span>
                    </div>

                    <h1 className="text-5xl font-extrabold text-white mb-6">
                      AI Document Analyzer
                    </h1>

                    <p className="text-xl text-slate-400 leading-9 max-w-4xl mx-auto">
                      Upload PDF or DOCX documents and instantly summarize files, explain clauses, identify obligations, detect risks, analyze agreements, and ask questions using AI.
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-7 mb-12">
                    <div className="rounded-3xl bg-[#161B22] border border-slate-700 p-8 hover:border-blue-500 hover:bg-[#1B2430] transition-all duration-300">
                      <div className="text-5xl mb-5">📄</div>
                      <h3 className="text-white text-2xl font-bold mb-3">Documents</h3>
                      <p className="text-slate-400 leading-7">
                        Securely upload contracts, agreements, notices, policies and other documents for AI analysis.
                      </p>
                    </div>

                    <div className="rounded-3xl bg-[#161B22] border border-slate-700 p-8 hover:border-blue-500 hover:bg-[#1B2430] transition-all duration-300">
                      <div className="text-5xl mb-5">🤖</div>
                      <h3 className="text-white text-2xl font-bold mb-3">AI Analysis</h3>
                      <p className="text-slate-400 leading-7">
                        Automatically summarize documents, explain clauses and answer complex questions using AI.
                      </p>
                    </div>

                    <div className="rounded-3xl bg-[#161B22] border border-slate-700 p-8 hover:border-blue-500 hover:bg-[#1B2430] transition-all duration-300">
                      <div className="text-5xl mb-5">🔒</div>
                      <h3 className="text-white text-2xl font-bold mb-3">Secure Workspace</h3>
                      <p className="text-slate-400 leading-7">
                        Your uploaded documents remain protected while being processed in a secure workspace.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-[#161B22] border border-slate-700 p-8 shadow-xl">
                    <h2 className="text-2xl font-bold text-white mb-8">Supported Documents</h2>
                    <div className="grid md:grid-cols-3 gap-5">
                      <div className="rounded-2xl bg-[#0D1117] border border-slate-700 p-5">
                        <h4 className="text-white font-semibold mb-2">📄 Contracts</h4>
                        <p className="text-sm text-slate-400">Employment, Service, Sales, Vendor and Business Contracts.</p>
                      </div>
                      <div className="rounded-2xl bg-[#0D1117] border border-slate-700 p-5">
                        <h4 className="text-white font-semibold mb-2">📑 Agreements</h4>
                        <p className="text-sm text-slate-400">Lease, Rental, Partnership, MoU and NDA Agreements.</p>
                      </div>
                      <div className="rounded-2xl bg-[#0D1117] border border-slate-700 p-5">
                        <h4 className="text-white font-semibold mb-2">⚖️ Court Documents</h4>
                        <p className="text-sm text-slate-400">Court Orders, Legal Notices and Affidavits.</p>
                      </div>
                      <div className="rounded-2xl bg-[#0D1117] border border-slate-700 p-5">
                        <h4 className="text-white font-semibold mb-2">🛡️ Policies</h4>
                        <p className="text-sm text-slate-400">Insurance Policies, Privacy Policies and Terms & Conditions.</p>
                      </div>
                      <div className="rounded-2xl bg-[#0D1117] border border-slate-700 p-5">
                        <h4 className="text-white font-semibold mb-2">🏛️ Government Documents</h4>
                        <p className="text-sm text-slate-400">Government documents and official notifications.</p>
                      </div>
                      <div className="rounded-2xl bg-[#0D1117] border border-slate-700 p-5">
                        <h4 className="text-white font-semibold mb-2">🤖 AI Analysis</h4>
                        <p className="text-sm text-slate-400">AI summarizes documents, explains clauses, detects risks and answers questions.</p>
                      </div>
                    </div>
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

        </main>

      </div>

    </div>
  );
}

export default Dashboard;