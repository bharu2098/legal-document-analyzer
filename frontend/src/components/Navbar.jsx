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
    <header className="h-24 bg-[#0B1120] border-b border-slate-800 shadow-xl">
      <div className="h-full px-8 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 flex items-center justify-center shadow-xl">
            <span className="text-4xl">⚖️</span>
          </div>

          <div>

            <h1 className="text-4xl font-bold tracking-tight text-white">
              AI Legal Document Analyzer
            </h1>

            <p className="text-slate-400 text-lg mt-1">
              Intelligent Legal Document Analysis using AI
            </p>

          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-8">

          <div className="text-right">

            <p className="text-white text-xl font-semibold">
              Welcome
            </p>

            <p className="text-slate-400">
              Secure Workspace
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-3
              px-8
              py-4
              rounded-2xl
              border
              border-red-500/40
              bg-gradient-to-r
              from-red-900/40
              via-red-700/40
              to-red-600/40
              hover:from-red-700
              hover:to-red-600
              text-white
              font-semibold
              text-lg
              transition-all
              duration-300
              hover:scale-105
              shadow-xl
            "
          >
            <span className="text-xl">🚪</span>
            Sign Out
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;