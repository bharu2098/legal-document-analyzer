import RegisterForm from "../components/auth/RegisterForm";

function Register() {
  return (
    <div className="min-h-screen bg-[#07182b] flex flex-col lg:flex-row overflow-hidden">

      {/* ================= LEFT SECTION ================= */}

      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#081624] via-[#0b2238] to-[#102d47]">

        {/* Background Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-center px-20">

          <span className="inline-flex items-center w-fit px-4 py-2 mb-8 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 font-medium">
            🚀 Start Your AI Legal Journey
          </span>

          <h1 className="text-6xl font-extrabold leading-tight text-white">

            Create Your

            <br />

            <span className="text-blue-500">
              Account
            </span>

          </h1>

          <p className="mt-8 text-xl leading-9 text-slate-300 max-w-xl">

            Join AI Legal Document Analyzer and securely upload,
            analyze, search, and chat with your legal documents.

            <br />
            <br />

            Experience AI-powered legal insights, intelligent
            document summarization, clause extraction, and
            secure document management in one platform.

          </p>

          {/* Features */}

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-4 text-slate-300">

              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-xl">
                📄
              </div>

              <span>Upload & Organize Legal Documents</span>

            </div>

            <div className="flex items-center gap-4 text-slate-300">

              <div className="w-11 h-11 rounded-xl bg-green-600 flex items-center justify-center text-xl">
                🤖
              </div>

              <span>AI-Powered Legal Analysis & Chat</span>

            </div>

            <div className="flex items-center gap-4 text-slate-300">

              <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center text-xl">
                🔐
              </div>

              <span>Secure Cloud Storage & Authentication</span>

            </div>

          </div>

        </div>

      </div>

      {/* ================= RIGHT SECTION ================= */}

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-[#07182b]">

        <RegisterForm />

      </div>

    </div>
  );
}

export default Register;