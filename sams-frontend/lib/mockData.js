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

   NOTE ON REMOVED MEDICAL CONTENT:
   The original NOTIFICATIONS list included a "Medical certificate
   submission window is open" entry. Since this system has no medical
   module, that notification has been replaced with a non-medical
   academic one so the notifications panel still has a realistic
   "info" example to show off both notification styles.
═══════════════════════════════════════════════════════════════════ */
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

