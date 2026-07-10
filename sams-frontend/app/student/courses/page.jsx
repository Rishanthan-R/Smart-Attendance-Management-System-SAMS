'use client';

import { useStore } from '@/lib/store';
import Link from 'next/link';

export default function StudentCoursesPage() {
  const user = useStore((s) => s.user);

  return (
    <div className="h-full relative">
      {/* TopAppBar (Mobile & Desktop Header) */}
      <header className="sticky top-0 z-40 bg-surface-container-lowest/80 backdrop-blur-md px-container-margin h-16 flex items-center justify-between shadow-sm -mx-container-margin -mt-container-margin mb-xl">
        <div className="flex items-center gap-md">
          <button className="md:hidden p-sm hover:bg-surface-container-low rounded-full">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h2 className="font-title-md text-title-md text-primary font-bold">My Enrolled Courses</h2>
        </div>
        <div className="flex items-center gap-lg">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input className="pl-10 pr-md py-sm bg-surface-container-low border-none rounded-full w-64 focus:ring-2 focus:ring-primary transition-all font-body-sm text-body-sm" placeholder="Search courses..." type="text" />
          </div>
          <div className="flex items-center gap-sm">
            <div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden bg-surface-container-low flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Course Grid Area */}
      <div className="max-w-[1280px] mx-auto space-y-xl">
        {/* Hero Stats / Bento Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          <div className="md:col-span-2 relative h-48 rounded-xl overflow-hidden bg-primary-container text-on-primary flex items-end p-xl group">
            <div className="absolute inset-0 opacity-20 group-hover:scale-105 transition-transform duration-700 bg-primary-container"></div>
            <div className="relative z-10">
              <span className="bg-white/20 px-sm py-1 rounded-full font-label-md text-label-md mb-md inline-block">Semester 2, 2024</span>
              <h3 className="font-display-lg text-display-lg font-bold leading-tight">Focus on Excellence.</h3>
              <p className="font-body-md text-body-md opacity-90">You have 6 active courses this semester with a 92% average attendance.</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-sm">
                <span className="material-symbols-outlined text-primary bg-primary-container/20 p-sm rounded-lg">trending_up</span>
                <span className="text-primary font-bold font-label-md">+4% vs Last Month</span>
              </div>
              <h4 className="text-on-surface-variant font-label-md uppercase tracking-wider">Overall Attendance</h4>
            </div>
            <div>
              <span className="text-[40px] font-bold text-primary">94.2%</span>
              <div className="w-full bg-surface-container h-2 rounded-full mt-sm">
                <div className="bg-primary h-full rounded-full w-[94.2%] transition-all duration-1000"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls (Mobile Search) */}
        <div className="sm:hidden w-full">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input className="w-full pl-10 pr-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary font-body-sm text-body-sm" placeholder="Search courses..." type="text" />
          </div>
        </div>

        {/* Bento Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
          {/* Course Card 1 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex flex-col hover:-translate-y-1">
            <div className="flex justify-between items-start mb-lg">
              <div>
                <span className="text-primary font-bold font-label-md bg-primary-container/10 px-sm py-1 rounded">ITC 2102</span>
                <h4 className="font-title-md text-title-md text-on-surface mt-sm leading-tight group-hover:text-primary transition-colors">Data Structures and Algorithms</h4>
              </div>
              <button className="text-secondary hover:text-primary p-xs rounded-full hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <div className="flex items-center gap-sm mb-xl">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container text-[18px]">person</span>
              </div>
              <span className="text-on-surface-variant font-body-sm">Dr. Amara Siriwardena</span>
            </div>
            <div className="mt-auto space-y-sm">
              <div className="flex justify-between items-end">
                <span className="font-label-md text-on-surface-variant uppercase">Attendance</span>
                <span className="font-bold text-primary">96%</span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[96%] transition-all"></div>
              </div>
              <button className="w-full mt-lg py-sm text-primary font-bold border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-sm group/btn">
                View Details
                <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Course Card 2 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex flex-col hover:-translate-y-1">
            <div className="flex justify-between items-start mb-lg">
              <div>
                <span className="text-primary font-bold font-label-md bg-primary-container/10 px-sm py-1 rounded">ITC 2105</span>
                <h4 className="font-title-md text-title-md text-on-surface mt-sm leading-tight group-hover:text-primary transition-colors">Software Engineering</h4>
              </div>
              <button className="text-secondary hover:text-primary p-xs rounded-full hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <div className="flex items-center gap-sm mb-xl">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container text-[18px]">person</span>
              </div>
              <span className="text-on-surface-variant font-body-sm">Prof. Rohan Perera</span>
            </div>
            <div className="mt-auto space-y-sm">
              <div className="flex justify-between items-end">
                <span className="font-label-md text-on-surface-variant uppercase">Attendance</span>
                <span className="font-bold text-primary">88%</span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[88%] transition-all"></div>
              </div>
              <button className="w-full mt-lg py-sm text-primary font-bold border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-sm group/btn">
                View Details
                <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Course Card 3 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex flex-col hover:-translate-y-1">
            <div className="flex justify-between items-start mb-lg">
              <div>
                <span className="text-primary font-bold font-label-md bg-primary-container/10 px-sm py-1 rounded">ITC 2108</span>
                <h4 className="font-title-md text-title-md text-on-surface mt-sm leading-tight group-hover:text-primary transition-colors">Computer Networks</h4>
              </div>
              <button className="text-secondary hover:text-primary p-xs rounded-full hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <div className="flex items-center gap-sm mb-xl">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container text-[18px]">person</span>
              </div>
              <span className="text-on-surface-variant font-body-sm">Dr. Kumudu Silva</span>
            </div>
            <div className="mt-auto space-y-sm">
              <div className="flex justify-between items-end">
                <span className="font-label-md text-on-surface-variant uppercase text-error">Low Attendance</span>
                <span className="font-bold text-error">72%</span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-error h-full w-[72%] transition-all"></div>
              </div>
              <button className="w-full mt-lg py-sm text-primary font-bold border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-sm group/btn">
                View Details
                <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Course Card 4 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex flex-col hover:-translate-y-1">
            <div className="flex justify-between items-start mb-lg">
              <div>
                <span className="text-primary font-bold font-label-md bg-primary-container/10 px-sm py-1 rounded">ITC 2110</span>
                <h4 className="font-title-md text-title-md text-on-surface mt-sm leading-tight group-hover:text-primary transition-colors">Probability and Statistics</h4>
              </div>
              <button className="text-secondary hover:text-primary p-xs rounded-full hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <div className="flex items-center gap-sm mb-xl">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container text-[18px]">person</span>
              </div>
              <span className="text-on-surface-variant font-body-sm">Ms. Nethmi Rodrigo</span>
            </div>
            <div className="mt-auto space-y-sm">
              <div className="flex justify-between items-end">
                <span className="font-label-md text-on-surface-variant uppercase">Attendance</span>
                <span className="font-bold text-primary">100%</span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[100%] transition-all"></div>
              </div>
              <button className="w-full mt-lg py-sm text-primary font-bold border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-sm group/btn">
                View Details
                <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Course Card 5 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex flex-col hover:-translate-y-1">
            <div className="flex justify-between items-start mb-lg">
              <div>
                <span className="text-primary font-bold font-label-md bg-primary-container/10 px-sm py-1 rounded">ITC 2112</span>
                <h4 className="font-title-md text-title-md text-on-surface mt-sm leading-tight group-hover:text-primary transition-colors">Database Systems</h4>
              </div>
              <button className="text-secondary hover:text-primary p-xs rounded-full hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <div className="flex items-center gap-sm mb-xl">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container text-[18px]">person</span>
              </div>
              <span className="text-on-surface-variant font-body-sm">Mr. Saman Kumara</span>
            </div>
            <div className="mt-auto space-y-sm">
              <div className="flex justify-between items-end">
                <span className="font-label-md text-on-surface-variant uppercase">Attendance</span>
                <span className="font-bold text-primary">94%</span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[94%] transition-all"></div>
              </div>
              <button className="w-full mt-lg py-sm text-primary font-bold border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-sm group/btn">
                View Details
                <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Course Card 6 (Special/New) */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex flex-col border-dashed hover:-translate-y-1">
            <div className="flex-1 flex flex-col items-center justify-center text-center p-md">
              <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-md">
                <span className="material-symbols-outlined text-secondary text-[32px]">add</span>
              </div>
              <h4 className="font-title-md text-title-md text-on-surface font-bold">Enroll New Course</h4>
              <p className="text-on-surface-variant font-body-sm mt-sm">Expand your knowledge by joining elective courses.</p>
              <button className="mt-lg px-lg py-sm bg-primary text-white rounded-lg font-bold hover:bg-primary-container transition-all active:scale-95">
                Browse Catalog
              </button>
            </div>
          </div>
        </div>

        {/* Performance Chart Placeholder Section */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-xl">
            <div>
              <h3 className="font-title-md text-title-md text-on-surface">Weekly Engagement</h3>
              <p className="text-on-surface-variant font-body-sm">A summary of your attendance across all courses for the past week.</p>
            </div>
            <div className="flex gap-sm">
              <button className="px-md py-sm bg-surface-container-low text-secondary rounded-lg font-label-md hover:bg-surface-container-high transition-all">Weekly</button>
              <button className="px-md py-sm bg-primary text-white rounded-lg font-label-md">Monthly</button>
            </div>
          </div>
          <div className="h-64 w-full flex items-end gap-md md:gap-lg px-md">
            {/* Simple CSS Bar Chart Simulation */}
            <div className="flex-1 flex flex-col items-center group">
              <div className="w-full bg-primary/10 rounded-t-lg h-[60%] relative group-hover:bg-primary/20 transition-all">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-on-primary-container px-sm py-1 rounded text-[10px]">Mon: 85%</div>
              </div>
              <span className="font-label-md text-on-surface-variant mt-sm">Mon</span>
            </div>
            <div className="flex-1 flex flex-col items-center group">
              <div className="w-full bg-primary/10 rounded-t-lg h-[90%] relative group-hover:bg-primary/20 transition-all">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-on-primary-container px-sm py-1 rounded text-[10px]">Tue: 98%</div>
              </div>
              <span className="font-label-md text-on-surface-variant mt-sm">Tue</span>
            </div>
            <div className="flex-1 flex flex-col items-center group">
              <div className="w-full bg-primary rounded-t-lg h-[75%] relative group-hover:brightness-110 transition-all">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-on-primary-container px-sm py-1 rounded text-[10px]">Wed: 92%</div>
              </div>
              <span className="font-label-md text-on-surface-variant mt-sm font-bold text-primary">Wed</span>
            </div>
            <div className="flex-1 flex flex-col items-center group">
              <div className="w-full bg-primary/10 rounded-t-lg h-[82%] relative group-hover:bg-primary/20 transition-all">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-on-primary-container px-sm py-1 rounded text-[10px]">Thu: 88%</div>
              </div>
              <span className="font-label-md text-on-surface-variant mt-sm">Thu</span>
            </div>
            <div className="flex-1 flex flex-col items-center group">
              <div className="w-full bg-primary/10 rounded-t-lg h-[95%] relative group-hover:bg-primary/20 transition-all">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-on-primary-container px-sm py-1 rounded text-[10px]">Fri: 100%</div>
              </div>
              <span className="font-label-md text-on-surface-variant mt-sm">Fri</span>
            </div>
            <div className="flex-1 flex flex-col items-center group">
              <div className="w-full bg-surface-container-high rounded-t-lg h-[10%] relative opacity-50"></div>
              <span className="font-label-md text-on-surface-variant mt-sm">Sat</span>
            </div>
            <div className="flex-1 flex flex-col items-center group">
              <div className="w-full bg-surface-container-high rounded-t-lg h-[10%] relative opacity-50"></div>
              <span className="font-label-md text-on-surface-variant mt-sm">Sun</span>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Component */}
      <footer className="mt-xl w-full py-xl flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto border-t border-outline-variant">
        <div className="flex flex-col items-center md:items-start gap-xs mb-md md:mb-0">
          <span className="font-title-md text-title-md font-bold text-primary">SAMS Portal</span>
          <p className="font-body-sm text-body-sm text-on-surface-variant">© 2024 Faculty of Computing, University of Sri Jayewardenepura</p>
        </div>
        <div className="flex gap-lg">
          <a className="text-on-surface-variant hover:text-primary transition-opacity duration-200 font-body-sm text-body-sm" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant hover:text-primary transition-opacity duration-200 font-body-sm text-body-sm" href="#">Terms of Service</a>
          <a className="text-on-surface-variant hover:text-primary transition-opacity duration-200 font-body-sm text-body-sm" href="#">Support</a>
        </div>
      </footer>
    </div>
  );
}
