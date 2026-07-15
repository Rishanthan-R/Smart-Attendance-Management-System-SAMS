"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconSettings, IconLogout, IconUsers } from "../ui/Icons";

export default function ProfileDropdown({ onClose }) {
  const router = useRouter();

  const handleLogout = () => {
    // Perform simulated logout cleanup if any
    onClose();
    router.push("/");
  };

  return (
    <div className="dropdown-menu">
      <div className="dropdown-header">
        <div className="dropdown-header-name">Dr. J. Perera</div>
        <div className="dropdown-header-info">j.perera@sjp.ac.lk</div>
        <div className="dropdown-header-info" style={{ fontSize: "10px", marginTop: "1px" }}>ID: FOC/L/0042</div>
      </div>
      
      <button 
        className="dropdown-item" 
        onClick={() => {
          alert("Profile editing is a student-lecturer self service. Contact admin if you need to update registration parameters.");
          onClose();
        }}
      >
        <IconUsers size={12} />
        Account Profile
      </button>
      
      <button 
        className="dropdown-item" 
        onClick={() => {
          alert("Settings page is under faculty review. Your session geofencing is currently set to standard USJ parameters.");
          onClose();
        }}
      >
        <IconSettings size={12} />
        Portal Settings
      </button>

      <div className="dropdown-divider" />
      
      <button className="dropdown-item logout" onClick={handleLogout}>
        <IconLogout size={12} />
        Sign Out
      </button>
    </div>
  );
}
