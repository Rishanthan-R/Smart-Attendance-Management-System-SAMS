'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';

export default function StudentProfilePage() {
  const user = useStore((s) => s.user);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  return (
    <div className="max-w-[900px] mx-auto space-y-lg pb-xl">
      {/* Header Section */}
      <header className="flex justify-between items-end pb-lg border-b border-outline-variant">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Student Profile</h2>
          <p className="text-secondary font-body-md">Manage your academic identity and account security.</p>
        </div>
        <div className="flex gap-md">
          <button className="px-lg py-sm border border-outline text-secondary rounded-lg font-label-md active:scale-95 transition-transform hover:bg-surface-container">Cancel</button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className={`px-lg py-sm rounded-lg font-label-md shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 ${saved ? 'bg-green-600 text-white' : 'bg-primary text-on-primary hover:bg-primary-container'}`}
          >
            {saving ? (
              <><span className="animate-spin material-symbols-outlined text-sm">refresh</span> Saving...</>
            ) : saved ? (
              <><span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Saved!</>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </header>

      {/* Profile Layout: Bento-inspired Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        {/* Avatar Card */}
        <div className="md:col-span-1 space-y-lg">
          <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm text-center flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-surface-container overflow-hidden shadow-inner bg-surface flex items-center justify-center bg-primary-container">
                <span className="material-symbols-outlined text-primary text-[64px]">person</span>
              </div>
              <button className="absolute bottom-2 right-2 p-base bg-primary text-on-primary rounded-full shadow-lg border-4 border-surface-container-lowest hover:bg-primary-container transition-colors">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
            </div>
            <h3 className="mt-lg font-title-md text-title-md">{user?.name || 'Kasun Perera'}</h3>
            <p className="text-body-sm text-secondary">Student ID: {user?.studentId || 'CS/2021/042'}</p>
            <button className="mt-md w-full py-sm border border-primary text-primary rounded-lg font-label-md active:scale-95 transition-transform hover:bg-surface-container-low">Edit Photo</button>
          </div>

          {/* Faculty Badge */}
          <div className="bg-surface-container p-lg rounded-xl flex items-center gap-md">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">account_balance</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-secondary-container/60 uppercase tracking-widest">Institution</p>
              <p className="text-body-sm font-bold text-on-secondary-container">Faculty of Computing</p>
              <p className="text-[11px] text-on-secondary-container/80">University of Sri Jayewardenepura</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="md:col-span-2 space-y-lg">
          <section className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm">
            <div className="flex items-center gap-sm mb-xl border-b border-outline-variant/30 pb-md">
              <span className="material-symbols-outlined text-primary">badge</span>
              <h4 className="font-title-md text-title-md">Student Information</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
              <div className="space-y-xs group">
                <label className="font-label-md text-secondary group-focus-within:text-primary transition-colors">Full Name</label>
                <input className="w-full p-md bg-surface-bright border border-outline-variant rounded-lg font-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" type="text" defaultValue={user?.name || "Kasun Perera"} />
              </div>
              <div className="space-y-xs">
                <label className="font-label-md text-secondary">Student ID</label>
                <input className="w-full p-md bg-surface-container border border-outline-variant rounded-lg font-body-md text-secondary cursor-not-allowed" disabled type="text" defaultValue={user?.studentId || "CS/2021/042"} />
              </div>
              <div className="space-y-xs group">
                <label className="font-label-md text-secondary group-focus-within:text-primary transition-colors">Faculty</label>
                <select className="w-full p-md bg-surface-bright border border-outline-variant rounded-lg font-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                  <option>Faculty of Computing</option>
                  <option>Faculty of Applied Sciences</option>
                  <option>Faculty of Engineering</option>
                </select>
              </div>
              <div className="space-y-xs group">
                <label className="font-label-md text-secondary group-focus-within:text-primary transition-colors">Department</label>
                <select className="w-full p-md bg-surface-bright border border-outline-variant rounded-lg font-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                  <option>Computer Science</option>
                  <option>Information Technology</option>
                  <option>Software Engineering</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-xs group">
                <label className="font-label-md text-secondary group-focus-within:text-primary transition-colors">Email Address</label>
                <div className="relative">
                  <span className="absolute left-md top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">mail</span>
                  <input className="w-full p-md pl-[48px] bg-surface-bright border border-outline-variant rounded-lg font-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none" type="email" defaultValue={user?.email || "kasun.perera@sjp.ac.lk"} />
                </div>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm">
            <div className="flex items-center gap-sm mb-xl border-b border-outline-variant/30 pb-md">
              <span className="material-symbols-outlined text-primary">lock</span>
              <h4 className="font-title-md text-title-md">Security</h4>
            </div>
            <div className="space-y-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                <div className="space-y-xs group">
                  <label className="font-label-md text-secondary group-focus-within:text-primary transition-colors">New Password</label>
                  <input className="w-full p-md bg-surface-bright border border-outline-variant rounded-lg font-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="••••••••" type="password" />
                </div>
                <div className="space-y-xs group">
                  <label className="font-label-md text-secondary group-focus-within:text-primary transition-colors">Confirm Password</label>
                  <input className="w-full p-md bg-surface-bright border border-outline-variant rounded-lg font-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="••••••••" type="password" />
                </div>
              </div>
              <div className="p-md bg-surface-container-low rounded-lg flex items-start gap-md">
                <span className="material-symbols-outlined text-tertiary-container mt-0.5">info</span>
                <p className="text-body-sm text-on-secondary-container">Password must be at least 8 characters long and include a mix of uppercase, lowercase letters, and numbers.</p>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <div className="bg-error-container/20 p-xl rounded-xl border border-error/20 flex justify-between items-center">
            <div>
              <h5 className="font-title-md text-on-error-container">Deactivate Account</h5>
              <p className="text-body-sm text-on-error-container/70">Temporarily disable your student access.</p>
            </div>
            <button className="px-lg py-sm bg-error text-on-error rounded-lg font-label-md active:scale-95 transition-transform">Deactivate</button>
          </div>
        </div>
      </div>
    </div>
  );
}
