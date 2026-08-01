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
    <div className="border-t bg-white p-4 flex gap-3">

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
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
      >
        {loading ? "⚖️ Analyzing..." : "Send"}
      </button>

    </div>
  );
}

export default ChatInput;