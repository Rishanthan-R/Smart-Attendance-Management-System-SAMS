'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AdminNavbar } from '../../components/layout/adminNavbar';
import { Footer } from '../../components/layout/studentFooter';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState([
    { id: 1, type: "info", title: "System maintenance scheduled for tonight.", time: "2 hours ago" },
    { id: 2, type: "success", title: "Monthly reports generated successfully.", time: "Yesterday" }
  ]);

  // Determine active nav item
  let activeNav = "dashboard";
  if (pathname === "/admin/subjects" || pathname.startsWith("/admin/subjects/")) {
    activeNav = "subjects";
  } else if (pathname === "/admin/departments" || pathname.startsWith("/admin/departments/")) {
    activeNav = "departments";
  } else if (pathname === "/admin/users" || pathname.startsWith("/admin/users/")) {
    activeNav = "users";
  } else if (pathname === "/admin/profile") {
    activeNav = "profile";
  }

  return (
    <div className="admin-portal-root">
      {/* Top Navbar */}
      <AdminNavbar 
        activeNav={activeNav} 
        notifications={notifications} 
        setNotifications={setNotifications} 
        adminName="System Admin"
      />

      {/* Main Page Content */}
      <main className="admin-portal-main">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
