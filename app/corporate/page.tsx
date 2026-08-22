"use client";

import { useEffect } from "react";

export default function CorporatePage() {
  useEffect(() => {
    // Load Tailwind CDN so the Stitch styling works for this prototype.
    const script = document.createElement("script");
    script.src =
      "https://cdn.tailwindcss.com?plugins=forms,container-queries";
    document.head.appendChild(script);

    // Load Inter font
    const inter = document.createElement("link");
    inter.rel = "stylesheet";
    inter.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";
    document.head.appendChild(inter);

    // Load Material Symbols
    const material = document.createElement("link");
    material.rel = "stylesheet";
    material.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap";
    document.head.appendChild(material);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(inter);
      document.head.removeChild(material);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "#f9f9ff",
        color: "#001b3d",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* TOP NAVIGATION */}
      <header className="bg-white border-b border-gray-300 flex justify-between items-center w-full px-4 md:px-16 py-4 z-40">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-700">
            grid_view
          </span>

          <span className="text-2xl font-bold text-blue-700 tracking-tight">
            CROWDGRID
          </span>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="/pilgrim"
            className="px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50"
          >
            Pilgrim
          </a>

          <a
            href="/gathering"
            className="px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50"
          >
            Gathering
          </a>

          <a
            href="/corporate"
            className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-bold"
          >
            Corporate
          </a>
        </nav>

        <button className="text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50">
          IRCTC Login
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto px-4 md:px-16 py-8 pb-32">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold mb-1">
              Corporate Workflow Gateway
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl">
              Secure access and event management for enterprise delegates.
            </p>
          </div>

          {/* TWO CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* PRIVATE CODE LOGIN */}
            <div
              className="rounded-xl p-6 flex flex-col justify-between"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid #c4c5d6",
                boxShadow: "0 10px 40px -10px rgba(45,91,215,0.1)",
              }}
            >
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-blue-700 text-3xl">
                    vpn_key
                  </span>
                </div>

                <h2 className="text-2xl font-semibold mb-2">
                  Private Code Login
                </h2>

                <p className="text-gray-600 mb-6">
                  Enter your enterprise access code to view restricted
                  corporate schedules and venue access passes.
                </p>

                <div className="relative mb-8">
                  <input
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="Enter Access Code"
                    type="text"
                  />

                  <span className="material-symbols-outlined absolute right-3 top-3 text-gray-400">
                    lock
                  </span>
                </div>
              </div>

              <button
                className="w-full text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 shadow-sm"
                style={{ backgroundColor: "#2D5BD7" }}
              >
                Authenticate

                <span className="material-symbols-outlined text-xl">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* EVENT DETAILS */}
            <div
              className="rounded-xl p-6 flex flex-col relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid #c4c5d6",
                boxShadow: "0 10px 40px -10px rgba(45,91,215,0.1)",
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-700 text-3xl">
                    event_note
                  </span>
                </div>

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                  Upcoming
                </span>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">
                  Global Tech Summit '24
                </h2>

                <div className="space-y-3 mt-6">

                  {/* DATE */}
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-500">
                      calendar_month
                    </span>

                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-semibold">
                        October 24, 2024
                      </p>
                    </div>
                  </div>

                  {/* VENUE */}
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-500">
                      location_on
                    </span>

                    <div>
                      <p className="text-sm text-gray-500">Venue</p>
                      <p className="font-semibold">
                        Grand Hall, Block A
                      </p>
                    </div>
                  </div>

                  {/* DELEGATES */}
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-500">
                      group
                    </span>

                    <div>
                      <p className="text-sm text-gray-500">Delegates</p>
                      <p className="font-semibold">
                        450+ Confirmed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD FOOTER */}
              <div className="mt-8 border-t border-gray-300 pt-4 flex justify-between items-center">
                <p className="text-xs text-gray-500 uppercase">
                  Status: Finalizing Setup
                </p>

                <button className="text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 flex items-center gap-1">
                  View Details

                  <span className="material-symbols-outlined text-lg">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* ACTION BAR */}
          <div
            className="mt-6 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid #c4c5d6",
              borderLeft: "4px solid #2D5BD7",
            }}
          >
            <div>
              <h3 className="text-lg font-semibold">
                Ready to begin the corporate workflow?
              </h3>

              <p className="text-sm text-gray-600">
                Ensure all delegates have received their access codes before
                proceeding.
              </p>
            </div>

            <button
              className="w-full md:w-auto text-white font-semibold px-8 py-3 rounded-lg shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
              style={{ backgroundColor: "#2D5BD7" }}
            >
              Acknowledge &amp; Proceed

              <span className="material-symbols-outlined">
                check_circle
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* MOBILE NAVIGATION */}
      <nav className="md:hidden bg-white fixed bottom-0 w-full z-50 border-t border-gray-300 flex justify-around items-center py-3 px-4 shadow-lg">

        <a
          href="/pilgrim"
          className="flex flex-col items-center text-gray-500 w-1/3"
        >
          <span className="material-symbols-outlined mb-1">
            church
          </span>

          <span className="text-xs">
            Pilgrim
          </span>
        </a>

        <a
          href="/gathering"
          className="flex flex-col items-center text-gray-500 w-1/3"
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
          className="flex flex-col items-center text-blue-700 font-bold w-1/3"
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