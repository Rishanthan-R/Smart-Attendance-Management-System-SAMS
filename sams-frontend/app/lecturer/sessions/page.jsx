'use client';

import { useState, useEffect } from 'react';

export default function CreateSessionPage() {
  const [sessionActive, setSessionActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [students, setStudents] = useState([]);

  const generateOTP = () => {
    setSessionActive(true);
    setTimeLeft(600);
  };

  const closeSession = () => {
    if (confirm("Are you sure you want to close this session? All generated records will be saved.")) {
      setSessionActive(false);
      setStudents([]);
    }
  };

  useEffect(() => {
    let interval;
    if (sessionActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive, timeLeft]);

  useEffect(() => {
    let interval;
    if (sessionActive) {
      const newStudents = [
        { name: "Kasun Perera", id: "CS/2021/045", distance: "4.2m" },
        { name: "Nimali Silva", id: "CS/2021/012", distance: "2.1m" },
        { name: "Tharindu Bandara", id: "CS/2021/089", distance: "12.5m" }
      ];
      let count = 0;
      interval = setInterval(() => {
        if (count < newStudents.length) {
          setStudents((prev) => [newStudents[count], ...prev]);
          count++;
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [sessionActive]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const progress = (timeLeft / 600) * 100;

  return (
    <>
      <header className="mb-xl flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-background">Create Attendance Session</h2>
          <p className="text-body-md font-body-md text-on-surface-variant">Initialize a new lecture session to start tracking student attendance.</p>
        </div>
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-sm px-md py-sm bg-surface-container-high rounded-full border border-outline-variant">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-label-md font-label-md text-primary font-bold">GPS: LOCKED (FOC HALL 01)</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Session Configuration Form */}
        <section className="col-span-1 lg:col-span-5 flex flex-col gap-lg">
          <div className="bg-white/80 backdrop-blur border border-outline-variant p-xl rounded-xl shadow-sm">
            <h3 className="font-title-md text-title-md mb-lg text-on-background flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">tune</span>
              Session Details
            </h3>
            <form className="space-y-md">
              <div>
                <label className="block text-label-md font-label-md text-on-surface-variant mb-xs">SUBJECT SELECTION</label>
                <select disabled={sessionActive} className="w-full bg-surface-container-lowest border border-outline rounded-lg px-md py-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all disabled:opacity-50">
                  <option>SENG 31223 - Information Systems Security</option>
                  <option>SENG 32253 - Advanced Web Development</option>
                  <option>COSC 41122 - Artificial Intelligence</option>
                </select>
              </div>
              <div>
                <label className="block text-label-md font-label-md text-on-surface-variant mb-xs">LECTURE HALL</label>
                <select disabled={sessionActive} className="w-full bg-surface-container-lowest border border-outline rounded-lg px-md py-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all disabled:opacity-50">
                  <option>Computing Auditorium - Hall 01</option>
                  <option>Main Lab 04</option>
                  <option>Seminar Room - Phase 01</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-md">
                <div>
                  <label className="block text-label-md font-label-md text-on-surface-variant mb-xs">DATE</label>
                  <input disabled={sessionActive} className="w-full bg-surface-container-lowest border border-outline rounded-lg px-md py-sm focus:ring-2 focus:ring-primary transition-all disabled:opacity-50" type="date" defaultValue="2024-10-24" />
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface-variant mb-xs">TIME</label>
                  <input disabled={sessionActive} className="w-full bg-surface-container-lowest border border-outline rounded-lg px-md py-sm focus:ring-2 focus:ring-primary transition-all disabled:opacity-50" type="time" defaultValue="09:00" />
                </div>
              </div>
              <button disabled={sessionActive} onClick={generateOTP} className="w-full bg-primary text-on-primary py-lg rounded-xl font-title-md text-title-md shadow-sm hover:bg-primary-container active:scale-95 transition-all mt-lg flex items-center justify-center gap-md disabled:opacity-50 disabled:cursor-not-allowed" type="button">
                <span className="material-symbols-outlined">key</span>
                Generate OTP
              </button>
            </form>
          </div>
          <div className="bg-surface-container p-lg rounded-xl flex items-start gap-md border border-outline-variant">
            <span className="material-symbols-outlined text-tertiary">info</span>
            <div>
              <p className="text-body-sm font-body-sm text-on-surface">The OTP will be valid for 10 minutes. Students must be within the geofenced perimeter of the lecture hall to check-in.</p>
            </div>
          </div>
        </section>

        {/* OTP Display Area or Placeholder */}
        {!sessionActive ? (
          <section className="col-span-1 lg:col-span-7 flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-xl p-xl bg-surface-container-lowest/50">
            <div className="w-24 h-24 bg-surface-container flex items-center justify-center rounded-full mb-lg">
              <span className="material-symbols-outlined text-display-lg text-outline">sensors</span>
            </div>
            <h4 className="font-title-md text-title-md text-on-surface-variant mb-sm">Ready to Initialize</h4>
            <p className="text-body-md text-secondary max-w-[384px] text-center">Fill out the session details and generate an OTP to start tracking attendance for your lecture.</p>
          </section>
        ) : (
          <section className="col-span-1 lg:col-span-7 transition-all duration-500">
            <div className="bg-white/80 backdrop-blur p-xl rounded-xl shadow-lg border-2 border-primary/20 h-full flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl"></div>
              
              <div className="text-center relative z-10 w-full">
                <span className="text-label-md font-label-md bg-primary/10 text-primary px-lg py-xs rounded-full uppercase tracking-widest mb-lg inline-block">Active Session Code</span>
                
                {/* OTP Display */}
                <div className="flex items-center justify-center gap-md mb-xl">
                  <div className="flex gap-sm">
                    {['8', '2', '9'].map((d, i) => (
                      <div key={i} className="flex items-center justify-center w-14 h-20 bg-surface-container-lowest border-2 border-primary rounded-xl shadow-md font-display-lg text-display-lg text-primary">{d}</div>
                    ))}
                  </div>
                  <div className="w-4 h-1 bg-outline-variant rounded-full"></div>
                  <div className="flex gap-sm">
                    {['3', '0', '1'].map((d, i) => (
                      <div key={i} className="flex items-center justify-center w-14 h-20 bg-surface-container-lowest border-2 border-primary rounded-xl shadow-md font-display-lg text-display-lg text-primary">{d}</div>
                    ))}
                  </div>
                </div>

                {/* Timer */}
                <div className="mb-xl">
                  <div className="text-body-sm font-body-sm text-on-surface-variant mb-sm">OTP EXPIRES IN</div>
                  <div className={`font-display-lg text-display-lg font-mono tabular-nums ${timeLeft > 0 ? 'text-error' : 'text-secondary'}`}>
                    {timeLeft > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : 'EXPIRED'}
                  </div>
                  <div className="w-64 h-1.5 bg-surface-container-highest rounded-full mx-auto mt-md overflow-hidden">
                    <div className="h-full bg-error transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-xl w-full border-t border-outline-variant pt-xl mb-xl">
                  <div className="text-center">
                    <div className="text-label-md font-label-md text-on-surface-variant uppercase">Students Joined</div>
                    <div className="font-headline-lg text-headline-lg text-primary">{students.length} / 48</div>
                  </div>
                  <div className="text-center">
                    <div className="text-label-md font-label-md text-on-surface-variant uppercase">Validation Mode</div>
                    <div className="flex items-center justify-center gap-xs text-primary font-bold">
                      <span className="material-symbols-outlined text-body-md" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                      GPS Enabled
                    </div>
                  </div>
                </div>

                <button onClick={closeSession} className="px-xl py-md bg-surface-container-lowest border-2 border-error text-error rounded-xl font-title-md text-title-md hover:bg-error-container active:scale-95 transition-all flex items-center gap-md mx-auto" type="button">
                  <span className="material-symbols-outlined">cancel</span>
                  Close Session
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Attendance Feed */}
      <section className="mt-xl">
        <div className="flex justify-between items-center mb-lg">
          <h3 className="font-title-md text-title-md text-on-background">Live Attendance Stream</h3>
          {sessionActive && (
            <span className="text-label-md font-label-md text-on-surface-variant bg-surface-container px-md py-xs rounded-full animate-pulse">UPDATING REAL-TIME</span>
          )}
        </div>
        <div className="bg-white/80 backdrop-blur rounded-xl overflow-hidden border border-outline-variant shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
              <tr>
                <th className="px-xl py-md">Student Name</th>
                <th className="px-xl py-md">Student ID</th>
                <th className="px-xl py-md">Time Joined</th>
                <th className="px-xl py-md">GPS Distance</th>
                <th className="px-xl py-md">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-body-sm">
              {students.length === 0 ? (
                <tr>
                  <td className="px-xl py-xl text-center text-secondary italic" colSpan="5">Waiting for students to join the session...</td>
                </tr>
              ) : (
                students.map((student, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-xl py-md font-medium text-on-surface">{student.name}</td>
                    <td className="px-xl py-md text-on-surface-variant">{student.id}</td>
                    <td className="px-xl py-md text-on-surface-variant">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="px-xl py-md text-primary font-mono">{student.distance}</td>
                    <td className="px-xl py-md">
                      <span className="inline-flex items-center gap-xs px-md py-xs bg-emerald-100 text-emerald-800 rounded-full text-label-md font-bold uppercase">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        Present
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
