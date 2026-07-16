"use client";
import React from "react";
import StatusBadge from "./StatusBadge";
import ActionButton from "./ActionButton";
import { IconArrow } from "../ui/Icons";

export default function CourseCard({ 
  code, 
  name, 
  status, 
  attendance, 
  schedule, 
  location, 
  hasActiveSession,
  activeSessionId
}) {
  // Determine progress bar color based on status
  const getProgressBarClass = () => {
    const raw = status.toLowerCase();
    if (raw.includes("risk")) return "progress-bar at-risk";
    if (raw.includes("excellent")) return "progress-bar excellent";
    return "progress-bar good";
  };

  return (
    <div className="dashboard-card" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
      <div>
        {/* Code & Status */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ 
            fontFamily: "Montserrat, sans-serif", 
            fontSize: "10px", 
            fontWeight: 600, 
            letterSpacing: "0.14em", 
            color: "var(--gold)"
          }}>
            {code}
          </span>
          <StatusBadge status={status} />
        </div>

        {/* Title */}
        <h3 style={{ 
          fontFamily: "Cormorant Garamond, Georgia, serif", 
          fontSize: "1.45rem", 
          fontWeight: 500, 
          color: "var(--ink)",
          marginBottom: "16px",
          lineHeight: 1.2
        }}>
          {name}
        </h3>

        {/* Schedule & Location */}
        <div style={{ fontSize: "12px", color: "var(--ink-muted)", marginBottom: "20px", fontWeight: 300, lineHeight: 1.6 }}>
          <div>{schedule}</div>
          <div style={{ color: "var(--ink-light)", fontSize: "11px", marginTop: "2px" }}>Location: {location}</div>
        </div>
      </div>

      {/* Progress & Button */}
      <div>
        <div className="progress-container" style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
            <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "8.5px", fontWeight: 600, letterSpacing: "0.08em", color: "var(--ink-light)" }}>Avg Attendance</span>
            <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "11px", fontWeight: 600, color: "var(--ink)" }}>{attendance}%</span>
          </div>
          <div className="progress-track">
            <div className={getProgressBarClass()} style={{ width: `${attendance}%` }} />
          </div>
        </div>

        {hasActiveSession ? (
          <ActionButton 
            variant="gold" 
            href={`/lecturer/live-session/${activeSessionId || code.toLowerCase().replace(" ", "-")}`}
            style={{ width: "100%" }}
          >
            Watch Live Session <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#fff", animation: "pulse-dot-anim 1.2s infinite", marginLeft: "4px" }} />
          </ActionButton>
        ) : (
          <ActionButton 
            variant="outline-ink" 
            href={`/lecturer/create-session?subject=${code}`}
            style={{ width: "100%" }}
          >
            Start New Session <IconArrow size={10} />
          </ActionButton>
        )}
      </div>
    </div>
  );
}
