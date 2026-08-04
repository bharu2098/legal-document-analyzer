import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <h1 className="text-5xl font-bold text-white leading-tight">
          AI Legal
          <br />
          Document Analyzer
        </h1>

        <p className="mt-6 text-lg text-gray-300 leading-8">
          Analyze contracts, agreements, and legal documents using
          AI-powered insights.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;