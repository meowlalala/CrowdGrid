"use client";

import { useEffect, useState } from "react";

export default function GatheringPage() {
  const [policeClearance, setPoliceClearance] = useState(true);
  const [fireSafety, setFireSafety] = useState(false);
  const [sanitation, setSanitation] = useState(false);

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

  const toggleStyle = (checked: boolean) => ({
    backgroundColor: checked ? "#F97316" : "#c4c5d6",
  });

  return (
    <div
      className="min-h-screen pb-20 md:pb-0"
      style={{
        backgroundColor: "#f9f9ff",
        color: "#001b3d",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ==================== DESKTOP TOP NAVIGATION ==================== */}

      <header className="hidden md:flex bg-white border-b border-gray-300 justify-between items-center w-full px-4 md:px-16 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-blue-700"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            grid_view
          </span>

          <span className="text-2xl font-bold text-blue-700 tracking-tight">
            CROWDGRID
          </span>
        </div>

        <nav className="flex gap-8">
          <a
            href="/pilgrim"
            className="text-gray-600 px-2 py-1 rounded hover:bg-blue-50"
          >
            Pilgrim
          </a>

          <a
            href="/gathering"
            className="text-orange-600 font-bold px-2 py-1 rounded hover:bg-orange-50"
          >
            Gathering
          </a>

          <a
            href="/corporate"
            className="text-gray-600 px-2 py-1 rounded hover:bg-blue-50"
          >
            Corporate
          </a>
        </nav>

        <button className="text-blue-700 font-semibold px-4 py-2 rounded-lg border border-blue-700 hover:bg-blue-50">
          IRCTC Login
        </button>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}

      <main className="max-w-[1200px] mx-auto px-4 md:px-16 py-8">

        {/* PAGE HEADER */}

        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-300 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-1 rounded-full mb-2">
              <span className="material-symbols-outlined text-orange-600 text-base">
                groups
              </span>

              <span className="text-orange-600 text-xs font-semibold">
                PUBLIC ASSEMBLY
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-semibold">
              Organize a Public Gathering
            </h1>

            <p className="text-base text-gray-600 mt-1 max-w-[600px]">
              Register your event and secure the necessary clearances to ensure
              a safe and compliant public assembly.
            </p>
          </div>

          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined text-lg">
              send
            </span>

            Submit Request
          </button>
        </div>

        {/* ==================== FORM GRID ==================== */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* ==================== LEFT COLUMN ==================== */}

          <div className="md:col-span-8 flex flex-col gap-6">

            {/* GATHERING DETAILS */}

            <section className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                <span
                  className="material-symbols-outlined text-orange-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  info
                </span>

                Gathering Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* EVENT NAME */}

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">
                    Event Name *
                  </label>

                  <input
                    type="text"
                    placeholder="e.g., Annual City Marathon"
                    className="w-full bg-[#f9f9ff] border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                {/* PURPOSE */}

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">
                    Purpose of Gathering *
                  </label>

                  <select className="w-full bg-[#f9f9ff] border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
                    <option value="">Select gathering type...</option>
                    <option value="protest">
                      Peaceful Protest / Rally
                    </option>
                    <option value="festival">
                      Cultural Festival
                    </option>
                    <option value="sports">
                      Sports Event
                    </option>
                    <option value="religious">
                      Religious Procession
                    </option>
                    <option value="other">
                      Other Public Assembly
                    </option>
                  </select>
                </div>

                {/* ATTENDEES */}

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Expected Attendees *
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      people
                    </span>

                    <input
                      type="number"
                      placeholder="0"
                      className="w-full bg-[#f9f9ff] border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-base focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* DURATION */}

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Duration (Hours) *
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      timer
                    </span>

                    <input
                      type="number"
                      placeholder="4"
                      className="w-full bg-[#f9f9ff] border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-base focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* LOCATION & SCHEDULE */}

            <section className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                <span
                  className="material-symbols-outlined text-orange-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>

                Location &amp; Schedule
              </h2>

              <div className="flex flex-col gap-6">

                {/* DATE + TIME */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Start Date *
                    </label>

                    <input
                      type="date"
                      className="w-full bg-[#f9f9ff] border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Start Time *
                    </label>

                    <input
                      type="time"
                      className="w-full bg-[#f9f9ff] border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* VENUE */}

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Primary Venue / Assembly Point *
                  </label>

                  <div className="flex gap-3 mb-2">
                    <input
                      type="text"
                      placeholder="Search address or drop a pin..."
                      className="flex-1 bg-[#f9f9ff] border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />

                    <button
                      type="button"
                      className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg border border-gray-300 hover:bg-blue-100"
                    >
                      <span className="material-symbols-outlined">
                        my_location
                      </span>
                    </button>
                  </div>

                  {/* MAP */}

                  <div className="w-full h-[200px] rounded-lg overflow-hidden border border-gray-300 relative">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLHquLIftbYWAzwjVatxQB8oRUtyG_ESjYODyo6vxo2-BeDWtbBZ_x8HzCknal16_j7Dl678YUU_K1EZGb7S4PZ3mpXV_a4DJXdcVGaUywUq9Cg7RRyh1ikyWBYoyr77geioMT7ku2TC7VECAPvkjWo2SdUuZ56Med9Pm1mX4QIU2MfHWLIC36PJrToNr1YENgpM_XtHejkZM91geaJoEOMqUb0jqOX0dqov83I7tzJ-W4NJ2eEhnx')",
                      }}
                    />

                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded border border-gray-300 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-emerald-500">
                        check_circle
                      </span>

                      <span className="text-xs font-semibold">
                        Location Set
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ==================== RIGHT COLUMN ==================== */}

          <div className="md:col-span-4 flex flex-col gap-6">

            {/* REQUIRED CLEARANCES */}

            <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
                <span
                  className="material-symbols-outlined text-orange-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>

                Required Clearances
              </h2>

              <p className="text-sm text-gray-600 mb-6">
                Select the permits required for your event type.
              </p>

              <div className="flex flex-col gap-4">

                {/* POLICE */}

                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-[#f9f9ff]">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600">
                      local_police
                    </span>

                    <div>
                      <h3 className="font-semibold">
                        Police Clearance
                      </h3>

                      <p className="text-xs text-gray-600">
                        Required for &gt;50 people
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setPoliceClearance(!policeClearance)
                    }
                    className="relative w-10 h-5 rounded-full transition-colors"
                    style={toggleStyle(policeClearance)}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        policeClearance
                          ? "translate-x-5"
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                {/* FIRE */}

                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-[#f9f9ff]">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-600">
                      local_fire_department
                    </span>

                    <div>
                      <h3 className="font-semibold">
                        Fire Safety NOC
                      </h3>

                      <p className="text-xs text-gray-600">
                        Enclosed/Stage areas
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFireSafety(!fireSafety)}
                    className="relative w-10 h-5 rounded-full transition-colors"
                    style={toggleStyle(fireSafety)}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        fireSafety
                          ? "translate-x-5"
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                {/* SANITATION */}

                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-[#f9f9ff]">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-sky-500">
                      cleaning_services
                    </span>

                    <div>
                      <h3 className="font-semibold">
                        Sanitation Plan
                      </h3>

                      <p className="text-xs text-gray-600">
                        Waste management
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSanitation(!sanitation)
                    }
                    className="relative w-10 h-5 rounded-full transition-colors"
                    style={toggleStyle(sanitation)}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        sanitation
                          ? "translate-x-5"
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* EMERGENCY CONTACT */}

            <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
                <span
                  className="material-symbols-outlined text-red-600"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  contact_phone
                </span>

                Emergency Contact
              </h2>

              <div className="flex flex-col gap-4 mt-6">

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Primary Organizer Name *
                  </label>

                  <input
                    type="text"
                    className="w-full bg-[#f9f9ff] border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Contact Number *
                  </label>

                  <input
                    type="tel"
                    className="w-full bg-[#f9f9ff] border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* ==================== MOBILE BOTTOM NAVIGATION ==================== */}

      <nav className="md:hidden bg-white fixed bottom-0 w-full z-50 border-t border-gray-300 flex justify-around items-center py-3 px-4 shadow-lg">

        <a
          href="/pilgrim"
          className="flex flex-col items-center justify-center text-gray-500 gap-1"
        >
          <span className="material-symbols-outlined">
            church
          </span>

          <span className="text-xs">
            Pilgrim
          </span>
        </a>

        <a
          href="/gathering"
          className="flex flex-col items-center justify-center text-orange-600 font-bold gap-1"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            groups
          </span>

          <span className="text-xs">
            Gathering
          </span>
        </a>

        <a
          href="/corporate"
          className="flex flex-col items-center justify-center text-gray-500 gap-1"
        >
          <span className="material-symbols-outlined">
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