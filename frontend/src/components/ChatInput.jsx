import { useState } from "react";

function ChatInput({
  onSend,
  loading,
  selectedDocument,
}) {
  const [question, setQuestion] = useState("");

  const disabled = loading || !selectedDocument;

  const handleSend = () => {
    if (!question.trim() || disabled) return;

    onSend(question.trim());
    setQuestion("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-slate-700 bg-slate-900 px-8 py-6 flex gap-4">

      <input
        autoFocus
        maxLength={500}
        type="text"
        placeholder={
          selectedDocument
            ? "Ask a question about this legal document..."
            : "Upload and select a legal document first..."
        }
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />

      <button
        onClick={handleSend}
        disabled={disabled}
        title="Ask AI about this legal document"
        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      >
        {loading ? "⚖️ Analyzing..." : "Send"}
      </button>

    </div>
  );
}

export default ChatInput;