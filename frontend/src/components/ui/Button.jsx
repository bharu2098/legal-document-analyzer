function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
}) {

  const baseStyle =
    "rounded-2xl font-semibold transition-all duration-300 ease-in-out cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variants = {

    primary:
      "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-900/30",

    secondary:
      "bg-slate-700 hover:bg-slate-600 text-white",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",

    success:
      "bg-green-600 hover:bg-green-700 text-white",

    outline:
      "border border-slate-600 text-white hover:bg-slate-800",

  };

  const sizes = {

    sm: "px-4 py-2 text-sm",

    md: "px-6 py-3.5 text-base",

    lg: "px-6 py-4 text-lg",

  };

  return (

    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseStyle}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
      `}
    >

      {children}

    </button>

  );

}

export default Button;