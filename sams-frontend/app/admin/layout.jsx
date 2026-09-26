"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("sams_token");
    const userStr = localStorage.getItem("sams_user");

    if (!token || !userStr) {
      router.push("/auth/admin");
      return;
    }

    try {
      const parsedUser = JSON.parse(userStr);
      if (parsedUser.role !== "admin" && parsedUser.profile?.role !== "admin") {
        router.push("/auth/admin");
        return;
      }
      setUser(parsedUser);
      setAuthorized(true);
    } catch (e) {
      localStorage.removeItem("sams_token");
      localStorage.removeItem("sams_user");
      router.push("/auth/admin");
    }
  }, [router]);

  if (!authorized) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--cream)" }}>Loading...</div>;
  }

  // Determine Initials
  const nameParts = user.full_name ? user.full_name.split(" ") : ["A", "D"];
  const initials = nameParts.length >= 2 
    ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    : `${nameParts[0][0]}`.toUpperCase();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg> },
    { label: "Users", href: "/admin/users", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg> },
    { label: "Modules", href: "/admin/modules", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
    { label: "Departments", href: "/admin/departments", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg> }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar 
        portalLabel="ADMIN PORTAL" 
        navItems={navItems}
        userName={user.full_name || "Administrator"}
        userRole="System Admin"
        userInitials={initials}
      />
      <main style={{ paddingTop: "72px", flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
