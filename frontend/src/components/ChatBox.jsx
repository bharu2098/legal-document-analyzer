import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
function ChatBox({
  selectedDocument,
  clearChatTrigger,
}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Clear chat when switching documents
  useEffect(() => {
    setMessages([]);
    setLoading(false);
  }, [selectedDocument?.id]);
// Clear chat when Clear Chat button is clicked
useEffect(() => {
  setMessages([]);
  setLoading(false);
}, [clearChatTrigger]);
  const sendQuestion = async (question) => {
    // No document selected
   if (!selectedDocument) {
  setMessages([
    {
      sender: "ai",
      text: "⚖️ Please upload and select a legal document before asking questions.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  return;
}

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
  sender: "user",
  text: question,
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
}
    ]);

    setLoading(true);

    const token = localStorage.getItem("token");

   try {
  const response = await fetch(
    "https://shimmering-sparkle-production-88ac.up.railway.app/chat/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        document_id: selectedDocument.id,
        question,
      }),
    }
  );

  const data = await response.json();

  if (response.ok) {
    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: data.answer,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  } else {
    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: `❌ ${data.detail}`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  }
} catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
       {
  sender: "ai",
  text: "❌ Unable to contact the server.",
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
}
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-w-0 flex flex-col bg-gray-100 overflow-hidden">


      {/* Header */}
      <div className="bg-white border-b p-5">
        {selectedDocument ? (
          <>
            <h2 className="text-xl font-bold">
              📄 {selectedDocument.filename}
            </h2>

            <p className="text-sm text-gray-500">
              AI Legal Document Analyzer
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold">
  ⚖️ AI Legal Document Analyzer
</h2>

            <p className="text-sm text-gray-500">
  Upload a legal PDF or DOCX document to begin analysis
</p>
          </>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto p-6">

        {/* Welcome Screen */}
        {!selectedDocument && messages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">

              <h1 className="text-4xl font-bold mb-4">
  ⚖️ AI Legal Document Analyzer
</h1>

<p className="text-lg text-gray-500">
  Upload a legal PDF or DOCX document such as a Contract, Agreement, NDA, Lease Agreement, Court Order, Legal Notice, or Insurance Policy and ask AI questions about it.
</p>

            </div>
          </div>
        )}

        {/* Chat Messages */}
        {selectedDocument && (
          <>
                      {messages.length === 0 && !loading && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">

                  <h2 className="text-2xl font-bold mb-4">
                    💬 Ready to Chat
                  </h2>

                  <p className="text-gray-500 mb-6">
                  Ask questions about clauses, obligations, penalties, dates, parties, risks, or request a complete summary.
                  </p>

                  <div className="space-y-3 text-left max-w-lg mx-auto">
             <button
  onClick={() => sendQuestion("Summarize this legal document")}
  className="w-full text-left p-4 border rounded-xl hover:bg-blue-50 transition"
>
  📌 Summarize this legal document
</button>

<button
  onClick={() => sendQuestion("What are the key legal points?")}
  className="w-full text-left p-4 border rounded-xl hover:bg-blue-50 transition"
>
  📌 What are the key legal points?
</button>

<button
  onClick={() => sendQuestion("What obligations or responsibilities are mentioned?")}
  className="w-full text-left p-4 border rounded-xl hover:bg-blue-50 transition"
>
  📌 What obligations or responsibilities are mentioned?
</button>

<button
  onClick={() => sendQuestion("Are there any important dates, penalties, or risks?")}
  className="w-full text-left p-4 border rounded-xl hover:bg-blue-50 transition"
>
  📌 Are there any important dates, penalties, or risks?
</button>

                  </div>

                </div>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-4 ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
  className={`max-w-[75%] min-w-0 overflow-hidden rounded-xl shadow px-5 py-4 ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border"
                  }`}
                >
                  <p className="text-xs font-semibold mb-2">
  {msg.sender === "user"
    ? "👤 You"
    : "⚖️ AI Legal Analyzer"}
</p>

                  <div className="flex justify-between items-start gap-3">
 <p className="flex-1 whitespace-pre-wrap break-words overflow-x-auto">


    {msg.text}
  </p>

  {msg.sender === "ai" && (
    <button
  onClick={() => {
    navigator.clipboard.writeText(msg.text);
    setCopiedIndex(index);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  }}
  className="text-gray-500 hover:text-blue-600 transition"
  title="Copy Answer"
>
  {copiedIndex === index ? "✅" : "📋"}
</button>
  )}
</div>

<p
  className={`text-xs mt-2 ${
    msg.sender === "user"
      ? "text-blue-100"
      : "text-gray-400"
  }`}
>
  {msg.time}
</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border rounded-xl shadow px-5 py-4">

                  <p className="text-xs font-semibold mb-2">
                    ⚖️ AI Legal Analyzer
                  </p>

                  <p className="text-gray-500 mb-3">
  ⚖️ Analyzing the legal document and preparing your answer...
</p>

                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>

                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>

          </>
        )}

        {!selectedDocument && messages.length > 0 && (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-4 ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-xl shadow px-5 py-4 ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border"
                  }`}
                >
                  <p className="text-xs font-semibold mb-2">
  {msg.sender === "user"
    ? "👤 You"
    : "⚖️ AI Legal Analyzer"}
</p>

                 <p className="whitespace-pre-wrap break-words">
  {msg.text}
</p>

<p className="text-xs text-gray-400 mt-2">
  {msg.time}
</p>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef}></div>
          </>
        )}

      </div>

      <ChatInput
        onSend={sendQuestion}
        loading={loading}
        selectedDocument={selectedDocument}
      />

    </div>
  );
}

export default ChatBox;