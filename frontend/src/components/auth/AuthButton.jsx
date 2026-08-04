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
        h-14
        rounded-xl
        bg-gradient-to-r
        from-blue-600
        via-indigo-600
        to-violet-600
        hover:from-blue-500
        hover:via-indigo-500
        hover:to-violet-500
        text-white
        font-semibold
        text-lg
        shadow-xl
        shadow-blue-900/30
        transition-all
        duration-300
        hover:scale-[1.02]
        active:scale-95
        disabled:opacity-60
        disabled:cursor-not-allowed
        disabled:hover:scale-100
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
          {children}
          <ArrowRight size={20} />
        </>
      )}
    </button>
  );
}

export default AuthButton; 
