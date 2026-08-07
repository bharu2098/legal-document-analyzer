import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import Input from "../ui/Input";

import { registerUser } from "../../services/auth";

function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration successful!");

      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg">

      <div className="bg-[#102944]/95 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl shadow-blue-900/20 p-10">

        {/* Logo */}

        <div className="flex justify-center mb-6">

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-4xl shadow-lg">

            🚀

          </div>

        </div>

        {/* Heading */}

        <h1 className="text-4xl font-bold text-center text-white">

          Create Account

        </h1>

        <p className="text-center text-slate-400 mt-3 mb-10">

          Join

          <span className="text-blue-400 font-semibold">
            {" "}AI Legal Document Analyzer
          </span>

          <br />

          and start analyzing legal documents.

        </p>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-7"
        >

          <Input
            label="Username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            size="lg"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </Button>

        </form>

        {/* Divider */}

        <div className="flex items-center my-8">

          <div className="flex-1 h-px bg-slate-700"></div>

          <span className="px-4 text-slate-500 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-slate-700"></div>

        </div>

        {/* Footer */}

        <p className="text-center text-slate-400">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default RegisterForm;