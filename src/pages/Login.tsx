import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
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

      const data = await res.json();
      console.log("API response:", data);

      if (!res.ok) {
        // backend se error message hua to
        alert(data.message || "Login failed");
        setError(data.message || "Login failed");
        return;
      }

   
      alert("Login successful!");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Something went wrong");
      alert("Something went wrong. Please try again.");
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
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        {error && (
          <p style={{ color: "red", fontSize: 13 }} className="mb-2 text-center">
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
