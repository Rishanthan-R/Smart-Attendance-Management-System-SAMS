"use client";
import { useState } from "react";
import { Navbar } from "../../../components/layout/studentNavbar";
import { Footer } from "../../../components/layout/studentFooter";
import {
  IconBook, IconFileText, IconBarChart, IconClock,
  IconUser, IconArrow, IconPlus, IconX,
  IconGrid2, IconList, IconChevronDown,
} from "../../../components/icons/studentIcons";
import { ENROLLED_COURSES_CP as ENROLLED_COURSES, CATALOG_COURSES_CP as CATALOG_COURSES, NOTIFICATIONS } from "../../../lib/mockData";

/* ── Helpers ──────────────────────────────────────────────────────────────── */
function progressColor(pct) {
  if (pct >= 80) return "var(--gold,#b8965a)";
  if (pct >= 65) return "#d97706";
  return "#b91c1c";
}

function statusBadge(status) {
  const map = {
    excellent: { bg: "#ffd666", color: "#765c00", label: "Excellent" },
    good:      { bg: "#d1fae5", color: "#065f46", label: "Good"      },
    warning:   { bg: "#fde68a", color: "#92400e", label: "At Risk"   },
  };
  const s = map[status] || map.good;
  return (
    <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", background: s.bg, color: s.color, padding: "3px 9px" }}>
      {s.label}
    </span>
  );
}

