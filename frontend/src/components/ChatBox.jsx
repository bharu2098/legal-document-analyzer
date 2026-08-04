import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";

function ChatBox({
  selectedDocument,
  clearChatTrigger,
}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const messagesEndRef = useRef(null);

  // --------------------------------------------------
  // Auto Scroll
  // --------------------------------------------------

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // --------------------------------------------------
  // Clear chat when switching document
  // --------------------------------------------------

  useEffect(() => {
    setMessages([]);
    setLoading(false);
  }, [selectedDocument?.id]);

  // --------------------------------------------------
  // Clear chat button
  // --------------------------------------------------

  useEffect(() => {
    setMessages([]);
    setLoading(false);
  }, [clearChatTrigger]);

  // --------------------------------------------------
  // Send Question
  // --------------------------------------------------

  const sendQuestion = async (question) => {

    if (!selectedDocument) {

      setMessages([
        {
          sender: "ai",
          text: "⚖️ Please upload and select a legal document before asking questions.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      return;
    }

    // Add user message

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: question,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setLoading(true);

    const token = localStorage.getItem("token");
        try {

      const response = await fetch(
        "https://shimmering-sparkle-production-88ac.up.railway.app/chat/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            document_id: selectedDocument.id,
            question,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {

        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: data.answer,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);

      } else {

        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: `❌ ${data.detail}`,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);

      }

    } catch (error) {

      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Unable to contact the server.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

    } finally {

      setLoading(false);

    }

  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="flex-1 flex flex-col bg-[#0B111D] overflow-hidden">

  {/* ================= HEADER ================= */}

  <div className="h-16 flex items-center justify-between px-8 border-b border-slate-800 bg-[#111827]">

    {selectedDocument ? (

      <div className="flex flex-col">

        <h2 className="text-lg font-semibold text-white truncate">
          📄 {selectedDocument.filename}
        </h2>

        <p className="text-xs text-slate-500">
          Document analyzer workspace
          Document Analyzer
        </h2>

        <p className="text-xs text-slate-500">
          Upload a PDF or DOCX document to begin analysis

  </div>

  {/* ================= CHAT AREA ================= */}

  <div className="flex-1 overflow-y-auto bg-[#0B111D]">

    <div className="max-w-6xl mx-auto px-8 py-10">

      {/* ================= WELCOME ================= */}

      {!selectedDocument && messages.length === 0 && (

<div className="min-h-[72vh] flex items-center justify-center">

          <div className="text-center max-w-4xl">

            <h1 className="text-5xl font-bold text-white mb-6">
              Document Analyzer
            </h1>

            <p className="text-xl text-slate-400 leading-9">
              Upload contracts, agreements, reports, policies, notices and other documents. Ask AI to summarize content, identify key points, detect risks, and answer questions instantly.
            </p>

          </div>

        </div>

      )}

      {/* ================= READY TO CHAT ================= */}

      {selectedDocument && messages.length === 0 && !loading && (

<div className="min-h-[72vh] flex items-center justify-center">

          <div className="max-w-3xl w-full">

            <h2 className="text-4xl font-bold text-white text-center mb-4">
              💬 Ready to Chat
            </h2>

            <p className="text-center text-slate-400 text-lg mb-10">
              Ask anything about this legal document.
            </p>

            <div className="grid gap-4">

              <button
                onClick={() =>
                  sendQuestion("Summarize this legal document")
                }
                className="rounded-2xl bg-[#161B22] border border-slate-700 hover:border-blue-500 hover:bg-[#1E293B] transition-all duration-300 p-6 text-left text-slate-200"
              >
                📌 Summarize this legal document
              </button>

              <button
                onClick={() =>
                  sendQuestion("What are the key legal points?")
                }
                className="rounded-2xl bg-[#161B22] border border-slate-700 hover:border-blue-500 hover:bg-[#1E293B] transition-all duration-300 p-6 text-left text-slate-200"
              >
                📌 What are the key legal points?
              </button>

              <button
                onClick={() =>
                  sendQuestion(
                    "What obligations or responsibilities are mentioned?"
                  )
                }
                className="rounded-2xl bg-[#161B22] border border-slate-700 hover:border-blue-500 hover:bg-[#1E293B] transition-all duration-300 p-6 text-left text-slate-200"
              >
                📌 What obligations or responsibilities are mentioned?
              </button>

              <button
                onClick={() =>
                  sendQuestion(
                    "Are there any important dates, penalties, or risks?"
                  )
                }
                className="rounded-2xl bg-[#161B22] border border-slate-700 hover:border-blue-500 hover:bg-[#1E293B] transition-all duration-300 p-6 text-left text-slate-200"
              >
                📌 Are there any important dates, penalties, or risks?
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================= CHAT MESSAGES ================= */}
          {selectedDocument && (
        <>

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`mb-8 flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`w-full max-w-5xl ${
                  msg.sender === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }`}
              >

                <div
                  className={`rounded-[28px] px-7 py-6 shadow-xl transition-all duration-300 ${
                    msg.sender === "user"
                      ? "max-w-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                      : "w-full bg-[#111827] border border-slate-800 text-slate-100"
                  }`}
                >

                  {/* Sender */}

                  <div className="flex items-center justify-between mb-4">

                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        msg.sender === "user"
                          ? "text-blue-100"
                          : "text-slate-400"
                      }`}
                    >
                      {msg.sender === "user"
                        ? "You"
                        : "AI Legal Assistant"}
                    </span>

                    {msg.sender === "ai" && (

                      <button
                        onClick={() => {

                          navigator.clipboard.writeText(msg.text);

                          setCopiedIndex(index);

                          setTimeout(() => {
                            setCopiedIndex(null);
                          }, 2000);

                        }}
                        title="Copy answer"
                        className="p-2 rounded-lg text-slate-500 hover:bg-slate-700 hover:text-white transition-all duration-200"
                      >

                        {copiedIndex === index ? "✅" : "📋"}

                      </button>

                    )}

                  </div>

                  {/* Message */}

                  <div className="whitespace-pre-wrap break-words leading-8 text-[15px]">

                    {msg.text}

                  </div>

                  {/* Time */}

                  <div
                    className={`mt-5 text-xs ${
                      msg.sender === "user"
                        ? "text-blue-100"
                        : "text-slate-500"
                    }`}
                  >
                    {msg.time}
                  </div>

                </div>

              </div>

            </div>

          ))}

          {/* Loading */}

          {loading && (

            <div className="mb-8 flex justify-start">

              <div className="w-full max-w-5xl">

                <div className="rounded-3xl bg-[#161B22] border border-slate-800 px-7 py-6">

                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-4">
                    AI Legal Assistant
                  </p>

                  <p className="text-slate-400 mb-5">
                    Analyzing your legal document...
                  </p>

                  <div className="flex gap-2">

                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>

                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:.2s]"></div>

                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:.4s]"></div>

                  </div>

                </div>

              </div>

            </div>

          )}

          <div ref={messagesEndRef}></div>

        </>
      )}
            {/* ================= NO DOCUMENT BUT MESSAGE EXISTS ================= */}

      {!selectedDocument && messages.length > 0 && (

        <>
          {messages.map((msg, index) => (

            <div
              key={index}
              className={`mb-8 flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`rounded-3xl px-7 py-6 shadow-xl ${
                  msg.sender === "user"
                    ? "max-w-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "max-w-4xl bg-[#161B22] border border-slate-800 text-slate-100"
                }`}
              >

                <div className="text-xs uppercase tracking-wider font-semibold mb-3">

                  {msg.sender === "user"
                    ? "You"
                    : "AI Legal Assistant"}

                </div>

                <div className="whitespace-pre-wrap break-words leading-8">

                  {msg.text}

                </div>

                <div
                  className={`mt-5 text-xs ${
                    msg.sender === "user"
                      ? "text-blue-100"
                      : "text-slate-500"
                  }`}
                >
                  {msg.time}
                </div>

              </div>

            </div>

          ))}

          <div ref={messagesEndRef}></div>

        </>

      )}

    </div>
  </div>

  {/* ================= INPUT ================= */}

  <div className="sticky bottom-0 bg-gradient-to-t from-[#0B111D] via-[#0B111D] to-transparent pt-6">

    <div className="max-w-6xl mx-auto px-8 pb-8">

      <ChatInput
        onSend={sendQuestion}
        loading={loading}
        selectedDocument={selectedDocument}
      />

    </div>

  </div>

</div>

  );
}

export default ChatBox;