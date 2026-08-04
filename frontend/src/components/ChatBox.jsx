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

      <header className="h-16 flex items-center justify-between px-8 border-b border-slate-800 bg-[#111827]">
        <div>
          <h2 className="text-lg font-semibold text-white truncate">
            {selectedDocument ? selectedDocument.filename : "No document selected"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {selectedDocument
              ? "Review the uploaded document and ask a question."
              : "Upload and select a document to begin."}
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-[#0B111D]">
        <div className="max-w-6xl mx-auto px-8 py-10">

          {!selectedDocument && messages.length === 0 && (
            <div className="min-h-[72vh] flex items-center justify-center">
              <div className="w-full max-w-2xl rounded-3xl border border-slate-700 bg-[#111827] p-10 text-center">
                <h1 className="text-4xl font-semibold text-white mb-4">
                  Document Analyzer
                </h1>
                <p className="text-base text-slate-400 leading-7">
                  Upload a document and ask a question to get a concise, professional summary and insight report.
                </p>
              </div>
            </div>
          )}

          {selectedDocument && messages.length === 0 && !loading && (
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="w-full max-w-2xl rounded-3xl border border-slate-700 bg-[#111827] p-10">
                <h2 className="text-3xl font-semibold text-white mb-3">
                  Ask a question about this document
                </h2>
                <p className="text-sm text-slate-400 leading-7">
                  Enter a query below to review clauses, summarize sections, or confirm obligations.
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="min-h-[40vh] flex items-center justify-center">
              <div className="rounded-3xl border border-slate-700 bg-[#111827] px-8 py-6 text-center">
                <p className="text-slate-400">Processing the request...</p>
              </div>
            </div>
          )}

          {messages.length > 0 && (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className="rounded-3xl border border-slate-700 bg-[#111827] p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-slate-400">
                      {msg.sender === "user" ? "Question" : "Answer"}
                    </span>
                    <span className="text-xs text-slate-500">{msg.time}</span>
                  </div>
                  <div className="whitespace-pre-wrap text-base leading-7 text-slate-100">
                    {msg.text}
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          )}

        </div>
      </div>

      <div className="sticky bottom-0 border-t border-slate-800 bg-[#0B111D]">
        <div className="max-w-6xl mx-auto px-8 py-6">
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