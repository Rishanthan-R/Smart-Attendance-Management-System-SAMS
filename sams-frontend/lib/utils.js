/* ═══════════════════════════════════════════════════════════════════
   lib/utils.js
   ---------------------------------------------------------------------
   WHY THIS FILE EXISTS
   progressColor() is a plain function (no JSX), used in more than
   one place on the dashboard (the course progress bars and the
   eligibility summary bars). Pure logic like this belongs in lib/,
   not copy-pasted per component.
═══════════════════════════════════════════════════════════════════ */

export function progressColor(pct) {
  if (pct >= 80) return "var(--gold)";
  if (pct >= 65) return "#d97706";
  return "#b91c1c";
}
