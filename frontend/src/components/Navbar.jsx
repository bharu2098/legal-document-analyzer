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
    <nav className="h-16 bg-slate-900 text-white shadow-lg border-b border-slate-700">

      <div className="h-full px-6 flex items-center justify-between">

        {/* Logo & Project Name */}
        <div className="flex items-center gap-3">

          <div className="text-3xl">
            ⚖️
          </div>

          <div>

            <h1 className="text-xl md:text-2xl font-bold">
              AI Legal Document Analyzer
            </h1>

            <p className="text-xs text-gray-300">
              Intelligent Legal Document Analysis using AI
            </p>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <div className="hidden md:flex flex-col text-right">

            <span className="text-sm font-medium">
              Welcome
            </span>

            <span className="text-xs text-gray-300">
              Secure Workspace
            </span>

          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-medium transition duration-200 shadow"
          >
            🚪 Sign Out
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;