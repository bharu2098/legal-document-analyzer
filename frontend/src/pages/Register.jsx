import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail } from "lucide-react";

import { registerUser } from "../api/auth";

import AuthLayout from "../components/auth/AuthLayout";
import AuthHeader from "../components/auth/AuthHeader";
import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import AuthButton from "../components/auth/AuthButton";
import Divider from "../components/auth/Divider";
import GoogleButton from "../components/auth/GoogleButton";
import AuthFooter from "../components/auth/AuthFooter";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(true);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

    if (!formData.confirmPassword.trim()) {
      alert("Please confirm your password.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy.");
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
    <AuthLayout>
      <div className="w-full max-w-[560px] mx-auto">

        <div className="mb-14">
          <AuthHeader
            subtitle="Create your account to get started."
          />
        </div>

        <AuthCard
          title="Create Account"
          subtitle="Join us to analyze your legal documents."
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <AuthInput
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              autoComplete="username"
              icon={<User size={20} />}
            />

            <AuthInput
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              icon={<Mail size={20} />}
            />

            <PasswordInput
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />

            <label className="flex items-start gap-3 text-[15px] text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={() => setAcceptedTerms(!acceptedTerms)}
                className="mt-1 h-4 w-4 accent-blue-600"
              />

              <span className="text-[15px] text-slate-300 leading-6">
                I agree to the <span className="text-blue-400">Terms of Service</span> and <span className="text-blue-400">Privacy Policy</span>
              </span>
            </label>

            <AuthButton
              loading={loading}
              loadingText="Creating Account..."
            >
              Create Account
            </AuthButton>

            <Divider />

            <GoogleButton label="Sign up with Google" />

            <div className="pt-3 text-center">

              <span className="text-[15px] text-slate-400">
                Already have an account?{" "}
              </span>

              <Link
                to="/login"
                className="
                  font-semibold
                  text-blue-500
                  hover:text-blue-400
                  transition-colors
                "
              >
                Sign In
              </Link>

            </div>

          </form>
        </AuthCard>

        <AuthFooter />

      </div>
    </AuthLayout>
  );
}

export default Register;