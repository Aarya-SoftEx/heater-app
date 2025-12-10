import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://overdecorative-noncosmically-lucile.ngrok-free.dev/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      let data = null;
      try {
        data = await res.json();
      } catch (err) {
        console.error("Failed to parse JSON:", err);
      }

      console.log("Login API response:", data);

   
      if (!res.ok) {
        let message = (data && data.message) || "Login failed";

        if (res.status === 404) {
          message = "User not found (please signup first)";
        } else if (res.status === 401) {
          message = "Invalid email or password";
        }

        setError(message);
        return;
      }

      if (!data || data.success === false || !data.token) {
        const message =
          (data && data.message) || "Invalid email or password (from API)";
        setError(message);
        return;
      }

      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      alert("Login successful!");

      navigate("/"); 
    } catch (err) {
      console.error("Login error:", err);
      const message =
        err.message || "Something went wrong. Please try again later.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main d-flex align-items-center flex-column justify-content-center min-vh-100 py-5 login-bg">
      <h2 className="mb-4">LOGIN PAGE</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          width: "350px",
          background: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0px 0px 8px rgba(0,0,0,.2)",
        }}
      >
        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Error message */}
        {error && (
          <p
            style={{ color: "red", fontSize: 13 }}
            className="mb-2 text-center"
          >
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-100 mt-3"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Link */}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/signup" style={{ fontWeight: "bold" }}>
            Create Account
          </Link>
        </p>

        {/* Forgot Password Link */}
        <p className="text-center">
          <Link
            to="/forgot-password"
            style={{ color: "#555", fontSize: "14px" }}
          >
            Forgot Password?
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
