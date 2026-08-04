import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";

export default function ChatBoxClean({ selectedDocument, clearChatTrigger }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    setMessages([]);
    setLoading(false);
  }, [selectedDocument?.id]);

  useEffect(() => {
    setMessages([]);
    setLoading(false);
  }, [clearChatTrigger]);

  const sendQuestion = async (question) => {
    if (!selectedDocument) {
      setMessages([
        {
          sender: "ai",
          text: "Please upload and select a document before asking questions.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: question,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
          body: JSON.stringify({ document_id: selectedDocument.id, question }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: data.answer,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: `❌ ${data.detail}`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white text-slate-900 overflow-hidden">
      <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white">
        <div>
          <h2 className="text-lg font-semibold truncate">{selectedDocument ? selectedDocument.filename : "No document selected"}</h2>
          <p className="text-sm text-slate-500 mt-1">{selectedDocument ? "Review the uploaded document and ask a question." : "Upload and select a document to begin."}</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {!selectedDocument && messages.length === 0 && (
            <div className="min-h-[64vh] flex items-center justify-center">
              <div className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-8 text-center">
                <h1 className="text-2xl font-semibold text-slate-900 mb-2">Document Analyzer</h1>
                <p className="text-sm text-slate-500">Upload a document and ask a question for a concise, professional summary.</p>
              </div>
            </div>
          )}

          {selectedDocument && messages.length === 0 && !loading && (
            <div className="min-h-[52vh] flex items-center justify-center">
              <div className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-6 text-center">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">Ready to Chat</h2>
                <p className="text-sm text-slate-500 mb-4">Ask questions about clauses, obligations, dates, parties, risks, or request a summary.</p>
                <div className="space-y-3">
                  <button onClick={() => sendQuestion("Summarize this document")} className="w-full text-left rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">Summarize this legal document</button>
                  <button onClick={() => sendQuestion("What are the key points?")} className="w-full text-left rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">What are the key legal points?</button>
                  <button onClick={() => sendQuestion("List obligations")} className="w-full text-left rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">What obligations or responsibilities are mentioned?</button>
                  <button onClick={() => sendQuestion("Any important dates or risks?")} className="w-full text-left rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">Are there any important dates, penalties, or risks?</button>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="min-h-[40vh] flex items-center justify-center">
              <div className="rounded-lg border border-slate-200 bg-white px-6 py-4 text-center">
                <p className="text-slate-500">Processing the request...</p>
              </div>
            </div>
          )}

          {messages.length > 0 && (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-slate-500">{msg.sender === "user" ? "Question" : "Answer"}</span>
                    <span className="text-xs text-slate-400">{msg.time}</span>
                  </div>
                  <div className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{msg.text}</div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <ChatInput onSend={sendQuestion} loading={loading} selectedDocument={selectedDocument} />
        </div>
      </div>
    </div>
  );
}
