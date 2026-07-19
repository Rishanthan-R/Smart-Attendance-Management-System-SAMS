"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { LecturerNavbar } from "../../components/lecturer/LecturerNavbar";
import { Footer } from "../../components/layout/studentFooter";

export default function LecturerLayout({ children }) {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState([
    { id: 1, type: "info", title: "New session request received.", time: "1 hour ago" },
    { id: 2, type: "warning", title: "Low attendance warning for Software Engineering.", time: "4 hours ago" }
  ]);

  // Determine active nav item
  let activeNav = "dashboard";
  if (pathname === "/lecturer/create-session" || pathname.startsWith("/lecturer/create-session/")) {
    activeNav = "create-session";
  } else if (pathname === "/lecturer/sessions" || pathname.startsWith("/lecturer/sessions/")) {
    activeNav = "my-sessions";
  } else if (pathname.startsWith("/lecturer/live-session/")) {
    activeNav = "live-session";
  } else if (pathname === "/lecturer/reports" || pathname.startsWith("/lecturer/reports/")) {
    activeNav = "reports";
  } else if (pathname === "/lecturer/profile") {
    activeNav = "profile";
  }

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Navbar */}
      <LecturerNavbar 
        activeNav={activeNav} 
        notifications={notifications} 
        setNotifications={setNotifications} 
        lecturerName="Dr. J. Perera"
      />

      {/* Main Page Content Wrapper */}
      <main 
        style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          padding: "108px 24px 64px 24px",
          flex: 1,
          width: "100%"
        }}
      >
        {/* Entry page fade-in animation */}
        <div style={{ animation: "fade-up 0.5s ease-out forwards" }}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
