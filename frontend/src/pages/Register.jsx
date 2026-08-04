import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Scale,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { registerUser } from "../api/auth";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      alert("Please enter your username.");
      return;
    }

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

      await registerUser(formData);

      alert("✅ Registration Successful!");

      navigate("/login");

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
            Create your secure AI Legal account.
          </p>

        </div>

        <div className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl shadow-2xl p-10">

          <h2 className="text-4xl font-bold text-center text-white">
            Create Account
          </h2>

          <p className="text-center text-slate-400 mt-3 mb-10">
            Register to start analyzing legal documents
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
                    {/* Username */}

            <div>

              <label className="block text-sm font-medium text-slate-300 mb-3">
                Username
              </label>

              <div className="relative">

                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
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
                  placeholder="Create a secure password"
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>
                        {/* Create Account Button */}

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
                "Creating Account..."
              ) : (
                <>
                  Create Account
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

          {/* Login Link */}

          <div className="mt-10 text-center">

            <p className="text-slate-400">

              Already have an account?{" "}

              <Link
                to="/login"
                className="
                  text-blue-500
                  hover:text-blue-400
                  font-semibold
                  transition
                "
              >
                Sign In
              </Link>

            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-8 text-center">

          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">

            <ShieldCheck
              size={16}
              className="text-green-400"
            />

            <span>
              Your account and legal documents are protected with secure JWT authentication.
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;