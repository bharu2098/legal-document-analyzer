import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { registerUser } from "../api/auth";

import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
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

    <AuthLayout
      subtitle="Create your secure AI Legal account."
      heading="Create Account"
      description="Register to continue"
      footer="Secure AI-powered authentication"
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
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
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          autoComplete="email"
          icon={<Mail size={20} />}
        />

        <AuthInput
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a secure password"
          autoComplete="new-password"
          icon={<Lock size={20} />}
          rightIcon={
            showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )
          }
          onRightIconClick={() =>
            setShowPassword(!showPassword)
          }
        />

        <AuthButton
          loading={loading}
          loadingText="Creating Account..."
        >
          Create Account
        </AuthButton>

        {/* Divider */}

        <div className="flex items-center gap-5">

          <div className="flex-1 h-px bg-slate-700"></div>

          <span className="text-slate-500 text-sm uppercase tracking-widest">
            OR
          </span>

          <div className="flex-1 h-px bg-slate-700"></div>

        </div>

        {/* Google Button */}

        <button
          type="button"
          className="
            w-full
            h-14
            rounded-xl
            border
            border-slate-700
            bg-[#1D2A3A]
            hover:bg-[#243447]
            transition-all
            duration-300
            flex
            items-center
            justify-center
            gap-3
            text-white
            font-medium
          "
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />

          Continue with Google
        </button>
                {/* Login */}

        <div className="text-center pt-3">

          <p className="text-slate-400">

            Already have an account?{" "}

            <Link
              to="/login"
              className="
                text-blue-500
                hover:text-blue-400
                font-semibold
              "
            >
              Sign In
            </Link>

          </p>

        </div>

      </form>

    </AuthLayout>

  );
}

export default Register;