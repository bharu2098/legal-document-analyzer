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
    <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 shadow-sm">
      <input
        type="text"
        maxLength={500}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={
          selectedDocument
            ? "Ask about this document..."
            : "Upload and select a document to begin..."
        }
        className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder-slate-400 text-sm py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />

      <button
        onClick={handleSend}
        disabled={disabled}
        title="Send"
        className="min-w-[88px] rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:bg-slate-300 disabled:text-slate-500"
      >
        {loading ? "Sending" : "Send"}
      </button>
    </div>
  );
}

export default ChatInput;