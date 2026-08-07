import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import Input from "../ui/Input";

import { loginUser } from "../../services/auth";
import useAuth from "../../hooks/useAuth";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      setLoading(true);

      const data = await loginUser(formData);

      login(data.user, data.access_token);

      alert("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-3xl bg-[#102944] p-12 shadow-2xl">

      {/* Logo */}

      <h1 className="text-center text-5xl font-bold text-blue-500">
        AI Legal
      </h1>

      {/* Heading */}

      <h2 className="mt-6 text-center text-4xl font-semibold text-white">
        Welcome Back 👋
      </h2>

      <p className="mt-3 mb-10 text-center text-slate-400">
        Login to continue
      </p>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

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

        <Button
          type="submit"
          size="lg"
          fullWidth
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

      </form>

      {/* Footer */}

      <div className="mt-10 text-center">

        <p className="text-slate-400">
          Don't have an account?

          <Link
            to="/register"
            className="ml-2 font-semibold text-blue-500 transition hover:text-blue-400"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default LoginForm;