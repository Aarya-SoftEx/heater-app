import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
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
  
        <div className="mb-3">
          <label>First Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter first name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Last Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter last name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            required
          />
        </div>

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

       
        <div className="mb-3">
          <label>Phone Number:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
        </div>

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
            required
          />
        </div>

        {error && (
          <p style={{ color: "red", fontSize: 13 }} className="mb-2 text-center">
            {error}
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
