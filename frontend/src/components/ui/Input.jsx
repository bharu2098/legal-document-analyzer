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
        <label className="block text-sm font-medium text-slate-300">
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
          h-12
          rounded-xl
          border
          border-slate-600
          bg-slate-800
          px-4
          text-white
          placeholder:text-slate-400
          outline-none
          transition
          duration-200
          focus:border-blue-500
        "
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}

export default Input;