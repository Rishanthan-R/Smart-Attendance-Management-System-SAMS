"use client";
import React from "react";
import DashboardStatCard from "../../components/lecturer/DashboardStatCard";
import CourseCard from "../../components/lecturer/CourseCard";
import ActionButton from "../../components/lecturer/ActionButton";
import { IconPlus, IconBarChart, IconUsers, IconLocation, IconShield } from "../../components/ui/Icons";

export default function LecturerDashboard() {
  const courses = [
    {
      code: "ITC 3140",
      name: "Software Engineering Project",
      status: "Excellent",
      attendance: 92,
      schedule: "Mondays 10:00 AM - 12:00 PM",
      location: "Hall FOC-01",
      hasActiveSession: true,
      activeSessionId: "itc-3140-se"
    },
    {
      code: "ITC 3250",
      name: "Database Systems",
      status: "Good",
      attendance: 84,
      schedule: "Wednesdays 1:00 PM - 3:00 PM",
      location: "Hall FOC-02",
      hasActiveSession: false
    },
    {
      code: "ITC 3320",
      name: "Computer Networks",
      status: "At Risk",
      attendance: 74,
      schedule: "Thursdays 8:00 AM - 10:00 AM",
      location: "Hall FOC-01",
      hasActiveSession: false
    }
  ];

  const activeCourse = courses.find((c) => c.hasActiveSession);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* Welcome Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "28px"
        }}
      >
        <div>
          <span className="section-label" style={{ marginBottom: "6px", display: "block" }}>Faculty Console</span>
          <h1 className="dashboard-heading">
            Welcome Back, <em>Dr. J. Perera</em>
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: "14px", marginTop: "6px", fontWeight: 300 }}>
            Manage active sessions, review eligibility metrics, and process student exemptions.
          </p>
        </div>
        <ActionButton variant="gold" href="/lecturer/create-session">
          <IconPlus size={12} />
          Start New Session
        </ActionButton>
      </div>

      {/* Stats Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px"
        }}
      >
        {/* Card 1: Active Sessions */}
        {activeCourse ? (
          <div className="dashboard-card" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
            <div>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <span style={{ 
                  fontFamily: "Montserrat, sans-serif", 
                  fontSize: "9px", 
                  fontWeight: 600, 
                  letterSpacing: "0.18em", 
                  textTransform: "uppercase",
                  color: "var(--ink-light)"
                }}>
                  Active Sessions
                </span>
                <span style={{ color: "var(--gold)" }}>
                  <IconLocation size={20} />
                </span>
              </div>

              {/* Live Status Message */}
              <div style={{ marginBottom: "16px" }}>
                <h3 style={{ 
                  fontFamily: "Cormorant Garamond, Georgia, serif", 
                  fontSize: "1.6rem", 
                  fontWeight: 400, 
                  color: "var(--ink)",
                  lineHeight: 1.2
                }}>
                  You&apos;re live — <span style={{ color: "var(--gold-dark)" }}>{activeCourse.code}</span> is recording attendance.
                </h3>
              </div>
            </div>

            {/* Action button to jump into session */}
            <div style={{ marginTop: "auto" }}>
              <ActionButton 
                variant="gold" 
                href={`/lecturer/live-session/${activeCourse.activeSessionId}`} 
                style={{ width: "100%", padding: "8px 16px" }}
              >
                View Live Feed
              </ActionButton>
            </div>
          </div>
        ) : (
          <DashboardStatCard
            title="Active Sessions"
            value="0 Active"
            badgeText={null}
            badgeStatus="neutral"
            description="No attendance sessions are currently running"
            icon={<IconLocation size={20} />}
          />
        )}

        {/* Card 2: Total Students */}
        <DashboardStatCard
          title="Total Students"
          value="480"
          badgeText="Enrolled"
          badgeStatus="neutral"
          description="Undergraduates across all active modules"
          icon={<IconUsers size={20} />}
        />

        {/* Card 3: Current Term */}
        <DashboardStatCard
          title="Current Term"
          value="25 / 26"
          badgeText="Sem I"
          badgeStatus="neutral"
          description="Faculty of Computing · USJ academic cycle"
          icon={<IconShield size={20} />}
        />
      </div>

      {/* Monitored Courses Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <span className="section-label" style={{ marginBottom: "4px", display: "block" }}>Active Term Courses</span>
          <h2 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.8rem", fontWeight: 400, color: "var(--ink)" }}>
            Currently Monitored Modules
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px"
          }}
        >
          {courses.map((c, idx) => (
            <CourseCard
              key={idx}
              code={c.code}
              name={c.name}
              status={c.status}
              attendance={c.attendance}
              schedule={c.schedule}
              location={c.location}
              hasActiveSession={c.hasActiveSession}
              activeSessionId={c.activeSessionId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
