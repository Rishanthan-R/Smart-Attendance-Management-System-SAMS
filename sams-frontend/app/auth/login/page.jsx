'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { sleep } from '@/lib/utils';

const quickLogins = [
  { label: 'Student',  email: 'kasun@sjp.ac.lk',  name: 'Kasun Perera',    role: 'student',  studentId: 'FOC/21/S/0045', avatar: 'KP' },
  { label: 'Lecturer', email: 'dr.jaya@sjp.ac.lk', name: 'Dr. Jayawardena', role: 'lecturer', avatar: 'JW' },
  { label: 'Admin',    email: 'admin@sjp.ac.lk',   name: 'Admin User',      role: 'admin',    avatar: 'AU' },
];

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const login  = useStore((s) => s.login);
  const router = useRouter();

  const doLogin = async (emailVal, userData) => {
    setLoading(true);
    setError('');
    await sleep(700);
    login({ id: '1', email: emailVal, ...userData }, 'mock-token');
    setLoading(false);
    if (userData.role === 'admin') router.push('/admin');
    else if (userData.role === 'lecturer') router.push('/lecturer');
    else router.push('/student');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    const match = quickLogins.find((q) => q.email === email);
    if (match) {
      const { email: _, label: __, ...userData } = match;
      await doLogin(email, userData);
    } else {
      setError('Invalid credentials. Use a quick login button below to demo.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-mesh min-h-screen flex items-center justify-center p-md">
      {/* Login Container */}
      <main className="w-full max-w-[420px] transition-all duration-300 ease-in-out">
        {/* Login Card */}
        <div className="login-card bg-surface-container-lowest rounded-xl p-xl border border-outline-variant flex flex-col gap-lg">
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-md">
            <div className="w-24 h-24 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '64px' }}>school</span>
            </div>
            <div className="text-center">
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">Welcome to SAMS</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Faculty of Computing</p>
            </div>
          </div>

          {/* Quick Demo Login */}
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-2 text-center uppercase tracking-wider">Quick Demo Login</p>
            <div className="grid grid-cols-3 gap-2">
              {quickLogins.map((q) => (
                <button
                  key={q.role}
                  type="button"
                  onClick={() => { setEmail(q.email); setPassword('password'); doLogin(q.email, q); }}
                  className="text-xs font-semibold px-3 py-2 rounded-lg border border-outline-variant hover:border-primary hover:bg-surface-container-low hover:text-primary transition-all text-on-surface-variant"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-md">
            {/* Email Field */}
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant px-1" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">mail</span>
                <input
                  className="w-full pl-11 pr-md py-md bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline/50"
                  id="email"
                  placeholder="faculty@sjp.ac.lk"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant px-1" htmlFor="password">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">lock</span>
                <input
                  className="w-full pl-11 pr-md py-md bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline/50"
                  id="password"
                  placeholder="••••••••"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute right-md top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                >
                  <span className="material-symbols-outlined">{showPass ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between mt-xs">
              <label className="flex items-center gap-sm cursor-pointer group">
                <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary transition-all cursor-pointer" type="checkbox" />
                <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Remember Me</span>
              </label>
              <a className="font-body-sm text-body-sm text-primary font-semibold hover:underline transition-all" href="#">Forgot Password?</a>
            </div>

            {/* Error message */}
            {error && <p className="text-xs text-error bg-error-container px-3 py-2 rounded-lg">{error}</p>}

            {/* Login Button */}
            <button
              className="mt-md w-full bg-primary hover:bg-primary-container text-on-primary py-md rounded-lg font-title-md text-title-md shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-sm disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              <span className="material-symbols-outlined">login</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center gap-md py-sm">
            <div className="flex-grow border-t border-outline-variant"></div>
            <span className="font-label-md text-label-md text-outline">OR</span>
            <div className="flex-grow border-t border-outline-variant"></div>
          </div>

          {/* Footer Action */}
          <div className="text-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
              Don't have an account? <Link className="text-primary font-semibold hover:underline" href="/register">Register Here</Link>
            </p>
          </div>
        </div>

        {/* System Footer */}
        <footer className="mt-xl text-center flex flex-col gap-xs opacity-60">
          <p className="font-label-md text-label-md text-on-surface-variant">© 2024 University of Sri Jayewardenepura</p>
          <p className="font-label-md text-label-md text-on-surface-variant">Student Attendance Management System v2.1</p>
        </footer>
      </main>
    </div>
  );
}
