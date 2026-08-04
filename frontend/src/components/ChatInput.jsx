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
    <div className="flex-shrink-0 bg-[#0B1120] border-t border-slate-800 px-8 py-6">

      <div className="max-w-5xl mx-auto">

        <div
          className="
            flex
            items-center
            gap-3
            rounded-3xl
            border
            border-slate-700
            bg-[#161B22]
            px-4
            py-3
            shadow-xl
            transition-all
            duration-300
            focus-within:border-blue-500
            focus-within:ring-2
            focus-within:ring-blue-500/20
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
              w-12
              h-12
              rounded-2xl
              bg-blue-600
              hover:bg-blue-500
              disabled:bg-slate-700
              disabled:cursor-not-allowed
              text-white
              text-xl
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