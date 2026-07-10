export default function LecturerDashboardPage() {
  return (
    <>
      <header className="mb-xl flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-background">Welcome Back, Dr. Jayawardena</h2>
          <p className="text-body-md font-body-md text-on-surface-variant">Manage your academic sessions and track student participation.</p>
        </div>
        <button className="bg-primary text-on-primary px-lg py-md rounded-xl font-title-md text-title-md shadow-sm hover:bg-primary-container active:scale-95 transition-all flex items-center gap-sm">
          <span className="material-symbols-outlined">add</span>
          Start New Session
        </button>
      </header>

      {/* Bento Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-md">
            <div className="p-sm bg-primary-container/10 text-primary rounded-lg">
              <span className="material-symbols-outlined">timer</span>
            </div>
            <span className="text-label-md text-primary bg-primary-container/20 px-sm py-xs rounded-full font-bold uppercase">
              Live
            </span>
          </div>
          <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Active Sessions</h3>
          <div className="flex items-baseline gap-sm">
            <p className="font-display-lg text-[64px] font-bold text-on-surface leading-none mt-2">02</p>
            <span className="text-body-sm text-secondary">Sessions ongoing</span>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-md">
            <div className="p-sm bg-primary-container/10 text-primary rounded-lg">
              <span className="material-symbols-outlined">groups</span>
            </div>
            <span className="text-label-md text-emerald-700 bg-emerald-100 px-sm py-xs rounded-full font-bold flex items-center gap-xs">
              +4.2%
            </span>
          </div>
          <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Avg. Attendance</h3>
          <div className="flex items-baseline gap-sm">
            <p className="font-display-lg text-[64px] font-bold text-on-surface leading-none mt-2">88%</p>
            <span className="text-body-sm text-secondary">Per subject avg</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-md">
            <div className="p-sm bg-primary-container/10 text-primary rounded-lg">
              <span className="material-symbols-outlined">person</span>
            </div>
          </div>
          <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Total Students</h3>
          <div className="flex items-baseline gap-sm">
            <p className="font-display-lg text-[64px] font-bold text-on-surface leading-none mt-2">420</p>
            <span className="text-body-sm text-secondary">Across 4 courses</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Attendance Analytics Bar Chart */}
        <div className="col-span-1 lg:col-span-2 bg-surface-container-lowest border border-outline-variant p-xl rounded-xl shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-xl">
            <h3 className="font-title-md text-title-md text-on-surface">Attendance Analytics</h3>
            <div className="flex bg-surface-container-low rounded-lg p-xs">
              <button className="px-md py-sm text-body-sm text-on-surface-variant hover:text-on-surface rounded-md">Weekly</button>
              <button className="px-md py-sm text-body-sm bg-primary text-on-primary rounded-md font-medium shadow-sm">Monthly</button>
            </div>
          </div>
          
          <div className="flex-1 flex items-end justify-around pb-6 pt-4 border-b border-outline-variant/30 relative mt-xl">
            {/* Target line */}
            <div className="absolute top-1/4 w-full border-t-2 border-dashed border-outline-variant/50"></div>
            
            {/* Bar 1 */}
            <div className="flex flex-col items-center gap-2 w-16 relative z-10 h-full justify-end">
              <div className="w-full bg-primary/20 rounded-t-lg absolute bottom-0 h-full"></div>
              <div className="w-full bg-primary rounded-t-lg absolute bottom-0 h-[70%]"></div>
              <span className="text-label-md text-on-surface-variant absolute -bottom-6">CS101</span>
            </div>
            {/* Bar 2 */}
            <div className="flex flex-col items-center gap-2 w-16 relative z-10 h-full justify-end">
              <div className="w-full bg-primary/20 rounded-t-lg absolute bottom-0 h-[95%]"></div>
              <div className="w-full bg-primary rounded-t-lg absolute bottom-0 h-[85%]"></div>
              <span className="text-label-md text-on-surface-variant absolute -bottom-6">SE202</span>
            </div>
            {/* Bar 3 */}
            <div className="flex flex-col items-center gap-2 w-16 relative z-10 h-full justify-end">
              <div className="w-full bg-primary/20 rounded-t-lg absolute bottom-0 h-[95%]"></div>
              <div className="w-full bg-primary rounded-t-lg absolute bottom-0 h-[60%]"></div>
              <span className="text-label-md text-on-surface-variant absolute -bottom-6">CS305</span>
            </div>
            {/* Bar 4 */}
            <div className="flex flex-col items-center gap-2 w-16 relative z-10 h-full justify-end">
              <div className="w-full bg-primary/20 rounded-t-lg absolute bottom-0 h-[95%]"></div>
              <div className="w-full bg-primary rounded-t-lg absolute bottom-0 h-[80%]"></div>
              <span className="text-label-md text-on-surface-variant absolute -bottom-6">IT101</span>
            </div>
            {/* Bar 5 */}
            <div className="flex flex-col items-center gap-2 w-16 relative z-10 h-full justify-end">
              <div className="w-full bg-primary/20 rounded-t-lg absolute bottom-0 h-[95%]"></div>
              <div className="w-full bg-primary rounded-t-lg absolute bottom-0 h-[45%]"></div>
              <span className="text-label-md text-on-surface-variant absolute -bottom-6">DS404</span>
            </div>
          </div>
          
          <div className="flex gap-lg mt-xl text-label-md text-on-surface-variant pt-2">
            <div className="flex items-center gap-xs">
              <span className="w-3 h-3 rounded-full bg-primary"></span>
              Current Avg Attendance
            </div>
            <div className="flex items-center gap-xs">
              <span className="w-3 h-3 rounded-full bg-primary/30"></span>
              Target (80%)
            </div>
          </div>
        </div>

        {/* Recent Sessions List */}
        <div className="col-span-1 bg-surface-container-lowest border border-outline-variant p-xl rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-lg">
            <h3 className="font-title-md text-title-md text-on-surface">Recent Sessions</h3>
            <a href="#" className="text-primary text-body-sm font-medium hover:underline">View All</a>
          </div>

          <div className="space-y-md">
            <div className="border border-outline-variant rounded-xl p-md hover:bg-surface-container-low transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-sm">
                <h4 className="font-title-md text-body-md text-on-surface font-semibold">Database Systems</h4>
                <span className="bg-emerald-100 text-emerald-800 text-label-md px-2 py-0.5 rounded-full font-bold">88/95</span>
              </div>
              <div className="text-body-sm text-on-surface-variant mb-md">
                Today • 08:30 AM - 10:30 AM
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant"></div>
            </div>

            <div className="border border-outline-variant rounded-xl p-md hover:bg-surface-container-low transition-colors cursor-pointer opacity-70">
              <div className="flex justify-between items-start mb-sm">
                <h4 className="font-title-md text-body-md text-on-surface font-semibold">Data Structures</h4>
                <span className="bg-surface-container-high text-on-surface-variant text-label-md px-2 py-0.5 rounded-full font-bold">110/120</span>
              </div>
              <div className="text-body-sm text-on-surface-variant mb-md">
                Yesterday • 01:00 PM - 03:00 PM
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant"></div>
                <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
