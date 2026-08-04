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
    <div className="flex-shrink-0 bg-[#0B111D] border-t border-slate-800 px-8 py-6">

      <div className="max-w-6xl mx-auto">

        <div
          className="
            flex
            items-center
            gap-3
            rounded-[32px]
            border
            border-slate-700
            bg-[#111827]
            px-4
            py-4
            shadow-xl
            transition-all
            duration-300
            focus-within:border-violet-500
            focus-within:ring-2
            focus-within:ring-violet-500/20
          "
        >

          {/* Input */}

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
                ? "Ask anything about this document..."
                : "Upload and select a legal document first..."
            }
            className="
              flex-1
              bg-transparent
              border-none
              outline-none
              text-white
              placeholder-slate-500
              text-[15px]
              py-3
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          />

          {/* Character Count */}

          {question.length > 0 && (

            <span className="hidden md:block text-xs text-slate-500">

              {question.length}/500

            </span>

          )}

          {/* Send Button */}

          <button
            onClick={handleSend}
            disabled={disabled}
            title="Send Message"
            className="
              w-14
              h-14
              rounded-[24px]
              bg-gradient-to-r
              from-violet-500
              via-blue-500
              to-indigo-600
              disabled:bg-slate-700
              disabled:cursor-not-allowed
              text-white
              text-2xl
              flex
              items-center
              justify-center
              transition-all
              duration-300
              hover:scale-105
              active:scale-95
            "
          >
            {loading ? "..." : "➜"}
          </button>

        </div>

        {/* Bottom Hint */}

        <p className="mt-3 text-center text-xs text-slate-600">

          Press <span className="text-slate-400 font-medium">Enter</span> to send your question

        </p>

      </div>

    </div>
  );
}

export default ChatInput;