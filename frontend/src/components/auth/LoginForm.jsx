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
    <div className="w-full max-w-md">

      <div className="bg-[#102944] rounded-3xl shadow-2xl p-10">

        <h1 className="text-5xl font-bold text-center text-blue-500">
          AI Legal
        </h1>

        <h2 className="text-3xl font-semibold text-center text-white mt-6">
          Welcome Back 👋
        </h2>

        <p className="text-center text-slate-400 mt-3 mb-10">
          Login to continue
        </p>

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
            fullWidth
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-center text-slate-400 pt-2">
            Don't have an account?

            <Link
              to="/register"
              className="ml-2 text-blue-500 font-semibold hover:text-blue-400"
            >
              Register
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default LoginForm;