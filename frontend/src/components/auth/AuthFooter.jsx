import { ShieldCheck } from "lucide-react";

function AuthFooter() {
  return (
    <div className="mt-8 flex justify-center">

      <div
        className="
          flex
          items-center
          gap-2
          text-slate-500
          text-sm
          font-medium
        "
      >
        <ShieldCheck
          size={16}
          className="text-blue-400"
        />

        <span>
          Your data is protected with enterprise-grade security
        </span>

      </div>

    </div>
  );
}

export default AuthFooter;