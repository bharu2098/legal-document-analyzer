import useAuth from "../../hooks/useAuth";

function Header() {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-6">

      <div>
        <p className="text-sm font-medium text-blue-400">
          Welcome Back 👋
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          {user?.username}
        </h1>

        <p className="mt-2 text-gray-400">
          AI-powered legal document analysis and chat assistant
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
          {user?.username?.charAt(0).toUpperCase()}
        </div>

        <div className="text-right">
          <h2 className="font-semibold text-white">
            {user?.username}
          </h2>

          <p className="text-sm text-gray-400">
            {user?.email}
          </p>
        </div>

      </div>

    </header>
  );
}

export default Header;