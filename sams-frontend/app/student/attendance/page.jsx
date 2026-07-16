"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "../../../components/layout/studentNavbar";
import { Footer } from "../../../components/layout/studentFooter";
import OtpInput from "../../../components/ui/OtpInput";
import {
  IconClock, IconUser, IconMapPin, IconWifi, IconShield,
  IconArrow, IconAlertCircle, IconCheckCircle,
} from "../../../components/icons/studentIcons";
import {
  ACTIVE_SESSION,
  RECENT_HISTORY_ATTENDANCE as RECENT_HISTORY,
  ATTENDANCE_NOTIFICATIONS,
} from "../../../lib/mockData";

/* ── Page component ───────────────────────────────────────────────────────── */
export default function MarkAttendancePage() {
  const [notifications, setNotifications] = useState(ATTENDANCE_NOTIFICATIONS);
  const [otp,           setOtp]           = useState("");
  const [submitting,    setSubmitting]    = useState(false);
  const [submitted,     setSubmitted]     = useState(false);
  const [error,         setError]         = useState(false);

  /* Live clock — updates every second */
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  function handleSubmit() {
    if (otp.length !== 4) { setError(true); return; }
    setError(false);
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1800);
  }

  return (
    <div style={{ background: "var(--cream,#faf7f2)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Shared Navbar — activeNav highlights "Attendance" */}
      <Navbar activeNav="attendance" notifications={notifications} setNotifications={setNotifications} />

      <main style={{ flex: 1, paddingTop: 64 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "44px 40px 56px" }}>

          {/* ── PAGE HEADER ── */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)", marginBottom: 10 }}>
              Session Verification
            </div>
            <h1 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 300, color: "var(--ink,#1a1714)", lineHeight: 1.1, marginBottom: 8 }}>
              Mark <em style={{ fontStyle: "italic", color: "var(--gold,#b8965a)" }}>Attendance</em>
            </h1>
            <p style={{ fontSize: 14, color: "var(--ink-muted,#5a5650)", fontWeight: 300, lineHeight: 1.7, maxWidth: 480 }}>
              Verify your identity and secure your presence for the active academic session.
            </p>
          </div>

          {/* ── MAIN GRID ── */}
          <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 24, marginBottom: 40 }}>

            {/* ── LEFT COLUMN: Session info + Geofence + Security ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Active session card */}
              <div style={{ background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "28px", position: "relative", overflow: "hidden" }}>
                {/* Gold top accent bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--gold,#b8965a)" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 12px", background: "#ffd666", color: "#765c00", fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#92400e", animation: "pulse 1.5s infinite" }} />
                    Active Now
                  </span>
                  <div style={{ color: "var(--gold,#b8965a)" }}><IconWifi size={18} /></div>
                </div>

                <h2 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "1.4rem", fontWeight: 500, color: "var(--ink,#1a1714)", lineHeight: 1.25, marginBottom: 6 }}>
                  {ACTIVE_SESSION.name}
                </h2>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, color: "var(--ink-light,#9a9490)", letterSpacing: "0.1em", marginBottom: 20 }}>
                  {ACTIVE_SESSION.code} · {ACTIVE_SESSION.hall}
                </div>

                <div style={{ borderTop: "1px solid var(--border,rgba(26,23,20,0.07))", paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                  {/* Session window */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 32, background: "var(--cream,#faf7f2)", border: "1px solid var(--border,rgba(26,23,20,0.10))", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold-dark,#8a6e3a)" }}>
                      <IconClock size={15} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-light,#9a9490)", marginBottom: 2 }}>Session Window</div>
                      <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink,#1a1714)" }}>{ACTIVE_SESSION.time}</div>
                    </div>
                  </div>
                  {/* Instructor */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 32, background: "var(--cream,#faf7f2)", border: "1px solid var(--border,rgba(26,23,20,0.10))", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold-dark,#8a6e3a)" }}>
                      <IconUser size={15} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-light,#9a9490)", marginBottom: 2 }}>Instructor</div>
                      <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink,#1a1714)" }}>{ACTIVE_SESSION.instructor}</div>
                    </div>
                  </div>
                </div>

                {/* Live clock */}
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border,rgba(26,23,20,0.07))", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, color: "var(--ink-light,#9a9490)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Current Time</span>
                  <span style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "1.2rem", color: "var(--ink,#1a1714)", fontWeight: 400 }}>{timeStr}</span>
                </div>
              </div>

              {/* Geofence card */}
              <div style={{ background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 42, height: 42, background: "var(--cream,#faf7f2)", border: "1px solid var(--border-gold,rgba(184,150,90,0.25))", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold,#b8965a)", flexShrink: 0 }}>
                  <IconMapPin size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink,#1a1714)", marginBottom: 2 }}>Geofence Verified</div>
                  <div style={{ fontSize: 11, color: "var(--ink-muted,#5a5650)" }}>Within 15m of Lecture {ACTIVE_SESSION.hall}</div>
                </div>
                {/* Green "online" dot */}
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 0 3px rgba(16,185,129,0.2)", flexShrink: 0 }} />
              </div>

              {/* Security info card */}
              <div style={{ background: "var(--ink,#1a1714)", padding: "20px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(184,150,90,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <IconShield size={16} style={{ color: "var(--gold,#b8965a)" }} />
                  <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Security Protocol</span>
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                  This session uses a <strong style={{ color: "rgba(255,255,255,0.8)" }}>4-digit dynamic OTP</strong> combined with GPS geofence verification to prevent proxy attendance.
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: OTP entry ── */}
            <div style={{ background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "48px 44px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>

              {submitted ? (
                /* ── Success state ── */
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#d1fae5", border: "1px solid #a7f3d0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "#065f46" }}>
                    <IconCheckCircle size={32} />
                  </div>
                  <div style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "2.2rem", fontWeight: 300, color: "var(--ink,#1a1714)", marginBottom: 10 }}>
                    Attendance Recorded
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink-muted,#5a5650)", lineHeight: 1.7, marginBottom: 32, maxWidth: 340 }}>
                    Your presence for <strong>{ACTIVE_SESSION.name}</strong> has been successfully verified and logged.
                  </div>
                  <div style={{ background: "var(--cream,#faf7f2)", border: "1px solid var(--border-gold,rgba(184,150,90,0.35))", padding: "16px 24px", marginBottom: 28 }}>
                    <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-light,#9a9490)", marginBottom: 4 }}>Timestamp</div>
                    <div style={{ fontSize: 13, color: "var(--ink,#1a1714)" }}>
                      {now.toLocaleDateString()} · {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setOtp(""); }}
                    style={{ padding: "11px 32px", background: "none", border: "1px solid var(--ink,#1a1714)", cursor: "pointer", fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink,#1a1714)" }}>
                    Mark Another Session
                  </button>
                </div>

              ) : (
                /* ── OTP entry state ── */
                <>
                  <div style={{ textAlign: "center", marginBottom: 36 }}>
                    <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)", marginBottom: 10 }}>Identity Verification</div>
                    <h2 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "2rem", fontWeight: 300, color: "var(--ink,#1a1714)", marginBottom: 12 }}>
                      Enter Session Code
                    </h2>
                    <p style={{ fontSize: 13, color: "var(--ink-muted,#5a5650)", lineHeight: 1.7, maxWidth: 320 }}>
                      Enter the 4-digit dynamic code displayed on the hall projector or provided by your instructor.
                    </p>
                  </div>

                  {/* OtpInput is now a separate, reusable component */}
                  <div style={{ marginBottom: 28 }}>
                    <OtpInput value={otp} onChange={v => { setOtp(v); setError(false); }} />
                  </div>

                  {error && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#b91c1c", fontSize: 12, marginBottom: 20, padding: "10px 16px", background: "#fef2f2", border: "1px solid #fecaca", width: "100%" }}>
                      <IconAlertCircle size={14} /> Please enter the complete 4-digit code.
                    </div>
                  )}

                  {/* Decorative divider */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", marginBottom: 24 }}>
                    <div style={{ flex: 1, height: 1, background: "var(--border,rgba(26,23,20,0.08))" }} />
                    <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, color: "var(--ink-light,#9a9490)", letterSpacing: "0.16em", textTransform: "uppercase" }}>Confirm Presence</span>
                    <div style={{ flex: 1, height: 1, background: "var(--border,rgba(26,23,20,0.08))" }} />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    style={{ width: "100%", maxWidth: 380, padding: "16px 32px", background: submitting ? "var(--gold-dark,#8a6e3a)" : "var(--gold,#b8965a)", color: "#fff", border: "none", cursor: submitting ? "wait" : "pointer", fontFamily: "Montserrat,sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", transition: "background 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                    onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = "var(--gold-dark,#8a6e3a)"; }}
                    onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = "var(--gold,#b8965a)"; }}>
                    {submitting ? (
                      <>
                        <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                        Verifying…
                      </>
                    ) : (
                      <>Submit Attendance <IconArrow size={12} /></>
                    )}
                  </button>

                  <div style={{ marginTop: 20 }}>
                    <span style={{ fontSize: 12, color: "var(--ink-light,#9a9490)" }}>Experiencing issues? </span>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gold,#b8965a)", fontSize: 12, fontWeight: 500, textDecoration: "underline", padding: 0 }}>
                      Request Manual Verification
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── RECENT ATTENDANCE HISTORY ── */}
          <div style={{ background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)", marginBottom: 6 }}>Recent</div>
                <h3 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "1.4rem", fontWeight: 400, color: "var(--ink,#1a1714)" }}>Attendance History</h3>
              </div>
              <Link href="/student/history" style={{ textDecoration: "none" }}>
                <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "var(--gold,#b8965a)", fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  View All History <IconArrow size={11} />
                </button>
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {RECENT_HISTORY.map((h, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", border: "1px solid var(--border,rgba(26,23,20,0.07))", background: "var(--cream,#faf7f2)", transition: "border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-gold,rgba(184,150,90,0.35))"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border,rgba(26,23,20,0.07))"}>
                  {/* Subject icon */}
                  <div style={{ width: 36, height: 36, background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "var(--gold-dark,#8a6e3a)", flexShrink: 0 }}>
                    {h.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink,#1a1714)", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{h.subject}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-light,#9a9490)" }}>{h.date}</div>
                  </div>
                  {/* Present / Absent indicator */}
                  {h.status === "present"
                    ? <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#d1fae5", border: "1.5px solid #a7f3d0", display: "flex", alignItems: "center", justifyContent: "center", color: "#065f46", flexShrink: 0 }}><IconCheckCircle size={13} /></span>
                    : <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", background: "#ffdad6", color: "#93000a", padding: "3px 7px", flexShrink: 0 }}>Absent</span>
                  }
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* Global keyframe animations */}
      <style>{`
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}
