'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

/* ─── SVG Icons ───────────────────────────────────────────────────── */
function IconGrid({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function IconBook({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
function IconBuilding({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" /><path d="M9 22V12h6v10" />
      <path d="M9 7h.01M12 7h.01M15 7h.01M9 11h.01M12 11h.01M15 11h.01" />
    </svg>
  );
}
function IconUsers({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconLogout({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
function IconChevDown({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="6,9 12,15 18,9" />
    </svg>
  );
}

const NAV_LINKS = [
  { href: '/admin',             label: 'Dashboard',   icon: <IconGrid size={14} /> },
  { href: '/admin/subjects',    label: 'Subjects',    icon: <IconBook size={14} /> },
  { href: '/admin/departments', label: 'Departments', icon: <IconBuilding size={14} /> },
  { href: '/admin/users',       label: 'Users',       icon: <IconUsers size={14} /> },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  function isActive(href) {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  return (
    <div className="admin-portal-root">
      {/* ── TOP NAV ── */}
      <nav className="admin-portal-nav">
        {/* Left: Logo */}
        <div className="admin-portal-nav-left">
          <Link href="/admin" className="admin-portal-logo">
            <span className="admin-portal-logo-text">SAMS</span>
            <span className="admin-portal-logo-sub">Admin Portal</span>
          </Link>

          <span className="admin-portal-nav-sep" />

          {/* Nav links */}
          <div className="admin-portal-nav-links">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`admin-portal-nav-link${isActive(link.href) ? ' active' : ''}`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: User + Logout */}
        <div className="admin-portal-nav-right">
          <div className="admin-portal-user">
            <div className="admin-portal-avatar">SA</div>
            <div className="admin-portal-user-info">
              <div className="admin-portal-user-name">System Admin</div>
              <div className="admin-portal-user-role">Administrator</div>
            </div>
            <IconChevDown size={11} />
          </div>

          <button className="admin-portal-logout-btn" onClick={() => window.location.href = '/auth/login'}>
            <IconLogout size={14} />
            Logout
          </button>
        </div>
      </nav>

      {/* ── PAGE CONTENT ── */}
      <main className="admin-portal-main">
        {children}
      </main>
    </div>
  );
}
