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

        {/* Lock Icon */}

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
          <Lock size={20} />
        </div>

        <input
          type={showPassword ? "text" : "password"}
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
            pr-14
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

        {/* Eye Button */}

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute
            right-5
            top-1/2
            -translate-y-1/2
            text-slate-500
            hover:text-slate-300
            transition-colors
          "
        >
          {showPassword ? (
            <EyeOff size={19} />
          ) : (
            <Eye size={19} />
          )}
        </button>

      </div>

    </div>
  );
}

export default PasswordInput;