
import "./CustomerRegister.css";
import { useState } from "react";

export default function CustomerRegister({ onBackLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const strongPassword = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

    if (!strongPassword.test(password)) {
      setError(
        "Password must contain at least 8 characters, one uppercase letter, and one number."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://bmw-executive-studio-api.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed"
        );
      }

      setSuccess(
        "Account created successfully! You can now sign in."
      );

      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err.message || "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="customer-register-page">
      <section className="customer-register-card">

        <button
          type="button"
          className="register-back-btn"
          onClick={onBackLogin}
        >
          ← BACK TO LOGIN
        </button>

        <p className="register-eyebrow">
          BMW EXECUTIVE STUDIO
        </p>

        <h1>Create Your Account</h1>

        <p className="register-description">
          Your journey into extraordinary driving begins here.
        </p>

        <form onSubmit={handleRegister}>

          <label htmlFor="register-name">
            Full Name
          </label>
          <input
            id="register-name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="register-email">
            Email Address
          </label>
          <input
            id="register-email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="register-password">
            Password
          </label>
          <input
            id="register-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            autoComplete="new-password"
            minLength={8}
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
              setSuccess("");
            }}
          />

          <label htmlFor="register-confirm">
            Confirm Password
          </label>
          <input
            id="register-confirm"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
              setSuccess("");
            }}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              alignSelf: "flex-end",
              background: "transparent",
              border: "none",
              color: "#8cc8ff",
              fontSize: "12px",
              cursor: "pointer",
              padding: "4px 0",
            }}
          >
            {showPassword
              ? "HIDE PASSWORDS"
              : "SHOW PASSWORDS"}
          </button>

          {error && (
            <p
              role="alert"
              style={{
                color: "#ff6b6b",
                fontSize: "13px",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          {success && (
            <p
              role="status"
              style={{
                color: "#57d9a3",
                fontSize: "13px",
                textAlign: "center",
              }}
            >
              {success}
            </p>
          )}

          <button
            type="submit"
            className="register-submit-btn"
            disabled={loading}
          >
            {loading
              ? "CREATING ACCOUNT..."
              : "CREATE ACCOUNT"}
          </button>

        </form>
      </section>
    </main>
  );
}
