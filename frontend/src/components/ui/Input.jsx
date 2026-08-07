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
    <div className="space-y-2">

      {label && (
        <label className="block text-sm font-semibold text-slate-300">
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
          rounded-2xl
          border
          border-slate-700
          bg-[#19324a]
          px-5
          py-4
          text-white
          placeholder:text-slate-500
          outline-none
          transition-all
          duration-300
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/20
          hover:border-slate-500
        "
      />

      {error && (
        <p className="text-sm text-red-400 font-medium">
          {error}
        </p>
      )}

    </div>
  );
}

export default Input;