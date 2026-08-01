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
    <div className="flex-shrink-0 border-t border-slate-700 bg-slate-900 px-8 py-6">
      <div className="flex items-center gap-4">

        <input
          autoFocus
          type="text"
          maxLength={500}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={
            selectedDocument
              ? "Ask a question about this legal document..."
              : "Upload and select a legal document first..."
          }
          className="
            flex-1
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            px-5
            py-4
            text-white
            placeholder-slate-400
            outline-none
            transition-all
            duration-300
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        />

        <button
          onClick={handleSend}
          disabled={disabled}
          title="Ask AI about this legal document"
          className="
            min-w-[170px]
            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-violet-600
            hover:from-blue-500
            hover:via-indigo-500
            hover:to-violet-500
            text-white
            font-semibold
            px-8
            py-4
            rounded-xl
            shadow-lg
            transition-all
            duration-300
            hover:scale-[1.03]
            active:scale-95
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:hover:scale-100
          "
        >
          {loading ? "⚖️ Analyzing..." : "🚀 Send"}
        </button>

      </div>

      {selectedDocument && (
        <p className="mt-3 text-center text-xs text-slate-500">
          AI responses are generated from the selected legal document.
        </p>
      )}
    </div>
  );
}

export default ChatInput;