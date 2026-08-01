import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="h-16 bg-slate-900 text-white flex items-center justify-between px-6 shadow-md">
      <h1 className="text-2xl font-bold">
        ⚖️ Legal Document Analyzer
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;