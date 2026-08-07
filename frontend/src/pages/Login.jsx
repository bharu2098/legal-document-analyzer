import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <div className="min-h-screen flex bg-[#07182b]">

      {/* ================= LEFT SECTION ================= */}

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#081624] via-[#0b2238] to-[#102d47]">

        {/* Background Glow */}

        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-center px-20">

          <span className="inline-flex w-fit items-center rounded-full border border-blue-500/30 bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-400">
            ⚖️ AI Powered Legal Assistant
          </span>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight text-white">
            AI Legal
            <br />
            <span className="text-blue-500">
              Document Analyzer
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-xl leading-9 text-slate-300">
            Analyze contracts, agreements, legal documents and receive
            AI-powered insights instantly.
            <br />
            <br />
            Chat with documents, extract important clauses,
            summarize legal text and simplify complex agreements
            in seconds.
          </p>

          <div className="mt-14 space-y-6">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl">
                📄
              </div>

              <span className="text-lg text-slate-300">
                Upload & Analyze PDF Documents
              </span>

            </div>

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-xl">
                🤖
              </div>

              <span className="text-lg text-slate-300">
                Chat with AI about Legal Documents
              </span>

            </div>

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-xl">
                🔒
              </div>

              <span className="text-lg text-slate-300">
                Secure JWT Authentication
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================= RIGHT SECTION ================= */}

      <div className="flex w-full items-center justify-center bg-[#07182b] px-8 py-10 lg:w-1/2">

        <div className="w-full max-w-[430px]">

          <LoginForm />

        </div>

      </div>

    </div>
  );
}

export default Login;