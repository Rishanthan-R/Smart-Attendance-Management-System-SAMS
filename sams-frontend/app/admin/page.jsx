"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// SVG Icon components
const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconBuilding = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconBook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
  </svg>
);
const IconUserPlus = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>
  </svg>
);
const IconBooks = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const IconDept = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalStudents: 0, totalLecturers: 0, activeDepartments: 0, activeModules: 0 });
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Administrator");

  useEffect(() => {
    const userStr = localStorage.getItem("sams_user");
    if (userStr) {
      try { const user = JSON.parse(userStr); setUserName(user.full_name || "Administrator"); } catch (e) {}
    }
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("sams_token");
        const res = await fetch("http://localhost:5000/api/admin/dashboard", { headers: { "Authorization": `Bearer ${token}` } });
        if (res.ok) { const data = await res.json(); setStats(data.data); }
      } catch (err) { console.error("Error fetching dashboard stats", err); }
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  const firstName = userName ? userName.split(" ")[0] : "Administrator";

  return (
    <div style={{ width: "100%", paddingBottom: "64px" }}>

      {/* HERO BANNER */}
      <div style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2c2a25 60%, #1a1a1a 100%)", padding: "72px 48px 64px", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(191,155,97,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(191,155,97,0.7)", marginBottom: "20px" }}>
            ADMIN DASHBOARD — SAMS
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontWeight: 300, color: "#f5f0e8", margin: 0, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Welcome back, <em style={{ fontStyle: "italic", color: "#bF9B61" }}>{firstName}</em>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(245,240,232,0.55)", marginTop: "20px", maxWidth: "480px", lineHeight: 1.7 }}>
            Oversee all academic operations, manage users, and monitor system-wide attendance from your central admin hub.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "36px", flexWrap: "wrap" }}>
            <Link href="/admin/users" style={{ textDecoration: "none" }}>
              <div style={{ backgroundColor: "#bF9B61", color: "#1a1a1a", padding: "12px 28px", borderRadius: "2px", fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
                + Add New User
              </div>
            </Link>
            <Link href="/admin/modules" style={{ textDecoration: "none" }}>
              <div style={{ backgroundColor: "transparent", color: "#f5f0e8", padding: "12px 28px", borderRadius: "2px", fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", border: "1px solid rgba(245,240,232,0.25)", cursor: "pointer" }}>
                View Modules
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* STATS ROW */}
      <div style={{ backgroundColor: "var(--cream)", borderBottom: "1px solid var(--border)", padding: "0 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {[
            { label: "Total Students", value: loading ? "..." : stats.totalStudents, sub: "Registered accounts", icon: <IconUsers />, gold: false },
            { label: "Total Lecturers", value: loading ? "..." : stats.totalLecturers, sub: "Academic staff", icon: <IconUser />, gold: false },
            { label: "Active Departments", value: loading ? "..." : stats.activeDepartments, sub: "Faculty divisions", icon: <IconBuilding />, gold: true },
            { label: "Active Modules", value: loading ? "..." : (stats.activeModules || stats.activemodules || 0), sub: "Academic courses", icon: <IconBook />, gold: false }
          ].map((s, i, arr) => (
            <div key={i} style={{ padding: "36px 24px", borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{s.label}</div>
                <div style={{ color: s.gold ? "var(--gold-dark)" : "var(--ink-muted)", opacity: 0.6 }}>{s.icon}</div>
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.2rem", fontWeight: 400, color: s.gold ? "var(--gold-dark)" : "var(--ink)", lineHeight: 1, marginBottom: "8px" }}>{s.value}</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", color: "var(--ink-muted)" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "8px" }}>QUICK ACTIONS</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300, color: "var(--ink)", margin: "0 0 40px 0" }}>System Management</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>

          <Link href="/admin/users" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", padding: "36px", borderRadius: "var(--radius)", transition: "transform 0.25s ease, box-shadow 0.25s ease", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,0.08)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: "52px", height: "52px", backgroundColor: "rgba(191,155,97,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", color: "var(--gold-dark)" }}><IconUserPlus /></div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "var(--ink)", margin: "0 0 12px 0" }}>User Management</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--ink-light)", margin: "0 0 28px 0", lineHeight: 1.7, flex: 1 }}>Create and manage accounts for students, lecturers, and administrators.</p>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                MANAGE USERS <span style={{ color: "var(--gold-dark)" }}>→</span>
              </div>
            </div>
          </Link>

          <Link href="/admin/modules" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", padding: "36px", borderRadius: "var(--radius)", transition: "transform 0.25s ease, box-shadow 0.25s ease", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,0.08)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: "52px", height: "52px", backgroundColor: "rgba(191,155,97,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", color: "var(--gold-dark)" }}><IconBooks /></div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "var(--ink)", margin: "0 0 12px 0" }}>Module Management</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--ink-light)", margin: "0 0 28px 0", lineHeight: 1.7, flex: 1 }}>Register new academic modules, assign module codes, and allocate lecturers.</p>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                MANAGE MODULES <span style={{ color: "var(--gold-dark)" }}>→</span>
              </div>
            </div>
          </Link>

          <Link href="/admin/departments" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", padding: "36px", borderRadius: "var(--radius)", transition: "transform 0.25s ease, box-shadow 0.25s ease", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,0.08)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: "52px", height: "52px", backgroundColor: "rgba(191,155,97,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", color: "var(--gold-dark)" }}><IconDept /></div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "var(--ink)", margin: "0 0 12px 0" }}>Department Management</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--ink-light)", margin: "0 0 28px 0", lineHeight: 1.7, flex: 1 }}>Create and organize university departments within the faculty structure.</p>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                MANAGE DEPARTMENTS <span style={{ color: "var(--gold-dark)" }}>→</span>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
