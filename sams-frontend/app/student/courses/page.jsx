"use client";
import { useState, useEffect } from "react";

export default function StudentCourses() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(null);

  const fetchModules = async () => {
    try {
      const token = localStorage.getItem("sams_token");
      const headers = { "Authorization": `Bearer ${token}` };

      const res = await fetch("http://localhost:5000/api/student/modules", { headers });

      if (res.ok) {
        const data = await res.json();
        setModules(data.data.modules || []);
      }
    } catch (err) {
      console.error("Error fetching modules", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchModules();
  }, []);

  const handleEnroll = async (moduleId) => {
    try {
      setEnrolling(moduleId);
      const token = localStorage.getItem("sams_token");
      const headers = { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      const res = await fetch("http://localhost:5000/api/student/modules/enroll", {
        method: 'POST',
        headers,
        body: JSON.stringify({ moduleId })
      });

      if (res.ok) {
        // Refresh modules to show enrolled status
        await fetchModules();
      } else {
        const errorData = await res.json();
        console.error("Enrollment failed:", errorData.message);
      }
    } catch (err) {
      console.error("Error enrolling in module", err);
    } finally {
      setEnrolling(null);
    }
  };

  if (loading) {
    return <div style={{ padding: "48px", textAlign: "center" }}>Loading courses...</div>;
  }

  return (
    <div style={{ width: "100%", paddingBottom: "64px" }}>
      {/* Page Header */}
      <div style={{ backgroundColor: "var(--cream-dark)", padding: "48px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "var(--ink)", margin: 0 }}>
            Available Courses
          </h1>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", marginTop: "16px", margin: "16px 0 0 0" }}>
            Modules matching your department and batch
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
        {modules.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "var(--ink)", margin: "0 0 8px 0" }}>No Modules Available</h3>
            <p style={{ color: "var(--ink-muted)", fontSize: "14px", margin: 0 }}>There are currently no modules matching your assigned department and batch.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
            {modules.map(mod => (
              <div key={mod.id} style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px", display: "flex", flexDirection: "column" }}>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{ backgroundColor: "var(--cream)", padding: "4px 8px", borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em" }}>
                    {mod.code}
                  </div>
                  {mod.isEnrolled ? (
                    <div style={{ backgroundColor: "rgba(46, 204, 113, 0.1)", color: "#27ae60", padding: "4px 8px", borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em" }}>
                      ENROLLED
                    </div>
                  ) : (
                    <div style={{ backgroundColor: "rgba(241, 196, 15, 0.1)", color: "var(--gold-dark)", padding: "4px 8px", borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em" }}>
                      AVAILABLE
                    </div>
                  )}
                </div>

                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 16px 0", lineHeight: 1.2 }}>
                  {mod.name}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px", flexGrow: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                    <span style={{ fontSize: "13px", color: "var(--ink-light)" }}>Department: {mod.department}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <span style={{ fontSize: "13px", color: "var(--ink-light)" }}>Batch: {mod.batch}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <span style={{ fontSize: "13px", color: "var(--ink-light)" }}>Lecturer: {mod.lecturer_name}</span>
                  </div>
                </div>

                {!mod.isEnrolled && (
                  <button 
                    onClick={() => handleEnroll(mod.id)}
                    disabled={enrolling === mod.id}
                    className="btn-ink"
                    style={{ width: "100%", justifyContent: "center", opacity: enrolling === mod.id ? 0.7 : 1 }}
                  >
                    {enrolling === mod.id ? "ENROLLING..." : "ENROLL NOW"}
                  </button>
                )}
                {mod.isEnrolled && (
                  <button 
                    disabled
                    style={{ 
                      width: "100%", 
                      padding: "12px", 
                      backgroundColor: "var(--cream)", 
                      border: "1px solid var(--border)", 
                      borderRadius: "var(--radius)",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      color: "var(--ink-muted)",
                      textAlign: "center",
                      cursor: "not-allowed"
                    }}
                  >
                    ALREADY ENROLLED
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
