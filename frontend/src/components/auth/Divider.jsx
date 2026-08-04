function Divider() {
  return (
    <div className="my-8 flex items-center">

      <div className="flex-1 h-px bg-slate-700"></div>

      <span
        className="
          mx-5
          text-sm
          uppercase
          tracking-[0.35em]
          text-slate-500
          font-medium
        "
      >
        OR
      </span>

      <div className="flex-1 h-px bg-slate-700"></div>

    </div>
  );
}

export default Divider;