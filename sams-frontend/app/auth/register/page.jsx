"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/departments");
        if (res.ok) {
          const data = await res.json();
          setDepartments(data.data.departments || []);
        }
      } catch (err) {
        console.error("Failed to fetch departments", err);
      }
    };
    fetchDepartments();
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    regNumber: "",
    employeeId: "",
    email: "",
    department: "",
    batch: "",
    password: "",
    confirmPassword: ""
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role,
          fullName: formData.fullName,
          regNumber: formData.regNumber,
          employeeId: formData.employeeId,
          department: formData.department,
          batch: formData.batch,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/auth/login");
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
              Join SAMS
            </div>
            <h1 style={{ fontFamily: "Cormorant Garamond", fontSize: "3rem", color: "var(--white)", fontWeight: 300, lineHeight: 1.1 }}>
              Create your<br />account.
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", marginTop: "24px", maxWidth: "340px", lineHeight: 1.6 }}>
              Register as a student or a lecturer to start using GPS-verified, OTP-secured attendance.
            </p>
          </div>
        </div>
      </div>

      <div className="auth-panel" style={{ overflowY: "auto" }}>
        <div style={{ marginBottom: "32px", marginTop: "24px" }}>
          <div style={{ fontFamily: "Montserrat", fontSize: "9px", letterSpacing: "0.2em", color: "var(--gold-dark)", textTransform: "uppercase", marginBottom: "8px" }}>
            Account Creation
          </div>
          <h2 className="auth-title">Create an account</h2>
          <p className="auth-subtitle">Registration is open to students and lecturers of the Faculty of Computing. Admin accounts are issued separately.</p>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label className="input-label">Register As</label>
            <div className="auth-role-tabs">
              <button
                type="button"
                className={`auth-role-btn ${role === "student" ? "active" : ""}`}
                onClick={() => setRole("student")}
              >
                Student
              </button>
              <button
                type="button"
                className={`auth-role-btn ${role === "lecturer" ? "active" : ""}`}
                onClick={() => setRole("lecturer")}
              >
                Lecturer
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="auth-input"
                placeholder="e.g. Nimal Perera"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            {role === "student" ? (
              <div className="input-group">
                <label className="input-label">Registration Number</label>
                <input
                  type="text"
                  name="regNumber"
                  className="auth-input"
                  placeholder="e.g. FC111234"
                  value={formData.regNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ) : (
              <div className="input-group">
                <label className="input-label">Employee ID</label>
                <input
                  type="text"
                  name="employeeId"
                  className="auth-input"
                  placeholder="e.g. EMP1234"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
          </div>

          <div className="input-group">
            <label className="input-label">University Email</label>
            <input
              type="email"
              name="email"
              className="auth-input"
              placeholder="e.g. fc111234@sjp.ac.lk"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: role === "student" ? "1fr 1fr" : "1fr", gap: "20px" }}>
            <div className="input-group">
              <label className="input-label">Department</label>
              <select
                name="department"
                className="auth-input"
                value={formData.department}
                onChange={handleInputChange}
                required
                style={{ appearance: "none", backgroundColor: "var(--white)" }}
              >
                <option value="" disabled>Select your department</option>
                {departments.map((dept) => (
                  <option key={dept.name} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {role === "student" && (
              <div className="input-group">
                <label className="input-label">Batch</label>
                <select
                  name="batch"
                  className="auth-input"
                  value={formData.batch}
                  onChange={handleInputChange}
                  required
                  style={{ appearance: "none", backgroundColor: "var(--white)" }}
                >
                  <option value="" disabled>Select year</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                name="password"
                className="auth-input"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="auth-input"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <input type="checkbox" id="terms" required style={{ accentColor: "var(--ink)", marginTop: "3px" }} />
            <label htmlFor="terms" style={{ fontSize: "12px", color: "var(--ink-muted)" }}>
              I agree to the <Link href="#" className="auth-link">Terms of Use</Link> and <Link href="#" className="auth-link">Privacy Policy</Link>.
            </label>
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
            {loading ? "Creating Account..." : `Create ${role === "student" ? "Student" : "Lecturer"} Account`}
          </button>
        </form>

        <div style={{ marginTop: "32px", marginBottom: "24px", textAlign: "center", fontSize: "13px", color: "var(--ink-muted)" }}>
          Already have an account? <Link href="/auth/login" className="auth-link">Sign in</Link>
        </div>
      </div>
    </>
  );
}
