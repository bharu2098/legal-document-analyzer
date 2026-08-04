import { ArrowRight } from "lucide-react";

function AuthButton({ children, loading, loadingText, type = "submit" }) {
  return (
    <button
      type={type}
      disabled={loading}
      className="
        w-full
        h-[56px]
        rounded-[24px]
        bg-gradient-to-r
        from-[#2563EB]
        via-[#3B82F6]
        to-[#2563EB]
        text-white
        font-semibold
        text-[17px]
        border
        border-blue-400/20
        shadow-[0_16px_40px_rgba(37,99,235,0.3)]
        transition-all
        duration-300
        hover:scale-[1.01]
        hover:shadow-[0_20px_50px_rgba(37,99,235,0.4)]
        hover:brightness-110
        active:scale-[0.98]
        disabled:opacity-60
        disabled:cursor-not-allowed
        flex
        items-center
        justify-center
        gap-3
      "
    >
      {loading ? (
        loadingText
      ) : (
        <>
          <span>{children}</span>
          <ArrowRight size={19} strokeWidth={2.5} />
        </>
      )}
    </button>
  );
}

export default AuthButton;