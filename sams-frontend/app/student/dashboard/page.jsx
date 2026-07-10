'use client';

import { useStore } from '@/lib/store';

export default function StudentDashboard() {
  const user = useStore((s) => s.user);
  const name = user?.name || 'Kasun Perera';
  const studentId = user?.studentId || 'FOC/21/S/0045';

  return (
    <>
      {/* Header Section */}
      <header className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Welcome back, {name}</h1>
          <p className="font-body-md text-body-md text-secondary">Student ID: {studentId} • 3rd Year Undergrad</p>
        </div>
      </header>

      {/* Bento Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
        {/* Stats Row */}
        <div className="md:col-span-4 bento-card bg-surface-container-lowest p-lg rounded-xl flex flex-col gap-sm">
          <div className="flex justify-between items-center">
            <span className="font-label-md text-label-md text-secondary uppercase">Overall Attendance</span>
            <span className="material-symbols-outlined text-primary">analytics</span>
          </div>
          <div className="flex items-end gap-sm">
            <span className="font-display-lg text-display-lg text-primary">92%</span>
            <span className="font-body-sm text-body-sm text-emerald-600 mb-sm flex items-center">
              <span className="material-symbols-outlined text-xs">trending_up</span> 2.4%
            </span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mt-sm">
            <div className="bg-primary h-full w-[92%] transition-all duration-1000"></div>
          </div>
        </div>

        <div className="md:col-span-4 bento-card bg-surface-container-lowest p-lg rounded-xl flex flex-col gap-sm">
          <div className="flex justify-between items-center">
            <span className="font-label-md text-label-md text-secondary uppercase">Classes This Week</span>
            <span className="material-symbols-outlined text-primary">event_available</span>
          </div>
          <div className="flex items-end gap-sm">
            <span className="font-display-lg text-display-lg text-primary">14</span>
            <span className="font-body-sm text-body-sm text-secondary mb-sm">/ 18 Scheduled</span>
          </div>
          <div className="text-body-sm text-on-surface-variant italic">Next: Advanced Database Systems (2PM)</div>
        </div>

        <div className="md:col-span-4 bento-card bg-surface-container-lowest p-lg rounded-xl flex flex-col gap-sm">
          <div className="flex justify-between items-center">
            <span className="font-label-md text-label-md text-secondary uppercase">Upcoming Exams</span>
            <span className="material-symbols-outlined text-error">assignment_late</span>
          </div>
          <div className="flex items-end gap-sm">
            <span className="font-display-lg text-display-lg text-error">03</span>
            <span className="font-body-sm text-body-sm text-secondary mb-sm">This Month</span>
          </div>
          <div className="flex gap-sm">
            <span className="px-sm py-xs bg-error-container text-on-error-container text-[10px] font-bold rounded uppercase">Critical</span>
            <span className="text-body-sm text-secondary">CS3022 - Finals</span>
          </div>
        </div>

        {/* Attendance Trend Chart */}
        <div className="md:col-span-8 bento-card bg-surface-container-lowest p-lg rounded-xl overflow-hidden">
          <div className="flex justify-between items-center mb-xl">
            <h3 className="font-title-md text-title-md text-on-surface">Attendance Trend</h3>
            <div className="flex gap-sm">
              <button className="px-md py-xs rounded-full bg-surface-container text-primary font-label-md">Monthly</button>
              <button className="px-md py-xs rounded-full text-secondary font-label-md hover:bg-surface-container-low transition-colors">Weekly</button>
            </div>
          </div>
          <div className="chart-container flex items-end justify-between px-md">
            <div className="relative w-full h-full flex items-end">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                <path className="opacity-80" d="M0 35 Q 10 32, 20 28 T 40 20 T 60 15 T 80 18 T 100 10" fill="none" stroke="#003f87" strokeWidth="2" />
                <path className="opacity-10" d="M0 35 Q 10 32, 20 28 T 40 20 T 60 15 T 80 18 T 100 10 L 100 40 L 0 40 Z" fill="url(#gradient)" />
                <defs>
                  <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#003f87', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#003f87', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex justify-between items-end px-md">
                {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'].map((month) => (
                  <div key={month} className="group relative flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mb-[-4px]"></div>
                    <span className="text-[10px] text-secondary mt-2">{month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Today's Active Sessions */}
        <div className="md:col-span-4 flex flex-col gap-lg">
          <div className="bento-card bg-surface-container-lowest p-lg rounded-xl">
            <h3 className="font-title-md text-title-md text-on-surface mb-md">Today&apos;s Active Sessions</h3>
            <div className="space-y-md">
              <div className="p-md bg-surface-container-low rounded-lg border border-outline-variant flex flex-col gap-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-label-md font-label-md text-primary uppercase">Current Session</p>
                    <p className="font-title-md text-body-md font-bold text-on-surface">Human Computer Interaction</p>
                    <p className="text-body-sm text-secondary">Venue: Lab 03 • Ends 12:30 PM</p>
                  </div>
                  <span className="animate-pulse w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <button className="mt-sm w-full py-sm bg-primary text-on-primary rounded-lg font-bold flex items-center justify-center gap-sm active:scale-95 transition-transform">
                  <span className="material-symbols-outlined text-md">how_to_reg</span>
                  Quick Mark Attendance
                </button>
              </div>

              <div className="p-md bg-surface-bright rounded-lg border border-outline-variant flex flex-col gap-sm opacity-60 grayscale-[0.5]">
                <div>
                  <p className="text-label-md font-label-md text-secondary uppercase">Upcoming - 2:00 PM</p>
                  <p className="font-title-md text-body-md font-bold text-on-surface">Data Science Fundamentals</p>
                  <p className="text-body-sm text-secondary">Venue: LT 02 • Prof. Silva</p>
                </div>
                <button className="mt-sm w-full py-sm border border-outline text-secondary rounded-lg font-bold flex items-center justify-center gap-sm cursor-not-allowed" disabled>
                  <span className="material-symbols-outlined text-md">lock</span>
                  Wait for Check-in
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="md:col-span-4 bento-card bg-surface-container-lowest p-lg rounded-xl">
          <div className="flex justify-between items-center mb-md">
            <h3 className="font-title-md text-title-md text-on-surface">Notifications</h3>
            <span className="bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full text-[10px] font-bold">4 NEW</span>
          </div>
          <div className="flex flex-col gap-md">
            <div className="flex gap-md group">
              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>notifications</span>
              </div>
              <div>
                <p className="text-body-sm font-bold text-on-surface group-hover:text-primary transition-colors cursor-pointer">Attendance Warning: Math III</p>
                <p className="text-body-sm text-secondary">Your attendance in CS2012 has dropped to 76%.</p>
                <p className="text-[10px] text-outline mt-1 uppercase">2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-md group">
              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div>
                <p className="text-body-sm font-bold text-on-surface group-hover:text-primary transition-colors cursor-pointer">Assignment Graded</p>
                <p className="text-body-sm text-secondary">HCI Phase 1: High Fidelity Prototypes. Grade: A+</p>
                <p className="text-[10px] text-outline mt-1 uppercase">Yesterday</p>
              </div>
            </div>
            <div className="flex gap-md group">
              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
              </div>
              <div>
                <p className="text-body-sm font-bold text-on-surface group-hover:text-primary transition-colors cursor-pointer">Schedule Update</p>
                <p className="text-body-sm text-secondary">Friday&apos;s Seminar rescheduled to 10:00 AM.</p>
                <p className="text-[10px] text-outline mt-1 uppercase">2 days ago</p>
              </div>
            </div>
            <button className="text-primary text-body-sm font-bold mt-md hover:underline text-left">View All Notifications</button>
          </div>
        </div>

        {/* Course Progress & Schedule */}
        <div className="md:col-span-8 bento-card bg-surface-container-lowest p-lg rounded-xl overflow-hidden">
          <h3 className="font-title-md text-title-md text-on-surface mb-md">Course Progress &amp; Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low">
                <tr>
                  <th className="p-md font-label-md text-secondary uppercase">Course Code &amp; Title</th>
                  <th className="p-md font-label-md text-secondary uppercase">Progress</th>
                  <th className="p-md font-label-md text-secondary uppercase">Attendance</th>
                  <th className="p-md font-label-md text-secondary uppercase">Next Class</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-md">
                    <p className="font-body-md font-bold text-on-surface">CS3022: Advanced Databases</p>
                    <p className="text-body-sm text-secondary">Dr. Samantha Fonseka</p>
                  </td>
                  <td className="p-md">
                    <div className="flex items-center gap-sm">
                      <div className="w-16 bg-surface-container h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[65%]"></div>
                      </div>
                      <span className="text-body-sm text-on-surface-variant">65%</span>
                    </div>
                  </td>
                  <td className="p-md">
                    <span className="px-md py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">98% (Safe)</span>
                  </td>
                  <td className="p-md text-body-sm text-secondary">Tomorrow, 08:30 AM</td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-md">
                    <p className="font-body-md font-bold text-on-surface">CS3041: HCI Design</p>
                    <p className="text-body-sm text-secondary">Ms. Nilanthi Gamage</p>
                  </td>
                  <td className="p-md">
                    <div className="flex items-center gap-sm">
                      <div className="w-16 bg-surface-container h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[80%]"></div>
                      </div>
                      <span className="text-body-sm text-on-surface-variant">80%</span>
                    </div>
                  </td>
                  <td className="p-md">
                    <span className="px-md py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">92% (Safe)</span>
                  </td>
                  <td className="p-md text-body-sm text-secondary">Today, 02:00 PM</td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-md">
                    <p className="font-body-md font-bold text-on-surface">CS3055: Machine Learning</p>
                    <p className="text-body-sm text-secondary">Prof. Kalinga Perera</p>
                  </td>
                  <td className="p-md">
                    <div className="flex items-center gap-sm">
                      <div className="w-16 bg-surface-container h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[45%]"></div>
                      </div>
                      <span className="text-body-sm text-on-surface-variant">45%</span>
                    </div>
                  </td>
                  <td className="p-md">
                    <span className="px-md py-1 bg-amber-100 text-amber-800 rounded-full text-[10px] font-bold">81% (Check)</span>
                  </td>
                  <td className="p-md text-body-sm text-secondary">Mon, 10:00 AM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-xl py-xl border-t border-outline-variant flex flex-col md:flex-row justify-between items-center w-full">
        <div className="mb-md md:mb-0">
          <span className="font-title-md text-title-md font-bold text-primary">SAMS</span>
        </div>
        <div className="flex flex-col items-center md:items-end gap-sm">
          <p className="font-body-sm text-body-sm text-on-surface-variant">© 2024 Faculty of Computing, University of Sri Jayewardenepura</p>
          <div className="flex gap-md">
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-opacity duration-200" href="#">Privacy Policy</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-opacity duration-200" href="#">Terms of Service</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-opacity duration-200" href="#">Support</a>
          </div>
        </div>
      </footer>
    </>
  );
}
