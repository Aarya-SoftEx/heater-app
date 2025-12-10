import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
    <main className="main d-flex align-items-center flex-column justify-content-center vh-100 py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 col-xl-6 d-none d-lg-block position-relative">
            <h2 className="login-title">
              <span className="fw-semibold">Reliable Heat Solutions,</span>{" "}
              <br />
              Every Time.
            </h2>
            <div className="login-img">
              <img
                src="/assets/images/login-img.png"
                alt="Heater"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-xl-1 d-none d-xl-block"></div>
          <div className="col-lg-6 col-xl-5">
            <div className="login-form">
              <div className="scrollable-content">
                <div className="text-center">
                  <img
                    className="mb-40"
                    src="/assets/images/logo.svg"
                    alt="Patel Heater Contorl Pvt Ltd"
                  />
                  {/* <h4 className="login-subtitle">Login</h4> */}
                </div>
                <form onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="mb-4">
                    <label className="form-label">Email</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-envelope-fill"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email address"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label">Password</label>

                    <div className="input-group password-field">
                      <span className="input-group-text">
                        <i className="bi bi-lock-fill"></i>
                      </span>

                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="currentPassword"
                        name="password"
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        placeholder="**********"
                        required
                      />

                      <span
                        className="input-group-text field-icon toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? (
                          <i className="bi bi-eye-fill"></i>
                        ) : (
                          <i className="bi bi-eye-slash-fill"></i>
                        )}
                      </span>
                    </div>
                  </div>

                  {error && (
                    <p
                      style={{ color: "red", fontSize: 13 }}
                      className="mb-2 text-center"
                    >
                      {error}
                    </p>
                  )}

                  {/* Forgot Password Link */}
                  <p className="text-center text-md-end mb-5 ">
                    <Link to="/forgot-password" className="forgot-link">
                      Forgot Password?
                    </Link>
                  </p>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-login w-100 mb-4"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>

                  {/* Signup Link */}
                  <p className="text-center mb-3 fw-medium">
                    Don't have an account?{" "}
                  </p>
                  <Link
                    to="/signup"
                    className="btn btn-outline-secondary btn-signup fw-normal w-100"
                  >
                    Create Account
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
