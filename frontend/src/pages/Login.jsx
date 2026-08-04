import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

import { loginUser } from "../api/auth";

import AuthLayout from "../components/auth/AuthLayout";
import AuthHeader from "../components/auth/AuthHeader";
import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import AuthButton from "../components/auth/AuthButton";
import Divider from "../components/auth/Divider";
import GoogleButton from "../components/auth/GoogleButton";
import AuthFooter from "../components/auth/AuthFooter";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [remember, setRemember] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>

      <div className="w-full max-w-[620px]">

        <AuthHeader
          subtitle="Securely sign in to analyze your legal documents using AI."
        />

        <AuthCard
          title="Welcome Back"
          subtitle="Sign in to continue"
        >

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <AuthInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              icon={<Mail size={20} />}
            />

            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between">

              <label className="flex items-center gap-3 text-slate-300 text-sm">

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
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Forgot Password?
              </button>

            </div>

            <AuthButton
              loading={loading}
              loadingText="Signing In..."
            >
              Sign In
            </AuthButton>

            <Divider />

            <GoogleButton />

            <div className="text-center">

              <span className="text-slate-400">
                Don't have an account?{" "}
              </span>

              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Create Account
              </Link>

            </div>

          </form>

        </AuthCard>

        <AuthFooter />

      </div>

    </AuthLayout>
  );
}

export default Login;