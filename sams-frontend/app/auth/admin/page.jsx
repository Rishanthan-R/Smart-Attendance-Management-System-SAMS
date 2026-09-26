"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, asAdmin: true }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Admin login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      // Store session token
      localStorage.setItem("sams_token", data.data.session.access_token);
      localStorage.setItem("sams_user", JSON.stringify(data.data.user));

      router.push("/admin");
    } catch (err) {
      setErrorMsg("Could not connect to server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-hero" style={{ backgroundImage: "url('/images/hero-usjhd.png')", filter: "grayscale(30%)" }}>
        <div className="auth-hero-overlay" style={{ background: "linear-gradient(to right, rgba(10, 10, 10, 0.7) 0%, rgba(10, 10, 10, 0.95) 100%)" }} />
        <div className="auth-hero-content">
          <Link href="/" className="logo-text" style={{ color: "var(--white)", textDecoration: "none" }}>
            SAMS
          </Link>
          <div style={{ marginTop: "auto", paddingBottom: "48px" }}>
            <div style={{ fontFamily: "Montserrat", fontSize: "10px", letterSpacing: "0.2em", color: "var(--ink-light)", textTransform: "uppercase", marginBottom: "16px" }}>
              Restricted Area
            </div>
            <h1 style={{ fontFamily: "Cormorant Garamond", fontSize: "3rem", color: "var(--white)", fontWeight: 300, lineHeight: 1.1 }}>
              Administration<br />Portal.
            </h1>
          </div>
        </div>
      </div>
      
      <div className="auth-panel">
        <div style={{ marginBottom: "40px" }}>
          <div style={{ fontFamily: "Montserrat", fontSize: "9px", letterSpacing: "0.2em", color: "var(--ink-light)", textTransform: "uppercase", marginBottom: "8px" }}>
            System Governance
          </div>
          <h2 className="auth-title">Admin Login</h2>
          <p className="auth-subtitle">Secure access for faculty administrators only.</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Admin Email</label>
            <input 
              type="email" 
              className="auth-input" 
              placeholder="admin@sjp.ac.lk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input 
              type="password" 
              className="auth-input" 
              placeholder="Enter admin password"
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
            style={{ width: "100%", justifyContent: "center", marginTop: "16px", background: "#111" }}
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>
        
        <div style={{ marginTop: "auto", paddingTop: "40px", textAlign: "center" }}>
          <Link href="/auth/login" style={{ fontSize: "11px", color: "var(--ink-muted)", textDecoration: "none" }}>
            ← Back to Standard Login
          </Link>
        </div>
      </div>
    </>
  );
}
