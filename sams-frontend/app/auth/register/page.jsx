'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    student_id: '',
    email: '',
    password: '',
    confirm_password: '',
    terms: false,
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock registration — navigate to login
    router.push('/login');
  };

  return (
    <div className="bg-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-tertiary-container/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header / Branding Anchor */}
      <header className="w-full h-16 flex items-center px-container-margin z-10">
        <div className="max-w-[1280px] mx-auto w-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-white">school</span>
            </div>
            <span className="font-headline-lg text-headline-lg font-extrabold text-primary tracking-tighter">SAMS</span>
          </Link>
        </div>
      </header>

      {/* Main Registration Section */}
      <main className="flex-grow flex items-center justify-center px-8 py-16 relative z-10">
        <div className="w-full max-w-[560px] mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Create Account</h1>
              <p className="text-sm text-slate-500">Faculty of Computing Student Portal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-600 flex items-center gap-2 mb-1" htmlFor="full_name"><span className="material-symbols-outlined text-[16px]">person</span>Full Name</label>
                  <input id="full_name" value={formData.full_name} onChange={handleChange} placeholder="John Doe" className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-slate-600 flex items-center gap-2 mb-1" htmlFor="student_id"><span className="material-symbols-outlined text-[16px]">badge</span>Student ID</label>
                  <input id="student_id" value={formData.student_id} onChange={handleChange} placeholder="CS/2021/001" className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-600 flex items-center gap-2 mb-1" htmlFor="email"><span className="material-symbols-outlined text-[16px]">mail</span>University Email</label>
                <input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="john.doe@sjp.ac.lk" className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-600 flex items-center gap-2 mb-1" htmlFor="password"><span className="material-symbols-outlined text-[16px]">lock</span>Password</label>
                  <input id="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-slate-600 flex items-center gap-2 mb-1" htmlFor="confirm_password"><span className="material-symbols-outlined text-[16px]">verified_user</span>Confirm Password</label>
                  <input id="confirm_password" type="password" value={formData.confirm_password} onChange={handleChange} placeholder="••••••••" className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input id="terms" type="checkbox" checked={formData.terms} onChange={handleChange} className="w-4 h-4" />
                <label htmlFor="terms" className="text-sm text-slate-600">I agree to the <a href="#" className="text-primary font-semibold">Terms of Service</a> and <a href="#" className="text-primary font-semibold">Privacy Policy</a>.</label>
              </div>

              <button type="submit" className="w-full bg-[#0b4b86] hover:bg-[#063a67] text-white rounded-xl py-3 text-lg font-medium shadow-lg flex items-center justify-center gap-2">
                <span>Register</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>

            <div className="mt-6 border-t pt-6 text-center">
              <p className="text-sm text-slate-600">Already have an account? <Link href="/login" className="text-primary font-bold">Sign In</Link></p>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-8 opacity-40 text-slate-500 text-sm">
            <div className="flex items-center gap-2"><span className="material-symbols-outlined">security</span><span>Secure Data</span></div>
            <div className="flex items-center gap-2"><span className="material-symbols-outlined">history_edu</span><span>Verified Access</span></div>
            <div className="flex items-center gap-2"><span className="material-symbols-outlined">cloud_done</span><span>Instant Sync</span></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-xl px-container-margin z-10 border-t border-outline-variant/30 bg-surface-container-lowest/50">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-title-md text-title-md font-bold text-primary mb-1">SAMS</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">© 2024 Faculty of Computing, University of Sri Jayewardenepura</span>
          </div>
          <div className="flex gap-lg">
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Support</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
