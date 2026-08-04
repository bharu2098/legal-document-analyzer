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
    <header className="h-20 bg-[#0B1120] border-b border-slate-800 shadow-xl">
      <div className="h-full px-8 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-[24px] bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 flex items-center justify-center shadow-xl shadow-amber-500/30">
            <span className="text-3xl">⚖️</span>
          </div>

          <div>

            <h1 className="text-4xl font-bold tracking-tight text-white">
              AI Document Analyzer
            </h1>

            <p className="text-slate-400 text-lg mt-1">
              Intelligent document analysis using AI
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
              px-6
              py-3
              rounded-3xl
              border
              border-red-500/30
              bg-gradient-to-r
              from-red-700/80
              to-red-600/80
              hover:from-red-600
              hover:to-red-500
              text-white
              font-semibold
              text-base
              transition-all
              duration-300
              hover:scale-105
              shadow-lg
            "
          >
            <span className="text-lg">🚪</span>
            Sign Out
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;