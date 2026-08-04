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

        <div
          className="
            flex
            items-center
            gap-3
            rounded-[28px]
            border
            border-slate-700
            bg-[#111827]
            px-4
            py-4
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
                ? "Ask a question about this document..."
                : "Upload and select a document to begin..."
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

          {/* Send Button */}

          <button
            onClick={handleSend}
            disabled={disabled}
            title="Send Message"
            className="
              h-14
              rounded-[24px]
              bg-blue-600
              hover:bg-blue-500
              disabled:bg-slate-700
              disabled:cursor-not-allowed
              text-white
              text-base
              font-semibold
              px-6
              flex
              items-center
              justify-center
              transition-all
              duration-300
              hover:scale-105
              active:scale-95
            "
          >
            {loading ? "Sending..." : "Send"}
          </button>

        </div>


      </div>

    </div>
  );
}

export default ChatInput;