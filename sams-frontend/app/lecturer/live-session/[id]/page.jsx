"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ActionButton from "../../../../components/lecturer/ActionButton";
import AttendanceTable from "../../../../components/lecturer/AttendanceTable";
import DashboardStatCard from "../../../../components/lecturer/DashboardStatCard";
import { IconAlertCircle, IconCheck, IconDownload, IconUsers } from "../../../../components/ui/Icons";

const MOCK_NAMES = [
  { name: "Kavindu Wickramasinghe", reg: "FC110948", distanceRange: [2, 12] },
  { name: "Amasha Rajapaksha", reg: "FC110482", distanceRange: [4, 15] },
  { name: "Sachith Alwis", reg: "FC111202", distanceRange: [6, 20] },
  { name: "Ruvini Jayawardene", reg: "FC110291", distanceRange: [8, 14] },
  { name: "Tharindu Wijesinghe", reg: "FC110593", distanceRange: [45, 98] }, // high chance of GPS mismatch
  { name: "Dilani Perera", reg: "FC110823", distanceRange: [3, 10] },
  { name: "Lakshan Gunawardana", reg: "FC111049", distanceRange: [5, 15] },
  { name: "Hashini Fernando", reg: "FC110184", distanceRange: [55, 78] }, // high chance of GPS mismatch
  { name: "Senesh De Silva", reg: "FC110398", distanceRange: [1, 9] },
  { name: "Sanduni Cooray", reg: "FC110759", distanceRange: [2, 16] },
  { name: "Prabath Jayasundara", reg: "FC110682", distanceRange: [8, 22] },
  { name: "Imesha Bandara", reg: "FC111304", distanceRange: [3, 12] }
];

