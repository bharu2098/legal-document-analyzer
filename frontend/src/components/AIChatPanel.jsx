import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";

export default function AIChatPanel({ selectedDocument, clearChatTrigger }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    setMessages([]);
    setLoading(false);
  }, [selectedDocument?.id, clearChatTrigger]);

  const sendQuestion = async (question) => {
    if (!selectedDocument) return;

    const userMessage = {
      sender: "user",
      text: question,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://shimmering-sparkle-production-88ac.up.railway.app/chat/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ document_id: selectedDocument.id, question }),
        }
      );
      const data = await response.json();

      const assistantMessage = {
        sender: "assistant",
        text: response.ok ? data.answer : `❌ ${data.detail || "Unable to answer."}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "❌ Unable to contact the server.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex-1 flex flex-col overflow-hidden bg-slate-100">
      <div className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Document Chat</p>
            <h2 className="text-xl font-semibold text-slate-900 truncate">
              {selectedDocument ? selectedDocument.filename : "Select a document to start"}
            </h2>
          </div>
          {selectedDocument && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-500">
              Selected
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {!selectedDocument ? (
            <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
              <p className="text-sm text-slate-500">Upload and select a document to start the chat.</p>
            </div>
          ) : messages.length === 0 && !loading ? (
            <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Ready to chat</h3>
              <p className="text-sm text-slate-500">Ask questions about the selected document.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[75%] rounded-3xl px-5 py-4 shadow-sm ${
                    msg.sender === "user"
                      ? "self-end bg-sky-600 text-white"
                      : "self-start bg-white text-slate-900 border border-slate-200"
                  }`}
                >
                  <p className="text-sm leading-6">{msg.text}</p>
                  <span className="mt-3 block text-xs text-slate-400">{msg.time}</span>
                </div>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {selectedDocument && (
          <div className="border-t border-slate-200 bg-white px-6 py-4">
            <ChatInput onSend={sendQuestion} loading={loading} selectedDocument={selectedDocument} />
          </div>
        )}
      </div>
    </section>
  );
}
