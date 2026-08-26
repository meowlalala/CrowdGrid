"use client";

import Link from "next/link";
import { Church, Users, Briefcase, ArrowRight, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex-grow px-4 md:px-16 py-12 max-w-7xl mx-auto w-full flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-gray-900">
          Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Journey</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose a pathway to access tailored services, event management, and secure bookings on the CrowdGrid platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
        {/* PILGRIM */}
        <Link
          href="/pilgrim"
          className="group bg-white/70 backdrop-blur-md rounded-2xl p-8 flex flex-col items-start text-left transition-all hover:shadow-xl hover:-translate-y-2 relative overflow-hidden border border-gray-200"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-sky-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-16 h-16 rounded-xl bg-sky-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
            <Church className="text-sky-500" size={32} />
          </div>
          <h2 className="relative text-2xl font-bold mb-3 text-gray-900 group-hover:text-sky-600 transition-colors">
            Pilgrim
          </h2>
          <p className="relative text-base text-gray-600 mb-8 flex-grow">
            Access specialized routes, accommodations, and secure travel arrangements for religious journeys.
          </p>
          <div className="relative flex items-center text-sky-600 font-semibold mt-auto">
            <span>Enter Pathway</span>
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
          </div>
        </Link>

        {/* PUBLIC GATHERING */}
        <Link
          href="/gathering"
          className="group bg-white/70 backdrop-blur-md rounded-2xl p-8 flex flex-col items-start text-left transition-all hover:shadow-xl hover:-translate-y-2 relative overflow-hidden border border-gray-200"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
            <Users className="text-orange-500" size={32} />
          </div>
          <h2 className="relative text-2xl font-bold mb-3 text-gray-900 group-hover:text-orange-600 transition-colors">
            Public Gathering
          </h2>
          <p className="relative text-base text-gray-600 mb-8 flex-grow">
            Manage large-scale events, coordinate logistics, and ensure crowd safety protocols with ease.
          </p>
          <div className="relative flex items-center text-orange-600 font-semibold mt-auto">
            <span>Enter Pathway</span>
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
          </div>
        </Link>

        {/* CORPORATE */}
        <Link
          href="/corporate"
          className="group bg-white/70 backdrop-blur-md rounded-2xl p-8 flex flex-col items-start text-left transition-all hover:shadow-xl hover:-translate-y-2 relative overflow-hidden border border-gray-200"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
            <Briefcase className="text-blue-600" size={32} />
          </div>
          <h2 className="relative text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-700 transition-colors">
            Corporate
          </h2>
          <p className="relative text-base text-gray-600 mb-8 flex-grow">
            Streamline business travel, manage corporate bookings, and access powerful administrative tools.
          </p>
          <div className="relative flex items-center text-blue-700 font-semibold mt-auto">
            <span>Enter Pathway</span>
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
          </div>
        </Link>
      </div>

      {/* VERIFICATION PORTAL */}
      <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-8 md:p-10 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-4xl shadow-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
          <div className="bg-white p-3 rounded-full shadow-sm text-blue-600">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Verification Portal</h3>
            <p className="text-base text-gray-600 max-w-md">
              Already have a booking? Verify your status, view e-tickets, or manage existing reservations securely.
            </p>
          </div>
        </div>
        <button className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transition-all rounded-xl px-8 py-3.5 font-semibold whitespace-nowrap flex items-center gap-2">
          Verify Booking
          <ArrowRight size={18} />
        </button>
      </div>
    </main>
  );
}