export default function AdminDashboardPage() {
  return (
    <>
      <header className="mb-xl flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-background">Admin Dashboard &amp; Analytics</h2>
          <p className="text-body-md font-body-md text-on-surface-variant">Real-time attendance insights and system health metrics.</p>
        </div>
        <div className="flex gap-md">
          <button className="px-lg py-sm bg-surface-container-low border border-outline-variant rounded-lg text-on-surface flex items-center gap-sm font-label-md hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-[18px]">download</span>
            CSV
          </button>
          <button className="px-lg py-sm bg-surface-container-low border border-outline-variant rounded-lg text-on-surface flex items-center gap-sm font-label-md hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            PDF
          </button>
          <button className="p-sm text-on-surface-variant hover:bg-surface-container rounded-full transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Bento Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-md">
            <div className="p-sm bg-primary-container/10 text-primary rounded-lg">
              <span className="material-symbols-outlined">group</span>
            </div>
            <span className="text-label-md text-emerald-700 bg-emerald-100 px-sm py-xs rounded-full font-bold flex items-center gap-xs">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +4.2%
            </span>
          </div>
          <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Total Students</h3>
          <p className="font-display-lg text-display-lg text-on-surface">2,480</p>
        </div>
        
        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-md">
            <div className="p-sm bg-emerald-100 text-emerald-700 rounded-lg">
              <span className="material-symbols-outlined">school</span>
            </div>
            <span className="text-label-md text-on-surface-variant bg-surface-container px-sm py-xs rounded-full font-bold flex items-center gap-xs">
              <span className="material-symbols-outlined text-[14px]">horizontal_rule</span> Static
            </span>
          </div>
          <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Total Faculty</h3>
          <p className="font-display-lg text-display-lg text-on-surface">156</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-md">
            <div className="p-sm bg-tertiary-container/10 text-tertiary rounded-lg">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <span className="text-label-md text-error bg-error-container/30 px-sm py-xs rounded-full font-bold flex items-center gap-xs">
              <span className="material-symbols-outlined text-[14px]">trending_down</span> -1.5%
            </span>
          </div>
          <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Avg. Attendance</h3>
          <p className="font-display-lg text-display-lg text-on-surface">84.2%</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-md">
            <div className="p-sm bg-primary-container/10 text-primary rounded-lg">
              <span className="material-symbols-outlined">sensors</span>
            </div>
            <span className="text-label-md text-emerald-700 bg-emerald-100 px-sm py-xs rounded-full font-bold flex items-center gap-xs">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse"></span> Live
            </span>
          </div>
          <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Active Sessions</h3>
          <p className="font-display-lg text-display-lg text-on-surface">12</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-xl">
        {/* Chart Section */}
        <div className="bg-surface-container-lowest border border-outline-variant p-xl rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-xl">
            <div>
              <h3 className="font-title-md text-title-md text-on-surface mb-xs">Monthly Attendance Trends</h3>
              <p className="text-body-sm text-on-surface-variant">Aggregate faculty-wide attendance data from Jan to Jun 2024</p>
            </div>
            <select className="bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Current Semester</option>
              <option>Previous Semester</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between relative">
            <div className="absolute inset-0 flex flex-col justify-between">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-b border-outline-variant/30 w-full h-0"></div>
              ))}
            </div>
            
            {/* SVG Line Chart Graphic */}
            <div className="absolute inset-0 pt-4 pb-8 z-10 w-full h-full flex items-end">
               <svg viewBox="0 0 800 200" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                 <defs>
                   <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2"/>
                     <stop offset="100%" stopColor="var(--primary)" stopOpacity="0"/>
                   </linearGradient>
                 </defs>
                 <path d="M0,150 L150,130 L300,140 L450,100 L600,110 L750,80 L800,90 L800,200 L0,200 Z" fill="url(#chartGradient)"/>
                 <polyline points="0,150 150,130 300,140 450,100 600,110 750,80 800,90" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinejoin="round"/>
                 
                 <circle cx="0" cy="150" r="4" fill="var(--primary)" />
                 <circle cx="150" cy="130" r="4" fill="var(--primary)" />
                 <circle cx="300" cy="140" r="4" fill="var(--primary)" />
                 <circle cx="450" cy="100" r="4" fill="var(--primary)" />
                 <circle cx="600" cy="110" r="4" fill="var(--primary)" />
                 <circle cx="750" cy="80" r="4" fill="var(--primary)" />
                 <circle cx="800" cy="90" r="4" fill="var(--primary)" />
               </svg>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full flex justify-between text-label-md text-on-surface-variant px-2 z-20">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-surface-container-lowest border border-outline-variant p-xl rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-lg">
            <h3 className="font-title-md text-title-md text-on-surface">System Notifications</h3>
            <a href="#" className="text-primary text-body-sm font-medium hover:underline">View All</a>
          </div>
          
          <div className="space-y-md">
            <div className="flex gap-md p-md border border-outline-variant rounded-xl items-center hover:bg-surface-container-low transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary-container/20 text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">person_add</span>
              </div>
              <div className="flex-1">
                <h4 className="font-title-md text-body-md text-on-surface font-semibold">New faculty registration pending</h4>
                <p className="text-body-sm text-on-surface-variant">Dr. Sarah Jenkins submitted a request for the CS Department.</p>
              </div>
              <span className="text-label-md text-on-surface-variant flex-shrink-0">2m ago</span>
            </div>

            <div className="flex gap-md p-md border border-outline-variant rounded-xl items-center hover:bg-surface-container-low transition-colors">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">cloud_done</span>
              </div>
              <div className="flex-1">
                <h4 className="font-title-md text-body-md text-on-surface font-semibold">Server backup completed</h4>
                <p className="text-body-sm text-on-surface-variant">Weekly database snapshot successfully stored in cloud storage.</p>
              </div>
              <span className="text-label-md text-on-surface-variant flex-shrink-0">45m ago</span>
            </div>

            <div className="flex gap-md p-md border border-error/30 bg-error-container/10 rounded-xl items-center hover:bg-error-container/20 transition-colors">
              <div className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <div className="flex-1">
                <h4 className="font-title-md text-body-md text-error font-semibold">Low attendance alert for CS3022</h4>
                <p className="text-body-sm text-on-surface-variant">Attendance dropped below 60% for the morning lecture session.</p>
              </div>
              <span className="text-label-md text-on-surface-variant flex-shrink-0">2h ago</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
