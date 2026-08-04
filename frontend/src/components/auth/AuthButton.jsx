import { ArrowRight } from "lucide-react";

function AuthButton({
  children,
  loading,
  loadingText,
  type = "submit",
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className="
        w-full
        h-[52px]
        rounded-lg
        bg-gradient-to-r
        from-[#3B82F6]
        to-[#2563EB]
        hover:brightness-110
        text-white
        text-[18px]
        font-semibold
        transition-all
        duration-300
        flex
        items-center
        justify-center
        gap-3
        border
        border-blue-500/30
        disabled:opacity-60
        disabled:cursor-not-allowed
      "
    >
      {loading ? (
        loadingText
      ) : (
        <>
          <ArrowRight size={18} strokeWidth={2.5} />
          <span>{children}</span>
        </>
      )}
    </button>
  );
}

export default AuthButton;