/* ── Page component ───────────────────────────────────────────────────────── */
export default function CoursesPage() {
  const [notifications,  setNotifications]  = useState(NOTIFICATIONS);
  const [viewMode,       setViewMode]       = useState("grid"); // "grid" | "list"
  const [enrollModal,    setEnrollModal]    = useState(false);
  const [selectedCatalog, setSelectedCatalog] = useState(null);
  const [enrolledIds,    setEnrolledIds]    = useState([]);
  const [subjectFilter,  setSubjectFilter]  = useState("All Subjects");

  /* Merge static data with any newly enrolled courses */
  const allEnrolled = [
    ...ENROLLED_COURSES,
    ...CATALOG_COURSES.filter(c => enrolledIds.includes(c.code)).map(c => ({
      ...c, attendance: 100, attended: 0, total: 0, status: "good",
      icon: "◆", color: "#b8965a", schedule: "TBA", hall: "TBA", nextSession: "TBA",
    })),
  ];

  const filteredCourses = allEnrolled.filter(course => {
    if (subjectFilter === "All Subjects") return true;
    if (subjectFilter === "Computer Science") return course.code.startsWith("CS");
    if (subjectFilter === "Mathematics") return course.code.startsWith("MA") || course.code.startsWith("MATH");
    if (subjectFilter === "Information Systems") return course.code.startsWith("IS");
    return true;
  });

  return (
    <div style={{ background: "var(--cream,#faf7f2)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Shared Navbar — activeNav tells it which link to highlight */}
      <Navbar activeNav="courses" notifications={notifications} setNotifications={setNotifications} />

      <main style={{ flex: 1, paddingTop: 64 }}>

        {/* ── HERO BANNER ── */}
        <div style={{ background: "var(--ink,#1a1714)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(184,150,90,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 40px 44px", position: "relative", zIndex: 1 }}>
            <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--gold-light,#d4b07a)", marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ display: "block", width: 28, height: 1, background: "var(--gold-light,#d4b07a)", opacity: 0.6 }} />
              Academic Year 2024
              <span style={{ display: "block", width: 28, height: 1, background: "var(--gold-light,#d4b07a)", opacity: 0.6 }} />
            </div>
            <h1 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "clamp(2.2rem,4vw,3.2rem)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 12 }}>
              Your <em style={{ fontStyle: "italic", color: "var(--gold-light,#d4b07a)" }}>Enrolled</em> Courses
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", fontWeight: 300, lineHeight: 1.7, maxWidth: 520, marginBottom: 28 }}>
              Manage your active academic progress, track attendance across all modules, and expand your curriculum.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setEnrollModal(true)}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 28px", background: "var(--gold,#b8965a)", color: "#fff", border: "1px solid var(--gold,#b8965a)", cursor: "pointer", fontFamily: "Montserrat,sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--gold-dark,#8a6e3a)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--gold,#b8965a)"}>
                <IconPlus size={15} /> Enroll New Course
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 28px", background: "transparent", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer", fontFamily: "Montserrat,sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                View Curriculum
              </button>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 40px 56px" }}>

          {/* ── SUMMARY STRIP ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--border,rgba(26,23,20,0.10))", marginBottom: 36 }}>
            {[
              { label: "Enrolled Courses",   value: String(allEnrolled.length), icon: <IconBook size={20} />,      sub: "Semester 1 · 2024"  },
              { label: "Total Credits",       value: String(allEnrolled.reduce((s, c) => s + c.credits, 0)),        icon: <IconFileText size={20} />, sub: "of 20 max"          },
              { label: "Overall Attendance",  value: "86%",                                                         icon: <IconBarChart size={20} />, sub: "Overall attendance representation"    },
              { label: "Active Sessions",     value: "2",                                                           icon: <IconClock size={20} />,    sub: "Today"              },
            ].map(s => (
              <div key={s.label} style={{ background: "#fff", padding: "24px 28px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 18, right: 18, color: "var(--gold,#b8965a)", opacity: 0.5 }}>{s.icon}</div>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)", marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "2.4rem", fontWeight: 300, color: "var(--ink,#1a1714)", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "var(--ink-light,#9a9490)", marginTop: 6 }}>{s.sub}</div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "var(--gold,#b8965a)", opacity: 0.15 }} />
              </div>
            ))}
          </div>

          {/* ── TOOLBAR ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)", marginBottom: 4 }}>Currently Enrolled</div>
              <h2 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "1.8rem", fontWeight: 400, color: "var(--ink,#1a1714)" }}>Active Courses</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Filter */}
              <div style={{ position: "relative", display: "inline-block" }}>
                <select
                  value={subjectFilter}
                  onChange={e => setSubjectFilter(e.target.value)}
                  style={{
                    appearance: "none",
                    background: "#fff",
                    border: "1px solid var(--border,rgba(26,23,20,0.10))",
                    padding: "7px 32px 7px 14px",
                    fontFamily: "Montserrat,sans-serif",
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--ink-muted,#5a5650)",
                    cursor: "pointer",
                    outline: "none",
                    borderRadius: 0
                  }}
                >
                  <option value="All Subjects">All Subjects</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Information Systems">Information Systems</option>
                </select>
                <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--ink-muted,#5a5650)", display: "flex", alignItems: "center" }}>
                  <IconChevronDown size={13} />
                </div>
              </div>
              {/* View toggle */}
              <div style={{ display: "flex", border: "1px solid var(--border,rgba(26,23,20,0.10))", background: "#fff" }}>
                {[{ id: "grid", icon: <IconGrid2 size={15} /> }, { id: "list", icon: <IconList size={15} /> }].map(v => (
                  <button key={v.id} onClick={() => setViewMode(v.id)}
                    style={{ padding: "7px 10px", background: viewMode === v.id ? "var(--gold,#b8965a)" : "none", color: viewMode === v.id ? "#fff" : "var(--ink-muted,#5a5650)", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                    {v.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── COURSE GRID ── */}
          {viewMode === "grid" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border,rgba(26,23,20,0.10))", marginBottom: 40 }}>
              {filteredCourses.map(course => (
                <div key={course.code}
                  style={{ background: "#fff", padding: "28px", transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(26,23,20,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>

                  {/* Card header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div style={{ width: 44, height: 44, background: "var(--cream,#faf7f2)", border: "1px solid var(--border-gold,rgba(184,150,90,0.25))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: course.color }}>
                      {course.icon}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                      <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.12em", color: "var(--ink-light,#9a9490)", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "2px 8px" }}>{course.code}</span>
                      {statusBadge(course.status)}
                    </div>
                  </div>

                  <h3 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "1.25rem", fontWeight: 500, color: "var(--ink,#1a1714)", marginBottom: 6, lineHeight: 1.25 }}>{course.name}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                    <IconUser size={13} />
                    <span style={{ fontSize: 12, color: "var(--ink-muted,#5a5650)" }}>{course.instructor}</span>
                  </div>

                  {/* Schedule */}
                  <div style={{ display: "flex", gap: 16, marginBottom: 20, paddingTop: 16, borderTop: "1px solid var(--border,rgba(26,23,20,0.07))" }}>
                    <div>
                      <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-light,#9a9490)", marginBottom: 3 }}>Schedule</div>
                      <div style={{ fontSize: 11, color: "var(--ink-muted,#5a5650)" }}>{course.schedule}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-light,#9a9490)", marginBottom: 3 }}>Next Class</div>
                      <div style={{ fontSize: 11, color: "var(--ink-muted,#5a5650)" }}>{course.nextSession}</div>
                    </div>
                  </div>

                  {/* Attendance bar */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)" }}>Attendance</span>
                      <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 700, color: progressColor(course.attendance) }}>{course.attendance}%</span>
                    </div>
                    <div style={{ height: 5, background: "var(--cream-dark,#f0ebe1)" }}>
                      <div style={{ width: `${course.attendance}%`, height: "100%", background: progressColor(course.attendance), transition: "width 0.6s ease" }} />
                    </div>
                    <div style={{ fontSize: 10, color: "var(--ink-light,#9a9490)", marginTop: 4 }}>{course.attended}/{course.total} sessions attended</div>
                  </div>

                  <button
                    style={{ width: "100%", padding: "10px", background: "var(--ink,#1a1714)", color: "#fff", border: "none", cursor: "pointer", fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#2e2a26"}
                    onMouseLeave={e => e.currentTarget.style.background = "var(--ink,#1a1714)"}>
                    View Details <IconArrow size={11} />
                  </button>
                </div>
              ))}

              {/* Enroll card */}
              <div
                onClick={() => setEnrollModal(true)}
                style={{ background: "#fff", padding: "28px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, cursor: "pointer", border: "1.5px dashed var(--border-gold,rgba(184,150,90,0.35))", minHeight: 320, transition: "border-color 0.2s, background 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold,#b8965a)"; e.currentTarget.style.background = "var(--cream,#faf7f2)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-gold,rgba(184,150,90,0.35))"; e.currentTarget.style.background = "#fff"; }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--cream,#faf7f2)", border: "1px solid var(--border-gold,rgba(184,150,90,0.35))", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold,#b8965a)" }}>
                  <IconPlus size={22} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "1.1rem", fontWeight: 500, color: "var(--ink,#1a1714)", marginBottom: 4 }}>Enroll New Course</div>
                  <div style={{ fontSize: 12, color: "var(--ink-light,#9a9490)", lineHeight: 1.5 }}>Explore the catalog and add more credits to your current semester</div>
                </div>
              </div>
            </div>

          ) : (
            /* ── LIST VIEW ── */
            <div style={{ background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", marginBottom: 40 }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1.4fr 1fr 1.4fr 1fr auto", gap: 12, padding: "12px 20px", borderBottom: "1px solid var(--border,rgba(26,23,20,0.10))" }}>
                {["Course", "Instructor", "Credits", "Attendance", "Status", ""].map(h => (
                  <span key={h} style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-light,#9a9490)" }}>{h}</span>
                ))}
              </div>
              {filteredCourses.map((c, i) => (
                <div key={c.code}
                  style={{ display: "grid", gridTemplateColumns: "2fr 1.4fr 1fr 1.4fr 1fr auto", gap: 12, padding: "16px 20px", alignItems: "center", borderBottom: i < allEnrolled.length - 1 ? "1px solid var(--border,rgba(26,23,20,0.07))" : "none", transition: "background 0.15s", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--cream,#faf7f2)"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink,#1a1714)", marginBottom: 2 }}>{c.name}</div>
                    <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, color: "var(--ink-light,#9a9490)", letterSpacing: "0.1em" }}>{c.code} · {c.hall}</div>
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-muted,#5a5650)" }}>{c.instructor}</div>
                  <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 11, fontWeight: 600, color: "var(--ink,#1a1714)" }}>{c.credits} cr.</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div style={{ flex: 1, height: 4, background: "var(--cream-dark,#f0ebe1)" }}>
                        <div style={{ width: `${c.attendance}%`, height: "100%", background: progressColor(c.attendance) }} />
                      </div>
                      <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, color: "var(--ink-muted,#5a5650)", minWidth: 28 }}>{c.attendance}%</span>
                    </div>
                    <div style={{ fontSize: 10, color: "var(--ink-light,#9a9490)" }}>{c.attended}/{c.total} sessions</div>
                  </div>
                  <div>{statusBadge(c.status)}</div>
                  <button style={{ background: "none", border: "1px solid var(--border,rgba(26,23,20,0.10))", cursor: "pointer", padding: "6px 10px", color: "var(--ink-muted,#5a5650)", fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
                    Details <IconArrow size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* ── ENROLL MODAL ── */}
      {enrollModal && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(26,23,20,0.6)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          onClick={() => { setEnrollModal(false); setSelectedCatalog(null); }}>
          <div
            style={{ background: "#fff", width: "100%", maxWidth: 560, maxHeight: "80vh", overflow: "auto" }}
            onClick={e => e.stopPropagation()}>

            {/* Modal header */}
            <div style={{ padding: "28px 28px 20px", borderBottom: "1px solid var(--border,rgba(26,23,20,0.10))", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)", marginBottom: 4 }}>Course Catalog</div>
                <div style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "1.6rem", fontWeight: 400, color: "var(--ink,#1a1714)" }}>Enroll New Course</div>
              </div>
              <button onClick={() => { setEnrollModal(false); setSelectedCatalog(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-light,#9a9490)", padding: 4 }}>
                <IconX size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: "20px 28px 28px" }}>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)", marginBottom: 14 }}>Available This Semester</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {CATALOG_COURSES.filter(c => !enrolledIds.includes(c.code)).map(c => (
                  <div key={c.code}
                    onClick={() => setSelectedCatalog(c.code === selectedCatalog ? null : c.code)}
                    style={{ padding: "16px 18px", border: `1px solid ${selectedCatalog === c.code ? "var(--gold,#b8965a)" : "var(--border,rgba(26,23,20,0.10))"}`, background: selectedCatalog === c.code ? "var(--cream,#faf7f2)" : "#fff", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.2s, background 0.2s" }}>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink,#1a1714)", marginBottom: 3 }}>{c.name}</div>
                      <div style={{ display: "flex", gap: 12 }}>
                        <span style={{ fontSize: 11, color: "var(--ink-muted,#5a5650)" }}>{c.instructor}</span>
                        <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, color: "var(--ink-light,#9a9490)", letterSpacing: "0.1em" }}>{c.code}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, color: "var(--ink,#1a1714)" }}>{c.credits} credits</div>
                      <div style={{ fontSize: 10, color: c.seats <= 5 ? "#b91c1c" : "var(--ink-light,#9a9490)", marginTop: 2 }}>{c.seats} seats left</div>
                    </div>
                  </div>
                ))}
                {CATALOG_COURSES.every(c => enrolledIds.includes(c.code)) && (
                  <p style={{ fontSize: 12, color: "var(--ink-light,#9a9490)", textAlign: "center", padding: "20px 0" }}>You are enrolled in all available courses.</p>
                )}
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                <button
                  onClick={() => { setEnrollModal(false); setSelectedCatalog(null); }}
                  style={{ flex: 1, padding: "11px", background: "none", border: "1px solid var(--border,rgba(26,23,20,0.10))", cursor: "pointer", fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)" }}>
                  Cancel
                </button>
                <button
                  onClick={() => { if (selectedCatalog) { setEnrolledIds(prev => [...prev, selectedCatalog]); setEnrollModal(false); setSelectedCatalog(null); } }}
                  style={{ flex: 2, padding: "11px", background: selectedCatalog ? "var(--gold,#b8965a)" : "var(--cream-dark,#f0ebe1)", color: selectedCatalog ? "#fff" : "var(--ink-light,#9a9490)", border: "none", cursor: selectedCatalog ? "pointer" : "default", fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", transition: "background 0.2s" }}>
                  Confirm Enrollment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
