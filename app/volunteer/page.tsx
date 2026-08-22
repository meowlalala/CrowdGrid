"use client";

import { useState } from "react";

export default function VolunteerPage() {
  const [skills, setSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setSkills((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : [...current, skill]
    );
  };

  const skillOptions = [
    {
      id: "first-aid",
      title: "First Aid",
      description: "Medical assistance",
    },
    {
      id: "logistics",
      title: "Logistics",
      description: "Crowd control & routing",
    },
    {
      id: "translation",
      title: "Translation",
      description: "Multi-lingual support",
    },
    {
      id: "information",
      title: "Information",
      description: "Guiding pilgrims",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col pb-20"
      style={{
        backgroundColor: "#f8f9ff",
        color: "#1e293b",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ==================== HEADER ==================== */}

      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <svg
            fill="none"
            height="20"
            stroke="#003d9b"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
          >
            <rect height="7" width="7" x="3" y="3" />
            <rect height="7" width="7" x="14" y="3" />
            <rect height="7" width="7" x="14" y="14" />
            <rect height="7" width="7" x="3" y="14" />
          </svg>

          <span className="font-bold text-[#003d9b] text-sm tracking-wider">
            CROWDGRID
          </span>
        </div>

        <button className="bg-[#0052cc] hover:bg-[#003d9b] text-white text-sm font-medium py-1.5 px-4 rounded transition-colors">
          IRCTC Login
        </button>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}

      <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">

        {/* PAGE HEADER */}

        <div className="mb-6">
          <h1 className="text-[17px] font-medium mb-1.5">
            Volunteer Registration
          </h1>

          <p className="text-[15px] text-[#475569] leading-snug">
            Join our network to assist pilgrims during their journey.
          </p>
        </div>

        {/* ==================== FORM CARD ==================== */}

        <div className="bg-white border border-[#e2e8f0] rounded shadow-sm p-4">

          <form
            className="space-y-8"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >

            {/* ==================== PERSONAL INFORMATION ==================== */}

            <section className="space-y-4">
              <h2 className="text-[15px] text-[#1e293b] border-b border-[#e2e8f0] pb-2">
                Personal Information
              </h2>

              <div className="space-y-4">

                {/* FULL NAME */}

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="fullName"
                    className="text-[13px] text-[#475569]"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full border-[#e2e8f0] rounded px-3 py-2.5 text-[15px] focus:ring-1 focus:ring-[#0052cc] focus:border-[#0052cc] outline-none transition-shadow placeholder:text-gray-400"
                  />
                </div>

                {/* PHONE */}

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="phone"
                    className="text-[13px] text-[#475569]"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    defaultValue="+91"
                    className="w-full border-[#e2e8f0] rounded px-3 py-2.5 text-[15px] focus:ring-1 focus:ring-[#0052cc] focus:border-[#0052cc] outline-none transition-shadow"
                  />
                </div>

                {/* EMAIL */}

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-[13px] text-[#475569]"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="Optional"
                    className="w-full border-[#e2e8f0] rounded px-3 py-2.5 text-[15px] focus:ring-1 focus:ring-[#0052cc] focus:border-[#0052cc] outline-none transition-shadow placeholder:text-gray-400"
                  />
                </div>
              </div>
            </section>

            {/* ==================== AVAILABILITY ==================== */}

            <section className="space-y-4">
              <h2 className="text-[15px] text-[#1e293b] border-b border-[#e2e8f0] pb-2">
                Availability
              </h2>

              <div className="space-y-4">

                {/* DURATION */}

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="duration"
                    className="text-[13px] text-[#475569]"
                  >
                    Duration of Stay (Days)
                  </label>

                  <select
                    id="duration"
                    defaultValue=""
                    className="w-full border-[#e2e8f0] rounded px-3 py-2.5 text-[15px] appearance-none focus:ring-1 focus:ring-[#0052cc] focus:border-[#0052cc] outline-none transition-shadow bg-white"
                  >
                    <option value="" disabled>
                      Select duration
                    </option>

                    <option value="1-3">
                      1-3 Days
                    </option>

                    <option value="4-7">
                      4-7 Days
                    </option>

                    <option value="7+">
                      More than 7 Days
                    </option>
                  </select>
                </div>

                {/* PREFERRED ZONE */}

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-[#475569]">
                    Preferred Zone
                  </label>

                  <div className="grid grid-cols-2 gap-3">

                    <label className="flex items-center gap-2 border border-[#e2e8f0] rounded p-3 cursor-pointer hover:border-gray-300 transition-colors">
                      <input
                        name="zone"
                        type="radio"
                        value="base-camp"
                        className="text-[#0052cc] focus:ring-[#0052cc] w-4 h-4 border-gray-300"
                      />

                      <span className="text-[14px]">
                        Base Camp
                      </span>
                    </label>

                    <label className="flex items-center gap-2 border border-[#e2e8f0] rounded p-3 cursor-pointer hover:border-gray-300 transition-colors">
                      <input
                        name="zone"
                        type="radio"
                        value="transit-route"
                        className="text-[#0052cc] focus:ring-[#0052cc] w-4 h-4 border-gray-300"
                      />

                      <span className="text-[14px]">
                        Transit Route
                      </span>
                    </label>

                  </div>
                </div>
              </div>
            </section>

            {/* ==================== SKILLS ==================== */}

            <section className="space-y-4">

              <div className="border-b border-[#e2e8f0] pb-2 mb-2">
                <h2 className="text-[15px] text-[#1e293b]">
                  Skills &amp; Expertise
                </h2>
              </div>

              <p className="text-[14px] text-[#475569] mb-3">
                Select any areas where you can provide assistance.
              </p>

              <div className="space-y-3">

                {skillOptions.map((skill) => {
                  const selected = skills.includes(skill.id);

                  return (
                    <label
                      key={skill.id}
                      className="relative block cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        name="skills"
                        value={skill.id}
                        checked={selected}
                        onChange={() => toggleSkill(skill.id)}
                        className="sr-only"
                      />

                      <div
                        className={`border rounded p-3.5 transition-colors flex items-start gap-3 ${
                          selected
                            ? "border-[#0052cc] bg-blue-50"
                            : "border-[#e2e8f0] hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 border rounded mt-0.5 flex items-center justify-center transition-colors ${
                            selected
                              ? "bg-[#0052cc] border-[#0052cc]"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          {selected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M5 13l4 4L19 7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                              />
                            </svg>
                          )}
                        </div>

                        <div>
                          <div className="text-[14px] font-medium text-[#1e293b]">
                            {skill.title}
                          </div>

                          <div className="text-[13px] text-[#475569]">
                            {skill.description}
                          </div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </section>

            {/* ==================== SUBMIT ==================== */}

            <div className="pt-4 border-t border-[#e2e8f0] mt-6">
              <button
                type="submit"
                className="w-full text-white font-medium rounded py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                style={{
                  background:
                    "linear-gradient(to right, #0052cc 4%, #337add 25%, #0052cc 36%)",
                  backgroundSize: "1000px 100%",
                }}
              >
                <svg
                  fill="none"
                  height="18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="18"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" x2="19" y1="8" y2="14" />
                  <line x1="22" x2="16" y1="11" y2="11" />
                </svg>

                Submit Registration
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* ==================== MOBILE BOTTOM NAVIGATION ==================== */}

      <nav className="bg-white border-t border-[#e2e8f0] fixed bottom-0 w-full flex justify-around items-center py-2 px-2 z-10">

        <a
          href="/pilgrim"
          className="flex flex-col items-center gap-1 text-[#0052cc]"
        >
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>

          <span className="text-[12px] font-medium">
            Pilgrim
          </span>
        </a>

        <a
          href="/gathering"
          className="flex flex-col items-center gap-1 text-[#475569] hover:text-[#1e293b]"
        >
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>

          <span className="text-[12px]">
            Gathering
          </span>
        </a>

        <a
          href="/corporate"
          className="flex flex-col items-center gap-1 text-[#475569] hover:text-[#1e293b]"
        >
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
          >
            <rect height="14" rx="2" ry="2" width="20" x="2" y="7" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>

          <span className="text-[12px]">
            Corporate
          </span>
        </a>
      </nav>
    </div>
  );
}