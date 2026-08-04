import { FiLogOut } from "react-icons/fi";

import useAuth from "../../hooks/useAuth";
import UploadButton from "./UploadButton";
import DocumentList from "./DocumentList";

function Sidebar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <aside className="flex h-screen w-80 flex-col border-r border-slate-800 bg-slate-950">

      {/* ================= Logo ================= */}

      <div className="border-b border-slate-800 px-6 py-6">

        <h1 className="text-3xl font-bold tracking-tight text-white">
          AI Legal
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Document Analyzer
        </p>

      </div>

      {/* ================= Upload ================= */}

      <div className="border-b border-slate-800 px-6 py-5">

        <UploadButton />

      </div>

      {/* ================= Documents ================= */}

      <div className="flex flex-1 flex-col overflow-hidden px-6 py-5">

        <h2 className="mb-4 flex-shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Uploaded Documents
        </h2>

        <div className="flex-1 overflow-hidden">

          <DocumentList />

        </div>

      </div>

      {/* ================= User ================= */}

      <div className="border-t border-slate-800 bg-slate-900 p-6">

        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-lg">

            {user?.username?.charAt(0).toUpperCase()}

          </div>

          <div className="min-w-0 flex-1">

            <p className="truncate font-semibold text-white">
              {user?.username}
            </p>

            <p
              className="truncate text-xs text-slate-400"
              title={user?.email}
            >
              {user?.email}
            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 font-medium text-white transition-all duration-200 hover:bg-red-600"
        >
          <FiLogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;