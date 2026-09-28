"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconBookOpen = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const IconBarChart = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);
const IconUser = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    enrolledModules: 0, attendanceRecords: 0, sessionsThisWeek: 0,
    hasActiveSession: false, activeSession: null, upcomingSessions: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("sams_user");
     // eslint-disable-next-line react-hooks/set-state-in-effect
    if (userStr) { setUser(JSON.parse(userStr)); }
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("sams_token");
        const res = await fetch("http://localhost:5000/api/student/dashboard", { headers: { "Authorization": `Bearer ${token}` } });
        if (res.ok) { const data = await res.json(); setDashboardData(data.data); }
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

  const firstName = user.full_name ? user.full_name.split(" ")[0] : "Student";
  const { enrolledModules, attendanceRecords, sessionsThisWeek, hasActiveSession, activeSession, upcomingSessions } = dashboardData;

  return (
    <div style={{ width: "100%", paddingBottom: "64px" }}>

      {/* HERO BANNER */}
      <div style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2c2a25 60%, #1a1a1a 100%)", padding: "72px 48px 64px", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(191,155,97,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(191,155,97,0.7)", marginBottom: "20px" }}>
            STUDENT PORTAL — SAMS
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontWeight: 300, color: "#f5f0e8", margin: 0, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Welcome back, <em style={{ fontStyle: "italic", color: "#bF9B61" }}>{firstName}</em>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(245,240,232,0.55)", marginTop: "20px", maxWidth: "480px", lineHeight: 1.7 }}>
            Track your attendance, view enrolled courses, and mark your presence in active sessions — all in one place.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "36px", flexWrap: "wrap" }}>
            {hasActiveSession && activeSession ? (
              <button
                onClick={() => router.push(`/student/sessions/${activeSession.id}`)}
                style={{ backgroundColor: "#27ae60", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "2px", fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}
              >
                Mark Attendance Now
              </button>
            ) : (
              <Link href="/student/courses" style={{ textDecoration: "none" }}>
                <div style={{ backgroundColor: "#bF9B61", color: "#1a1a1a", padding: "12px 28px", borderRadius: "2px", fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
                  View My Courses
                </div>
              </Link>
            )}
            <Link href="/student/history" style={{ textDecoration: "none" }}>
              <div style={{ backgroundColor: "transparent", color: "#f5f0e8", padding: "12px 28px", borderRadius: "2px", fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", border: "1px solid rgba(245,240,232,0.25)", cursor: "pointer" }}>
                Attendance History
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* STATS ROW */}
      <div style={{ backgroundColor: "var(--cream)", borderBottom: "1px solid var(--border)", padding: "0 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>

          <div style={{ padding: "36px 24px", borderRight: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Enrolled Modules</div>
              <div style={{ color: "var(--gold-dark)", opacity: 0.6 }}><IconBook /></div>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 400, color: "var(--gold-dark)", lineHeight: 1, marginBottom: "8px" }}>{enrolledModules < 10 ? `0${enrolledModules}` : enrolledModules}</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", color: "var(--ink-muted)" }}>This semester</div>
          </div>

          <div style={{ padding: "36px 24px", borderRight: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Scheduled Sessions</div>
              <div style={{ color: "var(--ink-muted)", opacity: 0.6 }}><IconCalendar /></div>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1, marginBottom: "8px" }}>{sessionsThisWeek < 10 ? `0${sessionsThisWeek}` : sessionsThisWeek}</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", color: "var(--ink-muted)" }}>This week</div>
          </div>

          <div style={{ padding: "36px 24px", borderRight: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Attendance Records</div>
              <div style={{ color: "var(--ink-muted)", opacity: 0.6 }}><IconClock /></div>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1, marginBottom: "8px" }}>{attendanceRecords < 10 ? `0${attendanceRecords}` : attendanceRecords}</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", color: "var(--ink-muted)" }}>Total logged</div>
          </div>

          <div style={{ padding: "36px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted)" }}>Current Status</div>
              {hasActiveSession
                ? <span style={{ fontSize: "10px", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: "#27ae60", backgroundColor: "rgba(46,204,113,0.1)", padding: "2px 6px", borderRadius: "2px" }}>LIVE NOW</span>
                : <div style={{ color: "var(--ink-muted)", opacity: 0.6 }}><IconShield /></div>
              }
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 400, color: hasActiveSession ? "#27ae60" : "var(--ink)", lineHeight: 1, marginBottom: "8px" }}>{hasActiveSession ? "Active" : "N/A"}</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", color: "var(--ink-muted)" }}>{hasActiveSession ? "Live now" : "No active sessions"}</div>
          </div>

        </div>
      </div>

      {/* QUICK ACCESS CARDS */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "8px" }}>QUICK ACCESS</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300, color: "var(--ink)", margin: "0 0 40px 0" }}>Your Student Tools</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>

          <Link href="/student/courses" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", padding: "36px", borderRadius: "var(--radius)", transition: "transform 0.25s ease, box-shadow 0.25s ease", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,0.08)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: "52px", height: "52px", backgroundColor: "rgba(191,155,97,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", color: "var(--gold-dark)" }}><IconBookOpen /></div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "var(--ink)", margin: "0 0 12px 0" }}>My Courses</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--ink-light)", margin: "0 0 28px 0", lineHeight: 1.7, flex: 1 }}>View all your enrolled academic modules and their details for this semester.</p>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                VIEW COURSES <span style={{ color: "var(--gold-dark)" }}>→</span>
              </div>
            </div>
          </Link>

          <Link href="/student/history" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", padding: "36px", borderRadius: "var(--radius)", transition: "transform 0.25s ease, box-shadow 0.25s ease", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,0.08)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: "52px", height: "52px", backgroundColor: "rgba(191,155,97,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", color: "var(--gold-dark)" }}><IconBarChart /></div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "var(--ink)", margin: "0 0 12px 0" }}>Attendance History</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--ink-light)", margin: "0 0 28px 0", lineHeight: 1.7, flex: 1 }}>Check your comprehensive attendance record across all sessions and modules.</p>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                VIEW HISTORY <span style={{ color: "var(--gold-dark)" }}>→</span>
              </div>
            </div>
          </Link>

          <Link href="/student/profile" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", padding: "36px", borderRadius: "var(--radius)", transition: "transform 0.25s ease, box-shadow 0.25s ease", height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,0.08)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: "52px", height: "52px", backgroundColor: "rgba(191,155,97,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", color: "var(--gold-dark)" }}><IconUser /></div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "var(--ink)", margin: "0 0 12px 0" }}>My Profile</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "var(--ink-light)", margin: "0 0 28px 0", lineHeight: 1.7, flex: 1 }}>Update your contact details and manage your student account information.</p>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "var(--ink)", display: "flex", alignItems: "center", gap: "8px" }}>
                EDIT PROFILE <span style={{ color: "var(--gold-dark)" }}>→</span>
              </div>
            </div>
          </Link>

        </div>

        {/* UPCOMING SESSIONS LIST */}
        {upcomingSessions && upcomingSessions.length > 0 && (
          <div style={{ marginTop: "64px" }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "8px" }}>UPCOMING</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 300, color: "var(--ink)", marginBottom: "24px", marginTop: 0 }}>Nearest Sessions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {upcomingSessions.slice(0, 3).map(session => (
                <div key={session.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "var(--white)", border: "1px solid var(--border)", padding: "20px 28px", borderRadius: "var(--radius)" }}>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>{session.modules?.name}</div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", color: "var(--ink-muted)", marginTop: "4px", letterSpacing: "0.05em" }}>
                      {new Date(session.started_at).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                    </div>
                  </div>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 700, color: "var(--gold-dark)", backgroundColor: "rgba(191,155,97,0.1)", padding: "4px 10px", borderRadius: "2px", letterSpacing: "0.1em" }}>UPCOMING</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
