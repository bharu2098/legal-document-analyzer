import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Scale,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
} from "lucide-react";

import { loginUser } from "../api/auth";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!formData.password.trim()) {
      alert("Please enter your password.");
      return;
    }

    setLoading(true);

    try {

      const data = await loginUser(formData);

      localStorage.setItem("token", data.access_token);

      alert("✅ Login Successful!");

      navigate("/dashboard");

    } catch (error) {

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
      min-h-screen
      bg-[#071321]
      flex
      items-center
      justify-center
      px-6
      py-12
      "
    >

      <div className="w-full max-w-[620px]">
                {/* Logo */}

        <div className="flex justify-center mb-6">

          <div
            className="
              w-20
              h-20
              rounded-2xl
              border
              border-blue-500/30
              bg-blue-500/10
              flex
              items-center
              justify-center
              shadow-lg
              shadow-blue-900/20
            "
          >
            <Scale
              size={42}
              className="text-blue-500"
            />
          </div>

        </div>

        {/* Title */}

        <div className="text-center mb-12">

          <h1 className="text-[56px] font-extrabold leading-tight">

            <span className="text-blue-500">
              AI Legal
            </span>{" "}

            <span className="text-white">
              Document Analyzer
            </span>

          </h1>

          <p className="mt-4 text-[22px] text-slate-400">

            Securely sign in to analyze your legal documents using AI.

          </p>

        </div>

        {/* Login Card */}

        <div
          className="
            w-full
            rounded-[28px]
            border
            border-slate-700
            bg-[#182435]
            shadow-2xl
            shadow-black/40
            px-10
            py-10
          "
        >

          <h2 className="text-center text-white text-5xl font-bold">
            Welcome Back
          </h2>

          <p className="text-center text-slate-400 text-xl mt-4 mb-10">
            Sign in to continue
          </p>

          <form
  onSubmit={handleSubmit}
  className="space-y-7"
>
                      {/* Email */}

            <div>

              <label className="block text-white text-lg font-medium mb-3">

                Email

              </label>

              <div className="relative">

                <Mail
                  size={22}
                  className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="
                    w-full
                    h-[60px]
                    rounded-xl
                    bg-[#1F2B3D]
                    border
                    border-slate-600
                    pl-14
                    pr-5
                    text-lg
                    text-white
                    placeholder:text-slate-500
                    outline-none
                    transition-all
                    duration-300
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/30
                  "
                />

              </div>

            </div>
                        {/* Password */}

            <div>

              <label className="block text-white text-lg font-medium mb-3">

                Password

              </label>

              <div className="relative">

                <Lock
                  size={22}
                  className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="
                    w-full
                    h-[60px]
                    rounded-xl
                    bg-[#1F2B3D]
                    border
                    border-slate-600
                    pl-14
                    pr-14
                    text-lg
                    text-white
                    placeholder:text-slate-500
                    outline-none
                    transition-all
                    duration-300
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/30
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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
                  {showPassword ? (
                    <EyeOff size={22} />
                  ) : (
                    <Eye size={22} />
                  )}
                </button>

              </div>

            </div>

            {/* Remember & Forgot */}

            <div className="flex items-center justify-between">

              <label className="flex items-center gap-3 text-slate-300">

                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="w-4 h-4 accent-blue-600"
                />

                Remember me

              </label>

              <button
                type="button"
                className="
                  text-blue-500
                  hover:text-blue-400
                  transition
                "
              >
                Forgot Password?
              </button>

            </div>
                        {/* Sign In Button */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-[60px]
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-violet-600
                hover:from-blue-500
                hover:via-indigo-500
                hover:to-violet-500
                text-white
                text-lg
                font-semibold
                shadow-xl
                shadow-blue-900/30
                transition-all
                duration-300
                hover:scale-[1.02]
                active:scale-95
                disabled:opacity-60
                disabled:cursor-not-allowed
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  Sign In
                  <ArrowRight size={22} />
                </>
              )}
            </button>

            {/* Divider */}

            <div className="flex items-center gap-5">

              <div className="flex-1 h-px bg-slate-700"></div>

              <span className="text-slate-500 uppercase text-sm tracking-wider">
                or
              </span>

              <div className="flex-1 h-px bg-slate-700"></div>

            </div>

            {/* Google Button */}

            <button
              type="button"
              className="
                w-full
                h-[60px]
                rounded-xl
                border
                border-slate-700
                bg-[#1F2B3D]
                hover:bg-[#243247]
                text-white
                text-lg
                font-medium
                transition-all
                duration-300
              "
            >
              Continue with Google
            </button>

          </form>

          {/* Bottom Link */}

          <div className="mt-10 text-center">

            <p className="text-slate-400">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="
                  text-blue-500
                  hover:text-blue-400
                  font-semibold
                "
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-sm">

          <Shield size={16} className="text-green-400" />

          <span>
            Secure AI-powered authentication
          </span>

        </div>

      </div>

    </div>

  );
}

export default Login;