"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Star,
  Hotel,
  Utensils,
  ShieldCheck,
} from "lucide-react";

const events = [
  {
    slug: "maha-kumbh-mela",
    title: "Maha Kumbh Mela 2026",
    location: "Nashik, Maharashtra",
    dates: "31 October 2026 - 31 March 2028",
    shortDates: "31 Oct 2026 - 31 Mar 2028",
    description:
      "Experience one of the world's largest spiritual gatherings, bringing millions of pilgrims together for sacred bathing, prayers and cultural experiences.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKnBKwYRmjXEC93ptZVLhAxSTIS-IIK5K38Im3W32GPMpxuBnfDynOH3XeiSYa-XmNPylFJ22c4uu-MFTQp5-B6KuXTmca_RM3-neC8SbAc-6lcUOvOvwuDvA4Ftbn6gQsi-fZrNeNH-vEdFJ5CzHg45r2HXMRWLIqNnhvtLx6T7pdUOoJw1wrn4HXXdCE2lKZAafAsFlWo3LUQdlxWGZ78CBxgJp3QFZ978PcIPL_OnN88lIZe41w",
    featured: true,
  },
  {
    slug: "pandharpur-wari",
    title: "Pandharpur Wari",
    location: "Pandharpur, Maharashtra",
    dates: "26 June - 14 July 2027",
    shortDates: "26 June - 14 July 2027",
    description:
      "Walk alongside thousands of devotees on the traditional Wari pilgrimage to the sacred Vitthal-Rukmini temple in Pandharpur.",
    image:
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "puri-rath-yatra",
    title: "Puri Rath Yatra",
    location: "Puri, Odisha",
    dates: "5 July 2027",
    shortDates: "5 July 2027",
    description:
      "Witness the spectacular chariot procession of Lord Jagannath, Balabhadra and Subhadra through the streets of Puri.",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function PilgrimPage() {
  const featuredEvent = events[0];

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-gray-900">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}
        <section className="mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-500">
                CrowdGrid Pilgrimages
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950 mt-2">
                Spiritual journeys, planned simply.
              </h1>

              <p className="text-gray-500 text-base md:text-lg mt-3 max-w-2xl leading-relaxed">
                Discover major pilgrimage events across India and plan your
                stay, dates, food and journey from one place.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2.5 text-sm font-semibold text-gray-600 shadow-sm">
              <ShieldCheck size={17} className="text-sky-500" />
              Trusted pilgrimage planning
            </div>
          </div>
        </section>


        {/* =====================================================
            FEATURED EVENT
        ====================================================== */}
        <section className="mb-14 md:mb-16">

          <Link
            href={`/pilgrim/${featuredEvent.slug}`}
            className="group block"
          >
            <article
              className="
                relative
                min-h-[430px]
                sm:min-h-[500px]
                md:min-h-[570px]
                rounded-[30px]
                overflow-hidden
                border
                border-gray-200
                shadow-xl
                bg-cover
                bg-center
                transition-all
                duration-300
                group-hover:shadow-2xl
                group-hover:-translate-y-0.5
              "
              style={{
                backgroundImage: `url("${featuredEvent.image}")`,
              }}
            >

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/5" />

              {/* Additional hover overlay */}
              <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/5 transition-colors duration-300" />


              {/* Explore button */}
              <div className="absolute top-5 right-5 md:top-7 md:right-7 z-20">
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-xl border border-white/25 text-white rounded-full px-4 py-2.5 text-sm font-bold opacity-90 group-hover:bg-sky-500 group-hover:border-sky-400 transition-all">
                  Explore Event
                  <ArrowRight size={16} />
                </div>
              </div>


              {/* Featured content */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 md:p-12">

                <div className="max-w-4xl">

                  <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/25 backdrop-blur-md border border-sky-300/30 text-white px-4 py-2 text-xs sm:text-sm font-bold tracking-wide">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                    FEATURED PILGRIMAGE
                  </span>

                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mt-5">
                    {featuredEvent.title}
                  </h2>

                  <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed mt-5 max-w-3xl">
                    Experience the largest peaceful gathering in the world.
                    Join millions in a profound spiritual journey.
                  </p>


                  <div className="flex flex-wrap gap-3 mt-7">

                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2.5 text-sm">
                      <MapPin size={16} />
                      {featuredEvent.location}
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2.5 text-sm">
                      <CalendarDays size={16} />
                      {featuredEvent.shortDates}
                    </span>

                  </div>

                </div>
              </div>

            </article>
          </Link>

        </section>


        {/* =====================================================
            EVENTS
        ====================================================== */}
        <section>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-500">
                Explore
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 mt-1">
                Pilgrimage Events
              </h2>

              <p className="text-gray-500 mt-2 max-w-2xl">
                Choose a pilgrimage to see its location, important places,
                accommodation options, food and booking details.
              </p>
            </div>

            <div className="text-sm font-semibold text-gray-400">
              {events.length} featured journeys
            </div>

          </div>


          {/* Event cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {events.map((event) => (
              <Link
                key={event.slug}
                href={`/pilgrim/${event.slug}`}
                className="group block h-full"
              >

                <article
                  className="
                    h-full
                    bg-white
                    rounded-[26px]
                    overflow-hidden
                    border
                    border-gray-200
                    shadow-sm
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:shadow-xl
                    group-hover:border-sky-200
                  "
                >

                  {/* IMAGE */}
                  <div className="relative h-60 overflow-hidden">

                    <img
                      src={event.image}
                      alt={event.title}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                    <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-black/35 backdrop-blur-md border border-white/20 text-white rounded-full px-3 py-1.5 text-xs font-bold">
                      PILGRIMAGE
                    </span>

                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-sky-500 shadow-md group-hover:bg-sky-500 group-hover:text-white transition-colors">
                      <ArrowRight size={18} />
                    </div>

                  </div>


                  {/* CARD CONTENT */}
                  <div className="p-6">

                    <h3 className="text-xl font-extrabold text-gray-950 group-hover:text-sky-500 transition-colors">
                      {event.title}
                    </h3>


                    <div className="mt-4 space-y-2.5">

                      <div className="flex items-center gap-2.5 text-sm text-gray-600">
                        <MapPin
                          size={17}
                          className="text-sky-500 shrink-0"
                        />
                        <span>{event.location}</span>
                      </div>

                      <div className="flex items-center gap-2.5 text-sm text-gray-600">
                        <CalendarDays
                          size={17}
                          className="text-sky-500 shrink-0"
                        />
                        <span>{event.dates}</span>
                      </div>

                    </div>


                    <p className="mt-5 text-sm leading-6 text-gray-500 line-clamp-3">
                      {event.description}
                    </p>


                    <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">

                      <span className="text-sky-500 font-bold text-sm">
                        View Details
                      </span>

                      <span className="text-xs font-semibold text-gray-400">
                        Stay • Food • Booking
                      </span>

                    </div>

                  </div>

                </article>

              </Link>
            ))}

          </div>

        </section>


        {/* =====================================================
            BOTTOM INFO
        ====================================================== */}
        <section className="mt-14 md:mt-16">

          <div className="bg-white border border-gray-200 rounded-[28px] p-6 md:p-8 shadow-sm">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center shrink-0">
                  <Hotel className="text-sky-500" size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Choose your stay
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-5">
                    Compare accommodation options close to the pilgrimage.
                  </p>
                </div>
              </div>


              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center shrink-0">
                  <CalendarDays className="text-sky-500" size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Pick your duration
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-5">
                    Book multiple nights or shorter 6, 12 or 24 hour stays.
                  </p>
                </div>
              </div>


              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center shrink-0">
                  <Utensils className="text-sky-500" size={21} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Food included
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-5">
                    Lunch and dinner are selected as part of the pilgrimage booking.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}