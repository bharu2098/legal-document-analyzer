import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import useAuth from "../hooks/useAuth";
import { askQuestion } from "../services/chat";

const ChatContext = createContext();

const STORAGE_KEY = "legal-chat-history";

export function ChatProvider({ children }) {
  const { token } = useAuth();

  // =====================================
  // Load chat history from localStorage
  // =====================================

  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : {};
  });

  const [loading, setLoading] = useState(false);

  // =====================================
  // Save chat history whenever it changes
  // =====================================

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(chatHistory)
    );
  }, [chatHistory]);

  // =====================================
  // Get messages for selected document
  // =====================================

  function getMessages(documentId) {
    return chatHistory[documentId] || [];
  }

  // =====================================
  // Send Message
  // =====================================

  async function sendMessage(
    documentId,
    question
  ) {
    if (!documentId) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setChatHistory((prev) => ({
      ...prev,
      [documentId]: [
        ...(prev[documentId] || []),
        userMessage,
      ],
    }));

    try {
      setLoading(true);

      const response = await askQuestion(
        documentId,
        question,
        token
      );

      const aiMessage = {
        role: "assistant",
        content: response.answer,
      };

      setChatHistory((prev) => ({
        ...prev,
        [documentId]: [
          ...(prev[documentId] || []),
          aiMessage,
        ],
      }));
    } catch (error) {
      setChatHistory((prev) => ({
        ...prev,
        [documentId]: [
          ...(prev[documentId] || []),
          {
            role: "assistant",
            content:
              error.message ||
              "Something went wrong.",
          },
        ],
      }));
    } finally {
      setLoading(false);
    }
  }

  // =====================================
  // Clear chat for one document
  // =====================================

  function clearChat(documentId) {
    setChatHistory((prev) => ({
      ...prev,
      [documentId]: [],
    }));
  }

  // =====================================
  // Clear all chats (optional)
  // =====================================

  function clearAllChats() {
    setChatHistory({});
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <ChatContext.Provider
      value={{
        loading,
        sendMessage,
        getMessages,
        clearChat,
        clearAllChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}