/**
 * components/ui/OtpInput.jsx
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHAT:  A 6-digit OTP (One-Time Password) input built from six individual
 *        single-character boxes that auto-advance focus and handle backspace.
 *
 * WHY:   Previously defined inline inside app/student/attendance/page.jsx.
 *        Extracting it here keeps the page file focused on layout/state, and
 *        makes this widget reusable on any future verification screen.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";
import { useRef } from "react";

export default function OtpInput({ value, onChange, length = 4 }) {
  const inputs = useRef([]);
  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);

  function handleKey(i, e) {
    if (e.key === "Backspace") {
      const newVal = value.slice(0, i) + value.slice(i + 1);
      onChange(newVal);
      if (i > 0) inputs.current[i - 1]?.focus();
    }
  }

  function handleChange(i, e) {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    const arr  = value.split("").concat(Array(length).fill("")).slice(0, length);
    arr[i]     = char;
    const newVal = arr.join("").replace(/ /g, "").slice(0, length);
    onChange(newVal);
    if (char && i < length - 1) inputs.current[i + 1]?.focus();
  }

  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] || ""}
          onChange={e => handleChange(i, e)}
          onKeyDown={e => handleKey(i, e)}
          onFocus={e => {
            e.target.style.borderColor = "var(--gold,#b8965a)";
            e.target.style.boxShadow   = "0 0 0 3px rgba(184,150,90,0.12)";
          }}
          onBlur={e => {
            if (!digits[i]) e.target.style.borderColor = "var(--border,rgba(26,23,20,0.15))";
            e.target.style.boxShadow = "none";
          }}
          style={{
            width: 52, height: 64, textAlign: "center",
            fontFamily: "Cormorant Garamond,Georgia,serif",
            fontSize: "1.8rem", fontWeight: 600,
            color: "var(--ink,#1a1714)",
            border: digits[i]
              ? "1.5px solid var(--gold,#b8965a)"
              : "1.5px solid var(--border,rgba(26,23,20,0.15))",
            background: digits[i] ? "var(--cream,#faf7f2)" : "#fff",
            outline: "none", cursor: "text",
            transition: "border-color 0.2s, background 0.2s",
          }}
        />
      ))}
    </div>
  );
}
