"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StudentSessions() {
  const router = useRouter();
  const [activeSession, setActiveSession] = useState(null);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("sams_token");
        const headers = { "Authorization": `Bearer ${token}` };

        const res = await fetch("http://localhost:5000/api/student/sessions", { headers });

        if (res.ok) {
          const data = await res.json();
          setActiveSession(data.data.activeSession);
          setUpcomingSessions(data.data.upcomingSessions || []);
        }
      } catch (err) {
        console.error("Error fetching sessions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) {
    return <div style={{ padding: "48px", textAlign: "center" }}>Loading sessions...</div>;
  }

  return (
    <div style={{ width: "100%", paddingBottom: "64px" }}>
      {/* Page Header */}
      <div style={{ backgroundColor: "var(--cream-dark)", padding: "48px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "var(--ink)", margin: 0 }}>
            Sessions
          </h1>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", marginTop: "16px", margin: "16px 0 0 0" }}>
            Active and upcoming sessions for your modules
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
        
        {/* Active Session Section */}
        <div style={{ marginBottom: "48px" }}>
          <h2 className="section-heading" style={{ marginBottom: "24px" }}>Active Session</h2>
          {activeSession ? (
            <div style={{ backgroundColor: "var(--white)", border: "2px solid #27ae60", borderRadius: "var(--radius)", padding: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 10px 25px -5px rgba(39, 174, 96, 0.1)" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <span style={{ backgroundColor: "rgba(46, 204, 113, 0.1)", color: "#27ae60", padding: "4px 8px", borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em" }}>
                    LIVE NOW
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>{activeSession.modules?.code}</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 12px 0" }}>
                  {activeSession.modules?.name}
                </h3>
                <div style={{ display: "flex", gap: "24px", color: "var(--ink-muted)", fontSize: "13px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    {activeSession.profiles?.full_name || "Lecturer"}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    Expires at {new Date(activeSession.expires_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              <div>
                <button 
                  onClick={() => router.push(`/student/sessions/${activeSession.id}`)}
                  className="btn-gold"
                  style={{ backgroundColor: "#27ae60", color: "#fff", border: "none", padding: "16px 32px", fontSize: "14px" }}
                >
                  Mark Attendance
                </button>
              </div>
            </div>
          ) : (
            <div style={{ padding: "48px", backgroundColor: "var(--white)", border: "1px dashed var(--border)", borderRadius: "var(--radius)", textAlign: "center" }}>
              <div style={{ color: "var(--ink-light)", marginBottom: "16px" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>
                No active sessions at the moment
              </p>
            </div>
          )}
        </div>

        {/* Upcoming Sessions Section */}
        <div>
          <h2 className="section-heading" style={{ marginBottom: "24px" }}>Upcoming Sessions</h2>
          {upcomingSessions.length === 0 ? (
            <div style={{ padding: "32px", backgroundColor: "var(--cream)", borderRadius: "var(--radius)", textAlign: "center", color: "var(--ink-muted)", fontSize: "14px" }}>
              There are no upcoming scheduled sessions for your enrolled modules.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {upcomingSessions.map(session => {
                const sessionDate = new Date(session.started_at);
                return (
                  <div key={session.id} style={{ display: "flex", alignItems: "center", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px", transition: "transform 0.2s, box-shadow 0.2s" }}>
                    
                    <div style={{ flex: "0 0 120px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRight: "1px solid var(--border)", paddingRight: "24px" }}>
                      <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 700, color: "var(--gold-dark)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                        {sessionDate.toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1 }}>
                        {sessionDate.getDate()}
                      </span>
                    </div>

                    <div style={{ flex: 1, paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em" }}>
                          {session.modules?.code}
                        </span>
                        <span style={{ backgroundColor: "rgba(241, 196, 15, 0.1)", color: "var(--gold-dark)", padding: "2px 6px", borderRadius: "2px", fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.1em" }}>
                          SCHEDULED
                        </span>
                      </div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, color: "var(--ink)", margin: 0 }}>
                        {session.modules?.name}
                      </h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "24px", color: "var(--ink-light)", fontSize: "13px", marginTop: "4px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                          {sessionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                          {session.profiles?.full_name || "Lecturer"}
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
