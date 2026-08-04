function AuthLayout({ children }) {
  return (
    <div
      className="
        min-h-screen
        bg-[#081321]
        relative
        overflow-hidden
        flex
        items-center
        justify-center
        px-6
        py-10
      "
    >
      {/* Left Glow */}

      <div
        className="
          absolute
          -top-64
          -left-64
          w-[700px]
          h-[700px]
          rounded-full
          bg-blue-600/10
          blur-[170px]
        "
      />

      {/* Right Glow */}

      <div
        className="
          absolute
          -bottom-64
          -right-64
          w-[700px]
          h-[700px]
          rounded-full
          bg-indigo-600/10
          blur-[170px]
        "
      />

      {/* Center Glow */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[500px]
          h-[500px]
          rounded-full
          bg-blue-500/5
          blur-[150px]
        "
      />

      <div
        className="
          relative
          z-10
          w-full
          max-w-[1200px]
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