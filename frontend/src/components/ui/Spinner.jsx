function Spinner({ size = 30 }) {
  return (
    <div
      className="animate-spin rounded-full border-4 border-slate-600 border-t-blue-500"
      style={{
        width: size,
        height: size,
      }}
    />
  );
}

export default Spinner;