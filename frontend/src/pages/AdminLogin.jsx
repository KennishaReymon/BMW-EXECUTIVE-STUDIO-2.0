import "./AdminLogin.css";
import { useState } from "react";

export default function AdminLogin({
  onBackHome,
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

      if (data.user?.role !== "admin") {
        throw new Error("Administrator access only.");
      }

      sessionStorage.setItem("bmwAdminToken", data.token);

      onLoginSuccess(data.user);
    } catch (error) {
      setMessage(error.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <button type="button" onClick={onBackHome}>
          ← BACK TO HOMEPAGE
        </button>

        <p>BMW EXECUTIVE STUDIO</p>
        <h1>Administrator Login</h1>
        <p>Authorized personnel only.</p>

        <form onSubmit={handleLogin}>
          <label htmlFor="admin-email">Email Address</label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "SIGNING IN..." : "ADMIN SIGN IN"}
          </button>
        </form>

        {message && <p role="alert">{message}</p>}
      </section>
    </main>
  );
}
