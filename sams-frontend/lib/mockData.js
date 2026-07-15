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


/* ── Student-Profile-page mock data below ── */
/* Seed activity log — replace with a real fetch from your API endpoint.*/

export const ACTIVITY_LOG = [
  { action: "Attendance marked", detail: "CS-202 — Data Structures",          time: "Today, 14:02",  type: "success" },
  { action: "Password changed",  detail: "Security settings updated",          time: "Jul 9, 10:20",  type: "info"    },
  { action: "Profile updated",   detail: "Phone number changed",               time: "Jul 7, 09:15",  type: "info"    },
  { action: "Attendance marked", detail: "IS-210 — Database Systems",          time: "Jul 6, 13:04",  type: "success" },
  { action: "Login detected",    detail: "New device — Chrome / Windows",      time: "Jul 5, 08:47",  type: "warning" },
];

