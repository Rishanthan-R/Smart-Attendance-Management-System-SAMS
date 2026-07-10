'use client';

import { useState, useRef, useEffect } from 'react';

export default function MarkAttendancePage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [status, setStatus] = useState('idle'); // idle | verifying | success | error
  const [timeLeft, setTimeLeft] = useState(262);
  const [clock, setClock] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join('');
    if (otpValue.length < 6) return;
    setStatus('verifying');
    setTimeout(() => {
      if (otpValue === '123456') {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }, 1200);
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const progress = (timeLeft / 300) * 100;

  return (
    <>
      {/* TopAppBar Contextual */}
      <header className="h-16 flex items-center justify-between px-xl bg-surface-container-lowest shadow-sm z-10 -mx-container-margin -mt-container-margin mb-xl">
        <div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Mark Attendance</h2>
          <div className="flex items-center gap-xs text-outline text-[12px]">
            <span>Campus</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>W002 Auditorium</span>
          </div>
        </div>
        <div className="flex items-center gap-md">
          <div className="text-body-sm font-bold bg-surface-container-highest px-md py-1 rounded-full text-primary">{clock}</div>
          <div className="flex items-center gap-sm px-md py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-label-md font-bold">Valid Location</span>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto w-full space-y-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg items-start">
          {/* Left Column: Session Details */}
          <div className="md:col-span-7 space-y-lg">
            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl shadow-sm relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary opacity-[0.03] rounded-full"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-sm mb-lg">
                  <span className="bg-primary/10 text-primary p-2 rounded-lg">
                    <span className="material-symbols-outlined">timer</span>
                  </span>
                  <h3 className="font-title-md text-title-md text-on-surface">Active Session Details</h3>
                </div>
                <div className="space-y-md">
                  <div>
                    <p className="text-label-md text-outline uppercase font-bold tracking-wider mb-1">Subject</p>
                    <p className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface leading-tight">Advanced Algorithms &amp; Data Structures</p>
                  </div>
                  <div className="grid grid-cols-2 gap-md pt-sm">
                    <div>
                      <p className="text-label-md text-outline uppercase font-bold tracking-wider mb-1">Lecturer</p>
                      <p className="font-title-md text-title-md">Prof. Samantha Perera</p>
                    </div>
                    <div>
                      <p className="text-label-md text-outline uppercase font-bold tracking-wider mb-1">Session Type</p>
                      <span className="inline-block px-sm py-0.5 rounded bg-surface-container text-secondary font-bold text-[12px]">Lecture</span>
                    </div>
                  </div>
                </div>
                <div className="mt-xl pt-lg border-t border-outline-variant/50">
                  <div className="flex items-center justify-between mb-sm">
                    <p className="text-body-sm text-on-surface-variant font-medium">Session Progress</p>
                    <p className="text-body-sm font-bold text-primary">{mins}:{secs.toString().padStart(2, '0')} remaining</p>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-1000 ease-linear" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </div>
            </section>

            {/* GPS Feedback */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-md flex items-center gap-md">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              </div>
              <div>
                <p className="text-body-md font-bold text-green-900">Geofence Verified</p>
                <p className="text-body-sm text-green-700">You are within the verified classroom boundary for W002. OTP submission is now enabled.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Verification */}
          <div className="md:col-span-5 space-y-lg">
            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl shadow-sm text-center">
              <h3 className="font-title-md text-title-md text-on-surface mb-md">Verify Identity</h3>
              <p className="text-body-sm text-outline mb-xl">Enter the 6-digit OTP displayed on the classroom projector screen to mark your attendance.</p>

              {/* OTP Inputs */}
              <div className="flex justify-between gap-2 mb-xl">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    className="otp-input w-full aspect-square text-center font-headline-lg-mobile text-headline-lg-mobile rounded-lg border-2 border-outline-variant bg-surface-container-lowest focus:border-primary focus:outline-none transition-colors"
                    maxLength={1}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                  />
                ))}
              </div>

              {status !== 'success' && (
                <button
                  className="w-full py-md bg-primary text-on-primary rounded-xl font-title-md text-title-md hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-sm disabled:opacity-60"
                  onClick={handleSubmit}
                  disabled={status === 'verifying'}
                >
                  {status === 'verifying' ? (
                    <><span className="animate-spin material-symbols-outlined">sync</span> Verifying...</>
                  ) : (
                    'Submit Attendance'
                  )}
                </button>
              )}

              {status === 'success' && (
                <div className="mt-lg p-md bg-green-100 text-green-900 rounded-lg flex flex-col items-center gap-xs">
                  <span className="material-symbols-outlined text-green-600 text-[32px]">check_circle</span>
                  <p className="font-bold">Attendance Recorded!</p>
                  <p className="text-body-sm opacity-80">Syncing with Faculty servers...</p>
                </div>
              )}

              {status === 'error' && (
                <div className="mt-lg p-md bg-error-container text-on-error-container rounded-lg flex items-center gap-sm">
                  <span className="material-symbols-outlined text-error">error</span>
                  <div className="text-left">
                    <p className="font-bold">Invalid Code</p>
                    <p className="text-body-sm opacity-80">Please check the OTP and try again.</p>
                  </div>
                </div>
              )}
            </section>

            {/* Tip Card */}
            <div className="bg-surface-container border border-outline-variant/30 rounded-xl p-md">
              <div className="flex items-start gap-sm">
                <span className="material-symbols-outlined text-tertiary mt-0.5">info</span>
                <div>
                  <p className="text-body-sm font-bold text-on-surface">Need help?</p>
                  <p className="text-[12px] text-outline">If the OTP doesn&apos;t work, contact the lecturer before the session ends. GPS issues? Ensure your location services are enabled.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Sessions History */}
        <section className="mt-xl">
          <h3 className="font-title-md text-title-md text-on-surface mb-lg">Recent History</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {[
              { name: 'Cloud Computing', time: 'Yesterday, 08:30 AM', status: 'Present' },
              { name: 'Mobile App Dev', time: 'Mon, 13:00 PM', status: 'Present' },
              { name: 'Cyber Security', time: 'Fri, 10:00 AM', status: 'Absent' },
            ].map((item) => (
              <div key={item.name} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex justify-between items-center opacity-70">
                <div>
                  <p className="text-body-sm font-bold">{item.name}</p>
                  <p className="text-[12px] text-outline">{item.time}</p>
                </div>
                <span className={`px-sm py-0.5 rounded-full text-[11px] font-bold ${
                  item.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-error-container text-error'
                }`}>{item.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
