'use client';

import { useState } from 'react';

/* ─── SVG Icons ───────────────────────────────────────────────────── */
function IconCode({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" />
    </svg>
  );
}
function IconBrain({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-4.6A3 3 0 0 1 4.5 10a3 3 0 0 1 .5-1.66A2.5 2.5 0 0 1 9.5 2z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-4.6A3 3 0 0 0 19.5 10a3 3 0 0 0-.5-1.66A2.5 2.5 0 0 0 14.5 2z" />
    </svg>
  );
}
function IconRouter({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="14" width="20" height="6" rx="2" /><path d="M6 14v-4" /><path d="M12 14V8" /><path d="M18 14v-2" />
      <circle cx="12" cy="4" r="2" />
    </svg>
  );
}
function IconShield({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconSearch({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconPlus({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function IconEdit({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconDelete({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3,6 5,6 21,6" /><path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
  );
}
function IconBook({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
function IconUsers({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconTrendUp({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" />
    </svg>
  );
}
function IconClose({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconAddBusiness({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9,22 9,12 15,12 15,22" />
      <line x1="18" y1="5" x2="18" y2="11" /><line x1="15" y1="8" x2="21" y2="8" />
    </svg>
  );
}
function IconStar({ size = 9 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

const DEPARTMENTS = [
  { name: 'Software Engineering', icon: <IconCode size={22} />, hod: 'Dr. Chaminda Kumara', initials: 'CK', subjects: 24, students: 450 },
  { name: 'Data Science & AI', icon: <IconBrain size={22} />, hod: 'Prof. Thushari Silva', initials: 'TS', subjects: 18, students: 320 },
  { name: 'Network Systems', icon: <IconRouter size={22} />, hod: 'Dr. Lasith Gunawardena', initials: 'LG', subjects: 15, students: 280 },
  { name: 'Information Security', icon: <IconShield size={22} />, hod: 'Dr. Manori Gamage', initials: 'MG', subjects: 12, students: 150 },
];

export default function DepartmentManagementPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* ── PAGE HEADER ── */}
      <div className="admin-page-header">
        <div>
          <div className="admin-page-eyebrow">Academic Structure</div>
          <h1 className="admin-page-title">Department <em>Management</em></h1>
          <p className="admin-page-subtitle">Organize and monitor academic units within the Faculty of Computing.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div className="admin-search-wrap">
            <span className="admin-search-icon"><IconSearch /></span>
            <input className="admin-search" placeholder="Search departments..." type="text" />
          </div>
          <button className="admin-btn-gold" onClick={() => setModalOpen(true)}>
            <IconPlus /> New Department
          </button>
        </div>
      </div>

      {/* ── OVERVIEW BANNER ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', marginBottom: 40 }}>
        <div style={{ background: 'var(--white)', padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="admin-section-label">Total Overview</div>
            <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(2rem,3vw,3rem)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1, marginTop: 8 }}>
              12 <span style={{ fontSize: '1.6rem', color: 'var(--ink-muted)' }}>Departments</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-muted)', fontWeight: 300, marginTop: 8 }}>
              Active management across all computing disciplines.
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'rgba(184,150,90,0.08)', border: '1px solid var(--border-gold)' }}>
            <IconTrendUp size={14} />
            <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-dark)' }}>+2 this semester</span>
          </div>
        </div>
        <div style={{ background: 'var(--ink)', padding: '32px 40px', minWidth: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 16, right: 20, opacity: 0.08, color: 'var(--gold)' }}>
            <IconUsers size={56} />
          </div>
          <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8, position: 'relative' }}>Faculty Headcount</div>
          <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '2.6rem', fontWeight: 300, color: 'var(--white)', lineHeight: 1, position: 'relative' }}>142</div>
          <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 8.5, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.12em', marginTop: 6, position: 'relative' }}>Full-time teaching staff</div>
        </div>
      </div>

      {/* ── ORNAMENT ── */}
      <div className="admin-ornament"><IconStar /></div>

      {/* ── DEPARTMENT CARDS GRID ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
        {DEPARTMENTS.map((dept) => (
          <div key={dept.name} className="admin-dept-card">
            {/* Hover actions */}
            <div className="admin-dept-card-actions">
              <button className="admin-btn-ghost" title="Edit"><IconEdit /></button>
              <button className="admin-btn-ghost danger" title="Delete"><IconDelete /></button>
            </div>

            {/* Icon */}
            <div className="admin-dept-icon-box">{dept.icon}</div>

            {/* Name */}
            <div className="admin-dept-name">{dept.name}</div>

            {/* HoD */}
            <div className="admin-dept-hod">
              <div className="admin-dept-avatar">{dept.initials}</div>
              <div>
                <div className="admin-dept-hod-label">Head of Department</div>
                <div className="admin-dept-hod-name">{dept.hod}</div>
              </div>
            </div>

            {/* Meta */}
            <div className="admin-dept-meta">
              <div className="admin-dept-meta-item">
                <IconBook />
                <span>{dept.subjects} Subjects</span>
              </div>
              <div className="admin-dept-meta-item">
                <IconUsers />
                <span>{dept.students} Students</span>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Placeholder */}
        <div className="admin-add-card" onClick={() => setModalOpen(true)}>
          <div className="admin-add-icon"><IconAddBusiness /></div>
          <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.1rem', fontWeight: 500, color: 'var(--ink)', marginBottom: 8 }}>
            Add New Unit
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-light)', fontWeight: 300, maxWidth: 180 }}>
            Expand the faculty by adding a new academic department.
          </div>
        </div>
      </div>

      {/* ── ADD DEPARTMENT MODAL ── */}
      {modalOpen && (
        <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">New Department</h2>
              <button className="admin-close-btn" onClick={() => setModalOpen(false)}><IconClose /></button>
            </div>

            <div className="admin-modal-body">
              <div>
                <label className="admin-label">Department Name</label>
                <input className="admin-input" placeholder="e.g. Artificial Intelligence" type="text" />
              </div>
              <div>
                <label className="admin-label">Head of Department</label>
                <select className="admin-input" style={{ cursor: 'pointer' }}>
                  <option value="">Select Faculty Member</option>
                  <option>Dr. Janaka Withanage</option>
                  <option>Prof. Anuradha Jayasiri</option>
                  <option>Dr. Saman Perera</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label className="admin-label">Initial Subjects</label>
                  <input className="admin-input" placeholder="0" type="number" />
                </div>
                <div>
                  <label className="admin-label">Dept. Icon</label>
                  <input className="admin-input" placeholder="e.g. code, brain…" type="text" />
                </div>
              </div>
              <div>
                <label className="admin-label">Description</label>
                <textarea className="admin-textarea" placeholder="Brief overview of the department's focus area..." rows={3} />
              </div>
            </div>

            <div className="admin-modal-footer">
              <button className="admin-btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="admin-btn-gold" onClick={() => setModalOpen(false)}>Create Department</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
