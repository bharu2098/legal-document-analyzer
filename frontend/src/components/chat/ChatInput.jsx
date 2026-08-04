import { useRef, useState } from "react";
import { FiSend } from "react-icons/fi";

function ChatInput({
  onSend,
  disabled,
  loading = false,
}) {
  const [question, setQuestion] = useState("");

  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim() || loading) return;

    onSend(question.trim());

    setQuestion("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "52px";
    }
  };

  const handleChange = (e) => {
    setQuestion(e.target.value);

    e.target.style.height = "52px";
    e.target.style.height = `${Math.min(
      e.target.scrollHeight,
      180
    )}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-slate-800 bg-slate-900 px-6 py-4"
    >
      <div className="mx-auto max-w-5xl">

        <div className="rounded-3xl border border-slate-700 bg-slate-800 shadow-xl transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">

          <textarea
            ref={textareaRef}
            rows={1}
            maxLength={2000}
            value={question}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled || loading}
            placeholder={
              disabled
                ? "Select a document to start chatting..."
                : "Ask anything about your legal document..."
            }
            className="
              min-h-[52px]
              max-h-[180px]
              w-full
              resize-none
              bg-transparent
              px-5
              py-4
              text-white
              placeholder:text-slate-500
              outline-none
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />

          <div className="flex items-center justify-between px-5 pb-3">

            <span className="text-xs font-medium text-slate-400">
              {question.length} / 2000
            </span>

            <button
              type="submit"
              disabled={
                disabled ||
                loading ||
                !question.trim()
              }
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                bg-blue-600
                px-5
                py-2.5
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-200
                hover:scale-105
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:bg-slate-700
                disabled:hover:scale-100
              "
            >
              <FiSend size={18} />

              {loading ? "Thinking..." : "Send"}
            </button>

          </div>

        </div>

      </div>
    </form>
  );
}

export default ChatInput;