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
    <div className="w-full max-w-md bg-[#10253b] rounded-3xl shadow-2xl p-10">

      <h1 className="text-5xl font-bold text-center text-blue-500">
        AI Legal
      </h1>

      <h2 className="text-4xl font-semibold text-center text-white mt-6">
        Create Account 🚀
      </h2>

      <p className="text-center text-gray-400 mt-3 mb-10">
        Register to continue
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
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

        <Button
          type="submit"
          fullWidth
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </Button>

        <p className="text-center text-gray-400">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-blue-500 font-semibold hover:text-blue-400"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default RegisterForm;