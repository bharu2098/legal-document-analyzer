import { Scale } from "lucide-react";

function AuthHeader({
  subtitle,
}) {
  return (
    <div className="text-center mb-10">

      {/* Logo */}
      <div
        className="
          w-20
          h-20
          mx-auto
          rounded-2xl
          border
          border-blue-500/20
          bg-[#0F2237]
          flex
          items-center
          justify-center
          shadow-lg
          shadow-blue-900/20
        "
      >
        <Scale
          size={38}
          className="text-blue-500"
          strokeWidth={2}
        />
      </div>

      {/* Heading */}
      <h1
        className="
          mt-8
          text-5xl
          font-extrabold
          leading-tight
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
          mt-4
          text-xl
          text-slate-400
        "
      >
        {subtitle}
      </p>

    </div>
  );
}

export default AuthHeader;