export default function LiveSessionPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id || "";

  // Parse subject code from sessionId parameter
  const getSubjectInfo = () => {
    if (sessionId.includes("itc-3250")) {
      return { code: "ITC 3250", name: "Database Systems", location: "Hall FOC-02", total: 180 };
    }
    if (sessionId.includes("itc-3320")) {
      return { code: "ITC 3320", name: "Computer Networks", location: "Hall FOC-01", total: 150 };
    }
    return { code: "ITC 3140", name: "Software Engineering Project", location: "Hall FOC-01", total: 150 };
  };

  const subject = getSubjectInfo();

  // Initial attendance checklist records
  const [records, setRecords] = useState([
    { name: "Nimal Siriwardena", regNumber: "FC110123", time: "10:01:14 AM", distance: "4.2", status: "Verified" },
    { name: "Priyani Senanayake", regNumber: "FC110342", time: "10:01:55 AM", distance: "12.8", status: "Verified" },
    { name: "Suresh Perera", regNumber: "FC110556", time: "10:02:10 AM", distance: "58.3", status: "GPS Rejected" },
    { name: "Imali Kooray", regNumber: "FC110712", time: "10:02:44 AM", distance: "9.6", status: "Verified" },
    { name: "Ruwan Dias", regNumber: "FC110884", time: "10:03:02 AM", distance: "14.1", status: "Verified" }
  ]);

  // Counts
  const [presentCount, setPresentCount] = useState(4); // 4 verified
  const [rejectedCount, setRejectedCount] = useState(1); // 1 rejected

  // Active scanning timer
  const [elapsedSeconds, setElapsedSeconds] = useState(180); // 3 minutes simulated starting point
  const [isTerminated, setIsTerminated] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Increment clock timer
  useEffect(() => {
    if (isTerminated) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTerminated]);

  // Format Elapsed Time (e.g. 185 -> "03:05")
  const formatElapsed = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Simulate real-time student check-ins
  useEffect(() => {
    if (isTerminated) return;

    let namesIndex = 0;
    const checkinInterval = setInterval(() => {
      if (namesIndex >= MOCK_NAMES.length) {
        clearInterval(checkinInterval);
        return;
      }

      // Pick next mock student
      const studentData = MOCK_NAMES[namesIndex];
      namesIndex += 1;

      // Calculate simulated distance and time
      const minDistance = studentData.distanceRange[0];
      const maxDistance = studentData.distanceRange[1];
      const distanceVal = (Math.random() * (maxDistance - minDistance) + minDistance).toFixed(1);
      const isFar = parseFloat(distanceVal) > 50;

      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      const newRecord = {
        name: studentData.name,
        regNumber: studentData.reg,
        time: timeString,
        distance: distanceVal,
        status: isFar ? "GPS Rejected" : "Verified"
      };

      // Add to front of records
      setRecords((prev) => [newRecord, ...prev]);

      // Update counters
      if (isFar) {
        setRejectedCount((prev) => prev + 1);
      } else {
        setPresentCount((prev) => prev + 1);
      }
    }, 4500); // student checks in every 4.5 seconds

    return () => clearInterval(checkinInterval);
  }, [isTerminated]);

  const handleTerminate = () => {
    if (confirm("Are you sure you want to stop this attendance session? The OTP code will immediately expire.")) {
      setIsTerminated(true);
      setShowSummary(true);
    }
  };

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
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span className="section-label" style={{ marginBottom: 0 }}>Roster Broadcast</span>
            {!isTerminated ? (
              <span 
                style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "6px",
                  fontSize: "8.5px", 
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "#c0392b",
                  background: "rgba(192, 57, 43, 0.08)",
                  border: "1px solid rgba(192, 57, 43, 0.2)",
                  padding: "3px 8px"
                }}
              >
                <span className="pulse-dot" style={{ margin: 0 }} /> LIVE SCANNING
              </span>
            ) : (
              <span 
                style={{ 
                  fontSize: "8.5px", 
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "var(--ink-light)",
                  background: "var(--cream-dark)",
                  border: "1px solid var(--border)",
                  padding: "3px 8px"
                }}
              >
                SESSION STOPPED
              </span>
            )}
          </div>
          <h1 className="dashboard-heading" style={{ fontSize: "2.1rem" }}>
            {subject.code} · <em>{subject.name}</em>
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: "14px", marginTop: "4px", fontWeight: 300 }}>
            Geofence active in <strong>{subject.location}</strong>. Roster is refreshing automatically.
          </p>
        </div>

        {!isTerminated && (
          <ActionButton 
            variant="outline-ink" 
            onClick={handleTerminate}
            style={{ borderColor: "#c0392b", color: "#c0392b" }}
          >
            Terminate Broadcast
          </ActionButton>
        )}
      </div>

      {/* Metrics Row */}
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
          gap: "24px" 
        }}
      >
        <DashboardStatCard
          title="Present Students"
          value={presentCount}
          badgeText="Verified"
          badgeStatus="verified"
          description={`GPS logs within 50m radius of ${subject.location}`}
          icon={<IconCheck size={20} />}
        />
        <DashboardStatCard
          title="Flagged Check-ins"
          value={rejectedCount}
          badgeText={rejectedCount > 0 ? "Action Required" : "No Alerts"}
          badgeStatus={rejectedCount > 0 ? "rejected" : "neutral"}
          description="GPS coords out of bounds or OTP verification fails"
          icon={<IconAlertCircle size={20} style={{ color: rejectedCount > 0 ? "#c0392b" : "var(--border)" }} />}
        />
        <DashboardStatCard
          title="Expected Total"
          value={subject.total}
          badgeText={`${Math.round(((presentCount + rejectedCount) / subject.total) * 100)}% Rate`}
          badgeStatus="neutral"
          description="Enrolled student count registered for module"
          icon={<IconUsers size={20} />}
        />
        <DashboardStatCard
          title="Session Duration"
          value={formatElapsed(elapsedSeconds)}
          badgeText={isTerminated ? "Expired" : "Active"}
          badgeStatus={isTerminated ? "neutral" : "live"}
          description="Time elapsed since starting geofence OTP"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>}
        />
      </div>

      {/* Real-time Stream Checklist */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <span className="section-label" style={{ marginBottom: "4px", display: "block" }}>Incoming Signals</span>
            <h2 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--ink)" }}>
              Live Check-in Stream
            </h2>
          </div>
          <span style={{ fontSize: "12px", color: "var(--ink-light)", fontWeight: 300 }}>
            {records.length} total entries recorded
          </span>
        </div>

        <AttendanceTable records={records} />
      </div>

      {/* Summary report dialog overlay */}
      {showSummary && (
        <div 
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,23,20,0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px"
          }}
        >
          <div 
            className="dashboard-card" 
            style={{ 
              maxWidth: "520px", 
              width: "100%", 
              padding: "40px", 
              boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
              animation: "fade-up 0.3s ease-out forwards"
            }}
          >
            <span className="section-label" style={{ marginBottom: "8px", display: "block" }}>Roster Terminated</span>
            <h2 
              style={{ 
                fontFamily: "Cormorant Garamond, Georgia, serif", 
                fontSize: "2.2rem", 
                fontWeight: 400, 
                color: "var(--ink)",
                marginBottom: "16px"
              }}
            >
              Session Summary
            </h2>
            
            <p style={{ color: "var(--ink-muted)", fontSize: "14px", fontWeight: 300, lineHeight: 1.6, marginBottom: "28px" }}>
              Attendance recording for <strong>{subject.code}</strong> is complete. All verification channels are locked. Here is the final session capture:
            </p>

            <div 
              style={{ 
                display: "grid", 
                gridTemplateColumns: "1fr 1fr", 
                gap: "16px", 
                background: "var(--cream)", 
                padding: "20px", 
                border: "1px solid var(--border)",
                marginBottom: "32px"
              }}
            >
              <div>
                <div style={{ fontSize: "11px", color: "var(--ink-light)", fontFamily: "Montserrat", fontWeight: 600, textTransform: "uppercase" }}>Verified Present</div>
                <div style={{ fontSize: "24px", color: "#27ae60", fontWeight: 600, marginTop: "2px" }}>{presentCount}</div>
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "var(--ink-light)", fontFamily: "Montserrat", fontWeight: 600, textTransform: "uppercase" }}>GPS Mismatches</div>
                <div style={{ fontSize: "24px", color: "#c0392b", fontWeight: 600, marginTop: "2px" }}>{rejectedCount}</div>
              </div>
              <div style={{ gridColumn: "span 2", borderTop: "1px solid var(--border)", paddingTop: "12px", marginTop: "4px" }}>
                <div style={{ fontSize: "11px", color: "var(--ink-light)", fontFamily: "Montserrat", fontWeight: 600, textTransform: "uppercase" }}>Absent Enrolled</div>
                <div style={{ fontSize: "24px", color: "var(--ink)", fontWeight: 600, marginTop: "2px" }}>{subject.total - (presentCount + rejectedCount)}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <ActionButton 
                variant="outline-ink" 
                onClick={() => {
                  alert("Finalizing CSV packet download...");
                }}
              >
                Export CSV <IconDownload size={11} />
              </ActionButton>
              
              <ActionButton 
                variant="gold" 
                onClick={() => {
                  setShowSummary(false);
                  router.push("/lecturer/sessions");
                }}
              >
                Close Summary
              </ActionButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
