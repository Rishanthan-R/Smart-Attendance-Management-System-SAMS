'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* ─── SVG Icons (matching landing page style) ────────────────────── */
function IconDashboard({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function IconBook({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
function IconBuilding({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" /><path d="M9 22V12h6v10" />
      <path d="M9 7h.01M12 7h.01M15 7h.01M9 11h.01M12 11h.01M15 11h.01" />
    </svg>
  );
}
function IconUsers({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconLogout({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16,17 21,12 16,7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
function IconChevron({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6,9 12,15 18,9" />
    </svg>
  );
}
function IconSettings({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function IconDiamond({ size = 8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L22 12 12 22 2 12z" />
    </svg>
  );
}
function IconMenu({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function IconX({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: <IconDashboard size={14} /> },
  { href: '/admin/subjects', label: 'Subjects', icon: <IconBook size={14} /> },
  { href: '/admin/departments', label: 'Departments', icon: <IconBuilding size={14} /> },
  { href: '/admin/users', label: 'Users', icon: <IconUsers size={14} /> },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  function isActive(href) {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  return (
    <div className="admin-body">
      {/* ── TOP NAVBAR ── */}
      <nav className="admin-nav">
        {/* Logo */}
        <Link href="/admin" style={{ textDecoration: 'none' }}>
          <div className="admin-nav-logo">
            <span className="admin-nav-logo-text">SAMS</span>
            <span className="admin-nav-logo-sub">Admin Portal</span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="admin-nav-links">
          {/* Ornament left */}
          <span style={{ color: 'var(--gold)', opacity: 0.4, marginRight: 6 }}>
            <IconDiamond size={6} />
          </span>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-link${isActive(item.href) ? ' active' : ''}`}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ opacity: 0.7 }}>{item.icon}</span>
                {item.label}
              </span>
            </Link>
          ))}
          {/* Ornament right */}
          <span style={{ color: 'var(--gold)', opacity: 0.4, marginLeft: 6 }}>
            <IconDiamond size={6} />
          </span>
        </div>

        {/* Right: Profile + Logout */}
        <div className="admin-nav-right">
          {/* Profile Dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              className="admin-profile"
              onClick={() => setDropdownOpen(v => !v)}
              aria-label="Admin profile menu"
            >
              <div className="admin-avatar">SA</div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span className="admin-profile-name">System Admin</span>
                <span className="admin-profile-role">Administrator</span>
              </div>
              <span style={{
                color: 'var(--ink-light)',
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.2s',
                display: 'flex'
              }}>
                <IconChevron />
              </span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="admin-profile-dropdown">
                <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>
                    Signed in as
                  </div>
                  <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1rem', color: 'var(--ink)' }}>System Admin</div>
                  <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, color: 'var(--ink-light)', letterSpacing: '0.1em', marginTop: 2 }}>admin@sams.edu.lk</div>
                </div>
                <button className="admin-dropdown-item">
                  <IconSettings size={13} /> Profile Settings
                </button>
                <div className="admin-dropdown-divider" />
                <button className="admin-dropdown-item danger">
                  <IconLogout size={13} /> Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Logout Button (desktop only) */}
          <button className="admin-logout-btn" style={{ display: 'flex' }}>
            <IconLogout size={13} />
            <span>Logout</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(v => !v)}
            style={{ display: 'none', background: 'none', border: '1px solid var(--border)', padding: '7px', cursor: 'pointer', color: 'var(--ink)' }}
            className="admin-mobile-toggle"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE NAV DRAWER ── */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed', top: 68, left: 0, right: 0, zIndex: 99,
          background: 'rgba(250,247,242,0.98)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-gold)',
          padding: '12px 20px 20px',
          boxShadow: '0 8px 32px rgba(26,23,20,0.10)',
        }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-link${isActive(item.href) ? ' active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', marginBottom: 4 }}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <button className="admin-logout-btn" style={{ width: '100%', justifyContent: 'center' }}>
              <IconLogout size={13} /> Logout
            </button>
          </div>
        </div>
      )}

      {/* ── PAGE CONTENT ── */}
      <main className="admin-content">
        <div className="admin-page">
          {children}
        </div>
      </main>

      <style>{`
        @media (max-width: 900px) {
          .admin-mobile-toggle { display: flex !important; }
          .admin-logout-btn { display: none !important; }
        }
      `}</style>
    </div>
  );
}
