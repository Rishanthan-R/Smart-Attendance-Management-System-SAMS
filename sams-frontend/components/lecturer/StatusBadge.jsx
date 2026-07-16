"use client";
import React from "react";

/**
  * StatusBadge
  * Render uniform badges for active states, alerts, and results.
  */
export default function StatusBadge({ status, text }) {
  const getBadgeStyle = (val) => {
    const raw = String(val).toLowerCase().trim();
    switch (raw) {
      case "excellent":
      case "verified":
      case "approved":
      case "present":
        return "sams-badge verified";
      case "at risk":
      case "rejected":
      case "gps rejected":
      case "absent":
        return "sams-badge rejected";
      case "good":
      case "warning":
      case "excused":
      case "pending":
        return "sams-badge warning";
      case "live":
        return "sams-badge live";
      case "completed":
      case "past":
      default:
        return "sams-badge neutral";
    }
  };

  const getBadgeText = () => {
    if (text) return text;
    const raw = String(status).toUpperCase();
    if (raw === "LIVE") return "● LIVE";
    return raw;
  };

  return (
    <span className={getBadgeStyle(status)}>
      {getBadgeText()}
    </span>
  );
}
