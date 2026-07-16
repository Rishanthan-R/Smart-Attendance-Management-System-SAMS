"use client";
import React from "react";
import StatusBadge from "./StatusBadge";
import ActionButton from "./ActionButton";
import { IconArrow, IconDownload } from "../ui/Icons";

export default function SessionRow({ 
  id,
  code, 
  name, 
  date, 
  time, 
  location, 
  present, 
  total, 
  status 
}) {
  const isLive = status.toLowerCase() === "live";

  return (
    <div 
      className="dashboard-card" 
      style={{ 
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 
        gap: "24px",
        padding: "16px 24px",
        marginBottom: "12px",
        flexWrap: "wrap"
      }}
    >
      {/* Session Primary Info */}
      <div style={{ flex: "1 1 300px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
          <span style={{ 
            fontFamily: "Montserrat, sans-serif", 
            fontSize: "10px", 
            fontWeight: 600, 
            letterSpacing: "0.1em", 
            color: "var(--gold)"
          }}>
            {code}
          </span>
          <StatusBadge status={status} />
        </div>
        <h4 style={{ 
          fontFamily: "Cormorant Garamond, Georgia, serif", 
          fontSize: "1.25rem", 
          fontWeight: 500, 
          color: "var(--ink)"
        }}>
          {name}
        </h4>
      </div>

      {/* Date, Time, Location */}
      <div style={{ flex: "1 1 200px", fontSize: "12.5px", color: "var(--ink-muted)", fontWeight: 300 }}>
        <div>{date} · {time}</div>
        <div style={{ color: "var(--ink-light)", fontSize: "11px", marginTop: "2px" }}>Lecture Hall: {location}</div>
      </div>

      {/* Roster Attendance Summary */}
      <div style={{ flex: "0 1 120px" }}>
        <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "8.5px", fontWeight: 600, letterSpacing: "0.08em", color: "var(--ink-light)" }}>Check-Ins</div>
        <div style={{ fontSize: "16px", color: "var(--ink)", fontWeight: 500, marginTop: "2px" }}>
          {present} <span style={{ color: "var(--ink-light)", fontSize: "12px", fontWeight: 300 }}>/ {total}</span>
        </div>
      </div>

      {/* Action Trigger */}
      <div>
        {isLive ? (
          <ActionButton 
            variant="gold" 
            href={`/lecturer/live-session/${id || code.toLowerCase().replace(" ", "-")}`}
          >
            Watch Live <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#fff", animation: "pulse-dot-anim 1.2s infinite", marginLeft: "4px" }} />
          </ActionButton>
        ) : (
          <ActionButton 
            variant="outline-ink" 
            onClick={() => {
              alert(`Exporting records for ${code} on ${date}. File ${code}_Attendance_${date.replace(/\s+/g, "_")}.csv has been requested.`);
            }}
          >
            Export <IconDownload size={11} />
          </ActionButton>
        )}
      </div>
    </div>
  );
}
