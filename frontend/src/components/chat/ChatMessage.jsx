import { FiUser } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { MdContentCopy } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ChatMessage({ message }) {
  const isUser = message.role === "user";

  console.log(message.content);

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      alert("Copied to clipboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`mb-8 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-5xl gap-4 ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}

        <div
          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${
            isUser
              ? "bg-blue-600"
              : "bg-slate-700"
          }`}
        >
          {isUser ? (
            <FiUser className="text-xl text-white" />
          ) : (
            <RiRobot2Line className="text-xl text-white" />
          )}
        </div>

        {/* Message */}

        <div
          className={`rounded-2xl px-6 py-5 shadow-lg ${
            isUser
              ? "bg-blue-600 text-white"
              : "border border-slate-700 bg-slate-800 text-gray-100"
          }`}
        >
          {!isUser && (
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-blue-400">
                AI Assistant
              </h3>

              <button
                onClick={copyMessage}
                className="text-gray-400 transition hover:text-white"
              >
                <MdContentCopy size={18} />
              </button>
            </div>
          )}

          {isUser ? (
            <p className="whitespace-pre-wrap leading-7">
              {message.content}
            </p>
          ) : (
            <div
              className="
                prose
                prose-invert
                max-w-none
                prose-headings:text-white
                prose-p:text-gray-300
                prose-strong:text-white
                prose-li:text-gray-300
                prose-ul:my-3
                prose-h2:text-2xl
                prose-h3:text-xl
              "
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}

          <div className="mt-4 text-right text-xs opacity-60">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;