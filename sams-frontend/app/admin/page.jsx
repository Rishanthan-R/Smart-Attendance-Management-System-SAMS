'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';

/* ─── SVG Icons ──────────────────────────────────────────────────── */
function IconPeople({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconGraduate({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10l-10-6L2 10l10 6 10-6z" />
      <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
      <line x1="22" y1="10" x2="22" y2="16" />
    </svg>
  );
}
function IconBook({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <line x1="8" y1="3" x2="8" y2="21" />
      <line x1="12" y1="8" x2="18" y2="8" />
      <line x1="12" y1="12" x2="18" y2="12" />
    </svg>
  );
}
function IconBuilding({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1" /><path d="M9 22V12h6v10" />
      <path d="M9 7h.01M12 7h.01M15 7h.01M9 11h.01M12 11h.01M15 11h.01" />
    </svg>
  );
}
function IconTrendUp({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
      <polyline points="17,6 23,6 23,12" />
    </svg>
  );
}
function IconTrendDown({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" />
      <polyline points="17,18 23,18 23,12" />
    </svg>
  );
}
function IconMinus({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function IconChevronDown({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="6,9 12,15 18,9" />
    </svg>
  );
}
function IconChevronRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="9,6 15,12 9,18" />
    </svg>
  );
}
function IconPlus({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function IconDownload({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7,10 12,15 17,10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function IconUserPlus({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" /><line x1="16" y1="11" x2="22" y2="11" />
    </svg>
  );
}
function IconBell({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function IconAlertTriangle({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
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
function IconFileText({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  );
}


/* ─── Data for monthly trends by batch & semester ─────────────── */
const TREND_DATA = {
  'Batch 21': {
    'Semester 1': {
      months: [
        { name: 'Jan', att: 62 }, { name: 'Feb', att: 58 }, { name: 'Mar', att: 70 },
        { name: 'Apr', att: 68 }, { name: 'May', att: 78 }, { name: 'Jun', att: 80 },
      ],
      avg: '69.3%', peak: 'Jun', below80: 280, activeModules: 10,
    },
    'Semester 2': {
      months: [
        { name: 'Jul', att: 72 }, { name: 'Aug', att: 75 }, { name: 'Sep', att: 78 },
        { name: 'Oct', att: 82 }, { name: 'Nov', att: 85 }, { name: 'Dec', att: 81 },
      ],
      avg: '78.8%', peak: 'Nov', below80: 195, activeModules: 9,
    },
  },
  'Batch 22': {
    'Semester 1': {
      months: [
        { name: 'Jan', att: 55 }, { name: 'Feb', att: 60 }, { name: 'Mar', att: 72 },
        { name: 'Apr', att: 70 }, { name: 'May', att: 85 }, { name: 'Jun', att: 88 },
      ],
      avg: '71.7%', peak: 'Jun', below80: 340, activeModules: 11,
    },
    'Semester 2': {
      months: [
        { name: 'Jul', att: 78 }, { name: 'Aug', att: 80 }, { name: 'Sep', att: 83 },
        { name: 'Oct', att: 86 }, { name: 'Nov', att: 89 }, { name: 'Dec', att: 87 },
      ],
      avg: '83.8%', peak: 'Nov', below80: 142, activeModules: 10,
    },
  },
  'Batch 23': {
    'Semester 1': {
      months: [
        { name: 'Jan', att: 60 }, { name: 'Feb', att: 63 }, { name: 'Mar', att: 71 },
        { name: 'Apr', att: 75 }, { name: 'May', att: 82 }, { name: 'Jun', att: 85 },
      ],
      avg: '72.7%', peak: 'Jun', below80: 298, activeModules: 12,
    },
    'Semester 2': {
      months: [
        { name: 'Jul', att: 74 }, { name: 'Aug', att: 79 }, { name: 'Sep', att: 84 },
        { name: 'Oct', att: 88 }, { name: 'Nov', att: 90 }, { name: 'Dec', att: 86 },
      ],
      avg: '83.5%', peak: 'Nov', below80: 160, activeModules: 11,
    },
  },
  'Batch 24': {
    'Semester 1': {
      months: [
        { name: 'Jan', att: 58 }, { name: 'Feb', att: 64 }, { name: 'Mar', att: 68 },
        { name: 'Apr', att: 72 }, { name: 'May', att: 86 }, { name: 'Jun', att: 84 },
      ],
      avg: '72.0%', peak: 'May', below80: 312, activeModules: 12,
    },
    'Semester 2': {
      months: [
        { name: 'Jul', att: 70 }, { name: 'Aug', att: 76 }, { name: 'Sep', att: 80 },
        { name: 'Oct', att: 84 }, { name: 'Nov', att: 88 }, { name: 'Dec', att: 82 },
      ],
      avg: '80.0%', peak: 'Nov', below80: 210, activeModules: 11,
    },
  },
};

const BATCHES = ['Batch 21', 'Batch 22', 'Batch 23', 'Batch 24'];
const SEMESTERS = ['Semester 1', 'Semester 2'];

/* ─── Notifications data ──────────────────────────────────────── */
const NOTIFICATIONS = [
  {
    id: 1,
    icon: 'people',
    title: 'New faculty registration pending',
    desc: 'Dr. Sarah Jenkins submitted a request for the CS Department.',
    time: '2m ago',
    accent: 'gold',
  },
  {
    id: 2,
    icon: 'alert',
    title: 'Low attendance alert triggered',
    desc: 'CS-301 Data Structures dropped below 60% attendance threshold.',
    time: '15m ago',
    accent: 'red',
  },
  {
    id: 3,
    icon: 'check',
    title: 'Database sync completed',
    desc: 'Student records synchronized with biometric terminal B.',
    time: '1h ago',
    accent: 'green',
  },
  {
    id: 4,
    icon: 'file',
    title: 'Monthly report generated',
    desc: 'June 2025 attendance summary exported to CSV.',
    time: '3h ago',
    accent: 'gold',
  },
];

/* ─── Custom Recharts Tooltip ─────────────────────────────────── */
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--ink)', color: 'var(--white)', padding: '10px 16px',
        borderRadius: 14, fontSize: 12, fontFamily: 'Montserrat, sans-serif',
        boxShadow: '0 8px 24px rgba(26,23,20,0.25)', border: 'none',
      }}>
        <div style={{ fontWeight: 600, marginBottom: 2 }}>{label}</div>
        <div style={{ color: 'var(--gold-light)', fontSize: 11 }}>
          Attendance: {payload[0].value}%
        </div>
      </div>
    );
  }
  return null;
}

/* ─── Custom Recharts Dot ─────────────────────────────────────── */
function CustomDot(props) {
  const { cx, cy } = props;
  return (
    <circle cx={cx} cy={cy} r={5} fill="var(--white)" stroke="var(--gold)" strokeWidth={2.5} />
  );
}

/* ─── Dropdown Component ──────────────────────────────────────── */
function Dropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="admin-dash-dropdown-btn"
      >
        <span>{value}</span>
        <IconChevronDown size={11} />
      </button>
      {open && (
        <div className="admin-dash-dropdown-menu">
          {options.map(opt => (
            <button
              key={opt}
              className={`admin-dash-dropdown-item${opt === value ? ' active' : ''}`}
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function AdminDashboardPage() {
  const [selectedBatch, setSelectedBatch] = useState('Batch 24');
  const [selectedSemester, setSelectedSemester] = useState('Semester 1');

  const currentData = TREND_DATA[selectedBatch]?.[selectedSemester] ?? TREND_DATA['Batch 24']['Semester 1'];

  /* derive date label from months */
  const monthRange = currentData.months.length > 0
    ? `${currentData.months[0].name} to ${currentData.months[currentData.months.length - 1].name} 2025`
    : '';

  const STAT_CARDS = [
    { icon: <IconPeople size={22} />, value: '2,480', label: 'Total Students', trend: '+4.2% this semester', dir: 'up' },
    { icon: <IconGraduate size={22} />, value: '156', label: 'Total Lecturers', trend: 'Static · No change', dir: 'flat' },
    { icon: <IconBook size={22} />, value: '42', label: 'Active Subjects', trend: '+4 this semester', dir: 'up' },
    { icon: <IconBuilding size={22} />, value: '12', label: 'Departments', trend: '+2 this year', dir: 'up' },
  ];

  function NotificationIcon({ type }) {
    if (type === 'people') return <IconPeople size={16} />;
    if (type === 'alert') return <IconAlertTriangle size={16} />;
    if (type === 'check') return <IconCheck size={16} />;
    if (type === 'file') return <IconFileText size={16} />;
    return <IconBell size={16} />;
  }

  return (
    <div className="admin-crextio-dashboard">

      {/* ── WELCOME BANNER ── */}
      <div className="admin-dash-banner">
        <div className="admin-dash-banner-watermark">SAMS</div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="admin-dash-banner-label">
            <span className="admin-dash-banner-line" />
            Smart Attendance Management System
            <span className="admin-dash-banner-line" />
          </div>
          <h1 className="admin-dash-banner-title">
            Welcome back, <em>Administrator.</em>
          </h1>
          <p className="admin-dash-banner-subtitle">
            Faculty of Computing — University of Sri Jayewardenepura · Real-time attendance insights and system health.
          </p>
        </div>
      </div>

      {/* ── TOP STAT CARDS ── */}
      <div className="admin-dash-stats-grid">
        {STAT_CARDS.map((card, i) => (
          <div key={i} className="admin-dash-stat-card">
            <div className="admin-dash-stat-icon">{card.icon}</div>
            <div className="admin-dash-stat-value">{card.value}</div>
            <div className="admin-dash-stat-label">{card.label}</div>
            <div className={`admin-dash-stat-trend ${card.dir}`}>
              {card.dir === 'up' && <IconTrendUp size={12} />}
              {card.dir === 'down' && <IconTrendDown size={12} />}
              {card.dir === 'flat' && <IconMinus size={12} />}
              <span>{card.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── DIVIDER ORNAMENT ── */}
      <div className="admin-dash-divider">
        <span className="admin-dash-divider-diamond">◆</span>
      </div>

      {/* ── BOTTOM TWO-COLUMN LAYOUT ── */}
      <div className="admin-dash-bottom-grid">

        {/* LEFT: Chart Section */}
        <div className="admin-dash-chart-section">
          <div className="admin-crextio-card" style={{ padding: '28px 28px 20px' }}>
            {/* Chart Header */}
            <div className="admin-dash-chart-header">
              <div>
                <div className="admin-dash-section-label" style={{ color: 'var(--gold)' }}>
                  Aggregate Analytics
                </div>
                <h2 className="admin-dash-section-title">Monthly Attendance Trends</h2>
                <p style={{ fontSize: 12, color: 'var(--ink-light)', fontFamily: 'Montserrat, sans-serif', marginTop: 2 }}>
                  Faculty-wide attendance data · {monthRange}
                </p>
              </div>
              <div className="admin-dash-chart-controls">
                <div className="admin-dash-legend-dot" />
                <span style={{ fontSize: 11, color: 'var(--ink-muted)', fontFamily: 'Montserrat, sans-serif', fontWeight: 500, marginRight: 12 }}>
                  Attendance
                </span>
                <Dropdown
                  label="Batch"
                  options={BATCHES}
                  value={selectedBatch}
                  onChange={setSelectedBatch}
                />
                <Dropdown
                  label="Semester"
                  options={SEMESTERS}
                  value={selectedSemester}
                  onChange={setSelectedSemester}
                />
              </div>
            </div>

            {/* Chart */}
            <div style={{ width: '100%', height: 260, marginTop: 20 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData.months} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,23,20,0.06)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fontFamily: 'Montserrat, sans-serif', fill: 'var(--ink-light)' }}
                    axisLine={{ stroke: 'rgba(26,23,20,0.08)' }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fontFamily: 'Montserrat, sans-serif', fill: 'var(--ink-light)' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--gold-light)', strokeDasharray: '4 4' }} />
                  <Line
                    type="monotone"
                    dataKey="att"
                    stroke="var(--gold)"
                    strokeWidth={2.5}
                    dot={<CustomDot />}
                    activeDot={{ r: 7, fill: 'var(--gold)', stroke: 'var(--white)', strokeWidth: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Sub-stats below chart */}
            <div className="admin-dash-chart-substats">
              <div className="admin-dash-chart-substat">
                <span className="admin-dash-chart-substat-value">{currentData.avg}</span>
                <span className="admin-dash-chart-substat-label">Avg Rate</span>
              </div>
              <div className="admin-dash-chart-substat">
                <span className="admin-dash-chart-substat-value">{currentData.peak}</span>
                <span className="admin-dash-chart-substat-label">Peak Month</span>
              </div>
              <div className="admin-dash-chart-substat">
                <span className="admin-dash-chart-substat-value">{currentData.below80}</span>
                <span className="admin-dash-chart-substat-label">Below 80%</span>
              </div>
              <div className="admin-dash-chart-substat">
                <span className="admin-dash-chart-substat-value">{currentData.activeModules}</span>
                <span className="admin-dash-chart-substat-label">Active Modules</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Quick Actions */}
        <div className="admin-dash-actions-section">
          <div className="admin-crextio-card" style={{ padding: '28px 24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="admin-dash-section-label" style={{ color: 'var(--gold)' }}>
              System Controls
            </div>
            <h2 className="admin-dash-section-title" style={{ marginBottom: 20 }}>Quick Actions</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <Link href="/admin/subjects" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="admin-dash-action-item">
                  <div className="admin-dash-action-icon"><IconBook size={18} /></div>
                  <div style={{ flex: 1 }}>
                    <div className="admin-dash-action-title">Add New Subject</div>
                    <div className="admin-dash-action-desc">Register academic subject</div>
                  </div>
                  <IconChevronRight size={16} />
                </div>
              </Link>
              <Link href="/admin/departments" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="admin-dash-action-item">
                  <div className="admin-dash-action-icon"><IconBuilding size={18} /></div>
                  <div style={{ flex: 1 }}>
                    <div className="admin-dash-action-title">New Department</div>
                    <div className="admin-dash-action-desc">Create academic unit</div>
                  </div>
                  <IconChevronRight size={16} />
                </div>
              </Link>
              <Link href="/admin/users" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="admin-dash-action-item">
                  <div className="admin-dash-action-icon"><IconUserPlus size={18} /></div>
                  <div style={{ flex: 1 }}>
                    <div className="admin-dash-action-title">Add User</div>
                    <div className="admin-dash-action-desc">Enroll staff or faculty</div>
                  </div>
                  <IconChevronRight size={16} />
                </div>
              </Link>
              <button
                className="admin-dash-action-item"
                style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                onClick={() => alert('Export Report — Download attendance CSV')}
              >
                <div className="admin-dash-action-icon"><IconDownload size={18} /></div>
                <div style={{ flex: 1 }}>
                  <div className="admin-dash-action-title">Export Report</div>
                  <div className="admin-dash-action-desc">Download attendance CSV</div>
                </div>
                <IconChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── RECENT NOTIFICATIONS ── */}
      <div className="admin-crextio-card" style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <div className="admin-dash-section-label" style={{ color: 'var(--gold)' }}>System Feed</div>
            <h2 className="admin-dash-section-title">Recent Notifications</h2>
          </div>
          <button className="admin-dash-view-all-btn">
            View All <IconChevronRight size={12} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NOTIFICATIONS.map(n => (
            <div key={n.id} className="admin-dash-notification-item">
              <div className={`admin-dash-notification-icon ${n.accent}`}>
                <NotificationIcon type={n.icon} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="admin-dash-notification-title">{n.title}</div>
                <div className="admin-dash-notification-desc">{n.desc}</div>
              </div>
              <div className="admin-dash-notification-time">
                {n.accent === 'red' && <span style={{ color: '#c0392b', marginRight: 4, display: 'inline-flex' }}><IconTrendDown size={11} /></span>}
                {n.accent === 'green' && <span style={{ color: '#27ae60', marginRight: 4, display: 'inline-flex' }}><IconTrendUp size={11} /></span>}
                {n.time}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
