"use client";

import { useEffect } from "react";

export default function PathwayPage() {
  useEffect(() => {
    const inter = document.createElement("link");
    inter.rel = "stylesheet";
    inter.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";

    const material = document.createElement("link");
    material.rel = "stylesheet";
    material.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap";

    document.head.appendChild(inter);
    document.head.appendChild(material);

    return () => {
      document.head.removeChild(inter);
      document.head.removeChild(material);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col pb-24 md:pb-0"
      style={{
        backgroundColor: "#f9f9ff",
        color: "#001b3d",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ==================== TOP NAVIGATION ==================== */}

      <header className="bg-white border-b border-gray-300 flex justify-between items-center w-full px-4 md:px-16 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-700">
            grid_view
          </span>

          <span className="text-2xl font-bold text-blue-700 tracking-tight">
            CROWDGRID
          </span>
        </div>

        <div>
          <button className="text-blue-700 font-semibold hover:bg-blue-50 transition-colors px-4 py-2 rounded-lg flex items-center gap-2">
            IRCTC Login
            <span className="material-symbols-outlined text-lg">
              login
            </span>
          </button>
        </div>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}

      <main className="flex-grow px-4 md:px-16 py-8 max-w-7xl mx-auto w-full">

        {/* PAGE HEADER */}

        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">
            Select Your Journey
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose a pathway to access tailored services, event management,
            and secure bookings.
          </p>
        </div>

        {/* ==================== PATHWAY CARDS ==================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {/* PILGRIM */}

          <a
            href="/pilgrim"
            className="group bg-white/70 backdrop-blur-md rounded-xl p-6 flex flex-col items-start text-left transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden border border-gray-200"
          >
            <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative w-16 h-16 rounded-lg bg-sky-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-sky-500 text-4xl">
                church
              </span>
            </div>

            <h2 className="relative text-2xl font-semibold mb-2 group-hover:text-sky-500 transition-colors">
              Pilgrim
            </h2>

            <p className="relative text-base text-gray-600 mb-6 flex-grow">
              Access specialized routes, accommodations, and secure travel
              arrangements for religious journeys.
            </p>

            <div className="relative flex items-center text-sky-500 font-semibold">
              <span>Enter Pathway</span>

              <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </a>

          {/* PUBLIC GATHERING */}

          <a
            href="/gathering"
            className="group bg-white/70 backdrop-blur-md rounded-xl p-6 flex flex-col items-start text-left transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden border border-gray-200"
          >
            <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative w-16 h-16 rounded-lg bg-orange-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-orange-500 text-4xl">
                groups
              </span>
            </div>

            <h2 className="relative text-2xl font-semibold mb-2 group-hover:text-orange-500 transition-colors">
              Public Gathering
            </h2>

            <p className="relative text-base text-gray-600 mb-6 flex-grow">
              Manage large-scale events, coordinate logistics, and ensure
              crowd safety protocols.
            </p>

            <div className="relative flex items-center text-orange-500 font-semibold">
              <span>Enter Pathway</span>

              <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </a>

          {/* CORPORATE */}

          <a
            href="/corporate"
            className="group bg-white/70 backdrop-blur-md rounded-xl p-6 flex flex-col items-start text-left transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden border border-gray-200"
          >
            <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-blue-600 text-4xl">
                business_center
              </span>
            </div>

            <h2 className="relative text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              Corporate
            </h2>

            <p className="relative text-base text-gray-600 mb-6 flex-grow">
              Streamline business travel, manage corporate bookings, and
              access administrative tools.
            </p>

            <div className="relative flex items-center text-blue-600 font-semibold">
              <span>Enter Pathway</span>

              <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </a>
        </div>

        {/* ==================== VERIFICATION PORTAL ==================== */}

        <div className="bg-blue-50 rounded-xl p-6 md:p-8 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">

          <div>
            <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-700">
                verified_user
              </span>

              Verification Portal
            </h3>

            <p className="text-base text-gray-600">
              Already have a booking? Verify your status or manage existing
              reservations.
            </p>
          </div>

          <button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-lg px-6 py-3 font-semibold whitespace-nowrap flex items-center gap-2">
            Verify Booking

            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </button>
        </div>
      </main>

      {/* ==================== MOBILE BOTTOM NAVIGATION ==================== */}

      <nav className="bg-white fixed bottom-0 w-full z-50 border-t border-gray-300 backdrop-blur-md shadow-lg flex justify-around items-center py-3 px-4 md:hidden">

        <button className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-700">
          <span className="material-symbols-outlined mb-1 text-2xl">
            church
          </span>

          <span className="text-xs">
            Pilgrim
          </span>
        </button>

        <button className="flex flex-col items-center justify-center text-gray-600 hover:text-orange-500">
          <span className="material-symbols-outlined mb-1 text-2xl">
            groups
          </span>

          <span className="text-xs">
            Gathering
          </span>
        </button>

        <button className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-700">
          <span className="material-symbols-outlined mb-1 text-2xl">
            business_center
          </span>

          <span className="text-xs">
            Corporate
          </span>
        </button>
      </nav>
    </div>
  );
}