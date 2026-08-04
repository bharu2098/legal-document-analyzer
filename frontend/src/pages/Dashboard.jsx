import DashboardLayout from "../layouts/DashboardLayout";
import useAuth from "../hooks/useAuth";

import { useDocument } from "../context/DocumentContext";
import { useChat } from "../context/ChatContext";

import ChatBox from "../components/chat/ChatBox";
import ChatInput from "../components/chat/ChatInput";

function Dashboard() {
  const { user } = useAuth();

  const { selectedDocument } = useDocument();

  const {
    getMessages,
    loading,
    sendMessage,
    clearChat,
  } = useChat();

  const messages = selectedDocument
    ? getMessages(selectedDocument.id)
    : [];

  async function handleSend(question) {
    if (!selectedDocument) return;

    await sendMessage(
      selectedDocument.id,
      question
    );
  }

  function handleClearChat() {
    if (!selectedDocument) return;

    clearChat(selectedDocument.id);
  }

  return (
    <DashboardLayout>
      <div className="flex h-full flex-col bg-slate-950">

        {/* Header */}

        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-10 py-6">

          <div>

            <p className="text-sm font-medium text-blue-400">
              Welcome Back 👋
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white">
              {user?.username}
            </h1>

            <p className="mt-2 text-gray-400">
              AI-powered legal document analysis and chat assistant
            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              {user?.username?.charAt(0).toUpperCase()}
            </div>

            <div>

              <h2 className="font-semibold text-white">
                {user?.username}
              </h2>

              <p className="text-sm text-gray-400">
                {user?.email}
              </p>

            </div>

          </div>

        </header>

        {/* Chat Area */}

        <div className="flex-1 overflow-hidden">

          {!selectedDocument ? (

            <div className="flex h-full items-center justify-center">

              <div className="text-center">

                <div className="mb-8 text-7xl">
                  ⚖️
                </div>

                <h1 className="text-5xl font-bold text-white">
                  AI Legal Document Analyzer
                </h1>

                <p className="mt-6 text-xl text-gray-400">
                  Upload and select a legal document to start chatting.
                </p>

              </div>

            </div>

          ) : (

            <div className="flex h-full flex-col">

              {/* Selected Document */}

              <div className="flex items-center justify-between border-b border-slate-800 p-6">

                <div>

                  <h2
                    className="text-2xl font-bold text-white"
                    title={selectedDocument.filename}
                  >
                    {selectedDocument.filename}
                  </h2>

                  <p className="text-gray-400">
                    Ask questions about this document.
                  </p>

                </div>

                <button
                  onClick={handleClearChat}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                >
                  Clear Chat
                </button>

              </div>

              <ChatBox
                messages={messages}
                loading={loading}
              />

            </div>

          )}

        </div>

        {/* Chat Input */}

        <ChatInput
          onSend={handleSend}
          disabled={!selectedDocument}
          loading={loading}
        />

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;