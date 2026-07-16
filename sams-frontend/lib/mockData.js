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

/* ── Student-Dashboard-page mock data below ── */

export const COURSES = [
  { code: "CS-202",   name: "Data Structures",       instructor: "Dr. Sarah Vane",   nextClass: "Today, 14:00",     progress: 75, attended: 18, total: 24, status: "good" },
  { code: "MATH-301", name: "Advanced Calculus",      instructor: "Prof. Marcus Lin", nextClass: "Tomorrow, 09:30",  progress: 45, attended: 9,  total: 20, status: "warning" },
  { code: "CS-405",   name: "Software Engineering",   instructor: "Dr. Emily Chen",   nextClass: "Wed, 11:00",       progress: 90, attended: 27, total: 30, status: "excellent" },
  { code: "IS-210",   name: "Database Systems",       instructor: "Dr. Rohan Peiris", nextClass: "Thu, 13:00",       progress: 82, attended: 20, total: 24, status: "good" },
];

export const ATTENDANCE_TREND = [72, 78, 85, 91, 88, 92, 92];
export const WEEK_LABELS = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7"];

export const DASHBOARD_NOTIFICATIONS = [
  { id: 1, type: "info",    title: "Exam schedule for Fall 2024 has been released.", time: "2 hours ago" },
  { id: 2, type: "success", title: "Project 'Beta-Build' successfully uploaded to CS-202 portal.", time: "5 hours ago" },
  { id: 3, type: "warning", title: "Attendance below threshold for MATH-301.", time: "Yesterday" },
];

export const ACTIVE_SESSIONS = [
  { code: "CS-301", name: "Introduction to AI",   time: "13:00 – 15:00",     status: "live" },
  { code: "CS-405", name: "Web Development Lab",  time: "Starts in 45 mins", status: "upcoming" },
];

export const RECENT_HISTORY = [
  { date: "Mon 8 Jul",  course: "Data Structures",      status: "present" },
  { date: "Mon 8 Jul",  course: "Adv. Calculus",        status: "absent" },
  { date: "Tue 9 Jul",  course: "Software Eng.",        status: "present" },
  { date: "Wed 10 Jul", course: "Database Systems",     status: "late" },
  { date: "Thu 11 Jul", course: "Introduction to AI",   status: "present" },
];

export const ELIGIBILITY_SUMMARY = [
  { label: "Data Structures",  pct: 75, warn: false },
  { label: "Adv. Calculus",    pct: 45, warn: true },
  { label: "Software Eng.",    pct: 90, warn: false },
  { label: "Database Systems", pct: 82, warn: false },
];

/* ── Attendance-history-page mock data below ──*/

export const HISTORY_RECORDS = [
  { id: 1,  date: "Oct 24, 2024", day: "Thursday",  subject: "Advanced Mathematics",     time: "09:00 – 10:30 AM", location: "Hall A-102",     status: "present", icon: "∑" },
  { id: 2,  date: "Oct 23, 2024", day: "Wednesday", subject: "Quantum Physics",          time: "11:00 – 12:30 PM", location: "Lab 4C",         status: "absent",  icon: "⚛" },
  { id: 3,  date: "Oct 22, 2024", day: "Tuesday",   subject: "Philosophy & Ethics",      time: "02:00 – 03:30 PM", location: "Auditorium Main", status: "late",    icon: "◉" },
  { id: 4,  date: "Oct 21, 2024", day: "Monday",    subject: "Computer Science",         time: "10:00 – 11:30 AM", location: "Lab 1A",         status: "present", icon: "◈" },
  { id: 5,  date: "Oct 19, 2024", day: "Saturday",  subject: "Data Structures",          time: "09:00 – 10:30 AM", location: "Lab 2B",         status: "present", icon: "⬡" },
  { id: 6,  date: "Oct 18, 2024", day: "Friday",    subject: "Software Engineering",     time: "11:00 – 12:30 PM", location: "Hall A-104",     status: "present", icon: "◈" },
  { id: 7,  date: "Oct 17, 2024", day: "Thursday",  subject: "Advanced Mathematics",     time: "09:00 – 10:30 AM", location: "Hall A-102",     status: "absent",  icon: "∑" },
  { id: 8,  date: "Oct 16, 2024", day: "Wednesday", subject: "Database Systems",         time: "01:00 – 02:30 PM", location: "Lab 1A",         status: "present", icon: "◉" },
  { id: 9,  date: "Oct 14, 2024", day: "Monday",    subject: "Computer Networks",        time: "02:00 – 03:30 PM", location: "Lab 3C",         status: "late",    icon: "◎" },
  { id: 10, date: "Oct 11, 2024", day: "Friday",    subject: "Software Engineering",     time: "11:00 – 12:30 PM", location: "Hall A-104",     status: "present", icon: "◈" },
  { id: 11, date: "Oct 10, 2024", day: "Thursday",  subject: "Probability & Statistics", time: "08:00 – 09:30 AM", location: "Hall B-201",     status: "present", icon: "∑" },
  { id: 12, date: "Oct 09, 2024", day: "Wednesday", subject: "Computer Science",         time: "10:00 – 11:30 AM", location: "Lab 1A",         status: "absent",  icon: "◈" },
];

export const NOTIFICATIONS = [
  { id: 1, type: "warning", title: "Attendance below threshold for Quantum Physics.", time: "Yesterday" },
  { id: 2, type: "info",    title: "Semester 1 attendance report has been published.", time: "2 days ago" },
];

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

/* ── Student-Profile-page mock data below ── */
/* Seed activity log — replace with a real fetch from your API endpoint.*/

export const ACTIVITY_LOG = [
  { action: "Attendance marked", detail: "CS-202 — Data Structures",          time: "Today, 14:02",  type: "success" },
  { action: "Password changed",  detail: "Security settings updated",          time: "Jul 9, 10:20",  type: "info"    },
  { action: "Profile updated",   detail: "Phone number changed",               time: "Jul 7, 09:15",  type: "info"    },
  { action: "Attendance marked", detail: "IS-210 — Database Systems",          time: "Jul 6, 13:04",  type: "success" },
  { action: "Login detected",    detail: "New device — Chrome / Windows",      time: "Jul 5, 08:47",  type: "warning" },
];

/*course page*/
/* ── Courses the student is currently enrolled in ────────────────────────── */
export const ENROLLED_COURSES_CP = [
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
export const CATALOG_COURSES_CP = [
  { code: "CS-401", name: "Machine Learning Fundamentals", instructor: "Dr. Priya Nair",  credits: 4, seats: 3  },
  { code: "CS-410", name: "Cloud Computing",               instructor: "Prof. Ben Hartley", credits: 3, seats: 12 },
  { code: "IS-305", name: "Information Security",          instructor: "Dr. Ashan Perera", credits: 3, seats: 7  },
];



