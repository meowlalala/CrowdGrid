"use client";

export default function HostDashboard() {
    const hostEvents = [
        { id: 1, name: "Q4 Global Townhall", date: "Nov 15, 2026", attendees: 1250 },
        { id: 2, name: "Leadership Offsite", date: "Dec 02, 2026", attendees: 45 },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-l-4 border-emerald-600 pl-4">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Host Dashboard</h1>
                    <p className="text-slate-600">Manage your company's events and delegate access.</p>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95">
                    <span className="material-symbols-outlined">add</span> Create New Event
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 bg-slate-50/50">
                    <h2 className="text-lg font-bold">Active Hosted Events</h2>
                </div>
                <div className="divide-y divide-slate-100">
                    {hostEvents.map((ev) => (
                        <div key={ev.id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-slate-50 transition-colors">
                            <div>
                                <h3 className="font-bold text-lg text-slate-900">{ev.name}</h3>
                                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">calendar_month</span> {ev.date}</span>
                                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">group</span> {ev.attendees} Delegates</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                                <button className="flex-1 md:flex-none px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors">
                                    Manage Settings
                                </button>
                                <button className="flex-1 md:flex-none px-5 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold rounded-xl text-sm flex items-center justify-center gap-1 transition-all">
                                    <span className="material-symbols-outlined text-base">cancel</span> Cancel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}