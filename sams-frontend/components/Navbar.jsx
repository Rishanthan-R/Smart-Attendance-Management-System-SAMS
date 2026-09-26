"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function IconBell({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function IconLogout({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

import { useState } from "react";

export default function Navbar({ portalLabel, navItems, userName, userRole, userInitials }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("sams_token");
    localStorage.removeItem("sams_user");
    router.push("/auth/login");
  };

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "72px",
      backgroundColor: "var(--cream)",
      borderBottom: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 48px",
      zIndex: 100
    }}>
      {/* Left: Branding */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <div>
          <Link href="/" className="logo-text" style={{ color: "var(--ink)", textDecoration: "none", fontSize: "20px" }}>
            SAMS
          </Link>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginTop: "2px"
          }}>
            {portalLabel}
          </div>
        </div>

        {/* Center-Left: Nav Links */}
        <div style={{ display: "flex", gap: "24px", marginLeft: "24px" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "11px",
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--ink)" : "var(--ink-muted)",
                  textDecoration: "none",
                  borderBottom: isActive ? "2px solid var(--gold)" : "2px solid transparent",
                  paddingBottom: "4px",
                  transition: "all 0.2s"
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right: User Profile & Logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        
        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: "none", border: "none", cursor: "pointer", 
              color: "var(--ink-muted)", display: "flex", alignItems: "center", justifyContent: "center",
              width: "36px", height: "36px", borderRadius: "50%",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
            onMouseOut={(e) => { e.currentTarget.style.color = "var(--ink-muted)"; e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <IconBell size={18} />
          </button>
          
          {showNotifications && (
            <div style={{
              position: "absolute", top: "100%", right: 0, marginTop: "8px",
              width: "320px", backgroundColor: "var(--white)", border: "1px solid var(--border)",
              borderRadius: "var(--radius)", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
              zIndex: 110, overflow: "hidden"
            }}>
              <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink)" }}>NOTIFICATIONS</span>
              </div>
              <div style={{ padding: "48px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ color: "var(--ink-light)", marginBottom: "12px" }}>
                  <IconBell size={32} />
                </div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", margin: 0, color: "var(--ink)" }}>No new notifications</h4>
                <p style={{ fontSize: "12px", color: "var(--ink-muted)", margin: "4px 0 0 0" }}>You&apos;re all caught up!</p>
              </div>
            </div>
          )}
        </div>

        <Link 
          href={`/${userRole ? userRole.toLowerCase() : "lecturer"}/profile`}
          style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", textDecoration: "none" }}
        >
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "var(--ink)",
            color: "var(--cream)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.05em"
          }}>
            {userInitials}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--ink)" }}>
              {userName}
            </span>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold-dark)" }}>
              {userRole}
            </span>
          </div>
        </Link>

        <div style={{ width: "1px", height: "32px", backgroundColor: "var(--border)" }}></div>

        <button 
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
            transition: "color 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.color = "var(--ink)"}
          onMouseOut={(e) => e.currentTarget.style.color = "var(--ink-muted)"}
        >
          <IconLogout size={16} />
          LOGOUT
        </button>
      </div>
    </nav>
  );
}
