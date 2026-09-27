"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const IconBook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconPlay = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
  </svg>
);
const IconList = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const IconUser = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

export default function LecturerDashboard() {
  const [user, setUser] = useState(null);
  const [modules, setModules] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("sams_user");
    if (userStr) { setUser(JSON.parse(userStr)); }
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("sams_token");
        const headers = { "Authorization": `Bearer ${token}` };
        const [modulesRes, sessionsRes] = await Promise.all([
          fetch("http://localhost:5000/api/lecturer/modules", { headers }),
          fetch("http://localhost:5000/api/sessions", { headers })
        ]);
        if (modulesRes.ok) { const modData = await modulesRes.json(); setModules(modData.data.modules || []); }
        if (sessionsRes.ok) { const sesData = await sessionsRes.json(); setSessions(sesData.data.sessions || []); }
      } catch (err) { console.error("Error fetching dashboard data", err); }
      finally { setLoading(false); }
    };
    fetchDashboardData();
  }, []);

  if (loading || !user) {
    return (
      <div style={{ padding: "48px", textAlign: "center", fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: "var(--ink-muted)", letterSpacing: "0.1em" }}>
        Loading dashboard...
      </div>
    );
  }

  const firstName = user.full_name ? user.full_name.split(" ")[0] : "Lecturer";
  const totalModules = modules.length;
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const sessionsThisWeek = sessions.filter(s => new Date(s.created_at) > oneWeekAgo).length;
  const mostRecentSession = sessions.length > 0 ? sessions[0] : null;
  const isActive = mostRecentSession && mostRecentSession.status === "active";

  return (
    <div style={{ width: "100%", paddingBottom: "64px" }}>

      {/* HERO BANNER */}
      <div style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2c2a25 60%, #1a1a1a 100%)", padding: "72px 48px 64px", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(191,155,97,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(191,155,97,0.7)", marginBottom: "20px" }}>
            LECTURER PANEL — SAMS
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontWeight: 300, color: "#f5f0e8", margin: 0, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Welcome back, <em style={{ fontStyle: "italic", color: "#bF9B61" }}>{firstName}</em>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(245,240,232,0.55)", marginTop: "20px", maxWidth: "480px", lineHeight: 1.7 }}>
            Manage your modules, start attendance sessions, and track student engagement — all from your teaching hub.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "36px", flexWrap: "wrap" }}>
            <Link href="/lecturer/sessions/create" style={{ textDecoration: "none" }}>
              <div style={{ backgroundColor: "#bF9B61", color: "#1a1a1a", padding: "12px 28px", borderRadius: "2px", fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
                + New Session
              </div>
            </Link>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", color: "rgba(245,240,232,0.45)", letterSpacing: "0.15em" }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
        </div>
      </div>

      {/* STATS ROW */}
      <div style={{ backgroundColor: "var(--cream)", borderBottom: "1px solid var(--border)", padding: "0 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>

          <div style={{ padding: "36px 24px", borderRight: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Modules Taught</div>
              <div style={{ color: "var(--gold-dark)", opacity: 0.6 }}><IconBook /></div>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 400, color: "var(--gold-dark)", lineHeight: 1, marginBottom: "8px" }}>{totalModules < 10 ? `0${totalModules}` : totalModules}</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", color: "var(--ink-muted)" }}>This semester</div>
          </div>

          <div style={{ padding: "36px 24px", borderRight: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Sessions Hosted</div>
              <div style={{ color: "var(--ink-muted)", opacity: 0.6 }}><IconCalendar /></div>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1, marginBottom: "8px" }}>{sessionsThisWeek < 10 ? `0${sessionsThisWeek}` : sessionsThisWeek}</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", color: "var(--ink-muted)" }}>Past 7 days</div>
          </div>

          <div style={{ padding: "36px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Session Status</div>
              <div style={{ color: isActive ? "#27ae60" : "var(--ink-muted)", opacity: 0.7 }}>
                {isActive
                  ? <span style={{ fontSize: "10px", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: "#27ae60", backgroundColor: "rgba(46,204,113,0.1)", padding: "2px 6px", borderRadius: "2px" }}>LIVE NOW</span>
                  : <IconShield />
                }
              </div>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 400, color: isActive ? "#27ae60" : "var(--ink)", lineHeight: 1, marginBottom: "8px" }}>{isActive ? "Active" : "Closed"}</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", color: "var(--ink-muted)" }}>{isActive ? "Live now" : "No active sessions"}</div>
          </div>

        </div>
      </div>

      {/* QUICK NAV */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "8px" }}>QUICK ACCESS</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300, color: "var(--ink)", margin: "0 0 40px 0" }}>Your Teaching Tools</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>

          <Link href="/lecturer/sessions/create" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", padding: "36px", borderRadius: "var(--radius)", transition: "transform 0.25s ease, box-shadow 0.25s ease", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,0.08)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: "52px", height: "52px", backgroundColor: "rgba(191,155,97,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", color: "var(--gold-dark)" }}><IconPlay /></div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "var(--ink)", margin: "0 0 12px 0" }}>Start Attendance</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--ink-light)", margin: "0 0 28px 0", lineHeight: 1.7, flex: 1 }}>Launch a new session for one of your modules and let students mark their attendance.</p>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                START SESSION <span style={{ color: "var(--gold-dark)" }}>→</span>
              </div>
            </div>
          </Link>

          <Link href="/lecturer/sessions" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", padding: "36px", borderRadius: "var(--radius)", transition: "transform 0.25s ease, box-shadow 0.25s ease", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,0.08)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: "52px", height: "52px", backgroundColor: "rgba(191,155,97,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", color: "var(--gold-dark)" }}><IconList /></div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "var(--ink)", margin: "0 0 12px 0" }}>View Sessions</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--ink-light)", margin: "0 0 28px 0", lineHeight: 1.7, flex: 1 }}>Browse all past and active sessions you have hosted across all your modules.</p>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                VIEW HISTORY <span style={{ color: "var(--gold-dark)" }}>→</span>
              </div>
            </div>
          </Link>

          <Link href="/lecturer/profile" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", padding: "36px", borderRadius: "var(--radius)", transition: "transform 0.25s ease, box-shadow 0.25s ease", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,0.08)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: "52px", height: "52px", backgroundColor: "rgba(191,155,97,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", color: "var(--gold-dark)" }}><IconUser /></div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "var(--ink)", margin: "0 0 12px 0" }}>My Profile</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--ink-light)", margin: "0 0 28px 0", lineHeight: 1.7, flex: 1 }}>Update your contact details and manage your lecturer account information.</p>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                EDIT PROFILE <span style={{ color: "var(--gold-dark)" }}>→</span>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
