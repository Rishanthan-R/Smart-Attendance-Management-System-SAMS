"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function StudentAttendancePage() {
  const router = useRouter();
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const token = localStorage.getItem("sams_token");
        const headers = { "Authorization": `Bearer ${token}` };
        const res = await fetch(`http://localhost:5000/api/student/sessions/${id}`, { headers });

        if (res.ok) {
          const data = await res.json();
          setSession(data.data.session);
          setHasSubmitted(data.data.hasSubmitted);
        } else {
          setError("Session not found or access denied.");
        }
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setError("Error connecting to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [id]);

  useEffect(() => {
    // Automatically request location when component mounts
    requestLocation();
  }, []);

  useEffect(() => {
    if (!session) return;
    
    // Countdown timer
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date(session.expires_at).getTime();
      const distance = expiry - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("EXPIRED");
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  function requestLocation() {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (err) => {
        setLocationError("Location permission denied. Attendance requires GPS.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!location) {
      setError("Please allow location access to submit attendance.");
      requestLocation();
      return;
    }

    if (otp.length !== 4) {
      setError("OTP must be exactly 4 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("sams_token");
      const res = await fetch("http://localhost:5000/api/student/attendance", {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sessionId: id,
          otp,
          latitude: location.latitude,
          longitude: location.longitude
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`Success! You were ${data.data.distance}m away.`);
        setOtp("");
        setHasSubmitted(true);
      } else {
        setError(data.message || "Failed to mark attendance.");
      }
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "48px", textAlign: "center" }}>Loading session...</div>;
  }

  if (!session) {
    return (
      <div style={{ padding: "48px", textAlign: "center" }}>
        <h2>Session Not Found</h2>
        <p style={{ color: "var(--ink-muted)" }}>{error}</p>
        <Link href="/student/sessions" className="btn-outline" style={{ display: "inline-block", marginTop: "16px" }}>Back to Sessions</Link>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", paddingBottom: "64px" }}>
      {/* Page Header */}
      <div style={{ backgroundColor: "var(--cream-dark)", padding: "48px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link href="/student/sessions" style={{ display: "inline-block", marginBottom: "16px", fontSize: "11px", fontWeight: 600, color: "var(--ink-muted)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            ← Back to Sessions
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <span style={{ backgroundColor: "rgba(46, 204, 113, 0.1)", color: "#27ae60", padding: "4px 8px", borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em" }}>
              {session.status.toUpperCase()}
            </span>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>{session.modules?.code}</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "var(--ink)", margin: 0 }}>
            {session.modules?.name}
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 24px" }}>
        
        {/* Countdown */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "var(--white)", border: "1px solid var(--border)", padding: "24px", borderRadius: "var(--radius)", marginBottom: "32px" }}>
          <div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.15em", marginBottom: "8px" }}>TIME REMAINING</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: timeLeft === "EXPIRED" ? "#e74c3c" : "var(--ink)" }}>
              {timeLeft || "Calculating..."}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.15em", marginBottom: "8px" }}>LOCATION STATUS</div>
            {location ? (
              <div style={{ color: "#27ae60", fontSize: "14px", fontWeight: 500 }}>GPS Acquired</div>
            ) : locationError ? (
              <div style={{ color: "#e74c3c", fontSize: "14px", fontWeight: 500 }}>GPS Denied</div>
            ) : (
              <button onClick={requestLocation} className="btn-outline" style={{ padding: "8px 16px", fontSize: "12px" }}>Share Location</button>
            )}
          </div>
        </div>

        {/* Attendance Form */}
        <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", padding: "48px", borderRadius: "var(--radius)", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 500, color: "var(--ink)", margin: "0 0 8px 0" }}>Mark Attendance</h2>
          <p style={{ color: "var(--ink-muted)", fontSize: "14px", marginBottom: "32px" }}>Enter the 4-digit OTP provided by your lecturer. You must be physically present in the classroom.</p>

          {error && (
            <div style={{ backgroundColor: "rgba(231, 76, 60, 0.1)", color: "#c0392b", padding: "16px", borderRadius: "var(--radius)", marginBottom: "24px", fontSize: "14px", border: "1px solid rgba(231, 76, 60, 0.2)" }}>
              {error}
            </div>
          )}

          {message && (
            <div style={{ backgroundColor: "rgba(46, 204, 113, 0.1)", color: "#27ae60", padding: "16px", borderRadius: "var(--radius)", marginBottom: "24px", fontSize: "14px", border: "1px solid rgba(46, 204, 113, 0.2)" }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="input-group">
              <label htmlFor="otp" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-light)" }}>Session OTP</label>
              <input 
                type="text" 
                id="otp"
                className="auth-input" 
                value={otp}
                onChange={(e) => setOtp(e.target.value.toUpperCase())}
                placeholder="e.g. A1B2"
                maxLength={4}
                required
                style={{ textAlign: "center", fontSize: "24px", letterSpacing: "0.2em", padding: "16px" }}
                disabled={submitting || timeLeft === "EXPIRED" || session.status !== 'active' || hasSubmitted}
              />
            </div>
            
            <button 
              type="submit" 
              className={hasSubmitted ? "btn-outline" : "btn-gold"} 
              style={{ padding: "16px", fontSize: "14px", justifyContent: "center", color: hasSubmitted ? "#27ae60" : undefined, borderColor: hasSubmitted ? "#27ae60" : undefined }}
              disabled={submitting || timeLeft === "EXPIRED" || session.status !== 'active' || hasSubmitted}
            >
              {hasSubmitted ? "ATTENDANCE SUBMITTED ✓" : submitting ? "SUBMITTING..." : "SUBMIT ATTENDANCE"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
