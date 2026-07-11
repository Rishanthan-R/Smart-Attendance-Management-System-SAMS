export default function LiveAttendancePage() {
  return (
    <>
      <header className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-background">Live Attendance Stream</h2>
      </header>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl shadow-sm mb-xl">
        <div className="flex flex-col md:flex-row md:items-center gap-md mb-xl">
          <div className="flex items-center gap-md flex-1">
            <span className="bg-emerald-100 text-emerald-700 px-sm py-xs rounded-full font-bold text-label-md flex items-center gap-xs">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> LIVE
            </span>
            <span className="text-body-sm text-on-surface-variant">Started at 08:30 AM</span>
            <button className="bg-error text-white px-md py-sm rounded-lg font-title-md text-title-md hover:bg-red-700 transition-colors ml-4">
              Close Session
            </button>
          </div>
        </div>

        <div className="mb-xl">
          <h1 className="font-display-lg text-[40px] text-primary font-bold leading-tight mb-2">SENG 31223 - Information Systems Security</h1>
          <p className="text-body-md text-on-surface-variant">Lecture Hall 04 • Week 12 Session</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          <div className="bg-surface-container-low rounded-xl p-xl flex flex-col items-center justify-center border border-outline-variant/30">
            <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-widest mb-sm">Present</span>
            <span className="font-display-lg text-[64px] font-bold text-primary leading-none">42</span>
          </div>
          
          <div className="bg-surface-container-low rounded-xl p-xl flex flex-col items-center justify-center border border-outline-variant/30">
            <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-widest mb-sm">Rejected</span>
            <span className="font-display-lg text-[64px] font-bold text-error leading-none">2</span>
          </div>
          
          <div className="bg-surface-container-low rounded-xl p-xl flex flex-col items-center justify-center border border-outline-variant/30">
            <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-widest mb-sm">Total Expected</span>
            <span className="font-display-lg text-[64px] font-bold text-on-surface leading-none">120</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
        <div className="p-lg border-b border-outline-variant">
          <h3 className="font-title-md text-title-md text-on-surface">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/50">
              <tr>
                <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant uppercase tracking-wider border-b border-r border-outline-variant w-1/2">Student Name</th>
                <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant uppercase tracking-wider border-b border-r border-outline-variant text-center w-1/4">Student ID</th>
                <th className="px-lg py-md text-label-md font-label-md text-on-surface-variant uppercase tracking-wider border-b border-outline-variant text-right w-1/4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {[
                { name: 'Janith Dilshan', initials: 'JD', id: 'SE/2019/042', status: 'Success' },
                { name: 'Sanduni Wijesinghe', initials: 'SW', id: 'SE/2019/012', status: 'Success' },
                { name: 'Kasun Perera', initials: 'KP', id: 'SE/2019/085', status: 'Success' },
                { name: 'Nethmi Madushani', initials: 'NM', id: 'SE/2019/033', status: 'Success' },
                { name: 'Asanka Mendis', initials: 'AM', id: 'SE/2019/102', status: 'Success' },
                { name: 'Dinali Rathnayake', initials: 'DR', id: 'SE/2019/056', status: 'Success' }
              ].map((student, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-lg py-md border-r border-outline-variant/50">
                    <div className="flex items-center gap-md">
                      <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-sm">
                        {student.initials}
                      </div>
                      <span className="font-body-md text-on-surface font-medium">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-lg py-md border-r border-outline-variant/50 text-center">
                    <span className="text-body-md text-on-surface-variant">{student.id}</span>
                  </td>
                  <td className="px-lg py-md text-right">
                    <span className="inline-block bg-emerald-50 text-emerald-600 px-md py-1 rounded-full text-label-md font-bold">
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
