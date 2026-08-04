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
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm text-gray-300">
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
          rounded-lg
          border
          border-slate-600
          bg-slate-800
          px-4
          py-3
          text-white
          outline-none
          focus:border-blue-500
        "
      />

      {error && (
        <span className="text-sm text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;