"use client";
import React, { useState } from "react";
import SessionRow from "../../../components/lecturer/SessionRow";
import ActionButton from "../../../components/lecturer/ActionButton";
import { IconPlus, IconSearch } from "../../../components/ui/Icons";

export default function SessionsPage() {
  const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"
  const [courseFilter, setCourseFilter] = useState("all");
  const [dateSearch, setDateSearch] = useState("");

  const sessionsData = [
    {
      id: "itc-3140-se",
      code: "ITC 3140",
      name: "Software Engineering Project",
      date: "July 15, 2026",
      time: "10:00 AM - 12:00 PM",
      location: "Hall FOC-01",
      present: 124,
      total: 150,
      status: "Live"
    },
    {
      id: "itc-3250-db-1",
      code: "ITC 3250",
      name: "Database Systems",
      date: "July 13, 2026",
      time: "01:00 PM - 03:00 PM",
      location: "Hall FOC-02",
      present: 158,
      total: 180,
      status: "Completed"
    },
    {
      id: "itc-3140-se-2",
      code: "ITC 3140",
      name: "Software Engineering Project",
      date: "July 12, 2026",
      time: "10:00 AM - 12:00 PM",
      location: "Hall FOC-01",
      present: 135,
      total: 150,
      status: "Completed"
    },
    {
      id: "itc-3320-cn-1",
      code: "ITC 3320",
      name: "Computer Networks",
      date: "July 09, 2026",
      time: "08:00 AM - 10:00 AM",
      location: "Hall FOC-01",
      present: 110,
      total: 150,
      status: "Completed"
    },
    {
      id: "itc-3250-db-2",
      code: "ITC 3250",
      name: "Database Systems",
      date: "July 06, 2026",
      time: "01:00 PM - 03:00 PM",
      location: "Hall FOC-02",
      present: 145,
      total: 180,
      status: "Completed"
    }
  ];

  // Filtering & searching 
  const filteredSessions = sessionsData.filter((s) => {
    const matchesCourse =
      courseFilter === "all" || s.code === courseFilter;

    const matchesDate =
      s.date.toLowerCase().includes(dateSearch.toLowerCase());

    let matchesState = true;
    if (filter === "active") matchesState = s.status.toLowerCase() === "live";
    else if (filter === "completed") matchesState = s.status.toLowerCase() === "completed";

    return matchesCourse && matchesDate && matchesState;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "24px"
        }}
      >
        <div>
          <span className="section-label" style={{ marginBottom: "6px", display: "block" }}>Attendance Registry</span>
          <h1 className="dashboard-heading" style={{ fontSize: "2.2rem" }}>
            Session <em>Log</em>
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: "14px", marginTop: "4px", fontWeight: 300 }}>
            Browse active geofenced rosters, export historic logs, and review statistics.
          </p>
        </div>
        <ActionButton variant="gold" href="/lecturer/create-session">
          <IconPlus size={12} />
          Start New Session
        </ActionButton>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          background: "var(--cream-dark)",
          padding: "16px 20px",
          border: "1px solid var(--border)"
        }}
      >
        {/* State filters */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setFilter("all")}
            className="nav-link"
            style={{
              color: filter === "all" ? "var(--gold-dark)" : "var(--ink-muted)",
              fontWeight: 600,
              fontSize: "10px",
              padding: "4px 8px",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            All Sessions
          </button>
          <span style={{ color: "var(--border)" }}>|</span>
          <button
            onClick={() => setFilter("active")}
            className="nav-link"
            style={{
              color: filter === "active" ? "var(--gold-dark)" : "var(--ink-muted)",
              fontWeight: 600,
              fontSize: "10px",
              padding: "4px 8px",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            Active
          </button>
          <span style={{ color: "var(--border)" }}>|</span>
          <button
            onClick={() => setFilter("completed")}
            className="nav-link"
            style={{
              color: filter === "completed" ? "var(--gold-dark)" : "var(--ink-muted)",
              fontWeight: 600,
              fontSize: "10px",
              padding: "4px 8px",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            Completed
          </button>
        </div>

        {/* Filter Controls Group */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", flex: "1 1 auto", justifyContent: "flex-end" }}>



          {/* Course Dropdown */}
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="form-input form-select"
            style={{ width: "160px", height: "40px", fontSize: "13px", padding: "0 36px 0 16px" }}
          >
            <option value="all">All Courses</option>
            <option value="ITC 3140">ITC 3140</option>
            <option value="ITC 3250">ITC 3250</option>
            <option value="ITC 3320">ITC 3320</option>
          </select>

          {/* Date Search Input */}
          <div style={{ position: "relative", width: "100%", maxWidth: "180px", minWidth: "140px" }}>
            <input
              type="text"
              placeholder="Search by date..."
              value={dateSearch}
              onChange={(e) => setDateSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: "40px", height: "40px", fontSize: "13px" }}
            />
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-light)" }}>
              <IconSearch size={14} />
            </span>
          </div>
        </div>
      </div>

      {/* Sessions list */}
      <div>
        {filteredSessions.length === 0 ? (
          <div
            className="dashboard-card"
            style={{
              textAlign: "center",
              padding: "56px 0",
              color: "var(--ink-light)",
              fontStyle: "italic"
            }}
          >
            No sessions matching the selected filter criteria.
          </div>
        ) : (
          filteredSessions.map((s) => (
            <SessionRow
              key={s.id}
              id={s.id}
              code={s.code}
              name={s.name}
              date={s.date}
              time={s.time}
              location={s.location}
              present={s.present}
              total={s.total}
              status={s.status}
            />
          ))
        )}
      </div>
    </div>
  );
}