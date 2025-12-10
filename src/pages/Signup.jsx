import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email format"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter (a-z)")
      .regex(/[0-9]/, "Password must contain at least one number (0-9)")
      .regex(/[@#$%^&*]/, "Password must contain at least one special symbol (@ # $ % ^ & *)"),

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
    <main className="main d-flex align-items-center flex-column justify-content-center min-vh-100 py-5 login-bg signup-page">
      <h2 className="mb-4">SIGNUP PAGE</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          width: "400px",
          background: "#fff",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        }}
      >
        {/* First Name */}
        <div className="mb-3">
          <label>First Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter first name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          {errors.firstName && (
            <p style={{ color: "red", fontSize: 13 }}>{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label>Last Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter last name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
          {errors.lastName && (
            <p style={{ color: "red", fontSize: 13 }}>{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: 13 }}>{errors.email}</p>
          )}
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
          />
          {errors.password && (
            <p style={{ color: "red", fontSize: 13 }}>{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label>Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
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
          className="btn btn-success w-100 mt-2"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </main>
  );
};

export default Signup;
