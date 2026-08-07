import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <div className="min-h-screen bg-[#07182b] flex flex-col lg:flex-row">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-20 bg-[#0b1f35]">

        <h1 className="text-6xl font-bold text-white leading-tight">
          AI Legal
          <br />
          <span className="text-blue-500">
            Document Analyzer
          </span>
        </h1>

        <p className="mt-8 text-lg text-slate-300 leading-8 max-w-lg">
          Analyze contracts, agreements, legal documents,
          and generate AI-powered insights instantly.
        </p>

      </div>

      {/* Right Side */}

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">

        <LoginForm />

      </div>

    </div>
  );
}

export default Login;