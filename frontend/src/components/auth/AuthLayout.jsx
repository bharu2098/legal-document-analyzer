function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#071321] flex items-center justify-center px-6 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#071321] via-[#0B1626] to-[#08111F]" />

      <div className="absolute -top-72 -left-72 h-[680px] w-[680px] rounded-full bg-blue-600/15 blur-[180px]" />
      <div className="absolute -bottom-56 -right-56 h-[680px] w-[680px] rounded-full bg-cyan-500/10 blur-[190px]" />
      <div className="absolute top-8 left-1/2 -translate-x-1/2 h-[360px] w-[640px] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-[1200px] flex justify-center">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;