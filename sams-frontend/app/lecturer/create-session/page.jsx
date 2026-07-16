"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ActionButton from "../../../components/lecturer/ActionButton";
import OTPDisplay from "../../../components/lecturer/OTPDisplay";
import { IconClock, IconLocation, IconCheck } from "../../../components/ui/Icons";

function CreateSessionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get("subject") || "";

  // Form State
  const [subject, setSubject] = useState(subjectParam || "ITC 3140");
  const [hall, setHall] = useState("Hall FOC-01");
  const [duration, setDuration] = useState("10"); // minutes
  const [customDuration, setCustomDuration] = useState("");

  // Live clock
  const [timeStr, setTimeStr] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // OTP Generation flow state
  const [isGenerating, setIsGenerating] = useState(false);
  const [otpCode, setOtpCode] = useState(null);
  const [secondsForRedirect, setSecondsForRedirect] = useState(5);

  const courses = [
    { code: "ITC 3140", name: "Software Engineering Project" },
    { code: "ITC 3250", name: "Database Systems" },
    { code: "ITC 3320", name: "Computer Networks" }
  ];

  const halls = [
    { id: "foc-01", label: "Hall FOC-01 (Faculty of Computing)" },
    { id: "foc-02", label: "Hall FOC-02 (Faculty of Computing)" },
    { id: "aud-01", label: "Main Auditorium USJ" }
  ];

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulate API delay for secure generation
    setTimeout(() => {
      // Generate a random 6 digit OTP
      const code = Math.floor(1 + Math.random() * 9000);
      setOtpCode(code);
      setIsGenerating(false);
    }, 1500);
  };

  // Handle countdown for redirect once OTP is active
  useEffect(() => {
    if (!otpCode) return;
    if (secondsForRedirect <= 0) {
      // Perform navigation to Live Session
      router.push(`/lecturer/live-session/active-${subject.toLowerCase().replace(" ", "-")}`);
      return;
    }

    const timer = setTimeout(() => {
      setSecondsForRedirect((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [otpCode, secondsForRedirect, subject, router]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", lg: "7fr 5fr", gap: "32px", alignItems: "start" }}>
      {/* Configuration Column */}
      <div className="dashboard-card" style={{ padding: "32px" }}>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: "1.7rem",
            fontWeight: 500,
            color: "var(--ink)",
            marginBottom: "24px"
          }}
        >
          Session Parameters
        </h2>

        {!otpCode ? (
          <form onSubmit={handleGenerate}>
            {/* Subject Select */}
            <div className="form-group">
              <label className="form-label" htmlFor="subject">Monitored Module</label>
              <select
                id="subject"
                className="form-input form-select"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              >
                {courses.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Lecture Hall Select */}
            <div className="form-group">
              <label className="form-label" htmlFor="hall">Lecture Location</label>
              <select
                id="hall"
                className="form-input form-select"
                value={hall}
                onChange={(e) => setHall(e.target.value)}
                required
              >
                {halls.map((h) => (
                  <option key={h.id} value={h.label}>
                    {h.label}
                  </option>
                ))}
              </select>
            </div>

            {/* OTP Expiration Time */}
            <div className="form-group">
              <label className="form-label">OTP Time Window</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "12px" }}>
                {["5", "10", "15"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setDuration(t);
                      setCustomDuration("");
                    }}
                    className={`role-btn ${duration === t && !customDuration ? "active" : ""}`}
                    style={{ border: "1px solid var(--border)", fontSize: "10px", padding: "10px" }}
                  >
                    {t} Minutes
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Or enter custom duration (minutes)..."
                value={customDuration}
                onChange={(e) => {
                  setCustomDuration(e.target.value);
                  setDuration(e.target.value);
                }}
                className="form-input"
                min="1"
                max="60"
              />
            </div>

            {/* Submit */}
            <ActionButton
              type="submit"
              variant="gold"
              disabled={isGenerating}
              style={{ width: "100%", marginTop: "12px" }}
            >
              {isGenerating ? "Encrypting OTP Channel..." : "Generate OTP & Start"}
            </ActionButton>
          </form>
        ) : (
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{
              background: "rgba(39, 174, 96, 0.08)",
              border: "1px solid rgba(39, 174, 96, 0.25)",
              color: "#27ae60",
              padding: "12px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "9.5px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase"
            }}>
              ✓ Secure Session Initialised
            </div>

            <p style={{ fontSize: "14px", color: "var(--ink-muted)", fontWeight: 300 }}>
              Broadcast this one-time code to the lecture hall. Students have {duration} minutes to verify check-in coordinates.
            </p>

            <OTPDisplay code={otpCode} initialSeconds={parseInt(duration) * 60} />

            <div style={{ marginTop: "12px", padding: "16px", background: "var(--cream)", border: "1px dashed var(--gold-light)" }}>
              <div className="pulse-dot" style={{ background: "#27ae60", animationDuration: "1s" }} />
              <span style={{ fontSize: "12.5px", color: "var(--ink-muted)", fontWeight: 300 }}>
                Redirecting to Live scanning console in <strong>{secondsForRedirect}</strong>s...
              </span>
              <ActionButton
                variant="ink"
                href={`/lecturer/live-session/active-${subject.toLowerCase().replace(" ", "-")}`}
                style={{ width: "100%", marginTop: "16px" }}
              >
                Go to Live Feed Now
              </ActionButton>
            </div>
          </div>
        )}
      </div>

      {/* Geofence & Status Column */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Live Clock Card */}
        <div className="dashboard-card" style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{ width: "40px", height: "40px", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyCenter: "center", color: "var(--gold)" }}>
            <IconClock size={20} style={{ margin: "auto" }} />
          </div>
          <div>
            <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "8.5px", fontWeight: 600, letterSpacing: "0.08em", color: "var(--ink-light)" }}>Live Server Clock</div>
            <div style={{ fontSize: "20px", fontFamily: "monospace", color: "var(--ink)", fontWeight: 600, marginTop: "2px" }}>
              {timeStr || "Ticking..."}
            </div>
          </div>
        </div>

        {/* Geofence Status Card */}
        <div className="dashboard-card" style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <span style={{ color: "var(--gold)" }}><IconLocation size={18} /></span>
            <h3 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink)" }}>
              Geofence Guard Calibration
            </h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "10px" }}>
              <span style={{ fontSize: "12px", color: "var(--ink-muted)" }}>Target Location</span>
              <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--ink)" }}>{hall}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "10px" }}>
              <span style={{ fontSize: "12px", color: "var(--ink-muted)" }}>Faculty Area Coordinates</span>
              <span style={{ fontSize: "11px", fontFamily: "monospace", color: "var(--ink)" }}>6.9012° N, 79.8601° E</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "10px" }}>
              <span style={{ fontSize: "12px", color: "var(--ink-muted)" }}>Tolerance Radius</span>
              <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--ink)" }}>50 Meters</span>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginTop: "8px" }}>
              <div style={{ width: "16px", height: "16px", background: "rgba(39, 174, 96, 0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#27ae60", marginTop: "2px" }}>
                <IconCheck size={10} />
              </div>
              <p style={{ fontSize: "11.5px", color: "var(--ink-muted)", lineHeight: 1.5, fontWeight: 300 }}>
                System GPS matches official maps of the Faculty of Computing, USJ. Attendance from students outside the geofence perimeter will automatically flag as GPS Rejected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateSessionPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Page Header */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          paddingBottom: "24px"
        }}
      >
        <span className="section-label" style={{ marginBottom: "6px", display: "block" }}>Faculty Operations</span>
        <h1 className="dashboard-heading" style={{ fontSize: "2.2rem" }}>
          Launch <em>Session</em>
        </h1>
        <p style={{ color: "var(--ink-muted)", fontSize: "14px", marginTop: "4px", fontWeight: 300 }}>
          Initialize GPS-gated check-in points and lock student codes.
        </p>
      </div>

      <Suspense fallback={
        <div style={{ padding: "50px", textAlign: "center", color: "var(--ink-light)" }}>
          Loading configuration...
        </div>
      }>
        <CreateSessionForm />
      </Suspense>
    </div>
  );
}
