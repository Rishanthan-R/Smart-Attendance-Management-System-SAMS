/* ═══════════════════════════════════════════════════════════════════
   components/ui/StatCard.jsx
   ---------------------------------------------------------------------
   WHY THIS FILE EXISTS
   The dashboard renders 4 of these back to back (Attendance, Classes
   This Week, Courses Enrolled, Sessions Logged). It's only used on
   the dashboard page, so it lives under components/dashboard/ rather
   than the app-wide components/layout/ folder.

═══════════════════════════════════════════════════════════════════ */
"use client";

export function StatCard({ label, value, sub, icon, accent }) {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "28px 28px 24px", display: "flex", flexDirection: "column", gap: 12, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 20, right: 20, color: accent || "var(--gold)", opacity: 0.55 }}>{icon}</div>
      <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)" }}>{label}</div>
      <div style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "2.6rem", fontWeight: 300, lineHeight: 1, color: "var(--ink,#1a1714)" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--ink-muted,#5a5650)", fontWeight: 300 }}>{sub}</div>}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: accent || "var(--gold)", opacity: 0.18 }} />
    </div>
  );
}
