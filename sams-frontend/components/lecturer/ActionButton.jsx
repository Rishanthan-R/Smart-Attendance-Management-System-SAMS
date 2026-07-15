"use client";
import React from "react";
import Link from "next/link";

/**
 * ActionButton
 * Renders buttons styled according to the landing page styles:
 * - variant: "gold" | "outline-ink" | "ink"
 */
export default function ActionButton({ 
  children, 
  variant = "gold", 
  onClick, 
  href, 
  disabled = false, 
  type = "button",
  style = {},
  className = ""
}) {
  const getButtonClass = () => {
    switch (variant) {
      case "outline-ink":
        return "btn-outline-ink";
      case "ink":
        return "btn-ink";
      case "gold":
      default:
        return "btn-gold";
    }
  };

  const btnStyle = {
    padding: "10px 24px",
    fontSize: "9.5px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderWidth: "1px",
    borderRadius: "2px", // flat minimal
    ...style
  };

  if (href && !disabled) {
    return (
      <Link href={href} className={`${getButtonClass()} ${className}`} style={btnStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${getButtonClass()} ${className}`}
      style={btnStyle}
    >
      {children}
    </button>
  );
}
