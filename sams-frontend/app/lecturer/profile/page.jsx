"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LecturerProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Original data for discard functionality
  const [originalData, setOriginalData] = useState(null);

  // Editable fields
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: ""
  });

  // Read-only fields
  const [readOnlyData, setReadOnlyData] = useState({
    employeeId: "",
    department: "",
    faculty: "Faculty of Computing",
    email: "",
    role: "",
    initials: ""
  });

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const token = localStorage.getItem("sams_token");
        const userStr = localStorage.getItem("sams_user");

        if (!token || !userStr) {
          router.push("/auth/login");
          return;
        }

        const parsedUser = JSON.parse(userStr);

        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();

        if (res.ok) {
          const profile = data.data.user.profile;

          const nameParts = profile.full_name ? profile.full_name.split(" ") : ["L", "P"];
          const initials = nameParts.length >= 2
            ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
            : `${nameParts[0][0]}`.toUpperCase();

          const formState = {
            fullName: profile.full_name || "",
            phoneNumber: profile.phone_number || "",
            address: profile.address || ""
          };

          if (!ignore) {
            setFormData(formState);
            setOriginalData(formState);
            setReadOnlyData({
              employeeId: profile.employee_id || "N/A",
              department: profile.department || "N/A",
              faculty: "Faculty of Computing",
              email: parsedUser.email || "",
              role: profile.role || "lecturer",
              initials
            });
          }
        }
      } catch (err) {
        console.error(err);
        if (!ignore) setErrorMsg("Failed to load profile data.");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [router]);

  const handleDiscard = () => {
    if (originalData) {
      setFormData(originalData);
      setErrorMsg("");
      setSuccessMsg("");
    }
  };

  const handleSave = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.fullName.trim()) {
      setErrorMsg("Full Name cannot be empty.");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("sams_token");
      const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          address: formData.address
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Failed to update profile.");
      } else {
        setSuccessMsg("Profile updated successfully.");
        setOriginalData(formData);

        // Update user object in local storage for navbar consistency
        const userStr = localStorage.getItem("sams_user");
        if (userStr) {
          const u = JSON.parse(userStr);
          u.full_name = formData.fullName;
          localStorage.setItem("sams_user", JSON.stringify(u));

          // force re-render/reload event if needed, but navbar reads from state on layout remount
          window.dispatchEvent(new Event("storage"));
        }

        // Auto hide success msg after 3s
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Could not connect to server.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "48px", textAlign: "center" }}>Loading profile...</div>;
  }

  const isDirty = originalData && (
    formData.fullName !== originalData.fullName ||
    formData.phoneNumber !== originalData.phoneNumber ||
    formData.address !== originalData.address
  );

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px", width: "100%" }}>
      {/* Header Area */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px" }}>
        <div>
          <div className="section-label">ACCOUNT SETTINGS</div>
          <h1 className="section-heading">Manage <em>Profile</em></h1>
          <p className="section-body" style={{ marginTop: "8px" }}>
            Update your contact details and academic identity.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {errorMsg && <span style={{ color: "var(--error)", fontSize: "13px" }}>{errorMsg}</span>}
          {successMsg && <span style={{ color: "#27ae60", fontSize: "13px" }}>{successMsg}</span>}

          <button
            onClick={handleDiscard}
            className="btn-outline-ink"
            disabled={!isDirty || saving}
            style={{ opacity: !isDirty ? 0.5 : 1 }}
          >
            DISCARD CHANGES
          </button>
          <button
            onClick={handleSave}
            className="btn-gold"
            disabled={!isDirty || saving}
            style={{ opacity: !isDirty ? 0.5 : 1 }}
          >
            {saving ? "SAVING..." : "SAVE CHANGES"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }} className="profile-grid">

        {/* Left Column: ID Card */}
        <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "40px 32px", display: "flex", flexDirection: "column", alignItems: "center", alignSelf: "start" }}>
          <div style={{
            width: "120px", height: "120px", borderRadius: "50%",
            backgroundColor: "var(--gold-dark)", color: "var(--cream)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem",
            marginBottom: "24px",
            border: "4px solid var(--cream-dark)"
          }}>
            {readOnlyData.initials}
          </div>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--ink)", margin: 0, textAlign: "center" }}>
            {formData.fullName || "—"}
          </h2>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginTop: "8px", borderBottom: "1px solid var(--border)", paddingBottom: "24px", width: "100%", textAlign: "center" }}>
            ACADEMIC FACULTY
          </div>

          <div style={{ width: "100%", marginTop: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ color: "var(--ink-light)", marginTop: "2px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)" }}>EMPLOYEE ID</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--ink)", marginTop: "4px" }}>{readOnlyData.employeeId}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ color: "var(--ink-light)", marginTop: "2px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)" }}>DEPARTMENT</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--ink)", marginTop: "4px" }}>{readOnlyData.department}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ color: "var(--ink-light)", marginTop: "2px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)" }}>FACULTY</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--ink)", marginTop: "4px" }}>{readOnlyData.faculty}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Academic Identity Form */}
          <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "32px 40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <div style={{ color: "var(--gold-dark)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)" }}>ACADEMIC IDENTITY</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "var(--ink)", margin: 0, lineHeight: 1.2 }}>Profile Information</h3>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div className="input-group" style={{ gridColumn: "1 / -1" }}>
                <label className="input-label">FULL NAME</label>
                <input
                  type="text"
                  className="auth-input"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">EMPLOYEE ID</label>
                <input
                  type="text"
                  className="auth-input"
                  value={readOnlyData.employeeId}
                  disabled
                  style={{ backgroundColor: "var(--cream-dark)", color: "var(--ink-light)", cursor: "not-allowed" }}
                />
                <span style={{ fontSize: "11px", color: "var(--ink-muted)", marginTop: "4px" }}>Assigned by the Registrar and cannot be changed.</span>
              </div>

              <div className="input-group">
                <label className="input-label">FACULTY</label>
                <input
                  type="text"
                  className="auth-input"
                  value={readOnlyData.faculty}
                  disabled
                  style={{ backgroundColor: "var(--cream-dark)", color: "var(--ink-light)", cursor: "not-allowed" }}
                />
                <span style={{ fontSize: "11px", color: "var(--ink-muted)", marginTop: "4px" }}>Faculty is assigned by the Registrar.</span>
              </div>

              <div className="input-group" style={{ gridColumn: "1 / -1" }}>
                <label className="input-label">DEPARTMENT</label>
                <input
                  type="text"
                  className="auth-input"
                  value={readOnlyData.department}
                  disabled
                  style={{ backgroundColor: "var(--cream-dark)", color: "var(--ink-light)", cursor: "not-allowed" }}
                />
                <span style={{ fontSize: "11px", color: "var(--ink-muted)", marginTop: "4px" }}>Contact the Registrar to update your department.</span>
              </div>
            </div>
          </div>

          {/* Contact Information Form */}
          <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "32px 40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <div style={{ color: "var(--gold-dark)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)" }}>PERSONAL DETAILS</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "var(--ink)", margin: 0, lineHeight: 1.2 }}>Contact Information</h3>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div className="input-group" style={{ gridColumn: "1 / -1" }}>
                <label className="input-label">INSTITUTIONAL EMAIL ADDRESS</label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-light)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                  </div>
                  <input
                    type="text"
                    className="auth-input"
                    value={readOnlyData.email}
                    disabled
                    style={{ backgroundColor: "var(--cream-dark)", color: "var(--ink-light)", cursor: "not-allowed", paddingLeft: "36px" }}
                  />
                </div>
                <span style={{ fontSize: "11px", color: "var(--ink-muted)", marginTop: "4px" }}>Your institutional email is managed by FC-USJ IT. Contact itsupport@usj.ac.lk to update.</span>
              </div>

              <div className="input-group">
                <label className="input-label">PERSONAL PHONE NUMBER</label>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="e.g. +94 71 234 5678"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">RESIDENTIAL ADDRESS</label>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="e.g. Nugegoda, Sri Lanka"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div style={{ gridColumn: "1 / -1", backgroundColor: "rgba(184, 150, 90, 0.05)", borderLeft: "2px solid var(--gold)", padding: "16px", marginTop: "8px", display: "flex", gap: "12px" }}>
                <div style={{ color: "var(--gold-dark)", marginTop: "2px", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                </div>
                <p style={{ fontSize: "13px", color: "var(--ink-muted)", lineHeight: 1.5, margin: 0 }}>
                  Contact details are used by the Faculty for official communications. Ensure your phone number is current so emergency notifications reach you.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (min-width: 900px) {
          .profile-grid { grid-template-columns: 300px 1fr; }
        }
        @media (max-width: 900px) {
          .profile-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </div>
  );
}
