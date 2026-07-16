"use client";
import React, { useState } from "react";
import ActionButton from "../../../components/lecturer/ActionButton";
import StatusBadge from "../../../components/lecturer/StatusBadge";
import { IconDownload, IconFilter } from "../../../components/ui/Icons";

export default function ReportsPage() {
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedRange, setSelectedRange] = useState("semester");
  const [isExportingAll, setIsExportingAll] = useState(false);
  const [exportTarget, setExportTarget] = useState(null); // null | "csv" | "pdf"

  const reportsData = [
    {
      code: "ITC 3140",
      name: "Software Engineering Project",
      sessions: 12,
      enrolled: 150,
      attendance: 92,
      status: "Excellent"
    },
    {
      code: "ITC 3250",
      name: "Database Systems",
      sessions: 10,
      enrolled: 180,
      attendance: 84,
      status: "Good"
    },
    {
      code: "ITC 3320",
      name: "Computer Networks",
      sessions: 14,
      enrolled: 150,
      attendance: 74,
      status: "At Risk"
    }
  ];

  const handleExportAll = (format) => {
    setIsExportingAll(true);
    setExportTarget(format);
    
    // Simulate compilation delay
    setTimeout(() => {
      setIsExportingAll(false);
      setExportTarget(null);
      alert(`SAMS Analytics Engine: Compiled successfully. Master_${format.toUpperCase()}_Report_FOC_Sem1.zip downloaded.`);
    }, 1500);
  };

  const handleRowExport = (code, format) => {
    alert(`Generating detailed ${format.toUpperCase()} attendance dossier for course ${code}...`);
  };

  const getProgressBarClass = (status) => {
    const raw = status.toLowerCase();
    if (raw.includes("risk")) return "progress-bar at-risk";
    if (raw.includes("excellent")) return "progress-bar excellent";
    return "progress-bar good";
  };

  const filteredReports = reportsData.filter(
    (rep) => selectedSubject === "all" || rep.code === selectedSubject
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
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
          <span className="section-label" style={{ marginBottom: "6px", display: "block" }}>Analytics Dashboard</span>
          <h1 className="dashboard-heading" style={{ fontSize: "2.2rem" }}>
            Faculty <em>Reports</em>
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: "14px", marginTop: "4px", fontWeight: 300 }}>
            Audit module thresholds, export check-in registries, and compile student compliance summaries.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <ActionButton 
            variant="outline-ink" 
            disabled={isExportingAll}
            onClick={() => handleExportAll("pdf")}
          >
            {isExportingAll && exportTarget === "pdf" ? "Compiling PDF..." : "Export All PDF"}
            <IconDownload size={12} />
          </ActionButton>
          <ActionButton 
            variant="gold" 
            disabled={isExportingAll}
            onClick={() => handleExportAll("csv")}
          >
            {isExportingAll && exportTarget === "csv" ? "Exporting CSV..." : "Export All CSV"}
            <IconDownload size={12} />
          </ActionButton>
        </div>
      </div>

      {/* Filter Controls */}
      <div 
        style={{ 
          display: "flex", 
          gap: "20px", 
          flexWrap: "wrap", 
          alignItems: "center",
          background: "var(--cream-dark)",
          padding: "16px 20px",
          border: "1px solid var(--border)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--ink-light)" }}>
          <IconFilter size={16} />
          <span style={{ fontFamily: "Montserrat", fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Filters:</span>
        </div>

        {/* Course Filter */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="form-input form-select"
            style={{ width: "200px", height: "40px", fontSize: "12.5px" }}
          >
            <option value="all">All Modules</option>
            <option value="ITC 3140">ITC 3140 - Software Eng</option>
            <option value="ITC 3250">ITC 3250 - Database Systems</option>
            <option value="ITC 3320">ITC 3320 - Computer Networks</option>
          </select>
        </div>

        {/* Range Selector */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="form-input form-select"
            style={{ width: "200px", height: "40px", fontSize: "12.5px" }}
          >
            <option value="semester">Current Semester</option>
            <option value="month">Past 30 Days</option>
            <option value="week">Past 7 Days</option>
          </select>
        </div>
      </div>

      {/* Subject Summary Table */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <span className="section-label" style={{ marginBottom: "4px", display: "block" }}>Compliance breakdown</span>
          <h2 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)" }}>
            Subject Performance Summary
          </h2>
        </div>

        <div className="sams-table-wrap">
          <table className="sams-table">
            <thead>
              <tr>
                <th>Subject Details</th>
                <th>Sessions Held</th>
                <th>Enrolled Count</th>
                <th>Avg. Attendance</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((rep, idx) => (
                <tr key={idx}>
                  {/* Code & Name */}
                  <td>
                    <div>
                      <div style={{ fontFamily: "Montserrat", fontSize: "10.5px", fontWeight: 600, color: "var(--gold)" }}>{rep.code}</div>
                      <div style={{ fontSize: "13.5px", color: "var(--ink)", fontWeight: 500, marginTop: "2px" }}>{rep.name}</div>
                    </div>
                  </td>
                  
                  {/* Sessions held */}
                  <td>{rep.sessions} classes</td>

                  {/* Enrolled */}
                  <td>{rep.enrolled} Students</td>

                  {/* Average Progress */}
                  <td style={{ width: "260px" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink)" }}>{rep.attendance}%</span>
                      </div>
                      <div className="progress-track" style={{ height: "4px" }}>
                        <div className={getProgressBarClass(rep.status)} style={{ width: `${rep.attendance}%` }} />
                      </div>
                    </div>
                  </td>

                  {/* Status badge */}
                  <td>
                    <StatusBadge status={rep.status} />
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "8px", justifyContent: "flex-end" }}>
                      <button 
                        onClick={() => handleRowExport(rep.code, "csv")}
                        style={{
                          background: "none",
                          border: "1px solid var(--border)",
                          padding: "6px 12px",
                          fontFamily: "Montserrat",
                          fontSize: "8.5px",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--ink-muted)",
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold-dark)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--ink-muted)"; }}
                      >
                        CSV
                      </button>
                      <button 
                        onClick={() => handleRowExport(rep.code, "pdf")}
                        style={{
                          background: "none",
                          border: "1px solid var(--border)",
                          padding: "6px 12px",
                          fontFamily: "Montserrat",
                          fontSize: "8.5px",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--ink-muted)",
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold-dark)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--ink-muted)"; }}
                      >
                        PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
