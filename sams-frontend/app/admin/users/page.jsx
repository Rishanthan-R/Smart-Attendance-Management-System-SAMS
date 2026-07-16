'use client';

import { useState } from 'react';

/* ─── SVG Icons ───────────────────────────────────────────────────── */
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
function IconBlock({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  );
}
function IconCheckCircle({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22,4 12,14.01 9,11.01" />
    </svg>
  );
}
function IconRestore({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v6h6M3 8a9 9 0 1 0 2.83-6.36" />
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
function IconFilter({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3" />
    </svg>
  );
}
function IconChevDown({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="6,9 12,15 18,9" />
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
function IconClose({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
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

const USERS = [
  { initials: 'AB', name: 'Alice Brown', email: 'alice.brown@sams.edu', role: 'Faculty', dept: 'Computer Science', status: 'active', actions: ['edit', 'block', 'delete'] },
  { initials: 'MC', name: 'Mark Chen', email: 'm.chen@sams.edu', role: 'Staff', dept: 'Administration', status: 'pending', actions: ['edit', 'approve', 'delete'] },
  { initials: 'SJ', name: 'Sarah Johnson', email: 's.johnson@sams.edu', role: 'IT Support', dept: 'Infrastructure', status: 'deactivated', actions: ['edit', 'restore', 'delete'] },
  { initials: 'RW', name: 'Robert White', email: 'r.white@sams.edu', role: 'Admin', dept: 'Finance', status: 'active', actions: ['edit', 'block', 'delete'] },
  { initials: 'DP', name: 'Dinusha Perera', email: 'd.perera@sams.edu', role: 'Faculty', dept: 'Software Engineering', status: 'active', actions: ['edit', 'block', 'delete'] },
  { initials: 'KN', name: 'Kavindra Niroshan', email: 'k.niroshan@sams.edu', role: 'Faculty', dept: 'Data Science', status: 'pending', actions: ['edit', 'approve', 'delete'] },
];

const STATUS_CONFIG = {
  active: { label: 'Active', cls: 'admin-badge-green' },
  pending: { label: 'Pending', cls: 'admin-badge-amber' },
  deactivated: { label: 'Deactivated', cls: 'admin-badge-red' },
};

const ROLE_CONFIG = {
  Faculty: 'admin-badge-gold',
  Admin: 'admin-badge-ink',
  Staff: 'admin-badge-ink',
  'IT Support': 'admin-badge-ink',
};

export default function UserManagementPage() {
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <>
      {/* ── PAGE HEADER ── */}
      <div className="admin-page-header">
        <div>
          <div className="admin-page-eyebrow">Personnel Registry</div>
          <h1 className="admin-page-title">User <em>Management</em></h1>
          <p className="admin-page-subtitle">Manage administrators, faculty, staff, and support personnel.</p>
        </div>
        <button className="admin-btn-gold" onClick={() => setAddModalOpen(true)}>
          <IconPersonAdd size={15} /> Add New User
        </button>
      </div>

      {/* ── SEARCH & FILTER BAR ── */}
      <div style={{
        background: 'var(--white)', border: '1px solid var(--border)',
        padding: '20px 24px', marginBottom: 24,
        display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <label className="admin-label">Search Users</label>
          <div className="admin-search-wrap" style={{ width: '100%' }}>
            <span className="admin-search-icon"><IconSearch /></span>
            <input className="admin-search" style={{ width: '100%' }} placeholder="Name, email, or employee ID..." type="text" />
          </div>
        </div>

        <div>
          <label className="admin-label">Role</label>
          <div style={{ position: 'relative' }}>
            <select className="admin-select">
              <option>All Roles</option>
              <option>Admin</option>
              <option>Faculty</option>
              <option>Staff</option>
              <option>IT Support</option>
            </select>
          </div>
        </div>

        <div>
          <label className="admin-label">Department</label>
          <select className="admin-select">
            <option>All Departments</option>
            <option>Computer Science</option>
            <option>Software Engineering</option>
            <option>Administration</option>
            <option>Infrastructure</option>
          </select>
        </div>

        <div>
          <label className="admin-label">Status</label>
          <select className="admin-select">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Deactivated</option>
          </select>
        </div>

        <button className="admin-btn-outline" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <IconFilter /> Apply Filters
        </button>
      </div>

      {/* ── ORNAMENT ── */}
      <div className="admin-ornament"><IconStar /></div>

      {/* ── USER TABLE ── */}
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <div>
            <div className="admin-table-title">System Users</div>
            <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 8.5, color: 'var(--ink-light)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4 }}>
              Showing 1–6 of 24 registered users
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="admin-btn-outline" style={{ padding: '8px 16px' }}>
              <IconFilter size={12} /> Filter
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((user) => {
                const statusConf = STATUS_CONFIG[user.status];
                const roleCls = ROLE_CONFIG[user.role] || 'admin-badge-ink';
                return (
                  <tr key={user.email}>
                    {/* User cell */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className="admin-user-avatar">{user.initials}</div>
                        <div>
                          <div style={{ fontWeight: 500, color: 'var(--ink)', fontSize: 14 }}>{user.name}</div>
                          <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, letterSpacing: '0.08em', color: 'var(--ink-light)', marginTop: 3 }}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    {/* Role */}
                    <td>
                      <span className={`admin-badge ${roleCls}`}>{user.role}</span>
                    </td>
                    {/* Department */}
                    <td style={{ color: 'var(--ink-muted)', fontSize: 13.5 }}>{user.dept}</td>
                    {/* Status */}
                    <td>
                      <span className={`admin-badge ${statusConf.cls}`}>
                        <span style={{
                          width: 5, height: 5, borderRadius: '50%',
                          background: user.status === 'active' ? '#2d7a45' : user.status === 'pending' ? '#8a6010' : '#c0392b',
                          display: 'inline-block',
                        }} />
                        {statusConf.label}
                      </span>
                    </td>
                    {/* Actions */}
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                        <button className="admin-btn-ghost" title="Edit"><IconEdit /></button>
                        {user.status === 'active' && (
                          <button className="admin-btn-ghost" title="Deactivate"><IconBlock /></button>
                        )}
                        {user.status === 'pending' && (
                          <button className="admin-btn-ghost" title="Approve" style={{ color: '#2d7a45' }}><IconCheckCircle /></button>
                        )}
                        {user.status === 'deactivated' && (
                          <button className="admin-btn-ghost" title="Reactivate" style={{ color: 'var(--gold-dark)' }}><IconRestore /></button>
                        )}
                        <button className="admin-btn-ghost danger" title="Delete"><IconDelete /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="admin-table-pagination">
          <span className="admin-pagination-info">Showing 1–6 of 24 users</span>
          <div className="admin-pagination-btns">
            <button className="admin-page-btn" disabled><IconChevLeft /></button>
            <button className="admin-page-btn active">1</button>
            <button className="admin-page-btn">2</button>
            <button className="admin-page-btn">3</button>
            <span style={{ color: 'var(--ink-light)', fontSize: 12, padding: '0 4px' }}>…</span>
            <button className="admin-page-btn">4</button>
            <button className="admin-page-btn"><IconChevRight /></button>
          </div>
        </div>
      </div>

      {/* ── ADD USER MODAL ── */}
      {addModalOpen && (
        <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && setAddModalOpen(false)}>
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">Add New User</h2>
              <button className="admin-close-btn" onClick={() => setAddModalOpen(false)}><IconClose /></button>
            </div>

            <div className="admin-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label className="admin-label">First Name</label>
                  <input className="admin-input" placeholder="e.g. Sarah" type="text" />
                </div>
                <div>
                  <label className="admin-label">Last Name</label>
                  <input className="admin-input" placeholder="e.g. Fernando" type="text" />
                </div>
              </div>
              <div>
                <label className="admin-label">Email Address</label>
                <input className="admin-input" placeholder="name@sams.edu.lk" type="email" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label className="admin-label">Role</label>
                  <select className="admin-input" style={{ cursor: 'pointer' }}>
                    <option>Faculty</option>
                    <option>Admin</option>
                    <option>Staff</option>
                    <option>IT Support</option>
                  </select>
                </div>
                <div>
                  <label className="admin-label">Department</label>
                  <select className="admin-input" style={{ cursor: 'pointer' }}>
                    <option>Computer Science</option>
                    <option>Software Engineering</option>
                    <option>Data Science</option>
                    <option>Administration</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="admin-label">Employee ID</label>
                <input className="admin-input" placeholder="e.g. EMP-20250001" type="text" />
              </div>
              <div style={{ padding: '12px 16px', background: 'rgba(184,150,90,0.06)', border: '1px solid var(--border-gold)' }}>
                <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 8.5, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>
                  Note
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-muted)', fontWeight: 300 }}>
                  An invitation email with login credentials will be sent automatically to the registered address.
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button className="admin-btn-outline" onClick={() => setAddModalOpen(false)}>Cancel</button>
              <button className="admin-btn-gold" onClick={() => setAddModalOpen(false)}>
                <IconPersonAdd size={13} /> Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
