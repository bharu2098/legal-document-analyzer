function AuthCard({
  title,
  subtitle,
  children,
}) {
  return (
    <div
      className="
        w-full
        max-w-[520px]
        rounded-[32px]
        border
        border-white/15
        bg-white/10
        backdrop-blur-3xl
        shadow-[0_35px_90px_rgba(0,0,0,0.45)]
        px-10
        py-10
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
          mb-10
          text-center
          text-[18px]
          text-slate-400
          font-normal
          max-w-[430px]
          mx-auto
        "
      >
        {subtitle}
      </p>

      {/* Form */}

      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}

export default AuthCard;