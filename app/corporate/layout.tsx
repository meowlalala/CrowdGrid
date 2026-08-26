"use client";

import { useEffect } from "react";

export default function CorporateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        // Load Tailwind CDN and Fonts for the prototype
        const script = document.createElement("script");
        script.src = "https://cdn.tailwindcss.com?plugins=forms,container-queries";
        document.head.appendChild(script);

        const inter = document.createElement("link");
        inter.rel = "stylesheet";
        inter.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
        document.head.appendChild(inter);

        const material = document.createElement("link");
        material.rel = "stylesheet";
        material.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap";
        document.head.appendChild(material);

        return () => {
            document.head.removeChild(script);
            document.head.removeChild(inter);
            document.head.removeChild(material);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Inter',sans-serif]">
            {/* GLOBAL TOP NAVIGATION */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 flex justify-between items-center w-full px-4 md:px-16 py-4 shadow-sm">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <span className="material-symbols-outlined text-blue-700 transition-transform group-hover:scale-110" aria-hidden="true">
                        grid_view
                    </span>
                    <span className="text-2xl font-bold text-blue-700 tracking-tight">
                        CROWDGRID
                    </span>
                    <span className="text-slate-300 font-light mx-2">|</span>
                    <span className="text-slate-600 font-medium">Corporate</span>
                </div>

                {/* Desktop Module Tabs */}
                <nav className="hidden md:flex items-center gap-2 lg:gap-4">
                    <a href="/pilgrim" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors font-medium">Pilgrim</a>
                    <a href="/gathering" className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors font-medium">Gathering</a>
                    <a href="/corporate" className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold shadow-sm ring-1 ring-blue-700/10 cursor-default">Corporate</a>
                </nav>

                <button className="text-blue-700 font-medium px-5 py-2.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-all">
                    Sign Out
                </button>
            </header>

            {/* DYNAMIC PAGE CONTENT INJECTED HERE */}
            <main className="flex-1 overflow-y-auto px-4 md:px-16 py-10 pb-32">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>

            {/* GLOBAL MOBILE NAVIGATION */}
            <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white/90 backdrop-blur-lg border-t border-slate-200 flex justify-around items-center py-3 px-4 pb-safe shadow-lg">
                <a href="/pilgrim" className="flex flex-col items-center text-slate-500 w-1/3"><span className="material-symbols-outlined mb-1 text-sm">church</span><span className="text-[10px] font-medium uppercase">Pilgrim</span></a>
                <a href="/gathering" className="flex flex-col items-center text-slate-500 w-1/3"><span className="material-symbols-outlined mb-1 text-sm">groups</span><span className="text-[10px] font-medium uppercase">Gathering</span></a>
                <a href="/corporate" className="flex flex-col items-center text-blue-700 w-1/3"><span className="material-symbols-outlined mb-1 bg-blue-100 p-1 rounded-lg text-sm">business_center</span><span className="text-[10px] font-bold uppercase">Corporate</span></a>
            </nav>
        </div>
    );
}