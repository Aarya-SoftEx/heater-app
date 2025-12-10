import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios";
const SignupSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First Name is required")
      .min(2, "First Name must be at least 2 characters"),

    lastName: z
      .string()
      .min(1, "Last Name is required")
      .min(2, "Last Name must be at least 2 characters"),

    email: z.string().min(1, "Email is required").email("Invalid email format"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /[A-Z]/,
        "Password must contain at least one uppercase letter (A-Z)"
      )
      .regex(
        /[a-z]/,
        "Password must contain at least one lowercase letter (a-z)"
      )
      .regex(/[0-9]/, "Password must contain at least one number (0-9)")
      .regex(
        /[@#$%^&*]/,
        "Password must contain at least one special symbol (@ # $ % ^ & *)"
      ),

    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);

    const result = SignupSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];
        fieldErrors[fieldName] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const payload = {
      firstname: form.firstName,
      lastname: form.lastName,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
    };

    try {
      setLoading(true);

      const res = await axios.post(
        "https://overdecorative-noncosmically-lucile.ngrok-free.dev/api/auth/signup",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Signup API response:", res.data);

      alert("Signup Successful! Please login with same email & password.");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      console.log("Signup error response:", error?.response?.data);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try again.";

      setApiError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                    {/* <h4 className="login-subtitle">Sign Up</h4> */}
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-4 mb-4">
                      <div className="col-xl-6">
                        <label className="form-label">First Name</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="bi bi-person-fill"></i>
                          </span>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your first name"
                            value={form.firstName}
                            onChange={(e) =>
                              setForm({ ...form, firstName: e.target.value })
                            }
                          />
                        </div>
                        {errors.firstName && (
                          <p style={{ color: "red", fontSize: 13 }}>
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div className="col-xl-6">
                        <label className="form-label">Last Name</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="bi bi-person-fill"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your last name"
                            value={form.lastName}
                            onChange={(e) =>
                              setForm({ ...form, lastName: e.target.value })
                            }
                          />
                        </div>
                        {errors.lastName && (
                          <p style={{ color: "red", fontSize: 13 }}>
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Email</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-envelope-fill"></i>
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email address "
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                        />
                      </div>
                      {errors.email && (
                        <p style={{ color: "red", fontSize: 13 }}>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Phone Number</label>

                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-telephone-fill"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your phone number"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Password</label>

                      <div className="input-group password-field">
                        <span className="input-group-text">
                          <i className="bi bi-lock-fill"></i>
                        </span>

                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="password"
                          name="password"
                          value={form.password}
                          onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                          }
                          placeholder="Enter Password"
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
                      {errors.password && (
                        <p style={{ color: "red", fontSize: 13 }}>
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Confirm Password</label>

                      <div className="input-group password-field">
                        <span className="input-group-text">
                          <i className="bi bi-lock-fill"></i>
                        </span>

                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={form.confirmPassword}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              confirmPassword: e.target.value,
                            })
                          }
                          placeholder="Enter Confirm password"
                        />

                        <span
                          className="input-group-text field-icon toggle-password"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {showConfirmPassword ? (
                            <i className="bi bi-eye-fill"></i>
                          ) : (
                            <i className="bi bi-eye-slash-fill"></i>
                          )}
                        </span>
                      </div>
                      {errors.confirmPassword && (
                        <p style={{ color: "red", fontSize: 13 }}>
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                    {apiError && (
                      <p
                        style={{ color: "red", fontSize: 13 }}
                        className="mb-2 text-center"
                      >
                        {apiError}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary btn-signup w-100 mb-4"
                      disabled={loading}
                    >
                      {loading ? "Signing up..." : "Signup"}
                    </button>

                    <p className="text-center fw-medium">
                      Already have an account?{" "}
                      <Link to="/login" className="text-secondary fw-bold">
                        Login
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
