function AuthInput({
  label,
  icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
}) {
  return (
    <div className="space-y-3">

      {/* Label */}

      <label
        className="
          block
          text-[15px]
          font-medium
          text-slate-300
        "
      >
        {label}
      </label>

      {/* Input */}

      <div className="relative">

        {/* Left Icon */}

        <div
          className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-slate-500
            pointer-events-none
          "
        >
          {icon}
        </div>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="
            w-full
            h-[54px]
            rounded-[22px]
            border
            border-slate-700
            bg-[#10213A]
            pl-14
            pr-5
            text-[16px]
            text-white
            placeholder:text-slate-500
            outline-none
            transition-all
            duration-300

            focus:border-blue-400
            focus:ring-2
            focus:ring-blue-500/20

            hover:border-slate-500
          "
        />

      </div>

    </div>
  );
}

export default AuthInput;