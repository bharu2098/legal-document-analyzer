function AuthCard({
  title,
  subtitle,
  children,
}) {
  return (
    <div
      className="
        w-full
        max-w-[560px]
        rounded-[28px]
        border
        border-white/10
        bg-white/[0.045]
        backdrop-blur-2xl
        shadow-[0_30px_80px_rgba(0,0,0,0.45)]
        px-12
        pt-12
        pb-10
      "
    >
      {/* Heading */}

      <h2
        className="
          text-center
          text-white
          text-[48px]
          font-bold
          leading-none
        "
      >
        {title}
      </h2>

      {/* Subtitle */}

      <p
        className="
          mt-4
          mb-12
          text-center
          text-[20px]
          text-slate-400
          font-normal
        "
      >
        {subtitle}
      </p>

      {/* Form */}

      <div className="space-y-7">
        {children}
      </div>
    </div>
  );
}

export default AuthCard;