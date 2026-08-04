import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

function ChatBox({
  messages,
  loading,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">

        <div className="max-w-2xl text-center">

          <div className="mb-8 text-7xl">
            💬
          </div>

          <h2 className="text-4xl font-bold text-white">
            Ready to Chat
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            Ask questions about your selected legal document.
            AI will analyze the document and provide
            detailed legal insights.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-8 py-8">

      <div className="mx-auto max-w-5xl">

        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
          />
        ))}

        {loading && <TypingIndicator />}

        <div ref={bottomRef} />

      </div>

    </div>
  );
}

export default ChatBox;