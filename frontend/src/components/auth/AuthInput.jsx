function AuthInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon,
  rightIcon,
  onRightIconClick,
  autoComplete,
}) {
  return (
    <div className="space-y-3">

      <label className="block text-base font-medium text-white">
        {label}
      </label>

      <div className="relative">

        {/* Left Icon */}

        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        {/* Input */}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="
            w-full
            h-14
            rounded-xl
            bg-[#1D2A3A]
            border
            border-slate-700
            text-white
            text-base
            placeholder:text-slate-500
            pl-14
            pr-14
            outline-none
            transition-all
            duration-300
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
            hover:border-slate-500
          "
        />

        {/* Right Icon */}

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2
              text-slate-400
              hover:text-white
              transition
            "
          >
            {rightIcon}
          </button>
        )}

      </div>

    </div>
  );
}

export default AuthInput;