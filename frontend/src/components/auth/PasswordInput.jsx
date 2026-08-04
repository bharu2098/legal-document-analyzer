import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

function PasswordInput({
  label = "Password",
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-6">

      {/* Label */}

      <label
        className="
          block
          text-sm
          font-medium
          text-slate-300
          mb-3
        "
      >
        {label}
      </label>

      <div className="relative">

        {/* Lock Icon */}

        <div
          className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-slate-500
          "
        >
          <Lock size={20} />
        </div>

        {/* Input */}

        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="
            w-full
            h-[58px]
            rounded-xl
            border
            border-slate-700
            bg-[#111C2B]
            pl-14
            pr-14
            text-white
            placeholder:text-slate-500
            text-base
            outline-none
            transition-all
            duration-300
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-500/10
          "
        />

        {/* Show / Hide */}

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute
            right-5
            top-1/2
            -translate-y-1/2
            text-slate-500
            hover:text-white
            transition-colors
          "
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>

      </div>

    </div>
  );
}

export default PasswordInput;