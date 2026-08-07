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
          rounded-2xl
          border
          border-slate-700
          bg-[#1a3148]
          px-5
          text-[15px]
          text-white
          placeholder:text-slate-500
          outline-none
          transition-all
          duration-200
          hover:border-slate-500
          hover:bg-[#20384f]
          focus:border-blue-500
          focus:bg-[#20384f]
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