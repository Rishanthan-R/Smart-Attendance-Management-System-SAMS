"use client";
import { useState } from "react";
import { Navbar } from "../../../components/layout/studentNavbar";
import { Footer } from "../../../components/layout/studentFooter";
import {
  IconUser, IconMail, IconLock, IconShield, IconCamera, IconMapPin,
  IconPhone, IconBarChart, IconBook, IconCalendar, IconInfo,
  IconCheckCircle, IconAlertCircle, IconKey, IconEye, IconEyeOff,
  IconSave, IconChevronDown,
} from "../../../components/icons/studentIcons";
import { ACTIVITY_LOG } from "../../../lib/mockData";

/* ═══════════════════════════════════════════════════════════════════
   INPUT FIELD  (profile-page form primitive)
═══════════════════════════════════════════════════════════════════ */
function InputField({ label, value, onChange, disabled = false, type = "text", icon, hint }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label style={{
        fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600,
        letterSpacing: "0.16em", textTransform: "uppercase",
        color: disabled ? "var(--ink-light,#9a9490)" : "var(--ink-muted,#5a5650)",
      }}>{label}</label>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: disabled ? "var(--cream,#faf7f2)" : "#fff",
        border: `1px solid ${focused ? "var(--gold,#b8965a)" : "var(--border,rgba(26,23,20,0.12))"}`,
        padding: "10px 14px",
        transition: "border-color 0.2s",
        boxShadow: focused ? "0 0 0 3px rgba(184,150,90,0.08)" : "none",
      }}>
        {icon && <span style={{ color: "var(--ink-light,#9a9490)", flexShrink: 0, display: "flex" }}>{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, background: "none", border: "none", outline: "none",
            fontSize: 13.5, color: disabled ? "var(--ink-muted,#5a5650)" : "var(--ink,#1a1714)",
            fontFamily: "Inter,sans-serif", fontWeight: 300,
            cursor: disabled ? "not-allowed" : "text",
          }}
        />
      </div>
      {hint && <div style={{ fontSize: 10.5, color: "var(--ink-light,#9a9490)", lineHeight: 1.5 }}>{hint}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SELECT FIELD  (profile-page form primitive)
═══════════════════════════════════════════════════════════════════ */
function SelectField({ label, value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label style={{
        fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600,
        letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)",
      }}>{label}</label>
      <div style={{
        display: "flex", alignItems: "center",
        background: "#fff",
        border: `1px solid ${focused ? "var(--gold,#b8965a)" : "var(--border,rgba(26,23,20,0.12))"}`,
        padding: "10px 14px",
        transition: "border-color 0.2s",
        boxShadow: focused ? "0 0 0 3px rgba(184,150,90,0.08)" : "none",
        position: "relative",
      }}>
        <select
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, background: "none", border: "none", outline: "none",
            fontSize: 13.5, color: "var(--ink,#1a1714)",
            fontFamily: "Inter,sans-serif", fontWeight: 300,
            cursor: "pointer", appearance: "none",
          }}
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <span style={{ color: "var(--ink-light,#9a9490)", pointerEvents: "none" }}><IconChevronDown size={14} /></span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PASSWORD FIELD  (profile-page form primitive)
═══════════════════════════════════════════════════════════════════ */
function PasswordField({ label, value, onChange, hint }) {
  const [show,    setShow]    = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label style={{
        fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600,
        letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)",
      }}>{label}</label>
      <div style={{
        display: "flex", alignItems: "center", gap: 10, background: "#fff",
        border: `1px solid ${focused ? "var(--gold,#b8965a)" : "var(--border,rgba(26,23,20,0.12))"}`,
        padding: "10px 14px",
        transition: "border-color 0.2s",
        boxShadow: focused ? "0 0 0 3px rgba(184,150,90,0.08)" : "none",
      }}>
        <span style={{ color: "var(--ink-light,#9a9490)", flexShrink: 0, display: "flex" }}><IconKey size={14} /></span>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, background: "none", border: "none", outline: "none",
            fontSize: 13.5, color: "var(--ink,#1a1714)",
            fontFamily: "Inter,sans-serif", fontWeight: 300,
          }}
        />
        <button
          type="button"
          onClick={() => setShow(v => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-light,#9a9490)", display: "flex", padding: 2 }}
        >
          {show ? <IconEyeOff size={14} /> : <IconEye size={14} />}
        </button>
      </div>
      {hint && <div style={{ fontSize: 10.5, color: "var(--ink-light,#9a9490)", lineHeight: 1.5 }}>{hint}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION HEADER  (profile-page heading block)
═══════════════════════════════════════════════════════════════════ */
function SectionHeader({ eyebrow, title, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
      <div style={{
        width: 36, height: 36, background: "rgba(184,150,90,0.10)",
        border: "1px solid var(--border-gold,rgba(184,150,90,0.25))",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--gold,#b8965a)", flexShrink: 0,
      }}>{icon}</div>
      <div>
        <div style={{
          fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: "var(--ink-muted,#5a5650)", marginBottom: 3,
        }}>{eyebrow}</div>
        <div style={{
          fontFamily: "Cormorant Garamond,Georgia,serif",
          fontSize: "1.5rem", fontWeight: 400, color: "var(--ink,#1a1714)",
        }}>{title}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PROFILE PAGE  (default export)
═══════════════════════════════════════════════════════════════════ */
export default function StudentProfile() {
  /* ── form state ── */
  const [form, setForm] = useState({
    fullName:     "Alex Johnson",
    studentId:    "U-2021-4892",
    faculty:      "Faculty of Computing",
    department:   "Computer Science",
    email:        "a.johnson@fc.usj.ac.lk",
    phone:        "+94 71 234 5678",
    address:      "Nugegoda, Sri Lanka",
    yearOfStudy:  "Year 3",
    batch:        "2021/2022 Batch",
  });

  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [twoFA,     setTwoFA]     = useState(true);
  const [saved,     setSaved]     = useState(false);
  const [pwSaved,   setPwSaved]   = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }
  function handlePwSave() {
    setPwSaved(true);
    setTimeout(() => { setPwSaved(false); setPasswords({ current: "", newPass: "", confirm: "" }); }, 2500);
  }

  /* ── render ── */
  return (
    <div style={{ background: "var(--cream,#faf7f2)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Shared top navigation — activeNav tells it which link to highlight */}
      <Navbar activeNav="profile" yearOfStudy={form.yearOfStudy} />

      <main style={{ flex: 1, paddingTop: 64 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 36px 56px" }}>

          {/* ── PAGE HEADER ── */}
          <div style={{ marginBottom: 36, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{
                fontFamily: "Cormorant Garamond,Georgia,serif",
                fontSize: "clamp(2.2rem,4vw,3.2rem)", fontWeight: 300,
                color: "var(--ink,#1a1714)", lineHeight: 1.1, marginBottom: 8,
              }}>
                Account <em style={{ fontStyle: "italic", color: "var(--gold,#b8965a)" }}>Profile.</em>
              </h1>
              <p style={{ fontSize: 14, color: "var(--ink-muted,#5a5650)", fontWeight: 300, lineHeight: 1.7 }}>
                Manage your academic identity, contact details, and security settings.
              </p>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 22px", background: "none",
                  border: "1px solid var(--ink,#1a1714)", cursor: "pointer",
                  fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600,
                  letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink,#1a1714)",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--ink,#1a1714)"; e.currentTarget.style.color = "var(--cream,#faf7f2)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none";               e.currentTarget.style.color = "var(--ink,#1a1714)";   }}
              >
                Discard Changes
              </button>

              <button
                onClick={handleSave}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 22px",
                  background: saved ? "#15803d" : "var(--gold,#b8965a)",
                  border: `1px solid ${saved ? "#15803d" : "var(--gold,#b8965a)"}`,
                  cursor: "pointer",
                  fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600,
                  letterSpacing: "0.16em", textTransform: "uppercase", color: "#fff",
                  transition: "background 0.3s, border-color 0.3s",
                }}
              >
                <IconSave size={13} />
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          </div>

          {/* ── MAIN GRID ── */}
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24, alignItems: "start" }}>

            {/* ════ LEFT COLUMN ════ */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Avatar Card */}
              <div style={{
                background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))",
                padding: "36px 28px", textAlign: "center",
                position: "relative", overflow: "hidden",
              }}>
                {/* decorative top accent */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: "linear-gradient(90deg, var(--gold-dark,#8a6e3a), var(--gold,#b8965a), var(--gold-light,#d4b07a))",
                }} />

                {/* Avatar */}
                <div style={{ position: "relative", display: "inline-block", marginBottom: 18 }}>
                  <div style={{
                    width: 96, height: 96, borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--gold-dark,#8a6e3a) 0%, var(--gold,#b8965a) 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "3px solid var(--border-gold,rgba(184,150,90,0.35))",
                    boxShadow: "0 0 0 6px rgba(184,150,90,0.08)",
                    margin: "0 auto",
                  }}>
                    <span style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 38, fontWeight: 600, color: "#fff", lineHeight: 1 }}>A</span>
                  </div>
                  <button style={{
                    position: "absolute", bottom: 0, right: 0,
                    width: 28, height: 28, borderRadius: "50%",
                    background: "var(--gold,#b8965a)", border: "2px solid #fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}>
                    <IconCamera size={13} />
                  </button>
                </div>

                <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "1.5rem", fontWeight: 500, color: "var(--ink,#1a1714)", letterSpacing: "0.02em", marginBottom: 4 }}>
                  Alex Johnson
                </div>
                <div style={{
                  fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  background: "rgba(184,150,90,0.12)", color: "var(--gold-dark,#8a6e3a)",
                  padding: "4px 12px", display: "inline-block", marginBottom: 24,
                }}>
                  Undergraduate Student
                </div>

                {/* Divider ornament */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <div style={{ flex: 1, height: 1, background: "var(--border,rgba(26,23,20,0.08))" }} />
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="var(--gold,#b8965a)" opacity="0.5">
                    <polygon points="5,0 6.5,3.5 10,4 7.5,6.5 8,10 5,8.5 2,10 2.5,6.5 0,4 3.5,3.5" />
                  </svg>
                  <div style={{ flex: 1, height: 1, background: "var(--border,rgba(26,23,20,0.08))" }} />
                </div>

                {/* Identity details */}
                {[
                  { icon: <IconUser size={14} />,     label: "Student ID",    value: "U-2021-4892"   },
                  { icon: <IconBook size={14} />,     label: "Department",    value: "Computer Science" },
                  { icon: <IconCalendar size={14} />, label: "Batch",         value: form.batch      },
                  { icon: <IconBarChart size={14} />, label: "Year of Study", value: form.yearOfStudy },
                ].map(row => (
                  <div key={row.label} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 0",
                    borderBottom: "1px solid var(--border,rgba(26,23,20,0.07))",
                    textAlign: "left",
                  }}>
                    <span style={{ color: "var(--gold,#b8965a)", flexShrink: 0 }}>{row.icon}</span>
                    <div>
                      <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-light,#9a9490)", marginBottom: 1 }}>{row.label}</div>
                      <div style={{ fontSize: 12.5, color: "var(--ink,#1a1714)", fontWeight: 500 }}>{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Security Overview Card */}
              <div style={{ background: "var(--ink,#1a1714)", border: "1px solid rgba(255,255,255,0.06)", padding: "24px 24px" }}>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold-light,#d4b07a)", marginBottom: 18 }}>
                  Security Overview
                </div>
                {[
                  { label: "Two-Factor Auth",   value: twoFA ? "Enabled" : "Disabled", good: twoFA },
                  { label: "Last Login",         value: "2 hours ago",                  good: true  },
                  { label: "Active Sessions",    value: "1 device",                     good: true  },
                  { label: "Password Strength",  value: "Strong",                       good: true  },
                ].map(row => (
                  <div key={row.label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>{row.label}</span>
                    <span style={{
                      fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 700,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      background: row.good ? "rgba(184,150,90,0.18)" : "rgba(185,28,28,0.2)",
                      color: row.good ? "var(--gold-light,#d4b07a)" : "#fca5a5",
                      padding: "3px 8px",
                    }}>{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Activity Log */}
              <div style={{ background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "24px 24px" }}>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)", marginBottom: 6 }}>Recent</div>
                <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink,#1a1714)", marginBottom: 18 }}>Activity Log</div>

                {ACTIVITY_LOG.map((item, i) => {
                  const dotColor = item.type === "success" ? "var(--gold,#b8965a)" : item.type === "warning" ? "#d97706" : "#6b7280";
                  return (
                    <div key={i} style={{
                      display: "flex", gap: 12, padding: "10px 0",
                      borderBottom: i < ACTIVITY_LOG.length - 1 ? "1px solid var(--border,rgba(26,23,20,0.07))" : "none",
                    }}>
                      <div style={{ flexShrink: 0, paddingTop: 4 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: dotColor }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12.5, color: "var(--ink,#1a1714)", fontWeight: 500, marginBottom: 2 }}>{item.action}</div>
                        <div style={{ fontSize: 11,   color: "var(--ink-muted,#5a5650)", fontWeight: 300 }}>{item.detail}</div>
                        <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, color: "var(--ink-light,#9a9490)", letterSpacing: "0.08em", marginTop: 3 }}>{item.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>{/* end left column */}

            {/* ════ RIGHT COLUMN ════ */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              {/* ── STUDENT INFORMATION ── */}
              <div style={{ background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "36px 36px" }}>
                <SectionHeader eyebrow="Academic Identity" title="Student Information" icon={<IconUser size={18} />} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                  <InputField label="Full Name"  value={form.fullName}  onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
                  <InputField label="Student ID" value={form.studentId} disabled hint="Student ID is assigned by the Registrar and cannot be changed." />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                  <InputField
                    label="Faculty"
                    value={form.faculty}
                    disabled
                    hint="Faculty is assigned by the Registrar and cannot be changed."
                  />
                  <InputField
                    label="Department"
                    value={form.department}
                    disabled
                    hint="Contact the Registrar to update your department."
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <SelectField
                    label="Year of Study" value={form.yearOfStudy}
                    onChange={e => setForm(f => ({ ...f, yearOfStudy: e.target.value }))}
                    options={["Year 1", "Year 2", "Year 3", "Year 4"]}
                  />
                  <SelectField
                    label="Batch"
                    value={form.batch}
                    onChange={e => setForm(f => ({ ...f, batch: e.target.value }))}
                    options={[
                      "2021/2022 Batch",
                      "2022/2023 Batch",
                      "2023/2024 Batch",
                      "2024/2025 Batch",
                      "2025/2026 Batch",
                    ]}
                  />
                </div>
              </div>

              {/* ── CONTACT INFORMATION ── */}
              <div style={{ background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "36px 36px" }}>
                <SectionHeader eyebrow="Personal Details" title="Contact Information" icon={<IconMail size={18} />} />

                <div style={{ marginBottom: 20 }}>
                  <InputField
                    label="Institutional Email Address"
                    value={form.email} disabled
                    icon={<IconMail size={14} />}
                    hint="Your institutional email is managed by FC-USJ IT. Contact itsupport@usj.ac.lk to update."
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <InputField
                    label="Personal Phone Number"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    icon={<IconPhone size={14} />}
                  />
                  <InputField
                    label="Residential Address"
                    value={form.address}
                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    icon={<IconMapPin size={14} />}
                  />
                </div>

                {/* Info notice */}
                <div style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  marginTop: 24, padding: "14px 16px",
                  background: "var(--cream,#faf7f2)",
                  border: "1px solid var(--border-gold,rgba(184,150,90,0.35))",
                }}>
                  <span style={{ color: "var(--gold,#b8965a)", flexShrink: 0, marginTop: 1 }}><IconInfo size={15} /></span>
                  <div style={{ fontSize: 12, color: "var(--ink-muted,#5a5650)", lineHeight: 1.7, fontWeight: 300 }}>
                    Contact details are used by the Faculty for official communications. Ensure your phone number is current so emergency notifications reach you.
                  </div>
                </div>
              </div>

              {/* ── SECURITY SETTINGS ── */}
              <div style={{ background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "36px 36px" }}>
                <SectionHeader eyebrow="Account Protection" title="Security Settings" icon={<IconLock size={18} />} />

                {/* Change password panel */}
                <div style={{ border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "22px 22px 22px", marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 36, height: 36, background: "var(--cream-dark,#f0ebe1)",
                        border: "1px solid var(--border,rgba(26,23,20,0.10))",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "var(--ink-muted,#5a5650)",
                      }}>
                        <IconLock size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink,#1a1714)", marginBottom: 2 }}>Update Password</div>
                        <div style={{ fontSize: 11.5, color: "var(--ink-light,#9a9490)", fontWeight: 300 }}>Keep your account secure with a strong password</div>
                      </div>
                    </div>
                    <button
                      onClick={handlePwSave}
                      style={{
                        display: "flex", alignItems: "center", gap: 7,
                        padding: "9px 20px",
                        background: pwSaved ? "#15803d" : "none",
                        border: `1px solid ${pwSaved ? "#15803d" : "var(--ink,#1a1714)"}`,
                        cursor: "pointer",
                        fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600,
                        letterSpacing: "0.14em", textTransform: "uppercase",
                        color: pwSaved ? "#fff" : "var(--ink,#1a1714)",
                        transition: "all 0.25s", flexShrink: 0,
                      }}
                      onMouseEnter={e => { if (!pwSaved) { e.currentTarget.style.background = "var(--ink,#1a1714)"; e.currentTarget.style.color = "var(--cream,#faf7f2)"; } }}
                      onMouseLeave={e => { if (!pwSaved) { e.currentTarget.style.background = "none";               e.currentTarget.style.color = "var(--ink,#1a1714)";   } }}
                    >
                      {pwSaved ? <><IconCheckCircle size={13} /> Changed!</> : "Change Password"}
                    </button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <PasswordField
                      label="Current Password"
                      value={passwords.current}
                      onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
                    />
                    <PasswordField
                      label="New Password"
                      value={passwords.newPass}
                      onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))}
                      hint="Minimum 8 characters with at least one number and symbol."
                    />
                  </div>

                  {passwords.newPass && (
                    <div style={{ marginTop: 14 }}>
                      <PasswordField
                        label="Confirm New Password"
                        value={passwords.confirm}
                        onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                      />
                      {passwords.confirm && passwords.confirm !== passwords.newPass && (
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 11, color: "#b91c1c" }}>
                          <IconAlertCircle size={12} /> Passwords do not match.
                        </div>
                      )}
                      {passwords.confirm && passwords.confirm === passwords.newPass && (
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 11, color: "#15803d" }}>
                          <IconCheckCircle size={12} /> Passwords match.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 2FA toggle */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "18px 22px",
                  border: "1px solid var(--border,rgba(26,23,20,0.10))",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 36, height: 36,
                      background: twoFA ? "rgba(184,150,90,0.10)" : "var(--cream-dark,#f0ebe1)",
                      border: `1px solid ${twoFA ? "var(--border-gold,rgba(184,150,90,0.3))" : "var(--border,rgba(26,23,20,0.10))"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: twoFA ? "var(--gold,#b8965a)" : "var(--ink-muted,#5a5650)",
                      transition: "all 0.3s",
                    }}>
                      <IconShield size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink,#1a1714)", marginBottom: 2 }}>Two-Factor Authentication</div>
                      <div style={{ fontSize: 11.5, color: "var(--ink-light,#9a9490)", fontWeight: 300 }}>
                        {twoFA ? "An OTP is sent to your email on each login." : "Enable 2FA for additional security."}
                      </div>
                    </div>
                  </div>

                  {/* Toggle switch */}
                  <button
                    onClick={() => setTwoFA(v => !v)}
                    style={{
                      position: "relative", width: 48, height: 26,
                      background: twoFA ? "var(--gold,#b8965a)" : "var(--border,rgba(26,23,20,0.15))",
                      border: "none", cursor: "pointer",
                      borderRadius: 13, transition: "background 0.3s", flexShrink: 0,
                    }}
                  >
                    <span style={{
                      position: "absolute", top: 3, left: twoFA ? 25 : 3,
                      width: 20, height: 20, borderRadius: "50%",
                      background: "#fff", transition: "left 0.3s",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
                    }} />
                  </button>
                </div>

                {/* Active Sessions */}
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)", marginBottom: 12 }}>
                    Active Sessions
                  </div>
                  {[
                    { device: "Chrome — Windows 11", location: "Colombo, Sri Lanka",  time: "Current session", current: true  },
                    { device: "Safari — iPhone 15",  location: "Nugegoda, Sri Lanka", time: "2 days ago",      current: false },
                  ].map((session, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 16px",
                      background: session.current ? "rgba(184,150,90,0.05)" : "var(--cream,#faf7f2)",
                      border: `1px solid ${session.current ? "var(--border-gold,rgba(184,150,90,0.25))" : "var(--border,rgba(26,23,20,0.07))"}`,
                      marginBottom: 8,
                    }}>
                      <div>
                        <div style={{ fontSize: 12.5, color: "var(--ink,#1a1714)", fontWeight: 500, marginBottom: 2 }}>{session.device}</div>
                        <div style={{ fontSize: 11,   color: "var(--ink-light,#9a9490)", fontWeight: 300 }}>{session.location} · {session.time}</div>
                      </div>
                      {session.current
                        ? <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", background: "var(--gold,#b8965a)", color: "#fff", padding: "3px 8px" }}>Current</span>
                        : <button style={{ background: "none", border: "1px solid #fecaca", cursor: "pointer", padding: "4px 12px", fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#b91c1c" }}>Revoke</button>
                      }
                    </div>
                  ))}
                </div>

              </div>{/* end security card */}

            </div>{/* end right column */}
          </div>{/* end main grid */}

        </div>
      </main>

      {/* Shared footer */}
      <Footer />
    </div>
  );
}
