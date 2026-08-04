import { Scale } from "lucide-react";

function AuthHeader({ subtitle }) {
  return (
    <div className="text-center mb-12">

      {/* Logo */}

      <div
        className="
          mx-auto
          w-20
          h-20
          rounded-2xl
          border
          border-blue-500/20
          bg-[#0F2136]
          flex
          items-center
          justify-center
          shadow-[0_0_35px_rgba(37,99,235,0.15)]
        "
      >
        <Scale
          size={36}
          strokeWidth={2}
          className="text-blue-500"
        />
      </div>

      {/* Main Title */}

      <h1
        className="
          mt-8
          text-[56px]
          font-extrabold
          tracking-[-1px]
          leading-none
          whitespace-nowrap
        "
      >
        <span className="text-blue-500">
          AI Legal
        </span>{" "}

        <span className="text-white">
          Document Analyzer
        </span>
      </h1>

      {/* Subtitle */}

      <p
        className="
          mt-5
          text-[22px]
          text-slate-400
          font-normal
        "
      >
        {subtitle}
      </p>

    </div>
  );
}

export default AuthHeader;