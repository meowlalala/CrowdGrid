"use client";

import { useEffect } from "react";

export default function PilgrimPage() {
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
      className="min-h-screen pb-24"
      style={{
        backgroundColor: "#f9f9ff",
        color: "#001b3d",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ==================== TOP NAVIGATION ==================== */}

      <header className="bg-white border-b border-gray-300 flex justify-between items-center w-full px-4 md:px-16 py-4 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-700">
            grid_view
          </span>

          <span className="text-2xl font-bold text-blue-700 tracking-tight">
            CROWDGRID
          </span>
        </div>

        <button className="text-blue-700 font-semibold hover:bg-blue-50 transition-colors px-4 py-2 rounded-lg">
          IRCTC Login
        </button>
      </header>

      {/* ==================== MAIN ==================== */}

      <main className="w-full max-w-7xl mx-auto px-4 md:px-16 mt-8 space-y-12">

        {/* ==================== FEATURED EVENT ==================== */}

        <section>
          <div
            className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200 flex items-end p-6 md:p-8 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKnBKwYRmjXEC93ptZVLhAxSTIS-IIK5K38Im3W32GPMpxuBnfDynOH3XeiSYa-XmNPylFJ22c4uu-MFTQp5-B6KuXTmca_RM3-neC8SbAc-6lcUOvOvwuDvA4Ftbn6gQsi-fZrNeNH-vEdFJ5CzHg45r2HXMRWLIqNnhvtLx6T7pdUOoJw1wrn4HXXdCE2lKZAafAsFlWo3LUQdlxWGZ78CBxgJp3QFZ978PcIPL_OnN88lIZe41w')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="relative z-10 text-white w-full max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-sky-500/20 backdrop-blur-md text-white text-xs font-semibold mb-2 border border-sky-400/30">
                FEATURED EVENT
              </span>

              <h1 className="text-3xl md:text-5xl font-bold mb-2">
                Maha Kumbh Mela 2025
              </h1>

              <p className="text-lg text-white/90 mb-6">
                Experience the largest peaceful gathering in the world. Join
                millions in a profound spiritual journey.
              </p>

              <button className="bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors shadow-md">
                Explore Packages
              </button>
            </div>
          </div>
        </section>

        {/* ==================== PLAN YOUR PILGRIMAGE ==================== */}

        <section className="bg-blue-50 rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/5 rounded-full blur-3xl -mr-32 -mt-32" />

          <h2 className="text-2xl font-semibold mb-6 relative z-10 flex items-center gap-2">
            <span
              className="material-symbols-outlined text-sky-500"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              explore
            </span>

            Plan Your Pilgrimage
          </h2>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* DESTINATION */}

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                DESTINATION
              </label>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  location_on
                </span>

                <input
                  type="text"
                  placeholder="e.g. Varanasi, Ayodhya"
                  className="w-full bg-white border border-gray-300 rounded-lg pl-12 pr-3 py-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* DATES */}

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                DATES
              </label>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  calendar_month
                </span>

                <input
                  type="text"
                  placeholder="Select Dates"
                  className="w-full bg-white border border-gray-300 rounded-lg pl-12 pr-3 py-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* PILGRIMS */}

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                PILGRIMS
              </label>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  group
                </span>

                <select className="w-full bg-white border border-gray-300 rounded-lg pl-12 pr-10 py-3 appearance-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                  <option>1 Pilgrim</option>
                  <option>2 Pilgrims</option>
                  <option>Family (3-5)</option>
                  <option>Group (6+)</option>
                </select>

                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  arrow_drop_down
                </span>
              </div>
            </div>

            {/* SEARCH */}

            <div className="flex items-end">
              <button
                type="button"
                className="w-full bg-sky-500 text-white rounded-lg py-3 px-6 font-semibold hover:bg-sky-600 transition-colors h-[48px] shadow-sm flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined">
                  search
                </span>

                Search Needs
              </button>
            </div>
          </div>
        </section>

        {/* ==================== MANAGEMENT OPTIONS ==================== */}

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              Management Options
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* STANDARD */}

            <div className="bg-white rounded-xl border border-gray-300 p-6 flex flex-col hover:shadow-md transition-all">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-semibold">
                  Standard
                </h3>

                <span className="material-symbols-outlined text-gray-400 text-4xl">
                  confirmation_number
                </span>
              </div>

              <p className="text-gray-600 mb-6 flex-grow">
                Self-guided journey with essential grid access and basic
                amenities.
              </p>

              <ul className="space-y-3 mb-8 border-t border-gray-200 pt-6">

                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-blue-700 text-lg">
                    check_circle
                  </span>

                  Standard Entry Pass
                </li>

                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-blue-700 text-lg">
                    check_circle
                  </span>

                  General Assembly Access
                </li>

                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-gray-400 text-lg">
                    remove
                  </span>

                  No Express Ticketing
                </li>
              </ul>

              <button className="w-full border-2 border-gray-300 text-gray-800 font-semibold rounded-lg py-3 hover:bg-gray-100 transition-colors">
                Select Standard
              </button>
            </div>

            {/* EXPRESS */}

            <div className="bg-blue-50 rounded-xl border border-sky-500 p-6 flex flex-col relative shadow-md overflow-hidden hover:-translate-y-1 transition-all">

              <div className="absolute top-0 left-0 w-full h-1 bg-sky-500" />

              <div className="absolute top-4 right-4 bg-sky-100 text-sky-600 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>

                RECOMMENDED
              </div>

              <div className="mb-4 flex items-center justify-between mt-4">
                <h3 className="text-2xl font-semibold text-sky-500">
                  Express
                </h3>

                <span className="material-symbols-outlined text-sky-500 text-4xl">
                  flash_on
                </span>
              </div>

              <p className="text-gray-600 mb-6 flex-grow">
                Priority access with dedicated guidance and premium amenities.
              </p>

              <ul className="space-y-3 mb-8 border-t border-sky-200 pt-6">

                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span
                    className="material-symbols-outlined text-sky-500 text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>

                  Priority Express Pass
                </li>

                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span
                    className="material-symbols-outlined text-sky-500 text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>

                  Dedicated Viewing Areas
                </li>

                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span
                    className="material-symbols-outlined text-sky-500 text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>

                  Guided Assistance Available
                </li>
              </ul>

              <button className="w-full bg-sky-500 text-white font-semibold rounded-lg py-3 hover:bg-sky-600 transition-colors shadow-sm">
                Select Express
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ==================== MOBILE BOTTOM NAVIGATION ==================== */}

      <nav className="bg-white fixed bottom-0 w-full z-50 border-t border-gray-300 backdrop-blur-md shadow-lg flex justify-around items-center py-3 px-4 md:hidden">

        <a
          href="/pilgrim"
          className="flex flex-col items-center justify-center text-blue-700 font-bold"
        >
          <span
            className="material-symbols-outlined mb-1"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            church
          </span>

          <span className="text-xs">
            Pilgrim
          </span>
        </a>

        <a
          href="/gathering"
          className="flex flex-col items-center justify-center text-gray-500"
        >
          <span className="material-symbols-outlined mb-1">
            groups
          </span>

          <span className="text-xs">
            Gathering
          </span>
        </a>

        <a
          href="/corporate"
          className="flex flex-col items-center justify-center text-gray-500"
        >
          <span className="material-symbols-outlined mb-1">
            business_center
          </span>

          <span className="text-xs">
            Corporate
          </span>
        </a>
      </nav>
    </div>
  );
}