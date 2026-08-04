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
    <div className="flex-shrink-0 bg-[#0B111D] border-t border-slate-800 px-8 py-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-[#111827] px-4 py-4">
          <input
            type="text"
            maxLength={500}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={
              selectedDocument
                ? "Ask about the selected document..."
                : "Upload and select a document to begin..."
            }
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 text-sm py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <button
            onClick={handleSend}
            disabled={disabled}
            title="Send"
            className="h-12 rounded-2xl bg-blue-600 px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed"
          >
            {loading ? "Sending" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;