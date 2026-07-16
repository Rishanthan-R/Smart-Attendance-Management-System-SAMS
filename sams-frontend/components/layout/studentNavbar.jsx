"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import {
  IconGrid, IconBook, IconCalendar, IconClock, IconUser,
  IconBell, IconSettings, IconLogOut, IconSearch, IconChevronDown,
  IconAlertCircle, IconInfo, IconCheckCircle, IconX,
} from "../../components/icons/studentIcons";

/* Nav links live here (rather than a shared /lib/constants file)
   because they're only ever consumed by the Navbar itself. */
export const NAV_ITEMS = [
  { id: "dashboard",  label: "Dashboard",  icon: <IconGrid size={17} />,     href: "/student/dashboard" },
  { id: "courses",    label: "Courses",    icon: <IconBook size={17} />,     href: "/student/courses" },
  { id: "attendance", label: "Attendance", icon: <IconCalendar size={17} />, href: "/student/attendance" },
  { id: "history",    label: "History",    icon: <IconClock size={17} />,   href: "/student/history" },
  { id: "profile",    label: "Profile",    icon: <IconUser size={17} />,     href: "/student/profile" },
];

const NOTIF_STYLES = {
  info:    { bg: "#f0f9ff", border: "#bae6fd", icon: <IconInfo size={15} />, iconColor: "#0369a1" },
  success: { bg: "#f0fdf4", border: "#bbf7d0", icon: <IconCheckCircle size={15} />, iconColor: "#15803d" },
  warning: { bg: "#fffbeb", border: "#fde68a", icon: <IconAlertCircle size={15} />, iconColor: "#b45309" },
};

export function Navbar({ activeNav, notifications = [], setNotifications, yearOfStudy = "Year 3" }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useOutsideClick(profileRef, () => setProfileOpen(false));
  useOutsideClick(notifRef, () => setNotifOpen(false));

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 64, background: "rgba(250,247,242,0.96)", backdropFilter: "blur(14px)", borderBottom: "1px solid var(--border,rgba(26,23,20,0.10))", display: "flex", alignItems: "center", padding: "0 32px", gap: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 40 }}>
        <span style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: 20, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink,#1a1714)" }}>SAMS</span>
        <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-light,#9a9490)", marginTop: 2 }}>Student Portal</span>
      </div>

      <nav style={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
        {NAV_ITEMS.map(item => (
          <Link key={item.id} href={item.href} style={{ textDecoration: "none" }}>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: activeNav === item.id ? "var(--gold,#b8965a)" : "transparent", color: activeNav === item.id ? "#fff" : "var(--ink-muted,#5a5650)", border: "none", cursor: "pointer", fontFamily: "Montserrat,sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", transition: "background 0.2s, color 0.2s", borderRadius: 0 }}>
              {item.icon}{item.label}
            </button>
          </Link>
        ))}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--cream-dark,#f0ebe1)", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "6px 14px", marginRight: 4 }}>
          <IconSearch size={14} />
          <input placeholder="Search sessions…" style={{ background: "none", border: "none", outline: "none", fontSize: 12, color: "var(--ink,#1a1714)", width: 140, fontFamily: "Inter,sans-serif" }} />
        </div>

        {/* ── Notifications dropdown ── */}
        <div ref={notifRef} style={{ position: "relative" }}>
          <button onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }} style={{ position: "relative", background: "none", border: "1px solid var(--border,rgba(26,23,20,0.10))", cursor: "pointer", padding: "7px 9px", color: "var(--ink-muted,#5a5650)", display: "flex", alignItems: "center" }}>
            <IconBell size={17} />
            {notifications.length > 0 && <span style={{ position: "absolute", top: 4, right: 4, width: 7, height: 7, borderRadius: "50%", background: "var(--gold,#b8965a)", border: "1.5px solid #faf7f2" }} />}
          </button>
          {notifOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: 320, background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", boxShadow: "0 12px 40px rgba(26,23,20,0.10)", zIndex: 300 }}>
              <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid var(--border,rgba(26,23,20,0.10))", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>Notifications</span>
                {notifications.length > 0 && <span style={{ background: "var(--gold,#b8965a)", color: "#fff", fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 700, padding: "2px 7px" }}>{notifications.length} new</span>}
              </div>
              <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
                {notifications.length === 0
                  ? <div style={{ fontSize: 12, color: "var(--ink-light,#9a9490)", padding: "16px 4px", textAlign: "center" }}>No new notifications</div>
                  : notifications.map(n => { const s = NOTIF_STYLES[n.type] || NOTIF_STYLES.info; return (
                    <div key={n.id} style={{ background: s.bg, border: `1px solid ${s.border}`, padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: s.iconColor, flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
                      <div style={{ flex: 1 }}><div style={{ fontSize: 12.5, color: "var(--ink,#1a1714)", lineHeight: 1.5 }}>{n.title}</div><div style={{ fontSize: 11, color: "var(--ink-light,#9a9490)", marginTop: 3 }}>{n.time}</div></div>
                      <button onClick={() => setNotifications(prev => prev.filter(x => x.id !== n.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-light,#9a9490)", padding: 2 }}><IconX size={12} /></button>
                    </div>
                  );})}
              </div>
            </div>
          )}
        </div>

        <button style={{ background: "none", border: "1px solid var(--border,rgba(26,23,20,0.10))", cursor: "pointer", padding: "7px 9px", color: "var(--ink-muted,#5a5650)", display: "flex", alignItems: "center" }}><IconSettings size={17} /></button>

        {/* ── Profile dropdown (Medical Portal link removed) ── */}
        <div ref={profileRef} style={{ position: "relative" }}>
          <button onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "1px solid var(--border,rgba(26,23,20,0.10))", cursor: "pointer", padding: "5px 12px 5px 6px" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--gold,#b8965a)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Cormorant Garamond,serif", fontSize: 14, fontWeight: 600, color: "#fff" }}>A</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: "var(--ink,#1a1714)" }}>Alex Johnson</div>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, color: "var(--ink-light,#9a9490)", letterSpacing: "0.1em", textTransform: "uppercase" }}>CS — {yearOfStudy}</div>
            </div>
            <IconChevronDown size={12} />
          </button>
          {profileOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: 200, background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", boxShadow: "0 12px 40px rgba(26,23,20,0.10)", zIndex: 300 }}>
              {[
                { icon: <IconUser size={14} />, label: "My Profile", href: "/student/profile" },
                { icon: <IconSettings size={14} />, label: "Settings", href: "#" },
              ].map(item => (
                <Link key={item.label} href={item.href} style={{ textDecoration: "none" }}>
                  <button style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", background: "none", border: "none", borderBottom: "1px solid var(--border,rgba(26,23,20,0.06))", cursor: "pointer", color: "var(--ink-muted,#5a5650)", fontFamily: "Montserrat,sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textAlign: "left" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--cream-dark,#f0ebe1)"}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}>
                    {item.icon}{item.label}
                  </button>
                </Link>
              ))}
              <Link href="/auth/login" style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", color: "#b91c1c", fontFamily: "Montserrat,sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textDecoration: "none" }}>
                <IconLogOut size={14} />Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
