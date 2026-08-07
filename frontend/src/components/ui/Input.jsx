function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  error,
}) {
  return (
    <div className="mb-5">

      {label && (
        <label className="block mb-2 text-sm font-medium text-slate-300">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          h-13
          rounded-xl
          border
          border-slate-600
          bg-slate-800
          px-4
          text-white
          placeholder:text-slate-400
          outline-none
          transition-all
          duration-200
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20
        "
      />

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}

export default Input;