import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <div className="min-h-screen flex bg-[#07182b]">

      {/* Left Section */}

      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-[#0b1f35] px-20">

        <div className="max-w-xl">

          <h1 className="text-6xl font-bold leading-tight text-white">
            AI Legal
            <br />
            <span className="text-blue-500">
              Document Analyzer
            </span>
          </h1>

          <p className="mt-8 text-lg leading-8 text-slate-300">
            Analyze contracts, agreements and legal documents
            using AI-powered insights.

            <br />
            <br />

            Upload your files, chat with AI, generate legal
            insights and simplify complex legal text instantly.
          </p>

        </div>

      </div>

      {/* Right Section */}

      <div className="flex w-full lg:w-1/2 items-center justify-center bg-[#07182b] px-10">

        <LoginForm />

      </div>

    </div>
  );
}

export default Login;