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
    <div className="w-full max-w-[420px] rounded-3xl bg-[#102944] p-10 shadow-2xl">

      <h1 className="text-center text-5xl font-bold text-blue-500">
        AI Legal
      </h1>

      <h2 className="mt-6 text-center text-3xl font-semibold text-white">
        Create Account
      </h2>

      <p className="mt-3 mb-8 text-center text-slate-400">
        Register to continue
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-0"
      >

        <Input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <Input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <div className="pt-2">
          <Button
            type="submit"
            fullWidth
            size="lg"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>
        </div>

      </form>

      <div className="mt-8 text-center">

        <p className="text-slate-400">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 font-semibold text-blue-500 hover:text-blue-400"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default RegisterForm;