"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      // Store session token for future authenticated requests
      localStorage.setItem("sams_token", data.data.session.access_token);
      localStorage.setItem("sams_user", JSON.stringify(data.data.user));

      // Redirect based on role
      const role = data.data.user.role;
      if (role === "student") router.push("/student");
      else if (role === "lecturer") router.push("/lecturer");
      else router.push("/");
    } catch (err) {
      setErrorMsg("Could not connect to server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-hero" style={{ backgroundImage: "url('/images/hero-usjhd.png')" }}>
        <div className="auth-hero-overlay" />
        <div className="auth-hero-content">
          <Link href="/" className="logo-text" style={{ color: "var(--white)", textDecoration: "none" }}>
            SAMS
          </Link>
          <div style={{ marginTop: "auto", paddingBottom: "48px" }}>
            <div style={{ fontFamily: "Montserrat", fontSize: "10px", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "16px" }}>
              Welcome Back
            </div>
            <h1 style={{ fontFamily: "Cormorant Garamond", fontSize: "3rem", color: "var(--white)", fontWeight: 300, lineHeight: 1.1 }}>
              Sign in to your<br />account.
            </h1>
          </div>
        </div>
      </div>

      <div className="auth-panel">
        <div style={{ marginBottom: "40px" }}>
          <div style={{ fontFamily: "Montserrat", fontSize: "9px", letterSpacing: "0.2em", color: "var(--gold-dark)", textTransform: "uppercase", marginBottom: "8px" }}>
            Account Access
          </div>
          <h2 className="auth-title">Sign in</h2>
          <p className="auth-subtitle">Enter your university email and password to access the portal.</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">University Email</label>
            <input
              type="email"
              className="auth-input"
              placeholder="e.g. nimal@sjp.ac.lk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label className="input-label">Password</label>
              <Link href="#" className="auth-link" style={{ fontSize: "11px" }}>Forgot password?</Link>
            </div>
            <input
              type="password"
              className="auth-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMsg && (
            <div style={{ color: "red", fontSize: "13px", marginTop: "8px" }}>
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="btn-ink"
            style={{ width: "100%", justifyContent: "center", marginTop: "16px" }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: "40px", textAlign: "center", fontSize: "13px", color: "var(--ink-muted)" }}>
          Don't have an account? <Link href="/auth/register" className="auth-link">Create one now</Link>
        </div>

        <div style={{ marginTop: "auto", paddingTop: "40px", textAlign: "center" }}>
          <Link href="/auth/admin" style={{ fontSize: "11px", color: "var(--border)", textDecoration: "none" }}>
            Admin Access ↗
          </Link>
        </div>
      </div>
    </>
  );
}
