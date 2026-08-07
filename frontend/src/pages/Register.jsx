import RegisterForm from "../components/auth/RegisterForm";

function Register() {
  return (
    <div className="min-h-screen flex bg-[#07182b]">

      {/* ================= LEFT SECTION ================= */}

      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-[#0b1f35] px-20">

        <div className="max-w-xl">

          <h1 className="text-6xl font-bold leading-tight text-white">
            Create Your
            <br />
            <span className="text-blue-500">
              Account
            </span>
          </h1>

          <p className="mt-8 text-lg leading-8 text-slate-300">
            Join AI Legal Document Analyzer and securely upload,
            organize, and chat with your legal documents.

            <br />
            <br />

            Get AI-powered legal insights, summaries,
            clause extraction, semantic search, and AI-powered
            document analysis in one secure platform.
          </p>

        </div>

      </div>

      {/* ================= RIGHT SECTION ================= */}

      <div className="flex w-full lg:w-1/2 items-center justify-center bg-[#07182b] px-8 py-10">

        <div className="w-full max-w-[460px]">

          <RegisterForm />

        </div>

      </div>

    </div>
  );
}

export default Register;