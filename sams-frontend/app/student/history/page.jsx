"use client";
import { useState, useEffect } from "react";

export default function StudentAttendanceHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("sams_token");
        const headers = { "Authorization": `Bearer ${token}` };

        const res = await fetch("http://localhost:5000/api/student/history", { headers });

        if (res.ok) {
          const data = await res.json();
          setHistory(data.data.history || []);
        }
      } catch (err) {
        console.error("Error fetching history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div style={{ padding: "48px", textAlign: "center" }}>Loading history...</div>;
  }

  return (
    <div style={{ width: "100%", paddingBottom: "64px" }}>
      {/* Page Header */}
      <div style={{ backgroundColor: "var(--cream-dark)", padding: "48px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "var(--ink)", margin: 0 }}>
            Attendance History
          </h1>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", marginTop: "16px", margin: "16px 0 0 0" }}>
            Your past attendance records
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
        {history.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "var(--ink)", margin: "0 0 8px 0" }}>No Records Found</h3>
            <p style={{ color: "var(--ink-muted)", fontSize: "14px", margin: 0 }}>You have not submitted any attendance yet.</p>
          </div>
        ) : (
          <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--cream)", borderBottom: "1px solid var(--border)" }}>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Module</th>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Session Date</th>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Submission Time</th>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Distance</th>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((record) => {
                  const sessionDate = new Date(record.sessions?.started_at || record.sessions?.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                  const submitTime = new Date(record.submitted_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                  
                  return (
                    <tr key={record.id} style={{ borderBottom: "1px solid var(--border)", transition: "background-color 0.2s" }} onMouseOver={e => e.currentTarget.style.backgroundColor = "var(--cream)"} onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}>
                      <td style={{ padding: "20px 24px" }}>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--ink)" }}>{record.sessions?.modules?.name}</div>
                        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", color: "var(--ink-muted)", marginTop: "4px" }}>{record.sessions?.modules?.code}</div>
                      </td>
                      <td style={{ padding: "20px 24px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--ink-light)" }}>
                        {sessionDate}
                      </td>
                      <td style={{ padding: "20px 24px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--ink-light)" }}>
                        {submitTime}
                      </td>
                      <td style={{ padding: "20px 24px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--ink-light)" }}>
                        {record.distance_meters !== null ? `${record.distance_meters}m` : 'N/A'}
                      </td>
                      <td style={{ padding: "20px 24px" }}>
                        {record.status === 'present' ? (
                          <span style={{ backgroundColor: "rgba(46, 204, 113, 0.1)", color: "#27ae60", padding: "6px 12px", borderRadius: "20px", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", display: "inline-block" }}>
                            PRESENT
                          </span>
                        ) : record.status === 'late' ? (
                          <span style={{ backgroundColor: "rgba(241, 196, 15, 0.1)", color: "var(--gold-dark)", padding: "6px 12px", borderRadius: "20px", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", display: "inline-block" }}>
                            LATE
                          </span>
                        ) : (
                          <span style={{ backgroundColor: "rgba(231, 76, 60, 0.1)", color: "#e74c3c", padding: "6px 12px", borderRadius: "20px", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", display: "inline-block" }}>
                            {record.status?.toUpperCase() || 'ABSENT'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
