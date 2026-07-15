"use client";
import { useState } from "react";
import Link from "next/link";
import { Navbar } from "../../../components/layout/studentNavbar";
import { Footer } from "../../../components/layout/studentFooter";
import { StatCard } from "../../../components/ui/StatCard";
import { AttendanceChart } from "../../../components/ui/AttendanceChart";
import {
  IconBarChart, IconCalendar, IconBook, IconShield, IconTrendUp,
  IconLock, IconClock, IconArrow, IconAlertCircle, IconInfo,
  IconCheckCircle, IconX, IconMail,
} from "../../../components/icons/studentIcons";
import {
  COURSES, ATTENDANCE_TREND, WEEK_LABELS, DASHBOARD_NOTIFICATIONS,
  ACTIVE_SESSIONS, RECENT_HISTORY, ELIGIBILITY_SUMMARY,
} from "../../../lib/mockData";
import { progressColor } from "../../../lib/utils";

/* ── Notification list item (dashboard-only, feeds the Navbar's bell
      dropdown via the `notifications` prop) ── */
function NotifItem({ notif, onDismiss }) {
  const styles = {
    info:    { bg: "#f0f9ff", border: "#bae6fd", icon: <IconInfo size={15} />, iconColor: "#0369a1" },
    success: { bg: "#f0fdf4", border: "#bbf7d0", icon: <IconCheckCircle size={15} />, iconColor: "#15803d" },
    warning: { bg: "#fffbeb", border: "#fde68a", icon: <IconAlertCircle size={15} />, iconColor: "#b45309" },
  };
  const s = styles[notif.type] || styles.info;
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span style={{ color: s.iconColor, flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12.5, color: "var(--ink,#1a1714)", fontWeight: 400, lineHeight: 1.5 }}>{notif.title}</div>
        <div style={{ fontSize: 11, color: "var(--ink-light,#9a9490)", marginTop: 3 }}>{notif.time}</div>
      </div>
      <button onClick={() => onDismiss(notif.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-light,#9a9490)", padding: 2, flexShrink: 0 }}><IconX size={12} /></button>
    </div>
  );
}

export default function StudentDashboard() {
  const [notifications, setNotifications] = useState(DASHBOARD_NOTIFICATIONS);

  function dismissNotif(id) {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }

  function statusBadge(status) {
    const map = {
      excellent: { bg: "#ffd666", color: "#765c00", label: "Excellent" },
      good:      { bg: "#d1fae5", color: "#065f46", label: "Good" },
      warning:   { bg: "#fde68a", color: "#92400e", label: "At Risk" },
      danger:    { bg: "#fecaca", color: "#991b1b", label: "Critical" },
    };
    const s = map[status] || map.good;
    return <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", background: s.bg, color: s.color, padding: "3px 8px" }}>{s.label}</span>;
  }

  function historyBadge(status) {
    const map = {
      present: { bg: "#ffd666", color: "#765c00" },
      absent:  { bg: "#fecaca", color: "#991b1b" },
      late:    { bg: "#e5e7eb", color: "#374151" },
    };
    const s = map[status] || map.present;
    return <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", background: s.bg, color: s.color, padding: "3px 9px" }}>{status}</span>;
  }

  return (
    <div style={{ background: "var(--cream,#faf7f2)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar activeNav="dashboard" notifications={notifications} setNotifications={setNotifications} />

      <main style={{ flex: 1, paddingTop: 64 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 36px 56px" }}>

          {/* ── WELCOME HEADER ── */}
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "clamp(2.2rem,4vw,3.2rem)", fontWeight: 300, color: "var(--ink,#1a1714)", lineHeight: 1.1, marginBottom: 8 }}>
              Welcome back, <em style={{ fontStyle: "italic", color: "var(--gold,#b8965a)" }}>Alex.</em>
            </h1>
            <p style={{ fontSize: 14, color: "var(--ink-muted,#5a5650)", fontWeight: 300, lineHeight: 1.7 }}>
              You have <strong style={{ color: "var(--ink,#1a1714)", fontWeight: 500 }}>2 sessions</strong> remaining today.
              Your academic standing is <strong style={{ color: "var(--gold-dark,#8a6e3a)", fontWeight: 600 }}>Excellent</strong>.
            </p>
          </div>

          {/* ── STAT CARDS ROW (components/dashboard/StatCard.jsx) ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1, background: "var(--border,rgba(26,23,20,0.10))", marginBottom: 32 }}>
            <StatCard label="Attendance" value="92%" sub="Overall attendance representation" icon={<IconBarChart size={20} />} />
            <StatCard label="Classes This Week" value={<span>14<span style={{ fontSize: "1.2rem", color: "var(--ink-muted,#5a5650)" }}>/18</span></span>} sub="4 sessions remaining" icon={<IconCalendar size={20} />} />
            <StatCard label="Courses Enrolled" value="4" sub="Current semester" icon={<IconBook size={20} />} />
            <StatCard label="Sessions Logged" value="74" sub="All time" icon={<IconShield size={20} />} />
          </div>

          {/* ── MIDDLE GRID: chart + right sidebar ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, marginBottom: 24 }}>

            {/* LEFT: Attendance Trend (components/dashboard/AttendanceChart.jsx) */}
            <div style={{ background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "28px 28px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                  <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)", marginBottom: 6 }}>Attendance Trend</div>
                  <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink,#1a1714)" }}>Last 7 Weeks</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--gold-dark,#8a6e3a)", fontSize: 12, fontWeight: 500 }}>
                  <IconTrendUp size={15} /> +4% this month
                </div>
              </div>
              <AttendanceChart data={ATTENDANCE_TREND} labels={WEEK_LABELS} />
            </div>

            {/* RIGHT COLUMN */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Active Sessions */}
              <div style={{ background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "20px 20px 18px" }}>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)", marginBottom: 14 }}>Active Sessions</div>
                {ACTIVE_SESSIONS.map((s, i) => (
                  <div key={i} style={{ padding: "12px 0", borderTop: i > 0 ? "1px solid var(--border,rgba(26,23,20,0.08))" : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div>
                        {s.status === "live" && (
                          <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 7, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", background: "#ffd666", color: "#765c00", padding: "2px 7px", marginBottom: 5, display: "inline-block" }}>● Live Now</span>
                        )}
                        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink,#1a1714)" }}>{s.name}</div>
                      </div>
                      <div style={{ fontSize: 11, color: "var(--ink-light,#9a9490)", textAlign: "right", flexShrink: 0, marginLeft: 8 }}>{s.time}</div>
                    </div>
                    {s.status === "live" && (
                      <Link href="/student/attendance" style={{ textDecoration: "none", width: "100%", display: "block" }}>
                        <button style={{ width: "100%", background: "var(--ink,#1a1714)", color: "var(--cream,#faf7f2)", border: "none", cursor: "pointer", padding: "9px 16px", fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background 0.2s" }}
                          onMouseEnter={e => e.currentTarget.style.background = "#2e2a26"}
                          onMouseLeave={e => e.currentTarget.style.background = "var(--ink,#1a1714)"}>
                          <IconLock size={12} /> Quick Mark Attendance
                        </button>
                      </Link>
                    )}
                    {s.status === "upcoming" && (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--ink-light,#9a9490)" }}>
                        <IconClock size={12} /> Upcoming
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Need Help */}
              <div style={{ background: "var(--ink,#1a1714)", padding: "22px 20px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(184,150,90,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "1.4rem", fontWeight: 400, color: "#fff", marginBottom: 6 }}>Need Help?</div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 16, fontWeight: 300 }}>Connect with your academic advisor or access the knowledge base.</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ flex: 1, background: "#fff", border: "none", cursor: "pointer", padding: "9px 14px", fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold-dark,#8a6e3a)", transition: "opacity 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}>Support</button>
                  <button style={{ background: "var(--gold,#b8965a)", border: "none", cursor: "pointer", padding: "9px 12px", color: "#fff", display: "flex", alignItems: "center" }}>
                    <IconMail size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── COURSE PROGRESS & SCHEDULE ── */}
          <div style={{ background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "28px", marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)", marginBottom: 6 }}>Courses</div>
                <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink,#1a1714)" }}>Progress &amp; Schedule</div>
              </div>
              <Link href="/student/courses" style={{ textDecoration: "none" }}>
                <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "var(--gold,#b8965a)", fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  View Full Schedule <IconArrow size={11} />
                </button>
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.2fr 1.6fr 100px", gap: 12, padding: "8px 12px", background: "var(--cream-dark,#f0ebe1)", fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-light,#9a9490)" }}>
              <span>Course</span><span>Instructor</span><span>Next Class</span><span>Attendance</span><span>Status</span>
            </div>

            {COURSES.map((c, i) => (
              <div key={c.code} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.2fr 1.6fr 100px", gap: 12, padding: "16px 12px", alignItems: "center", borderBottom: i < COURSES.length - 1 ? "1px solid var(--border,rgba(26,23,20,0.07))" : "none", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--cream,#faf7f2)"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink,#1a1714)", marginBottom: 2 }}>{c.name}</div>
                  <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, color: "var(--ink-light,#9a9490)", letterSpacing: "0.1em" }}>{c.code}</div>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--ink-muted,#5a5650)" }}>{c.instructor}</div>
                <div style={{ fontSize: 12, color: "var(--ink-muted,#5a5650)" }}>{c.nextClass}</div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <div style={{ flex: 1, height: 4, background: "var(--cream-dark,#f0ebe1)" }}>
                      <div style={{ width: `${c.progress}%`, height: "100%", background: progressColor(c.progress), transition: "width 0.6s ease" }} />
                    </div>
                    <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, color: "var(--ink-muted,#5a5650)", minWidth: 28 }}>{c.progress}%</span>
                  </div>
                  <div style={{ fontSize: 10, color: "var(--ink-light,#9a9490)" }}>{c.attended}/{c.total} sessions</div>
                </div>
                <div>{statusBadge(c.status)}</div>
              </div>
            ))}
          </div>

          {/* ── BOTTOM ROW: recent history + eligibility summary ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>

            {/* Recent Attendance History */}
            <div style={{ background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)", marginBottom: 6 }}>Recent</div>
                  <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "1.4rem", fontWeight: 400, color: "var(--ink,#1a1714)" }}>Attendance History</div>
                </div>
                <Link href="/student/history" style={{ textDecoration: "none" }}>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "var(--gold,#b8965a)", fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    Full History <IconArrow size={11} />
                  </button>
                </Link>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {RECENT_HISTORY.map((h, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < RECENT_HISTORY.length - 1 ? "1px solid var(--border,rgba(26,23,20,0.07))" : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, color: "var(--ink-light,#9a9490)", width: 72, letterSpacing: "0.08em" }}>{h.date}</div>
                      <div style={{ fontSize: 13, color: "var(--ink,#1a1714)" }}>{h.course}</div>
                    </div>
                    {historyBadge(h.status)}
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility Summary (Submit Medical Certificate → Contact Academic Advisor) */}
            <div style={{ background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "28px" }}>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)", marginBottom: 6 }}>Eligibility</div>
              <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "1.4rem", fontWeight: 400, color: "var(--ink,#1a1714)", marginBottom: 20 }}>Academic Standing</div>

              {ELIGIBILITY_SUMMARY.map((item, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: "var(--ink-muted,#5a5650)" }}>{item.label}</span>
                    <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, color: item.warn ? "#b91c1c" : "var(--gold-dark,#8a6e3a)" }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: 5, background: "var(--cream-dark,#f0ebe1)" }}>
                    <div style={{ width: `${item.pct}%`, height: "100%", background: progressColor(item.pct), transition: "width 0.6s" }} />
                  </div>
                  {item.warn && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, fontSize: 10, color: "#b91c1c" }}>
                      <IconAlertCircle size={11} /> Below 80% threshold
                    </div>
                  )}
                </div>
              ))}

              <div style={{ borderTop: "1px solid var(--border,rgba(26,23,20,0.08))", margin: "18px 0" }} />

              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--cream,#faf7f2)", border: "1px solid var(--border-gold,rgba(184,150,90,0.35))" }}>
                <IconShield size={16} style={{ color: "var(--gold,#b8965a)", flexShrink: 0 }} />
                <div style={{ fontSize: 11.5, color: "var(--ink-muted,#5a5650)", lineHeight: 1.5 }}>
                  <strong style={{ color: "var(--ink,#1a1714)" }}>3 of 4</strong> courses meet the 80% eligibility threshold.
                </div>
              </div>

              <button style={{ marginTop: 14, width: "100%", background: "none", border: "1px solid var(--ink,#1a1714)", cursor: "pointer", padding: "10px", fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink,#1a1714)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background 0.2s, color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--ink,#1a1714)"; e.currentTarget.style.color = "var(--cream,#faf7f2)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--ink,#1a1714)"; }}>
                <IconMail size={12} /> Contact Academic Advisor
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
