import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Scale,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
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
  const [rememberMe, setRememberMe] = useState(true);

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
    <div className="min-h-screen bg-[#07111F] bg-gradient-to-br from-[#081120] via-[#0B1629] to-[#101B2E] flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-xl">

        {/* Logo */}

        <div className="text-center mb-10">

          <div className="flex justify-center mb-4">

            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">

              <Scale size={34} className="text-blue-500" />

            </div>

          </div>

          <h1 className="text-5xl font-bold">

            <span className="text-blue-500">
              AI Legal
            </span>{" "}

            <span className="text-white">
              Document Analyzer
            </span>

          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Securely sign in to analyze your legal documents using AI.
          </p>

        </div>

        <div className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl shadow-2xl p-10">

          <h2 className="text-4xl font-bold text-center text-white">
            Welcome Back
          </h2>

          <p className="text-center text-slate-400 mt-3 mb-10">
            Sign in to continue
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
                        {/* Email */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-3">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-4
                    rounded-xl
                    bg-[#111C2F]
                    border
                    border-slate-700
                    text-white
                    placeholder:text-slate-500
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/30
                    outline-none
                    transition-all
                  "
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-3">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="
                    w-full
                    pl-12
                    pr-14
                    py-4
                    rounded-xl
                    bg-[#111C2F]
                    border
                    border-slate-700
                    text-white
                    placeholder:text-slate-500
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/30
                    outline-none
                    transition-all
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* Remember */}

            <div className="flex items-center justify-between">

              <label className="flex items-center gap-3 text-slate-300 text-sm">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="accent-blue-600 w-4 h-4"
                />

                Remember me

              </label>

              <button
                type="button"
                className="text-blue-500 hover:text-blue-400 text-sm"
              >
                Forgot password?
              </button>

            </div>
                        {/* Sign In Button */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-4
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-violet-600
                hover:from-blue-500
                hover:via-indigo-500
                hover:to-violet-500
                text-white
                font-semibold
                text-lg
                shadow-xl
                shadow-blue-900/30
                transition-all
                duration-300
                hover:scale-[1.02]
                active:scale-95
                disabled:opacity-60
                disabled:cursor-not-allowed
                disabled:hover:scale-100
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
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            {/* Divider */}

            <div className="flex items-center gap-4">

              <div className="flex-1 h-px bg-slate-700"></div>

              <span className="text-slate-500 text-sm">
                OR
              </span>

              <div className="flex-1 h-px bg-slate-700"></div>

            </div>

            {/* Google Button (UI Only) */}

            <button
              type="button"
              className="
                w-full
                py-4
                rounded-xl
                border
                border-slate-700
                bg-[#111C2F]
                hover:bg-[#18253D]
                text-white
                font-medium
                transition-all
                duration-300
              "
            >
              Continue with Google
            </button>

            {/* Security */}

            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">

              <ShieldCheck
                size={18}
                className="text-green-400"
              />

              <span>
                Secure JWT Authentication
              </span>

            </div>
                      </form>

          {/* Register */}

          <div className="mt-10 text-center">

            <p className="text-slate-400">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="
                  text-blue-500
                  hover:text-blue-400
                  font-semibold
                  transition
                "
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-8 text-center text-slate-500 text-sm">

          <div className="flex items-center justify-center gap-2">

            <ShieldCheck
              size={16}
              className="text-green-400"
            />

            <span>
              Your legal documents are protected with secure JWT authentication.
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;