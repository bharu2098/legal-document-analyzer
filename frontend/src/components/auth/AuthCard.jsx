function AuthCard({
  title,
  subtitle,
  children,
}) {
  return (
    <div
      className="
        w-full
        max-w-[620px]
        rounded-[26px]
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        px-10
        py-10
      "
    >
      {/* Card Title */}
      <h2
        className="
          text-center
          text-white
          text-5xl
          font-bold
        "
      >
        {title}
      </h2>

      {/* Card Subtitle */}
      <p
        className="
          mt-3
          mb-10
          text-center
          text-slate-400
          text-xl
        "
      >
        {subtitle}
      </p>

      {/* Form Content */}
      {children}
    </div>
  );
}

export default AuthCard;