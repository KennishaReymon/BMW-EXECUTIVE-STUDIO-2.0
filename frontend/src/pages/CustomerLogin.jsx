
import { useState } from "react";
import "./CustomerLogin.css";

export default function CustomerLogin({
  onBackHome,
  onCreateAccount,
  onLoginSuccess,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://bmw-executive-studio-api.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      sessionStorage.setItem("bmwToken", data.token);

setMessage(`Welcome back, ${data.user.name}!`);

if (onLoginSuccess) {
  onLoginSuccess(data.user);
}
    } catch (error) {
      setMessage(error.message || "Unable to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="customer-login-page">
      <section className="customer-login-card">

        {/* BACK TO HOMEPAGE */}
        <button
          type="button"
          className="customer-back-home"
          onClick={onBackHome}
        >
          ← BACK TO HOMEPAGE
        </button>

        <p className="customer-login-eyebrow">
          BMW EXECUTIVE STUDIO
        </p>

        <h1>Welcome Back</h1>
        <p>Your BMW experience begins here.</p>

        <form onSubmit={handleLogin}>
          <label htmlFor="customer-email">
            Email Address
          </label>
          <input
            id="customer-email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="customer-password">
            Password
          </label>
          <input
            id="customer-password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>

        {message && (
          <p role="status">{message}</p>
        )}

        <p className="customer-register-text">
          New to BMW Executive Studio?
          <button
            type="button"
            onClick={onCreateAccount}
          >
            Create Account
          </button>
        </p>

      </section>
    </main>
  );
}
