import { useNavigate } from "react-router-dom";

const items = [
  { label: "Chat", icon: "💬" },
  { label: "Documents", icon: "📁" },
  { label: "Analytics", icon: "📊" },
  { label: "Templates", icon: "📄" },
  { label: "Saved Prompts", icon: "⭐" },
  { label: "Settings", icon: "⚙️" },
];

function SideNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to sign out?");
    if (!confirmLogout) return;
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-72 bg-[#0B1120] border-r border-slate-800 flex flex-col py-8 px-5 text-slate-200">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl shadow-lg shadow-blue-500/20">
          ⚖️
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">AI Legal</h1>
          <p className="text-sm text-slate-400">Document Analyzer</p>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {items.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-slate-900"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto rounded-3xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">
        <p className="font-semibold text-white mb-2">Pro Plan</p>
        <p className="mb-4 text-xs text-slate-500">Unlock more features with Pro Plan.</p>
        <button className="w-full rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">
          Upgrade Plan
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 flex items-center gap-2 rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200 hover:border-red-500 hover:text-white"
      >
        🚪 Logout
      </button>
    </nav>
  );
}

export default SideNav;
