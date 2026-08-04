import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-gray-400">Page Not Found</p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;