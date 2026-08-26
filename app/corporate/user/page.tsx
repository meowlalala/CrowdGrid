"use client";

import { useState } from "react";

export default function UserDashboard() {
    const [companyUnlocked, setCompanyUnlocked] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8 border-l-4 border-blue-600 pl-4">
                <h1 className="text-3xl font-bold mb-1">My Corporate Events</h1>
                <p className="text-slate-600">Access your company's exclusive schedule.</p>
            </div>

            {!companyUnlocked ? (
                // STEP 1: Company Code Verification
                <div className="max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-xl mx-auto mt-12">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                        <span className="material-symbols-outlined">corporate_fare</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Company Access Code</h2>
                    <p className="text-sm text-slate-500 mb-6">Enter the master code provided by your employer.</p>
                    <input type="text" placeholder="e.g. ACME-2026-X" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-600 outline-none" />
                    <button onClick={() => setCompanyUnlocked(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all">
                        Unlock Workspace
                    </button>
                </div>
            ) : (
                // STEP 2: Event Listing & Passwords
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Upcoming</span>
                                <span className="material-symbols-outlined text-slate-400">lock</span>
                            </div>
                            <h3 className="text-lg font-bold mb-1">Tech Symposium {item}</h3>
                            <p className="text-sm text-slate-500 mb-6">Main Auditorium</p>

                            {selectedEvent === item ? (
                                <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                    <input type="password" placeholder="Event Password" className="w-full text-sm border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500" />
                                    <button className="w-full bg-slate-900 text-white text-sm font-semibold py-2 rounded-lg hover:bg-slate-800 transition-colors">Verify & Enter</button>
                                </div>
                            ) : (
                                <button onClick={() => setSelectedEvent(item)} className="w-full border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold py-2 rounded-xl transition-all flex items-center justify-center gap-2">
                                    Unlock Event
                                    <span className="material-symbols-outlined text-sm">key</span>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}