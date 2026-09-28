"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SessionHistoryPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("sams_token");
        const res = await fetch("http://localhost:5000/api/sessions", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (res.ok) {
          setSessions(data.data.sessions || []);
        }
      } catch (err) {
        console.error("Failed to fetch sessions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  if (loading) return <div style={{ padding: "48px", textAlign: "center" }}>Loading history...</div>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px", width: "100%" }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <div className="section-label">ATTENDANCE HISTORY</div>
        <h1 className="section-heading">My <em>Sessions</em></h1>
        <p className="section-body" style={{ marginTop: "8px" }}>
          Review past attendance sessions and active live sessions.
        </p>
      </div>

      {/* Data Table Card */}
      <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
        <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "var(--ink)", fontWeight: 500 }}>Session Log</h3>
          <div style={{ display: "flex", gap: "12px" }}>
            <button className="btn-outline-ink" style={{ padding: "8px 16px", fontSize: "9px" }} disabled>FILTER</button>
          </div>
        </div>

        {sessions.length === 0 ? (
          <div style={{ padding: "64px", textAlign: "center" }}>
            <div style={{ color: "var(--ink-light)", marginBottom: "16px" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "var(--ink)", marginBottom: "8px" }}>No sessions found</h3>
            <p style={{ color: "var(--ink-muted)", fontSize: "14px", marginBottom: "24px" }}>You have not created any attendance sessions yet.</p>
            <Link href="/lecturer/sessions/create" className="btn-ink">Create First Session</Link>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ backgroundColor: "rgba(26, 23, 20, 0.02)" }}>
                  <th style={{ padding: "16px 32px", fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.15em", color: "var(--ink-light)" }}>DATE & TIME</th>
                  <th style={{ padding: "16px 32px", fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.15em", color: "var(--ink-light)" }}>MODULE</th>
                  <th style={{ padding: "16px 32px", fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.15em", color: "var(--ink-light)" }}>STATUS</th>
                  <th style={{ padding: "16px 32px", fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.15em", color: "var(--ink-light)", textAlign: "right" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map(s => {
                  const d = new Date(s.created_at);
                  return (
                    <tr key={s.id} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "16px 32px" }}>
                        <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--ink)" }}>{d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        <div style={{ fontSize: "12px", color: "var(--ink-muted)" }}>{d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </td>
                      <td style={{ padding: "16px 32px" }}>
                        <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--ink)" }}>{s.modules?.name}</div>
                        <div style={{ fontSize: "12px", color: "var(--ink-muted)" }}>{s.modules?.code}</div>
                      </td>
                      <td style={{ padding: "16px 32px" }}>
                        {s.status === 'active' ? (
                          <span style={{ display: "inline-block", padding: "4px 10px", backgroundColor: "rgba(184, 150, 90, 0.1)", color: "var(--gold-dark)", fontSize: "11px", fontWeight: 600, borderRadius: "2px", textTransform: "uppercase" }}>Active</span>
                        ) : (
                          <span style={{ display: "inline-block", padding: "4px 10px", backgroundColor: "var(--cream-dark)", color: "var(--ink-muted)", fontSize: "11px", fontWeight: 600, borderRadius: "2px", textTransform: "uppercase" }}>Closed</span>
                        )}
                      </td>
                      <td style={{ padding: "16px 32px", textAlign: "right" }}>
                        <Link href={`/lecturer/sessions/${s.id}`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "2px", border: "1px solid var(--border)", color: "var(--ink)", transition: "all 0.2s", textDecoration: "none" }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                          </svg>
                        </Link>
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
