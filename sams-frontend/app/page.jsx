"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── SVG Icon Components ────────────────────────────────────────── */
function IconLocation({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
function IconLock({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="1" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function IconBarChart({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="3" width="4" height="18" /><rect x="10" y="8" width="4" height="13" /><rect x="2" y="13" width="4" height="8" />
    </svg>
  );
}
function IconMobile({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}
function IconShield({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconFileText({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10,9 9,9 8,9" />
    </svg>
  );
}
function IconUsers({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconDownload({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7,10 12,15 17,10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function IconCheck({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}
function IconArrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
    </svg>
  );
}
function IconDiamond({ size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L22 12 12 22 2 12z" />
    </svg>
  );
}
function IconStar({ size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────────── */
const MARQUEE = [
  { icon: <IconLocation size={12} />, label: "GPS Geofencing" },
  { icon: <IconLock size={12} />, label: "OTP Verification" },
  { icon: <IconBarChart size={12} />, label: "Real-Time Analytics" },
  { icon: <IconMobile size={12} />, label: "Mobile Ready" },
  { icon: <IconShield size={12} />, label: "80% Eligibility Guard" },
  { icon: <IconFileText size={12} />, label: "Live Attendance Roster" },
  { icon: <IconUsers size={12} />, label: "Faculty of Computing" },
  { icon: <IconDownload size={12} />, label: "Anti-Proxy Detection" },
];

const TABS = [
  {
    id: "student", label: "Student Portal",
    sub: "Track. Verify. Stay eligible.",
    icon: <IconShield size={18} />,
    heading: "Designed for every university student",
    body: "Monitor your attendance in real time, receive early warnings before falling below 80% eligibility, and stay on top of every session with a complete personal attendance history.",
    items: [
      "One-tap GPS check-in at any lecture hall",
      "Live 80% attendance eligibility tracker",
      "Geo-fence alerts when near campus",
      "Weekly attendance trend insights",
      "Complete personal attendance history",
    ],
  },
  {
    id: "lecturer", label: "Lecturer Console",
    sub: "Deploy. Verify. Export.",
    icon: <IconBarChart size={18} />,
    heading: "Full session control for lecturers",
    body: "Launch a secure geo-fenced session in one click, issue time-locked OTP codes that auto-expire, and watch your live roster fill in as students arrive.",
    items: [
      "Single-click session deployment",
      "Timed OTP generation with auto-expiry",
      "Live attendance roster view",
      "Anti-proxy geolocation validation",
      "Session history with attendance summaries",
    ],
  },
  {
    id: "admin", label: "Admin Portal",
    sub: "Govern. Audit. Manage.",
    icon: <IconUsers size={18} />,
    heading: "Institutional governance at scale",
    body: "Manage the entire Faculty structure — departments, courses, eligibility thresholds — and audit any decision with a full tamper-proof event log.",
    items: [
      "Departmental structure management (CS, SE, IS)",
      "Bulk student & lecturer enrollment",
      "Faculty-wide attendance policy configuration",
      "Faculty-wide eligibility reporting",
      "Complete tamper-proof audit trail",
    ],
  },
];

const STATS = [
  { value: "5,000+", label: "Undergraduates" },
  { value: "3", label: "Departments" },
  { value: "100%", label: "Paperless" },
  { value: "80%", label: "Attendance Rule" },
];

const STEPS = [
  { num: "01", icon: <IconBarChart size={22} />, title: "Lecturer opens session", body: "A geo-fenced session is created for the exact lecture hall. A time-locked OTP is issued instantly." },
  { num: "02", icon: <IconLocation size={22} />, title: "Device location verified", body: "Student GPS must fall within the campus geofence. Remote or spoofed coordinates are automatically rejected." },
  { num: "03", icon: <IconLock size={22} />, title: "OTP is submitted", body: "The student enters the OTP shared by the lecturer. Codes that have expired are silently rejected." },
  { num: "04", icon: <IconShield size={22} />, title: "Attendance is logged", body: "A tamper-proof record is written instantly, visible to the lecturer and auditable by administrators." },
];

/* ─── Fade-in hook ───────────────────────────────────────────────── */
function useFadeIn(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add("visible"), delay); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}
function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useFadeIn(delay);
  return <div ref={ref} className="fade-up" style={style}>{children}</div>;
}

/* ─── Component ──────────────────────────────────────────────────── */
export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("student");
  const [scrolled, setScrolled] = useState(false);

  const active = TABS.find(t => t.id === activeTab);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <nav className={`site-nav ${scrolled ? "scrolled" : ""}`}>
        <div style={{ display: "flex", gap: 36 }}>
          <a href="#features" className="nav-link">Features</a>
          <a href="#how" className="nav-link">How it Works</a>
        </div>

        <div style={{ textAlign: "center" }}>
          <div className="logo-text">SAMS</div>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 8,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: scrolled ? "var(--ink-light)" : "rgba(255,255,255,0.5)",
            marginTop: 2,
            transition: "color 0.3s"
          }}>Student Attendance Management System</div>
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link href="/auth/login" className="nav-link">Sign In</Link>
          <Link href="/auth/register" className="btn-gold" style={{ padding: "9px 22px", fontSize: 9 }}>
            Get Access <IconArrow size={12} />
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: "url('/images/hero-usjhd.png')" }} />
        <div className="hero-overlay" />

        <div className="hero-content">
          <FadeUp>
            <div className="hero-eyebrow">
              Faculty of Computing · University of Sri Jayewardenepura
            </div>
          </FadeUp>

          <FadeUp delay={120}>
            <h1 className="hero-title">
              Attendance that is<br /><em>verified, trusted,</em><br />and instant.
            </h1>
          </FadeUp>

          <FadeUp delay={220}>
            <p className="hero-subtitle">
              SAMS replaces paper registers with a GPS-secured, OTP-protected attendance system built exclusively for university students.
            </p>
          </FadeUp>

          <FadeUp delay={320}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/auth/login" className="btn-gold">Sign In to System <IconArrow size={13} /></Link>
              <Link href="/auth/register" className="btn-outline">Create Account</Link>
            </div>
          </FadeUp>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.5 }}>
          <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff" }}>Scroll</div>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" stroke="white" strokeWidth="1.5">
            <rect x="1" y="1" width="12" height="18" rx="6" />
            <line x1="7" y1="5" x2="7" y2="9" />
          </svg>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <div key={i} className="marquee-item">
              {item.icon}
              {item.label}
              {i < MARQUEE.length * 2 - 1 && <span className="marquee-sep"><IconDiamond size={6} /></span>}
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="section" id="stats" style={{ background: "var(--cream)", maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="section-label">By the numbers</div>
            <h2 className="section-heading">Numbers that <em>matter</em></h2>
          </div>
        </FadeUp>
        <FadeUp delay={100}>
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="stat-cell">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── ORNAMENT ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        <div className="ornament"><IconStar size={10} /></div>
      </div>

      {/* ── FEATURE TABS ── */}
      <section id="features" className="section" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <div style={{ marginBottom: 56 }}>
            <div className="section-label">Three portals · One platform</div>
            <h2 className="section-heading">Tailored for <em>every role</em></h2>
            <p className="section-body" style={{ maxWidth: 540, marginTop: 16 }}>
              SAMS adapts its full interface and feature set to students, lecturers, and administrators within the Faculty of Computing.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={100}>
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 0, border: "1px solid var(--border)" }}>
            {/* Tab sidebar */}
            <div style={{ borderRight: "1px solid var(--border)", background: "var(--cream-dark)" }}>
              {TABS.map(t => (
                <button key={t.id} className={`tab-btn ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>
                  <span className="tab-icon">{t.icon}</span>
                  <div>
                    <div className="tab-title">{t.label}</div>
                    <div className="tab-sub">{t.sub}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Panel */}
            <div className="feature-panel">
              <div className="section-label" style={{ marginBottom: 8 }}>Portal</div>
              <h3 style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "1.9rem", fontWeight: 400, color: "var(--ink)", marginBottom: 14 }}>{active.heading}</h3>
              <p className="section-body" style={{ marginBottom: 32 }}>{active.body}</p>
              <div>
                {active.items.map((item, i) => (
                  <div key={i} className="check-item">
                    <span className="check-icon"><IconCheck size={15} /></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </FadeUp>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="section" style={{ background: "var(--cream-dark)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-label">Anti-fraud by design</div>
              <h2 className="section-heading">How SAMS <em>stops</em> proxy attendance</h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 1, background: "var(--border)" }}>
            {STEPS.map((s, i) => (
              <FadeUp key={s.num} delay={i * 80}>
                <div className="step-card" style={{ height: "100%" }}>
                  <div className="step-num">{s.num}</div>
                  <div style={{ color: "var(--gold)", marginBottom: 14 }}>{s.icon}</div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-body">{s.body}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner">
        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <div className="section-label" style={{ color: "var(--gold-light)", textAlign: "center" }}>Ready to go paperless?</div>
            <h2 style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 300, color: "#fff", textAlign: "center", marginBottom: 20, letterSpacing: "-0.01em" }}>
              Eliminate attendance fraud <em style={{ fontStyle: "italic" }}>for good.</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, textAlign: "center", marginBottom: 44, fontWeight: 300, lineHeight: 1.8 }}>
              Join SAMS, the student attendance management system — and modernise your academic process today.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/auth/register" className="btn-gold">Create Account <IconArrow size={13} /></Link>
              <Link href="/auth/login" className="btn-outline">Sign In</Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 15, color: "rgba(255,255,255,0.7)", letterSpacing: "0.18em" }}>SAMS</span>
          <span style={{ opacity: 0.25 }}>·</span>
          <span>Faculty of Computing, USJ</span>
        </div>
        <p>© {new Date().getFullYear()} University of Sri Jayewardenepura. All rights reserved.</p>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
        </div>
      </footer>
    </>
  );
}
