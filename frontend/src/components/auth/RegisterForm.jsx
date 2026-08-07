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
    <div className="w-full max-w-[430px] min-h-[620px] bg-[#102944] rounded-3xl shadow-2xl px-10 py-12">

      <h1 className="text-[46px] font-bold text-center text-blue-500">
        AI Legal
      </h1>

      <h2 className="mt-5 text-[44px] font-semibold text-center text-white leading-none">
        Create Account
      </h2>

      <p className="mt-2 mb-8 text-center text-lg text-slate-400">
        Register to continue
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-2"
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

      <div className="mt-10 text-center">

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