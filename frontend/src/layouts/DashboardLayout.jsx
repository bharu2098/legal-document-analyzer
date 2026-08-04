import Sidebar from "../components/dashboard/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;