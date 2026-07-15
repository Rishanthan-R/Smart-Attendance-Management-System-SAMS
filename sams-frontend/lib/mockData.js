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

