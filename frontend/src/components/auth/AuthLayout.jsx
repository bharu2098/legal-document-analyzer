import { Scale, Shield } from "lucide-react";

function AuthLayout({
  title,
  subtitle,
  heading,
  description,
  children,
  footer,
}) {
  return (
    <div className="min-h-screen bg-[#071321] bg-gradient-to-br from-[#071321] via-[#0A1627] to-[#101B2F] flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-[760px]">

        {/* Logo */}

        <div className="flex justify-center">

          <div className="w-20 h-20 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center shadow-xl">

            <Scale
              size={42}
              className="text-blue-500"
            />

          </div>

        </div>

        {/* Title */}

        <div className="mt-7 text-center">

          <h1 className="text-6xl font-extrabold leading-tight">

            <span className="text-blue-500">
              AI Legal
            </span>{" "}

            <span className="text-white">
              Document Analyzer
            </span>

          </h1>

          <p className="mt-4 text-xl text-slate-400">
            {subtitle}
          </p>

        </div>

        {/* Card */}

        <div
          className="
            mt-14
            rounded-[32px]
            bg-[#162233]
            border
            border-slate-700
            px-12
            py-12
            shadow-2xl
          "
        >

          <h2 className="text-center text-white text-5xl font-bold">
            {heading}
          </h2>

          <p className="text-center text-slate-400 text-lg mt-3 mb-10">
            {description}
          </p>

          {children}

        </div>

        {/* Bottom */}

        <div className="mt-8 flex items-center justify-center gap-3 text-slate-500">

          <Shield
            size={18}
            className="text-green-400"
          />

          <span>
            {footer}
          </span>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;