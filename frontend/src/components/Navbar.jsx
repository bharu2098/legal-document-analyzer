import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to sign out?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="h-20 bg-gradient-to-r from-[#020617] via-[#0F172A] to-[#111827] border-b border-slate-800 shadow-2xl">

      <div className="h-full px-8 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-900/40">

            <span className="text-3xl">
              ⚖️
            </span>

          </div>

          <div>

            <h1 className="text-3xl font-bold text-white tracking-wide">
              AI Legal Document Analyzer
            </h1>

            <p className="text-sm text-slate-400 mt-1">
              Intelligent Legal Document Analysis using AI
            </p>

          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-5">

          <div className="hidden lg:flex flex-col items-end">

            <span className="text-white font-semibold">
              Welcome
            </span>

            <span className="text-slate-400 text-sm">
              Secure AI Workspace
            </span>

          </div>

          <button
            onClick={handleLogout}
            className="
              flex items-center gap-2
              px-6 py-3
              rounded-xl
              bg-gradient-to-r
              from-red-600
              to-red-700
              hover:from-red-500
              hover:to-red-600
              text-white
              font-semibold
              shadow-lg
              shadow-red-900/30
              transition-all
              duration-300
              hover:scale-105
            "
          >
            🚪
            <span>Sign Out</span>
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;