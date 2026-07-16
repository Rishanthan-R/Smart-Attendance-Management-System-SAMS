"use client";
import React from "react";
import LecturerNavbar from "../../components/lecturer/LecturerNavbar";

export default function LecturerLayout({ children }) {
  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh", position: "relative" }}>
      {/* Top Navbar */}
      <LecturerNavbar />

      {/* Main Page Content Wrapper */}
      <main 
        style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          padding: "108px 24px 64px 24px",
        }}
      >
        {/* Entry page fade-in animation */}
        <div style={{ animation: "fade-up 0.5s ease-out forwards" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
