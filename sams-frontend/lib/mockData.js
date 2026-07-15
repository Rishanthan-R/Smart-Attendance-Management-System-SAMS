/* ═══════════════════════════════════════════════════════════════════
   lib/mockData.js
   ---------------------------------------------------------------------
   WHY THIS FILE EXISTS
   Every page's mock arrays (HISTORY_RECORDS, NOTIFICATIONS, COURSES,
   ATTENDANCE_TREND, etc.) were hardcoded inline in their page
   components. They live in lib/ instead so:
     - each page component only deals with UI, not data
     - swapping this for a real API call later is a one-line change
       per page (replace the import with a fetch/useEffect or a
       server action) instead of hunting through JSX for arrays

  
═══════════════════════════════════════════════════════════════════ */
/* ── Attendance-history-page mock data below ──*/


/* ── Student-Attendance-page mock data below ── */
/* ── Courses the student is currently enrolled in ────────────────────────── */
export const ENROLLED_COURSES = [
  {
    code: "CS-301", name: "Data Structures & Algorithms", instructor: "Dr. Aris Thorne",
    credits: 3, schedule: "Mon / Wed · 09:00–10:30", hall: "Lab 2B",
    attendance: 92, attended: 22, total: 24, status: "excellent",
    icon: "⬡", color: "#b8965a",
    nextSession: "Today, 09:00 AM",
  },
  {
    code: "CS-302", name: "Software Engineering", instructor: "Prof. Elena Rodriguez",
    credits: 3, schedule: "Tue / Thu · 11:00–12:30", hall: "Hall A-104",
    attendance: 88, attended: 21, total: 24, status: "good",
    icon: "◈", color: "#8a6e3a",
    nextSession: "Tomorrow, 11:00 AM",
  },
  {
    code: "CS-305", name: "Computer Networks", instructor: "Dr. Marcus Vane",
    credits: 3, schedule: "Mon / Fri · 14:00–15:30", hall: "Lab 3C",
    attendance: 75, attended: 18, total: 24, status: "warning",
    icon: "◎", color: "#d97706",
    nextSession: "Friday, 14:00",
  },
  {
    code: "MA-204", name: "Probability & Statistics", instructor: "Prof. Sarah Jenkins",
    credits: 4, schedule: "Tue / Thu · 08:00–09:30", hall: "Hall B-201",
    attendance: 95, attended: 23, total: 24, status: "excellent",
    icon: "∑", color: "#b8965a",
    nextSession: "Thursday, 08:00 AM",
  },
  {
    code: "CS-308", name: "Database Systems", instructor: "Dr. Julian O'Neill",
    credits: 3, schedule: "Wed / Fri · 13:00–14:30", hall: "Lab 1A",
    attendance: 82, attended: 20, total: 24, status: "good",
    icon: "◉", color: "#8a6e3a",
    nextSession: "Wednesday, 13:00",
  },
];

/* ── Courses available for enrollment this semester ──────────────────────── */
export const CATALOG_COURSES = [
  { code: "CS-401", name: "Machine Learning Fundamentals", instructor: "Dr. Priya Nair",  credits: 4, seats: 3  },
  { code: "CS-410", name: "Cloud Computing",               instructor: "Prof. Ben Hartley", credits: 3, seats: 12 },
  { code: "IS-305", name: "Information Security",          instructor: "Dr. Ashan Perera", credits: 3, seats: 7  },
];

/* ══════════════════════════════════════════════════════════════════════════
   ATTENDANCE PAGE DATA
   Import these in app/student/attendance/page.jsx
   ══════════════════════════════════════════════════════════════════════════ */

/* ── The session currently open for marking ──────────────────────────────── */
export const ACTIVE_SESSION = {
  name:       "Advanced Algorithms & Data Structures",
  code:       "CS-402",
  hall:       "Hall 4B",
  time:       "10:00 AM – 11:30 AM",
  instructor: "Dr. Julian Thorne",
  status:     "live",
};

/* ── Last four attendance records shown on the attendance page ───────────── */
export const RECENT_HISTORY_ATTENDANCE = [
  { subject: "Discrete Mathematics", icon: "∑", date: "Yesterday, 2:00 PM",  status: "present" },
  { subject: "Operating Systems",    icon: "◈", date: "Yesterday, 9:00 AM",  status: "present" },
  { subject: "Database Systems",     icon: "◉", date: "Oct 24, 11:00 AM",   status: "present" },
  { subject: "Digital Ethics",       icon: "◎", date: "Oct 24, 4:00 PM",    status: "absent"  },
];

/* ── Notifications shown on the attendance page ──────────────────────────── */
export const ATTENDANCE_NOTIFICATIONS = [
  { id: 1, type: "info",    title: "CS-402 session is now active. Submit attendance.", time: "Just now"  },
  { id: 2, type: "success", title: "Attendance confirmed for Operating Systems.",       time: "Yesterday" },
];




