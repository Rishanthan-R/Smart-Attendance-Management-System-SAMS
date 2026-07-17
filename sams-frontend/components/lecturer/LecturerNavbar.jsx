"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IconChevronDown, IconLogout, IconPlus } from "../ui/Icons";
import ProfileDropdown from "./ProfileDropdown";

export default function LecturerNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "Dashboard", href: "/lecturer" },
    { label: "Sessions", href: "/lecturer/sessions" },
    { label: "Records", href: "/lecturer/attendance-history" },
    { label: "Reports", href: "/lecturer/reports" },
  ];

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <nav className="lecturer-nav">
      <div className="lecturer-nav-container">
        {/* Logo and Sub */}
        <Link href="/lecturer" className="lecturer-logo">
          SAMS
          <span className="lecturer-logo-sub">Lecturer Portal</span>
        </Link>

        {/* Desktop Menu */}
        <div className="lecturer-menu">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`lecturer-menu-link ${pathname === item.href || (item.href !== "/lecturer" && pathname.startsWith(item.href))
                  ? "active"
                  : ""
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Profile Card & Dropdown (Desktop) / Hamburger Trigger */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <div className="profile-section" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="profile-avatar">JP</div>
              <div className="profile-info">
                <span className="profile-name">Dr. J. Perera</span>
                <span className="profile-role">LECTURER</span>
              </div>
              <IconChevronDown size={12} style={{ color: "var(--ink-light)" }} />
            </div>

            {dropdownOpen && <ProfileDropdown onClose={() => setDropdownOpen(false)} />}
          </div>

          {/* Desktop Logout Button */}
          <button
            onClick={handleLogout}
            className="lecturer-logout-btn"
            style={{
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              border: "1px solid var(--border)",
              background: "var(--white)",
              color: "var(--ink)",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "10px",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: "2px",
            }}
          >
            <IconLogout size={12} />
            Logout
          </button>

          {/* Mobile hamburger menu button */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{ padding: "8px", cursor: "pointer" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "72px",
            left: 0,
            right: 0,
            background: "var(--white)",
            borderBottom: "1px solid var(--border)",
            padding: "16px 24px",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`lecturer-menu-link ${pathname === item.href || (item.href !== "/lecturer" && pathname.startsWith(item.href))
                  ? "active"
                  : ""
                }`}
              style={{ padding: "8px 0" }}
            >
              {item.label}
            </Link>
          ))}
          <div style={{ height: "1px", background: "var(--border)", margin: "8px 0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "4px" }}>
            <div className="profile-avatar">JP</div>
            <div className="profile-info">
              <span className="profile-name">Dr. J. Perera</span>
              <span className="profile-role" style={{ color: "var(--gold)" }}>Staff Email: j.perera@sjp.ac.lk</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 14px",
              border: "1px solid #c0392b",
              background: "transparent",
              color: "#c0392b",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              justifyContent: "center",
              marginTop: "8px",
            }}
          >
            <IconLogout size={12} />
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}
