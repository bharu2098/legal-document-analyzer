import { RiRobot2Line } from "react-icons/ri";

function TypingIndicator() {
  return (
    <div className="mb-8 flex justify-start">

      <div className="flex max-w-5xl gap-4">

        {/* AI Avatar */}

        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-slate-700">
          <RiRobot2Line className="text-xl text-white" />
        </div>

        {/* Typing Bubble */}

        <div className="rounded-2xl border border-slate-700 bg-slate-800 px-6 py-5 shadow-lg">

          <div className="mb-3 font-semibold text-blue-400">
            AI Assistant
          </div>

          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500"></span>

            <span
              className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500"
              style={{ animationDelay: "0.15s" }}
            ></span>

            <span
              className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500"
              style={{ animationDelay: "0.3s" }}
            ></span>

            <span className="ml-3 text-sm text-gray-400">
              AI is analyzing your document...
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TypingIndicator;