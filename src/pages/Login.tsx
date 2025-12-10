import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { LoginSchema, type LoginForm } from "../validation/authSchemas";
import { loginUser, type ApiResponse } from "../api/auth";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // ✅ Zod validation (from separate file)
    const result = LoginSchema.safeParse(form);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      const message = firstIssue.message || "Invalid form data";

      setError(message);
      toast.success(message);
      return;
    }

    setLoading(true);

    try {
      // ✅ API call (from separate file)
      const { data, status, ok } = await loginUser({
        email: form.email,
        password: form.password,
      });

      console.log("Login API response:", data);

      if (!ok) {
        let message = data?.message || "Login failed";

        if (status === 404) {
          message = "User not found (please signup first)";
        } else if (status === 401) {
          message = "Invalid email or password";
        }

        setError(message);
        toast.success(message);
        return;
      }

      if (!data || data.success === false || !data.token) {
        const message = data?.message || "Invalid email or password (from API)";
        setError(message);
        toast.error(message);
        return;
      }

      // ✅ Save token & user
      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      toast.success("Login successful!");
      navigate("/");
    } catch (err: Error | unknown) {
      console.error("Login error:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again later.";
      setError(errorMessage);
      toast.error(errorMessage);
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
                    alt="Patel Heater Control Pvt Ltd"
                  />
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
                        name="email"
                        placeholder="Enter your email address"
                        value={form.email}
                        onChange={handleChange}
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
                        onChange={handleChange}
                        placeholder="**********"
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

                  {/* {error && (
                    <p
                      style={{ color: "blue", fontSize: 13 }}
                      className="mb-2 text-center"
                    >
                      {error}
                    </p>
                  )} */}

                  <p className="text-center text-md-end mb-5 ">
                    <Link to="/forgotpassword" className="forgot-link">
                      Forgot Password?
                    </Link>
                  </p>

                  <button
                    type="submit"
                    className="btn btn-primary btn-login w-100 mb-4"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>

                  <p className="text-center mb-3 fw-medium">
                    Don't have an account?
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
