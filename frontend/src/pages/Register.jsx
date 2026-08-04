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
  });

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
            subtitle="Create your secure AI Legal account and start analyzing documents."
          />
        </div>

        <AuthCard
          title="Create Account"
          subtitle="Register to continue"
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
              placeholder="Create a secure password"
              autoComplete="new-password"
            />

            <AuthButton
              loading={loading}
              loadingText="Creating Account..."
            >
              Create Account
            </AuthButton>

            <Divider />

            <GoogleButton />

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