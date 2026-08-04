function AuthLayout({ children }) {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#071321]
        flex
        items-center
        justify-center
        px-6
        py-16
      "
    >
      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#071321] via-[#0B1626] to-[#0A1322]" />

      {/* Left Glow */}

      <div
        className="
          absolute
          -top-60
          -left-60
          h-[700px]
          w-[700px]
          rounded-full
          bg-blue-600/10
          blur-[170px]
        "
      />

      {/* Right Glow */}

      <div
        className="
          absolute
          -bottom-60
          -right-60
          h-[700px]
          w-[700px]
          rounded-full
          bg-cyan-500/5
          blur-[180px]
        "
      />

      {/* Top Glow */}

      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          h-[400px]
          w-[600px]
          rounded-full
          bg-blue-500/5
          blur-[140px]
        "
      />

      {/* Content */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-[1280px]
          flex
          justify-center
        "
      >
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;