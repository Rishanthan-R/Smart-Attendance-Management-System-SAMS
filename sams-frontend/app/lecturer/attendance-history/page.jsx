"use client";
import React, { useState } from "react";
import ActionButton from "../../../components/lecturer/ActionButton";
import StatusBadge from "../../../components/lecturer/StatusBadge";
import { IconSearch, IconUpload, IconCheck, IconAlertCircle } from "../../../components/ui/Icons";

export default function AttendanceHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("");

  // Mock Attendance Registry data
  const [registryRecords, setRegistryRecords] = useState([
    { id: 1, name: "K. Silva", regNumber: "FC110182", date: "July 15, 2026", subject: "ITC 3140", window: "10:00 AM - 12:00 PM", location: "Hall FOC-01", status: "Present" },
    { id: 2, name: "Nimal Siriwardena", regNumber: "FC110123", date: "July 15, 2026", subject: "ITC 3140", window: "10:00 AM - 12:00 PM", location: "Hall FOC-01", status: "Present" },
    { id: 3, name: "R. Perera", regNumber: "FC110484", date: "July 15, 2026", subject: "ITC 3140", window: "10:00 AM - 12:00 PM", location: "Hall FOC-01", status: "Absent" },
    { id: 4, name: "Kavindu Wickramasinghe", regNumber: "FC110948", date: "July 15, 2026", subject: "ITC 3140", window: "10:00 AM - 12:00 PM", location: "Hall FOC-01", status: "Present" },
    { id: 5, name: "Amasha Rajapaksha", regNumber: "FC110482", date: "July 13, 2026", subject: "ITC 3250", window: "01:00 PM - 03:00 PM", location: "Hall FOC-02", status: "Present" },
    { id: 6, name: "M. Fernando", regNumber: "FC110395", date: "July 13, 2026", subject: "ITC 3250", window: "01:00 PM - 03:00 PM", location: "Hall FOC-02", status: "Absent" },
    { id: 7, name: "Sachith Alwis", regNumber: "FC111202", date: "July 12, 2026", subject: "ITC 3140", window: "10:00 AM - 12:00 PM", location: "Hall FOC-01", status: "Present" }
  ]);

  // Pending MC Submissions State
  const [mcSubmissions, setMcSubmissions] = useState([
    { id: 101, name: "R. Perera", regNumber: "FC110484", subject: "ITC 3140", date: "July 15, 2026", file: "medical_report_perera.pdf", notes: "Severe fever. Hospitalized for 2 days." },
    { id: 102, name: "M. Fernando", regNumber: "FC110395", subject: "ITC 3250", date: "July 13, 2026", file: "championship_excuse_letter.pdf", notes: "Inter-university sports meet tournament." }
  ]);

  // Form state for custom MC upload
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    studentName: "",
    regNumber: "",
    subject: "ITC 3140",
    date: "",
    notes: ""
  });

  const handleApproveMC = (subId, regNumber, subject, date) => {
    // 1. Remove from pending MCs
    setMcSubmissions((prev) => prev.filter((sub) => sub.id !== subId));
    
    // 2. Update status to Excused / Present in registry
    setRegistryRecords((prev) => 
      prev.map((rec) => {
        if (rec.regNumber === regNumber && rec.subject === subject && rec.date === date) {
          return { ...rec, status: "Excused" };
        }
        return rec;
      })
    );

    alert(`Medical certificate approved successfully for ${regNumber}. Attendance status updated to Excused.`);
  };

  const handleRejectMC = (subId, name) => {
    setMcSubmissions((prev) => prev.filter((sub) => sub.id !== subId));
    alert(`Medical certificate submission for ${name} rejected.`);
  };

  const handleManualUpload = (e) => {
    e.preventDefault();
    if (!uploadData.studentName || !uploadData.regNumber || !uploadData.date) {
      alert("Please fill in all required fields.");
      return;
    }

    // Add record as Excused in registry directly
    const newRegistryRecord = {
      id: Date.now(),
      name: uploadData.studentName,
      regNumber: uploadData.regNumber,
      date: uploadData.date,
      subject: uploadData.subject,
      window: "Standard Lecture hours",
      location: "Exemption Portal override",
      status: "Excused"
    };

    setRegistryRecords((prev) => [newRegistryRecord, ...prev]);
    setShowUploadForm(false);
    setUploadData({ studentName: "", regNumber: "", subject: "ITC 3140", date: "", notes: "" });
    alert("Exemption logged successfully in attendance registry.");
  };

  // Filter logic
  const filteredRegistry = registryRecords.filter((rec) => {
    const matchesSearch = 
      rec.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      rec.regNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = subjectFilter === "all" || rec.subject === subjectFilter;

    const matchesDate = 
      rec.date.toLowerCase().includes(dateQuery.toLowerCase());

    return matchesSearch && matchesSubject && matchesDate;
  });

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
          <span className="section-label" style={{ marginBottom: "6px", display: "block" }}>Records Management</span>
          <h1 className="dashboard-heading" style={{ fontSize: "2.2rem" }}>
            Live Feed & <em>History</em>
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: "14px", marginTop: "4px", fontWeight: 300 }}>
            Audit past attendance registries and verify medical certificate exemptions.
          </p>
        </div>
        <ActionButton variant="gold" onClick={() => setShowUploadForm(!showUploadForm)}>
          <IconUpload size={12} />
          Submit Exemption / MC
        </ActionButton>
      </div>

      {/* Manual upload form block */}
      {showUploadForm && (
        <div className="dashboard-card" style={{ padding: "32px", border: "1px solid var(--gold-light)", background: "var(--white)" }}>
          <h3 style={{ fontFamily: "Cormorant Garamond", fontSize: "1.5rem", fontWeight: 500, color: "var(--ink)", marginBottom: "20px" }}>
            Log Exemption Override
          </h3>
          <form onSubmit={handleManualUpload} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="form-group" style={{ gridColumn: "span 1" }}>
              <label className="form-label">Student Name</label>
              <input
                type="text"
                placeholder="e.g. Ruwan Silva"
                className="form-input"
                value={uploadData.studentName}
                onChange={(e) => setUploadData({ ...uploadData, studentName: e.target.value })}
                required
              />
            </div>
            
            <div className="form-group" style={{ gridColumn: "span 1" }}>
              <label className="form-label">Registration Number</label>
              <input
                type="text"
                placeholder="e.g. FC110999"
                className="form-input"
                value={uploadData.regNumber}
                onChange={(e) => setUploadData({ ...uploadData, regNumber: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Related Course</label>
              <select
                className="form-input form-select"
                value={uploadData.subject}
                onChange={(e) => setUploadData({ ...uploadData, subject: e.target.value })}
              >
                <option value="ITC 3140">ITC 3140 - Software Engineering</option>
                <option value="ITC 3250">ITC 3250 - Database Systems</option>
                <option value="ITC 3320">ITC 3320 - Computer Networks</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Absent Date</label>
              <input
                type="date"
                className="form-input"
                value={uploadData.date}
                onChange={(e) => setUploadData({ ...uploadData, date: e.target.value })}
                required
              />
            </div>

            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label className="form-label">Reason / Document Reference</label>
              <input
                type="text"
                placeholder="e.g. Submitted Medical Certificate to Faculty Office USJ"
                className="form-input"
                value={uploadData.notes}
                onChange={(e) => setUploadData({ ...uploadData, notes: e.target.value })}
              />
            </div>

            <div style={{ gridColumn: "span 2", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <ActionButton variant="outline-ink" onClick={() => setShowUploadForm(false)}>
                Cancel
              </ActionButton>
              <ActionButton type="submit" variant="gold">
                Save Exemption
              </ActionButton>
            </div>
          </form>
        </div>
      )}

      {/* Medical Exemption verification banner */}
      {mcSubmissions.length > 0 && (
        <div 
          className="dashboard-card" 
          style={{ 
            background: "var(--cream-dark)", 
            borderColor: "var(--gold-light)",
            padding: "28px" 
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
            <span style={{ color: "var(--gold)" }}><IconUpload size={18} /></span>
            <h3 style={{ fontFamily: "Montserrat", fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink)" }}>
              Pending Exemption Requests ({mcSubmissions.length})
            </h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {mcSubmissions.map((mc) => (
              <div 
                key={mc.id} 
                className="dashboard-card" 
                style={{ 
                  background: "var(--white)", 
                  padding: "20px", 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "20px"
                }}
              >
                <div style={{ flex: "1 1 300px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                    <h4 style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>{mc.name}</h4>
                    <span style={{ fontSize: "11.5px", fontFamily: "monospace", color: "var(--ink-light)" }}>{mc.regNumber}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--ink-muted)", marginTop: "4px", fontWeight: 300 }}>
                    Applied for <strong>{mc.subject}</strong> on {mc.date}. Notes: &quot;{mc.notes}&quot;
                  </p>
                  <div style={{ marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "11px", color: "var(--gold-dark)", textDecoration: "underline", cursor: "pointer" }} onClick={() => alert(`Opening PDF file: ${mc.file}`)}>
                      📎 {mc.file}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <ActionButton 
                    variant="outline-ink" 
                    onClick={() => handleRejectMC(mc.id, mc.name)}
                    style={{ borderColor: "#c0392b", color: "#c0392b" }}
                  >
                    Reject
                  </ActionButton>
                  <ActionButton 
                    variant="gold" 
                    onClick={() => handleApproveMC(mc.id, mc.regNumber, mc.subject, mc.date)}
                  >
                    <IconCheck size={11} /> Approve MC
                  </ActionButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History Registry Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Registry Table Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <span className="section-label" style={{ marginBottom: "4px", display: "block" }}>Student logs</span>
            <h2 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)" }}>
              Attendance Records Log
            </h2>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", width: "100%", sm: "auto", maxWidth: "600px" }}>
            {/* Subject Selector */}
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="form-input form-select"
              style={{ width: "130px", height: "40px", padding: "0 28px 0 12px", fontSize: "12px" }}
            >
              <option value="all">All Modules</option>
              <option value="ITC 3140">ITC 3140</option>
              <option value="ITC 3250">ITC 3250</option>
              <option value="ITC 3320">ITC 3320</option>
            </select>

            {/* Search */}
            <div style={{ position: "relative", flex: 1, minWidth: "150px" }}>
              <input
                type="text"
                placeholder="Search student or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: "40px", height: "40px", fontSize: "12.5px" }}
              />
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-light)" }}>
                <IconSearch size={13} />
              </span>
            </div>

            {/* Date Search */}
            <div style={{ position: "relative", width: "150px" }}>
              <input
                type="text"
                placeholder="Search by date..."
                value={dateQuery}
                onChange={(e) => setDateQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: "40px", height: "40px", fontSize: "12.5px" }}
              />
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-light)" }}>
                <IconSearch size={13} />
              </span>
            </div>
          </div>
        </div>

        {/* Master Registry Table */}
        <div className="sams-table-wrap">
          <table className="sams-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th>Student</th>
                <th>Reg. Number</th>
                <th>Session Window</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistry.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "36px 0", color: "var(--ink-light)" }}>
                    No records found matching the criteria.
                  </td>
                </tr>
              ) : (
                filteredRegistry.map((rec) => (
                  <tr key={rec.id}>
                    <td style={{ fontWeight: 500, color: "var(--ink)" }}>{rec.date}</td>
                    <td style={{ fontFamily: "Montserrat", fontSize: "10px", fontWeight: 600, color: "var(--gold)" }}>{rec.subject}</td>
                    <td>{rec.name}</td>
                    <td style={{ fontFamily: "monospace" }}>{rec.regNumber}</td>
                    <td>{rec.window}</td>
                    <td style={{ fontSize: "12px", color: "var(--ink-light)" }}>{rec.location}</td>
                    <td>
                      <StatusBadge status={rec.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
