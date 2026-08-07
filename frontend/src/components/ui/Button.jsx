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
    "rounded-xl font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-slate-700 hover:bg-slate-600 text-white",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",

    success:
      "bg-green-600 hover:bg-green-700 text-white",

    outline:
      "border border-slate-600 bg-transparent text-white hover:bg-slate-800",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm",

    md: "h-12 px-5 text-base",

    lg: "h-12 px-6 text-base",
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