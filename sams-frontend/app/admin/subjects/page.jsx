'use client';

import { useState } from 'react';

/* ─── SVG Icons ───────────────────────────────────────────────────── */
function IconBook({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
function IconUsers({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconWarning({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
function IconVerified({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22,4 12,14.01 9,11.01" />
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
function IconEdit({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconDelete({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3,6 5,6 21,6" /><path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
  );
}
function IconPersonAdd({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" /><line x1="16" y1="11" x2="22" y2="11" />
    </svg>
  );
}
function IconFilter({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3" />
    </svg>
  );
}
function IconDownload({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7,10 12,15 17,10" /><line x1="12" y1="15" x2="12" y2="3" />
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
function IconChevLeft({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="15,18 9,12 15,6" />
    </svg>
  );
}
function IconChevRight({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="9,18 15,12 9,6" />
    </svg>
  );
}
function IconInfo({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
function IconPerson({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
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

const SUBJECTS = [
  { code: 'CSC 3102', name: 'Human Computer Interaction', dept: 'Computer Science', credits: 3.0, level: 3, lecturer: 'Dr. Jane Dissanayake', initials: 'JD', assigned: true },
  { code: 'MAT 1105', name: 'Calculus I', dept: 'Mathematics', credits: 4.0, level: 1, lecturer: null, initials: null, assigned: false },
  { code: 'ITC 2105', name: 'Network Fundamentals', dept: 'Information Tech', credits: 3.0, level: 2, lecturer: 'Prof. K. Perera', initials: 'KP', assigned: true },
  { code: 'CSC 2204', name: 'Data Structures & Algorithms', dept: 'Computer Science', credits: 3.0, level: 2, lecturer: 'Dr. Ruwan Jayawardena', initials: 'RJ', assigned: true },
  { code: 'SE 3301', name: 'Software Architecture', dept: 'Software Engineering', credits: 3.0, level: 3, lecturer: null, initials: null, assigned: false },
];

export default function SubjectManagementPage() {
  const [panelMode, setPanelMode] = useState(null); // 'create' | 'assign' | null
  const [assignSubject, setAssignSubject] = useState(null);

  const closePanel = () => { setPanelMode(null); setAssignSubject(null); };

  return (
    <div style={{ position: 'relative' }}>
      {/* ── PAGE HEADER ── */}
      <div className="admin-page-header">
        <div>
          <div className="admin-page-eyebrow">Academic Registry</div>
          <h1 className="admin-page-title">Subject <em>Management</em></h1>
          <p className="admin-page-subtitle">Register, assign, and manage all academic subjects in the faculty.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div className="admin-search-wrap">
            <span className="admin-search-icon"><IconSearch /></span>
            <input className="admin-search" placeholder="Search subjects..." type="text" />
          </div>
          <button className="admin-btn-gold" onClick={() => setPanelMode('create')}>
            <IconPlus /> New Subject
          </button>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="admin-cards-grid">
        {[
          { icon: <IconBook />, value: '42', label: 'Total Subjects', badge: '+4 this sem', badgeClass: 'admin-badge-gold' },
          { icon: <IconUsers />, value: '18', label: 'Lecturers Assigned', badge: '98% allocated', badgeClass: 'admin-badge-green' },
          { icon: <IconWarning />, value: '02', label: 'Unassigned', badge: 'Needs attention', badgeClass: 'admin-badge-red' },
          { icon: <IconVerified />, value: 'Active', label: 'Current Status', badge: 'Semester 1', badgeClass: 'admin-badge-ink' },
        ].map((s, i) => (
          <div key={i} className="admin-kpi-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div className="admin-stat-icon" style={{ margin: 0 }}>{s.icon}</div>
              <span className={`admin-badge ${s.badgeClass}`}>{s.badge}</span>
            </div>
            <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '2.2rem', fontWeight: 300, color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.value}</div>
            <div className="admin-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── ORNAMENT ── */}
      <div className="admin-ornament"><IconStar /></div>

      {/* ── TABLE ── */}
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <div className="admin-table-title">Academic Subjects Registry</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="admin-btn-outline" style={{ padding: '8px 16px' }}>
              <IconFilter size={13} /> Filter
            </button>
            <button className="admin-btn-outline" style={{ padding: '8px 16px' }}>
              <IconDownload size={13} /> Export
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Name & Level</th>
                <th>Department</th>
                <th>Lecturer</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {SUBJECTS.map((s) => (
                <tr key={s.code}>
                  <td>
                    <span className="admin-subject-code">{s.code}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500, color: 'var(--ink)', fontSize: 14 }}>{s.name}</div>
                    <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, letterSpacing: '0.12em', color: 'var(--ink-light)', marginTop: 3 }}>
                      Credits: {s.credits} · Level {s.level}
                    </div>
                  </td>
                  <td>
                    <span className="admin-badge admin-badge-ink">{s.dept}</span>
                  </td>
                  <td>
                    {s.assigned ? (
                      <div className="admin-lecturer-chip">
                        <div className="admin-lecturer-avatar">{s.initials}</div>
                        <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{s.lecturer}</span>
                      </div>
                    ) : (
                      <div className="admin-lecturer-chip">
                        <div className="admin-lecturer-avatar" style={{ background: 'transparent', border: '1px dashed var(--border-gold)', color: 'var(--gold)' }}>
                          <IconPerson size={12} />
                        </div>
                        <span style={{ fontStyle: 'italic', fontSize: 12, color: 'var(--ink-light)' }}>Unassigned</span>
                      </div>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                      <button
                        className="admin-btn-ghost"
                        title="Assign Lecturer"
                        onClick={() => { setAssignSubject(s); setPanelMode('assign'); }}
                        style={!s.assigned ? { color: 'var(--gold)', borderColor: 'var(--border-gold)', background: 'rgba(184,150,90,0.06)' } : {}}
                      >
                        <IconPersonAdd />
                      </button>
                      <button className="admin-btn-ghost" title="Edit"><IconEdit /></button>
                      <button className="admin-btn-ghost danger" title="Delete"><IconDelete /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-table-pagination">
          <span className="admin-pagination-info">Showing 1–5 of 42 subjects</span>
          <div className="admin-pagination-btns">
            <button className="admin-page-btn"><IconChevLeft /></button>
            <button className="admin-page-btn active">1</button>
            <button className="admin-page-btn">2</button>
            <button className="admin-page-btn">3</button>
            <span style={{ color: 'var(--ink-light)', fontSize: 12, padding: '0 4px' }}>…</span>
            <button className="admin-page-btn">5</button>
            <button className="admin-page-btn"><IconChevRight /></button>
          </div>
        </div>
      </div>

      {/* ── SIDE PANEL OVERLAY ── */}
      {panelMode && (
        <div className="admin-side-overlay" onClick={closePanel} />
      )}

      {/* ── SIDE PANEL ── */}
      <div className={`admin-side-panel ${panelMode ? 'open' : 'closed'}`}>
        <div className="admin-side-panel-header">
          <h2 className="admin-side-panel-title">
            {panelMode === 'create' ? 'Add New Subject' : `Assign Lecturer`}
          </h2>
          <button className="admin-close-btn" onClick={closePanel}><IconClose /></button>
        </div>

        <div className="admin-side-panel-body">
          {/* ── CREATE FORM ── */}
          {panelMode === 'create' && (
            <>
              <div>
                <label className="admin-label">Subject Code</label>
                <input className="admin-input" placeholder="e.g. CSC 3102" type="text" />
              </div>
              <div>
                <label className="admin-label">Subject Name</label>
                <input className="admin-input" placeholder="e.g. Advanced Algorithms" type="text" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label className="admin-label">Department</label>
                  <select className="admin-input" style={{ cursor: 'pointer' }}>
                    <option>Computer Science</option>
                    <option>Mathematics</option>
                    <option>Information Tech</option>
                    <option>Software Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="admin-label">Credits</label>
                  <input className="admin-input" placeholder="3.0" step="0.5" type="number" />
                </div>
              </div>
              <div>
                <label className="admin-label">Level</label>
                <select className="admin-input" style={{ cursor: 'pointer' }}>
                  <option>Level 1</option><option>Level 2</option>
                  <option>Level 3</option><option>Level 4</option>
                </select>
              </div>
              <div>
                <label className="admin-label">Description</label>
                <textarea className="admin-textarea" placeholder="Brief overview of the curriculum..." rows={4} />
              </div>
            </>
          )}

          {/* ── ASSIGN LECTURER ── */}
          {panelMode === 'assign' && (
            <>
              {assignSubject && (
                <div style={{ padding: '14px 16px', background: 'rgba(184,150,90,0.07)', border: '1px solid var(--border-gold)', display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ color: 'var(--gold)' }}><IconInfo /></div>
                  <div>
                    <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-dark)' }}>
                      Assigning for {assignSubject.code}
                    </div>
                    <div style={{ fontSize: 12.5, color: 'var(--ink-muted)', marginTop: 3 }}>{assignSubject.name}</div>
                  </div>
                </div>
              )}
              <div>
                <label className="admin-label">Search Faculty</label>
                <div className="admin-search-wrap" style={{ width: '100%' }}>
                  <span className="admin-search-icon"><IconSearch /></span>
                  <input className="admin-search" style={{ width: '100%' }} placeholder="Lecturer name or ID..." type="text" />
                </div>
              </div>
              <div>
                <label className="admin-label">Recommended Lecturers</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { name: 'Dr. Sarah Wijesinghe', spec: 'Specialization: Analysis', initials: 'SW' },
                    { name: 'Prof. Ananda Silva', spec: 'Specialization: Statistics', initials: 'AS' },
                    { name: 'Dr. Kumari Fernando', spec: 'Specialization: Algorithms', initials: 'KF' },
                  ].map((l, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                      border: '1px solid var(--border)', background: 'var(--cream)', cursor: 'pointer',
                      transition: 'border-color 0.15s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-gold)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                      <div className="admin-user-avatar" style={{ width: 36, height: 36, fontSize: 10 }}>{l.initials}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, fontSize: 13.5, color: 'var(--ink)' }}>{l.name}</div>
                        <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 8.5, color: 'var(--gold)', letterSpacing: '0.1em', marginTop: 2 }}>{l.spec}</div>
                      </div>
                      <div style={{ width: 16, height: 16, border: '1.5px solid var(--border)', borderRadius: '50%' }} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="admin-side-panel-footer">
          <button className="admin-btn-outline" onClick={closePanel}>Cancel</button>
          <button className="admin-btn-gold" onClick={closePanel}>
            {panelMode === 'create' ? 'Create Subject' : 'Confirm Assignment'}
          </button>
        </div>
      </div>
    </div>
  );
}
