import { ShieldCheck } from "lucide-react";

function AuthFooter({
  text = "Your data is encrypted and securely protected",
}) {
  return (
    <div className="mt-8 flex flex-col items-center">

      {/* Security Badge */}

      <div
        className="
          inline-flex
          items-center
          gap-3
          rounded-full
          border
          border-emerald-500/20
          bg-emerald-500/10
          px-5
          py-2
        "
      >
        <ShieldCheck
          size={18}
          className="text-emerald-400"
        />

        <span
          className="
            text-sm
            font-medium
            text-emerald-300
          "
        >
          {text}
        </span>
      </div>

      {/* Copyright */}

      <p
        className="
          mt-6
          text-center
          text-sm
          text-slate-500
        "
      >
        © 2026 AI Legal Document Analyzer
      </p>

    </div>
  );
}

export default AuthFooter;