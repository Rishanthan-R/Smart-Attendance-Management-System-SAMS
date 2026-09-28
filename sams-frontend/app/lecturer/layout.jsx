"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Simple icons for Lecturer nav
function IconDashboard({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function IconCreateSession({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

function IconMySessions({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export default function LecturerLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("sams_token");
      const userStr = localStorage.getItem("sams_user");

      if (!token || !userStr) {
        router.push("/auth/login");
        return;
      }

      try {
        const parsedUser = JSON.parse(userStr);
        if (parsedUser.role !== "lecturer") {
          router.push("/auth/login");
          return;
        }
        setUser(parsedUser);
      } catch (err) {
        console.error(err);
        router.push("/auth/login");
      }
    })();
  }, [router]);

  if (!user) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--cream)" }}>Loading...</div>;
  }

  // Determine Initials
  const nameParts = user.full_name ? user.full_name.split(" ") : ["L", "P"];
  const initials = nameParts.length >= 2
    ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    : `${nameParts[0][0]}`.toUpperCase();

  const navItems = [
    { label: "Dashboard", href: "/lecturer", icon: <IconDashboard size={16} /> },
    { label: "Create Session", href: "/lecturer/sessions/create", icon: <IconCreateSession size={16} /> },
    { label: "My Sessions", href: "/lecturer/sessions", icon: <IconMySessions size={16} /> },
    { label: "Profile", href: "/lecturer/profile", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar
        portalLabel="LECTURER PORTAL"
        navItems={navItems}
        userName={user.full_name || "Lecturer"}
        userRole="Lecturer"
        userInitials={initials}
      />
      <main style={{ paddingTop: "72px", flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
