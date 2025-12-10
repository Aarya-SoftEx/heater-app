import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        firstname: form.firstName,
        lastname: form.lastName,
        email: form.email,
        phone_number: form.phone,
        password: form.password,
        confirmPassword: form.confirmPassword,
      };

      const res = await fetch(
        "https://overdecorative-noncosmically-lucile.ngrok-free.dev/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("Signup response:", data);

      if (!res.ok) {
        // backend se error
        const msg = data.message || "Signup failed";
        setError(msg);
        alert(msg);
        return;
      }

      alert("Signup Successful! Please login with same email & password.");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "Something went wrong");
      alert("Something went wrong. Please try again.");
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
                    <div className="mb-4">
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
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
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
                          required
                        />
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
                          required
                        />
                      </div>
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
                          required
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
                    </div>
                    {error && (
                      <p
                        style={{ color: "red", fontSize: 13 }}
                        className="mb-2 text-center"
                      >
                        {error}
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
