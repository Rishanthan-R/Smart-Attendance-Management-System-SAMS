"use client";
import { useState } from "react";
import { Navbar } from "../../../components/layout/studentNavbar";
import { Footer } from "../../../components/layout/studentFooter";
import {
  IconClock, IconLocation, IconAlertCircle, IconChevronDown, IconFilter,
  IconSearch, IconMoreH, IconChevronLeft, IconChevronRight, IconDownload,
} from "../../../components/icons/studentIcons";
import { HISTORY_RECORDS, NOTIFICATIONS } from "../../../lib/mockData";

const ROWS_PER_PAGE = 4;

export default function AttendanceHistoryPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [filterSubject, setFilterSubject] = useState("All Subjects");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const subjects = ["All Subjects", ...Array.from(new Set(HISTORY_RECORDS.map(r => r.subject)))];
  const statuses = [
    { value: "All Status", label: "All Status" },
    { value: "present",    label: "Present" },
    { value: "absent",     label: "Absent" },
    { value: "late",       label: "Late" },
  ];

  const filtered = HISTORY_RECORDS.filter(r => {
    const matchSubject = filterSubject === "All Subjects" || r.subject === filterSubject;
    const matchStatus = filterStatus === "All Status" || r.status === filterStatus;  // value is raw lowercase key
    const matchSearch = r.subject.toLowerCase().includes(searchQuery.toLowerCase()) || r.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchStatus && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  function statusBadge(status) {
    const map = {
      present: { bg: "#ffd666", color: "#765c00", label: "Present" },
      absent:  { bg: "#ffdad6", color: "#93000a", label: "Absent" },
      late:    { bg: "#e4e2e1", color: "#5f5f5c", label: "Late" },
    };
    const s = map[status] || map.present;
    return <span style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", background: s.bg, color: s.color, padding: "3px 10px" }}>{s.label}</span>;
  }

  const present = HISTORY_RECORDS.filter(r => r.status === "present").length;
  const absent  = HISTORY_RECORDS.filter(r => r.status === "absent").length;
  const pct = Math.round((present / HISTORY_RECORDS.length) * 100);

  return (
    <div style={{ background: "var(--cream,#faf7f2)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar activeNav="history" notifications={notifications} setNotifications={setNotifications} />

      <main style={{ flex: 1, paddingTop: 64 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "44px 40px 56px" }}>

          {/* ── PAGE HEADER ── */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)", marginBottom: 10 }}>Academic Record</div>
            <h1 style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 300, color: "var(--ink,#1a1714)", lineHeight: 1.1, marginBottom: 8 }}>Attendance <em style={{ fontStyle: "italic", color: "var(--gold,#b8965a)" }}>History</em></h1>
            <p style={{ fontSize: 14, color: "var(--ink-muted,#5a5650)", fontWeight: 300, lineHeight: 1.7, maxWidth: 480 }}>Comprehensive tracking of your academic engagement and session participation across all enrolled modules.</p>
          </div>

          {/* ── STAT CARDS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: "var(--border,rgba(26,23,20,0.10))", marginBottom: 28 }}>
            <div style={{ background: "var(--gold,#b8965a)", padding: "32px 36px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
              <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 10 }}>Overall Percentage</div>
              <div style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "3.6rem", fontWeight: 300, color: "#fff", lineHeight: 1, marginBottom: 14 }}>{pct}%</div>
              <div style={{ height: 5, background: "rgba(255,255,255,0.25)", marginBottom: 12 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: "rgba(255,255,255,0.8)" }} />
              </div>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em" }}>Overall attendance representation</div>
            </div>

            <div style={{ background: "#fff", padding: "32px 36px", position: "relative", overflow: "hidden" }}>
              <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-muted,#5a5650)", marginBottom: 10 }}>Total Days Present</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 16 }}>
                <span style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "3.6rem", fontWeight: 300, color: "var(--ink,#1a1714)", lineHeight: 1 }}>{present}</span>
                <span style={{ fontSize: 12, color: "var(--gold-dark,#8a6e3a)", fontWeight: 500, marginBottom: 8 }}>+4 from last month</span>
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {["#e8e3d9","#d4c99e","#c0ae6e","#a68e45","#8a6e3a","var(--gold,#b8965a)"].map((c, i) => (
                  <div key={i} style={{ height: 20, flex: 1, background: c }} />
                ))}
              </div>
              <div style={{ fontSize: 10, color: "var(--ink-light,#9a9490)", marginTop: 6 }}>Engagement trend — Semester 1</div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "var(--gold,#b8965a)", opacity: 0.18 }} />
            </div>

            <div style={{ background: "var(--ink,#1a1714)", padding: "32px 36px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(184,150,90,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
              <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>Total Days Absent</div>
              <div style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "3.6rem", fontWeight: 300, color: "#fff", lineHeight: 1, marginBottom: 16 }}>{absent}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#b91c1c22", display: "flex", alignItems: "center", justifyContent: "center" }}><IconAlertCircle size={13} style={{ color: "#fca5a5" }} /></div>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Requires attention for {absent} course{absent !== 1 ? "s" : ""}</span>
              </div>
              <button style={{ padding: "8px 16px", background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                View Absence Policies
              </button>
            </div>
          </div>

          {/* ── FILTERS ── */}
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <select value={filterSubject} onChange={e => { setFilterSubject(e.target.value); setPage(1); }}
                style={{ appearance: "none", background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "8px 36px 8px 14px", fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", color: "var(--ink-muted,#5a5650)", cursor: "pointer", outline: "none" }}>
                {subjects.map(s => <option key={s}>{s}</option>)}
              </select>
              <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--ink-muted,#5a5650)" }}><IconChevronDown size={13} /></div>
            </div>

            <div style={{ position: "relative" }}>
              <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
                style={{ appearance: "none", background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "8px 36px 8px 14px", fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", color: "var(--ink-muted,#5a5650)", cursor: "pointer", outline: "none" }}>
                {statuses.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--ink-muted,#5a5650)" }}><IconChevronDown size={13} /></div>
            </div>

            <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 20px", background: "var(--ink,#1a1714)", color: "#fff", border: "none", cursor: "pointer", fontFamily: "Montserrat,sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              <IconFilter size={13} /> Apply Filters
            </button>

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", padding: "8px 14px", minWidth: 240 }}>
              <IconSearch size={14} />
              <input value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setPage(1); }} placeholder="Search by session or location…" style={{ background: "none", border: "none", outline: "none", fontSize: 12, color: "var(--ink,#1a1714)", fontFamily: "Inter,sans-serif", flex: 1 }} />
            </div>
          </div>

          {/* ── TABLE ── */}
          <div style={{ background: "#fff", border: "1px solid var(--border,rgba(26,23,20,0.10))", marginBottom: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr 1.4fr 1.2fr 0.8fr 0.5fr", gap: 12, padding: "12px 20px", borderBottom: "1px solid var(--border,rgba(26,23,20,0.10))" }}>
              {["Date", "Subject", "Session Time", "Location", "Status", "Actions"].map(h => (
                <span key={h} style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-light,#9a9490)" }}>{h}</span>
              ))}
            </div>

            {paginated.length === 0 ? (
              <div style={{ padding: "48px", textAlign: "center" }}>
                <div style={{ fontFamily: "Cormorant Garamond,serif", fontSize: "1.4rem", color: "var(--ink-muted,#5a5650)", marginBottom: 6 }}>No records found</div>
                <div style={{ fontSize: 12, color: "var(--ink-light,#9a9490)" }}>Try adjusting your filters or search query.</div>
              </div>
            ) : paginated.map((r, i) => (
              <div key={r.id} style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr 1.4fr 1.2fr 0.8fr 0.5fr", gap: 12, padding: "16px 20px", alignItems: "center", borderBottom: i < paginated.length - 1 ? "1px solid var(--border,rgba(26,23,20,0.07))" : "none", transition: "background 0.15s", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--cream,#faf7f2)"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink,#1a1714)", marginBottom: 1 }}>{r.date}</div>
                  <div style={{ fontFamily: "Montserrat,sans-serif", fontSize: 8, color: "var(--ink-light,#9a9490)", letterSpacing: "0.08em" }}>{r.day}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 32, height: 32, background: "var(--cream,#faf7f2)", border: "1px solid var(--border-gold,rgba(184,150,90,0.2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "var(--gold-dark,#8a6e3a)", flexShrink: 0 }}>{r.icon}</div>
                  <div style={{ fontFamily: "Cormorant Garamond,Georgia,serif", fontSize: "1.05rem", fontWeight: 500, color: "var(--ink,#1a1714)" }}>{r.subject}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--ink-muted,#5a5650)" }}>
                  <IconClock size={12} style={{ flexShrink: 0 }} />
                  {r.time}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--ink-muted,#5a5650)" }}>
                  <IconLocation size={12} style={{ flexShrink: 0 }} />
                  {r.location}
                </div>
                {statusBadge(r.status)}
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-light,#9a9490)", display: "flex", alignItems: "center" }}><IconMoreH size={16} /></button>
              </div>
            ))}
          </div>

          {/* ── PAGINATION ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--ink-light,#9a9490)" }}>Showing {Math.min((page-1)*ROWS_PER_PAGE + 1, filtered.length)}–{Math.min(page*ROWS_PER_PAGE, filtered.length)} of {filtered.length} entries</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
                style={{ padding: "6px 10px", background: "none", border: "1px solid var(--border,rgba(26,23,20,0.10))", cursor: page === 1 ? "default" : "pointer", color: page === 1 ? "var(--ink-light,#9a9490)" : "var(--ink-muted,#5a5650)", display: "flex", alignItems: "center", opacity: page === 1 ? 0.4 : 1 }}>
                <IconChevronLeft size={15} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  style={{ width: 32, height: 32, background: p === page ? "var(--ink,#1a1714)" : "#fff", color: p === page ? "#fff" : "var(--ink-muted,#5a5650)", border: "1px solid var(--border,rgba(26,23,20,0.10))", cursor: "pointer", fontFamily: "Montserrat,sans-serif", fontSize: 10, fontWeight: 600 }}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}
                style={{ padding: "6px 10px", background: "none", border: "1px solid var(--border,rgba(26,23,20,0.10))", cursor: page === totalPages ? "default" : "pointer", color: "var(--ink-muted,#5a5650)", display: "flex", alignItems: "center", opacity: page === totalPages ? 0.4 : 1 }}>
                <IconChevronRight size={15} />
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      <button
        title="Export attendance report"
        onClick={() => alert("Exporting attendance report…")}
        style={{ position: "fixed", bottom: 32, right: 32, width: 52, height: 52, borderRadius: "50%", background: "var(--gold,#b8965a)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 4px 20px rgba(184,150,90,0.4)", transition: "background 0.2s, transform 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.background = "var(--gold-dark,#8a6e3a)"; e.currentTarget.style.transform = "scale(1.08)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "var(--gold,#b8965a)"; e.currentTarget.style.transform = "scale(1)"; }}>
        <IconDownload size={22} />
      </button>
    </div>
  );
}
