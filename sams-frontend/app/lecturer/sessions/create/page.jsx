"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateSessionPage() {
  const router = useRouter();
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const token = localStorage.getItem("sams_token");
        const res = await fetch("http://localhost:5000/api/lecturer/modules", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (res.ok) {
          setModules(data.data.modules || []);
          if (data.data.modules?.length > 0) {
            setSelectedModule(data.data.modules[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch modules:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  const handleCreateSession = async (e) => {
    e.preventDefault();
    if (!selectedModule) return;
    
    setErrorMsg("");
    setSubmitting(true);

    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      setSubmitting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const token = localStorage.getItem("sams_token");
          const res = await fetch("http://localhost:5000/api/sessions/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              module_id: selectedModule,
              lecturer_lat: latitude,
              lecturer_lng: longitude
            })
          });
          
          const data = await res.json();
          if (!res.ok) {
            setErrorMsg(data.message || "Failed to create session.");
            setSubmitting(false);
            return;
          }

          router.push(`/lecturer/sessions/${data.data.id}`);
        } catch (err) {
          setErrorMsg("Could not connect to server.");
          setSubmitting(false);
        }
      },
      (error) => {
        let msg = "Geolocation error.";
        if (error.code === error.PERMISSION_DENIED) msg = "Location permission denied. Please allow location access to start a session.";
        else if (error.code === error.POSITION_UNAVAILABLE) msg = "Location information is unavailable.";
        else if (error.code === error.TIMEOUT) msg = "Location request timed out.";
        
        setErrorMsg(msg);
        setSubmitting(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  if (loading) {
    return <div style={{ padding: "48px", textAlign: "center" }}>Loading modules...</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 24px", width: "100%" }}>
      <div style={{ marginBottom: "48px" }}>
        <div className="section-label">ATTENDANCE CONTROL</div>
        <h1 className="section-heading">Create <em>Session</em></h1>
        <p className="section-body" style={{ marginTop: "16px" }}>
          Launch a secure, GPS-verified attendance session. Your current location will be used as the anchor point for the lecture hall.
        </p>
      </div>

      {modules.length === 0 ? (
        <div style={{ padding: "48px", backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", textAlign: "center" }}>
          <div style={{ color: "var(--gold)", marginBottom: "16px" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "var(--ink)", marginBottom: "8px" }}>No modules assigned</h3>
          <p style={{ color: "var(--ink-muted)", fontSize: "14px" }}>You are not currently assigned to any modules. Please contact an administrator.</p>
        </div>
      ) : (
        <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", padding: "40px", borderRadius: "var(--radius)" }}>
          <form onSubmit={handleCreateSession} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="input-group">
              <label className="input-label">Select Module</label>
              <select 
                className="auth-input" 
                value={selectedModule} 
                onChange={(e) => setSelectedModule(e.target.value)}
                required
                style={{ appearance: "none", backgroundColor: "var(--white)", cursor: "pointer" }}
              >
                {modules.map(mod => (
                  <option key={mod.id} value={mod.id}>{mod.code} - {mod.name}</option>
                ))}
              </select>
            </div>

            <div style={{ backgroundColor: "rgba(184, 150, 90, 0.05)", borderLeft: "2px solid var(--gold)", padding: "16px", marginTop: "8px" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <div>
                  <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink)", marginBottom: "4px" }}>Location Required</h4>
                  <p style={{ fontSize: "13px", color: "var(--ink-muted)", lineHeight: 1.5, margin: 0 }}>
                    Your browser will request location permissions when you click create. Make sure you are inside the lecture hall.
                  </p>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div style={{ padding: "12px", border: "1px solid #ffcccc", backgroundColor: "#fff5f5", color: "#c0392b", fontSize: "13px", borderRadius: "2px" }}>
                {errorMsg}
              </div>
            )}

            <button 
              type="submit" 
              className="btn-ink" 
              style={{ justifyContent: "center", marginTop: "16px" }}
              disabled={submitting}
            >
              {submitting ? "Acquiring Location & Creating..." : "Create Secure Session"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
