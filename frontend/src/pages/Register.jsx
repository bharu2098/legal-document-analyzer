import RegisterForm from "../components/auth/RegisterForm";

function Register() {
  return (
    <div className="min-h-screen flex bg-[#07182b]">

      {/* ================= LEFT SECTION ================= */}

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#081624] via-[#0b2238] to-[#102d47]">

        {/* Background Glow */}

        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-center px-20">

          <span className="inline-flex w-fit items-center rounded-full border border-blue-500/30 bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-400">
            🚀 AI Legal Platform
          </span>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight text-white">
            Create Your
            <br />
            <span className="text-blue-500">
              Account
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-xl leading-9 text-slate-300">
            Join AI Legal Document Analyzer and securely upload,
            analyze, and chat with your legal documents using
            AI-powered insights.
          </p>

        </div>

      </div>

      {/* ================= RIGHT SECTION ================= */}

      <div className="flex w-full items-center justify-center bg-[#07182b] px-8 py-10 lg:w-1/2">

        <div className="w-full max-w-[430px]">

          <RegisterForm />

        </div>

      </div>

    </div>
  );
}

export default Register;