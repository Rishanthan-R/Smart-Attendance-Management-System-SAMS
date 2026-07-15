"use client";
import React from "react";
import StatusBadge from "./StatusBadge";

export default function DashboardStatCard({ title, value, badgeText, badgeStatus, description, icon }) {
  return (
    <div className="dashboard-card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <span style={{ 
          fontFamily: "Montserrat, sans-serif", 
          fontSize: "9px", 
          fontWeight: 600, 
          letterSpacing: "0.18em", 
          textTransform: "uppercase",
          color: "var(--ink-light)"
        }}>
          {title}
        </span>
        {icon && <span style={{ color: "var(--gold)" }}>{icon}</span>}
      </div>

      {/* Value */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexGrow: 1 }}>
        <span style={{ 
          fontFamily: "Cormorant Garamond, Georgia, serif", 
          fontSize: "2.8rem", 
          fontWeight: 300, 
          color: "var(--ink)",
          lineHeight: 1
        }}>
          {value}
        </span>
        {badgeText && (
          <StatusBadge status={badgeStatus} text={badgeText} />
        )}
      </div>

      {/* Description */}
      {description && (
        <p style={{ 
          fontSize: "12px", 
          color: "var(--ink-light)", 
          marginTop: "12px", 
          fontWeight: 300,
          borderTop: "1px solid var(--border)",
          paddingTop: "10px"
        }}>
          {description}
        </p>
      )}
    </div>
  );
}
