"use client";

export default function CorporateIndex() {
  return (
    <div className="max-w-3xl mx-auto text-center mt-12 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-slate-900">
        Welcome to the Corporate Gateway
      </h1>
      <p className="text-lg text-slate-600 mb-10">
        Select your role below to preview the interface routing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/corporate/user" className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-300 transition-all group">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">person</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Employee / User</h2>
          <p className="text-sm text-slate-500">Access company events using secure codes.</p>
        </a>

        <a href="/corporate/eventhost" className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all group">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">campaign</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Event Host</h2>
          <p className="text-sm text-slate-500">Manage and oversee company-specific events.</p>
        </a>

        <a href="/corporate/admin" className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-purple-300 transition-all group">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">admin_panel_settings</span>
          </div>
          <h2 className="text-xl font-bold mb-2">System Admin</h2>
          <p className="text-sm text-slate-500">Global oversight of all companies and events.</p>
        </a>
      </div>
    </div>
  );
}