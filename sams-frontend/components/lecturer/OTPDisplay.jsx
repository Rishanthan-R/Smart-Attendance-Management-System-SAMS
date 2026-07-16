"use client";
import React, { useState, useEffect } from "react";

export default function OTPDisplay({ code, initialSeconds = 300, onExpire }) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (onExpire) onExpire();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, onExpire]);

  // Format time (e.g. 300 -> "05:00")
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const digits = String(code).split("");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", padding: "16px 0" }}>
      {/* OTP Digits Grid */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        {digits.map((digit, idx) => (
          <div
            key={idx}
            style={{
              width: "56px",
              height: "72px",
              background: "var(--cream)",
              border: "1px solid var(--gold-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: "2.5rem",
              fontWeight: 400,
              color: "var(--ink)",
              boxShadow: "0 4px 10px rgba(184, 150, 90, 0.05)",
            }}
          >
            {digit}
          </div>
        ))}
      </div>

      {/* Timer and Expiration Label */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
        <span style={{ 
          fontFamily: "Montserrat, sans-serif", 
          fontSize: "9px", 
          fontWeight: 600, 
          letterSpacing: "0.14em", 
          textTransform: "uppercase",
          color: "var(--ink-light)" 
        }}>
          One-Time Code Expiry
        </span>
        <span style={{ 
          fontFamily: "Montserrat, sans-serif", 
          fontSize: "16px", 
          fontWeight: 600, 
          color: secondsLeft < 30 ? "#c0392b" : "var(--gold-dark)",
          letterSpacing: "0.05em"
        }}>
          {formatTime(secondsLeft)}
        </span>
      </div>
    </div>
  );
}
