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
    <div className="flex-shrink-0 bg-white border-t border-slate-200 px-6 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <input
            type="text"
            maxLength={500}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={
              selectedDocument
                ? "Ask a question about this legal document..."
                : "Upload and select a document to begin..."
            }
            className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <button
            onClick={handleSend}
            disabled={disabled}
            title="Send"
            className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-500 disabled:bg-slate-300 disabled:text-slate-500"
          >
            {loading ? "Sending" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;