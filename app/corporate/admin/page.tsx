"use client";

export default function AdminDashboard() {
    const adminStats = [
        { label: "Total Companies", value: "142", icon: "domain" },
        { label: "Active Events", value: "847", icon: "event" },
        { label: "Total Users", value: "24.5k", icon: "group" },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8 border-l-4 border-purple-600 pl-4">
                <h1 className="text-3xl font-bold mb-1">Master Administration</h1>
                <p className="text-slate-600">Global oversight of all companies, hosts, and events.</p>
            </div>

            {/* Admin Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {adminStats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                            <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">{stat.label}</p>
                            <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Admin Global Controls */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-500">warning</span>
                    System Alerts & Overrides
                </h2>

                <div className="p-5 bg-red-50 border border-red-100 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h4 className="font-bold text-red-800 text-lg">Flagged Event: "Crypto Summit" (Company XYZ)</h4>
                        <p className="text-sm text-red-600 mt-1">Reported 3 times for violating platform terms of service.</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors">
                            Force Cancel
                        </button>
                        <button className="flex-1 md:flex-none px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl transition-colors">
                            Investigate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}