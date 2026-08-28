"use client";

import {
  FormEvent,
  useMemo,
  useState,
} from "react";

import { useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { submitPilgrimage } from "@/app/actions";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPin,
  Hotel,
  Utensils,
  Compass,
  Bus,
  CheckCircle2,
  Users,
  Phone,
  Mail,
  User,
  Clock3,
  Star,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";


/* =========================================================
   EVENT DATA
========================================================= */

const pilgrimageData = {
  "maha-kumbh-mela": {
    title: "Maha Kumbh Mela 2026",
    location: "Nashik, Maharashtra",
    dates: "31 October 2026 - 31 March 2028",

    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKnBKwYRmjXEC93ptZVLhAxSTIS-IIK5K38Im3W32GPMpxuBnfDynOH3XeiSYa-XmNPylFJ22c4uu-MFTQp5-B6KuXTmca_RM3-neC8SbAc-6lcUOvOvwuDvA4Ftbn6gQsi-fZrNeNH-vEdFJ5CzHg45r2HXMRWLIqNnhvtLx6T7pdUOoJw1wrn4HXXdCE2lKZAafAsFlWo3LUQdlxWGZ78CBxgJp3QFZ978PcIPL_OnN88lIZe41w",

    description:
      "The Maha Kumbh Mela is a major spiritual gathering where millions of pilgrims come together for sacred bathing, prayers, religious ceremonies and cultural experiences.",

    overview:
      "Plan your complete pilgrimage experience with accommodation, food, local transportation and important pilgrimage locations arranged around your journey.",

    places: [
      "Triveni Sangam",
      "Kumbh Mela grounds",
      "Major bathing ghats",
      "Akharas and religious camps",
    ],

    travel: [
      "Railway connectivity to Prayagraj",
      "Road transportation and buses",
      "Local shuttle services",
      "Walking routes around major event zones",
    ],

    stays: [
      {
        id: "kumbh-camp",
        name: "Premium Kumbh Camp",
        type: "Luxury Tent",
        rating: "4.7",
        reviews: "328 reviews",
        price: 4500,
        image:
          "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=900&q=80",
        distance: "0.8 km from main event area",
        features: [
          "Attached bathroom",
          "Breakfast included",
          "24/7 assistance",
        ],
      },

      {
        id: "kumbh-hotel",
        name: "Prayagraj Riverside Hotel",
        type: "Hotel",
        rating: "4.4",
        reviews: "512 reviews",
        price: 3200,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
        distance: "2.1 km from event area",
        features: [
          "Private room",
          "Restaurant",
          "Free Wi-Fi",
        ],
      },

      {
        id: "kumbh-dharamshala",
        name: "Pilgrim Dharamshala",
        type: "Pilgrim Stay",
        rating: "4.2",
        reviews: "184 reviews",
        price: 1200,
        image:
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80",
        distance: "1.5 km from main ghat",
        features: [
          "Clean rooms",
          "Community meals",
          "Pilgrim friendly",
        ],
      },
    ],
  },


  "pandharpur-wari": {
    title: "Pandharpur Wari",
    location: "Pandharpur, Maharashtra",
    dates: "26 June - 14 July",

    image:
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1600&q=80",

    description:
      "Pandharpur Wari is a traditional pilgrimage in Maharashtra where devotees walk together towards the Vitthal-Rukmini temple in Pandharpur.",

    overview:
      "Experience the devotional atmosphere of the Wari, including traditional processions, devotional singing and the final pilgrimage into Pandharpur.",

    places: [
      "Vitthal-Rukmini Temple",
      "Chandrabhaga River",
      "Pandharpur pilgrimage routes",
      "Wari resting camps",
    ],

    travel: [
      "Rail connectivity",
      "State transport buses",
      "Private buses",
      "Local transport within Pandharpur",
    ],

    stays: [
      {
        id: "wari-hotel",
        name: "Pandharpur Heritage Hotel",
        type: "Hotel",
        rating: "4.6",
        reviews: "274 reviews",
        price: 2800,
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
        distance: "1.0 km from Vitthal Temple",
        features: [
          "Air conditioning",
          "Restaurant",
          "Family rooms",
        ],
      },

      {
        id: "wari-lodge",
        name: "Vitthal Pilgrim Lodge",
        type: "Pilgrim Lodge",
        rating: "4.3",
        reviews: "193 reviews",
        price: 1600,
        image:
          "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
        distance: "0.7 km from temple",
        features: [
          "Temple nearby",
          "Vegetarian meals",
          "24/7 reception",
        ],
      },

      {
        id: "wari-dharamshala",
        name: "Wari Seva Dharamshala",
        type: "Dharamshala",
        rating: "4.1",
        reviews: "116 reviews",
        price: 900,
        image:
          "https://www.linkedin.com/pulse/leadership-lessons-from-pandharpur-wari-spiritual-journey-gharpure",
        distance: "1.3 km from temple",
        features: [
          "Budget friendly",
          "Shared facilities",
          "Pilgrim meals",
        ],
      },
    ],
  },


  "puri-rath-yatra": {
    title: "Puri Rath Yatra",
    location: "Puri, Odisha",
    dates: "5 July 2027",

    image:
      "https://harekrishnamandir.org/blog/post/11-facts-about-ratha-yatra",
    description:
      "The Puri Rath Yatra is a major Hindu festival during which the chariots of Lord Jagannath, Balabhadra and Subhadra travel through the streets of Puri.",

    overview:
      "Plan your visit to Puri around the Rath Yatra with information about accommodation, food, transportation and important places to visit.",

    places: [
      "Jagannath Temple",
      "Grand Road",
      "Puri Beach",
      "Rath Yatra route",
    ],

    travel: [
      "Puri railway station",
      "Bhubaneswar airport connectivity",
      "State buses",
      "Local auto and taxi services",
    ],

    stays: [
      {
        id: "puri-hotel",
        name: "Grand Road Heritage Hotel",
        type: "Hotel",
        rating: "4.6",
        reviews: "421 reviews",
        price: 3600,
        image:
          "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=900&q=80",
        distance: "0.9 km from Rath Yatra route",
        features: [
          "Premium rooms",
          "Restaurant",
          "Air conditioning",
        ],
      },

      {
        id: "puri-beach",
        name: "Puri Beach Stay",
        type: "Hotel",
        rating: "4.4",
        reviews: "306 reviews",
        price: 2500,
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
        distance: "1.2 km from Jagannath Temple",
        features: [
          "Near beach",
          "Breakfast available",
          "Family rooms",
        ],
      },

      {
        id: "puri-pilgrim",
        name: "Jagannath Pilgrim Stay",
        type: "Pilgrim Stay",
        rating: "4.2",
        reviews: "157 reviews",
        price: 1100,
        image:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
        distance: "0.6 km from temple",
        features: [
          "Budget friendly",
          "Vegetarian meals",
          "Temple nearby",
        ],
      },
    ],
  },
} as const;


type EventSlug = keyof typeof pilgrimageData;

type StayOption =
  (typeof pilgrimageData)[EventSlug]["stays"][number];

type StayMode = "days" | "hours";


/* =========================================================
   COMPONENT
========================================================= */

export default function PilgrimageDetailsPage() {
  const params = useParams<{ slug: string }>();

  const slug = params?.slug;

  const event =
    pilgrimageData[
      slug as EventSlug
    ];
  /*
   * IMPORTANT:
   * Next.js newer versions provide dynamic route params
   * as a Promise.
   *
   * This was the reason your old page was showing:
   * "Event Not Found"
   */


  /* =======================================================
     STATE
  ====================================================== */

  const [selectedStay, setSelectedStay] =
    useState<StayOption | null>(null);

  const [stayMode, setStayMode] =
    useState<StayMode>("days");

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const [stayHours, setStayHours] =
    useState("6");

  const [pilgrimCount, setPilgrimCount] =
    useState("1");

  const [fullName, setFullName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  /*
   * Lunch + dinner are selected by default
   * because both are required.
   */
  const [lunch, setLunch] =
    useState(true);

  const [dinner, setDinner] =
    useState(true);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [showSuccess, setShowSuccess] =
    useState(false);


  /* =======================================================
     CALCULATE DURATION
  ====================================================== */

  const nights = useMemo(() => {

    if (!checkIn || !checkOut) {
      return 0;
    }

    const start =
      new Date(`${checkIn}T00:00:00`);

    const end =
      new Date(`${checkOut}T00:00:00`);

    const difference =
      end.getTime() - start.getTime();

    return Math.max(
      0,
      Math.ceil(
        difference /
          (1000 * 60 * 60 * 24)
      )
    );

  }, [checkIn, checkOut]);


  const durationText = useMemo(() => {

    if (stayMode === "hours") {
      return `${stayHours} hours`;
    }

    if (nights === 1) {
      return "1 night";
    }

    if (nights > 1) {
      return `${nights} nights`;
    }

    return "Select your dates";

  }, [
    stayMode,
    stayHours,
    nights,
  ]);


  const stayTotal = useMemo(() => {

    if (!selectedStay) {
      return 0;
    }

    if (stayMode === "hours") {

      const hours =
        Number(stayHours);

      return Math.ceil(
        (selectedStay.price / 24) *
          hours
      );
    }

    if (nights < 1) {
      return 0;
    }

    return (
      selectedStay.price *
      nights
    );

  }, [
    selectedStay,
    stayMode,
    stayHours,
    nights,
  ]);


  /* =======================================================
     INVALID EVENT
  ====================================================== */

  if (!event) {

    return (
      <main className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4">

        <div className="w-full max-w-xl bg-white border border-gray-200 rounded-[30px] shadow-lg p-8 md:p-12 text-center">

          <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
            <MapPin size={28} />
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950 mt-6">
            Event Not Found
          </h1>

          <p className="text-gray-500 mt-3 leading-relaxed">
            We could not find the pilgrimage event you are looking for.
          </p>

          <Link
            href="/pilgrim"
            className="inline-flex items-center justify-center gap-2 mt-7 bg-gray-950 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Pilgrimages
          </Link>

        </div>

      </main>
    );
  }


  /* =======================================================
     STAY SELECT
  ====================================================== */

  const handleStaySelect = (
    stay: StayOption
  ) => {

    setSelectedStay(stay);
    setShowSuccess(false);

    setTimeout(() => {

      document
        .getElementById("booking")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

    }, 100);
  };


  /* =======================================================
     SUBMIT
  ====================================================== */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    if (isSubmitting) {
      return;
    }


    if (!selectedStay) {
      toast.error(
        "Please select a stay option."
      );
      return;
    }


    if (!checkIn) {
      toast.error(
        "Please select your date."
      );
      return;
    }


    if (
      stayMode === "days" &&
      (!checkOut || nights < 1)
    ) {
      toast.error(
        "Please select a valid check-out date."
      );
      return;
    }


    if (!fullName.trim()) {
      toast.error(
        "Please enter your full name."
      );
      return;
    }


    if (!phone.trim()) {
      toast.error(
        "Please enter your phone number."
      );
      return;
    }


    if (!email.trim()) {
      toast.error(
        "Please enter your email address."
      );
      return;
    }


    if (!lunch || !dinner) {
      toast.error(
        "Lunch and Dinner are required."
      );
      return;
    }


    setIsSubmitting(true);


    try {

      const formData =
        new FormData();

      formData.set(
        "destination",
        event.location
      );

      formData.set(
        "dates",
        stayMode === "days"
          ? `${checkIn} - ${checkOut}`
          : `${checkIn} - ${durationText}`
      );

      formData.set(
        "pilgrimCount",
        pilgrimCount
      );

      /*
       * Kept for compatibility with
       * your existing submitPilgrimage action.
       *
       * Package selection has been removed
       * from the UI.
       */
      formData.set(
        "packageType",
        "standard"
      );

      formData.set(
        "stay",
        selectedStay.name
      );

      formData.set(
        "stayMode",
        stayMode
      );

      formData.set(
        "duration",
        durationText
      );

      formData.set(
        "fullName",
        fullName.trim()
      );

      formData.set(
        "phone",
        phone.trim()
      );

      formData.set(
        "email",
        email.trim()
      );

      formData.set(
        "lunch",
        String(lunch)
      );

      formData.set(
        "dinner",
        String(dinner)
      );


      const result =
        await submitPilgrimage(
          formData
        );


      if (result?.error) {
        toast.error(result.error);
        return;
      }


      toast.success(
        "Your pilgrimage booking request has been submitted!"
      );

      setShowSuccess(true);


      setTimeout(() => {

        document
          .getElementById("confirmation")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

      }, 150);


    } catch (error) {

      console.error(
        "Pilgrimage booking error:",
        error
      );

      toast.error(
        "Something went wrong while submitting your booking."
      );

    } finally {

      setIsSubmitting(false);

    }

  };


  return (
    <main className="min-h-screen bg-[#f7f9fc] text-gray-900">

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">


        {/* =====================================================
            BACK
        ====================================================== */}

        <Link
          href="/pilgrim"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-sky-500 font-bold text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Pilgrimages
        </Link>


        {/* =====================================================
            HERO
        ====================================================== */}

        <section
          className="
            relative
            min-h-[460px]
            md:min-h-[580px]
            rounded-[30px]
            overflow-hidden
            shadow-xl
            border
            border-gray-200
            bg-cover
            bg-center
            flex
            items-end
          "
          style={{
            backgroundImage:
              `url("${event.image}")`,
          }}
        >

          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />

          <div className="absolute top-5 left-5 md:top-7 md:left-7 z-20">
            <span className="inline-flex items-center gap-2 bg-sky-500/25 backdrop-blur-md border border-sky-300/30 text-white rounded-full px-4 py-2 text-xs font-bold tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
              PILGRIMAGE EVENT
            </span>
          </div>


          <div className="relative z-10 w-full p-6 sm:p-8 md:p-12 lg:p-14">

            <div className="max-w-4xl">

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight">
                {event.title}
              </h1>

              <p className="text-gray-200 text-base md:text-xl leading-relaxed mt-5 max-w-3xl">
                {event.description}
              </p>


              <div className="flex flex-wrap gap-3 mt-7">

                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-2.5 text-sm">
                  <MapPin size={17} />
                  {event.location}
                </div>

                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-2.5 text-sm">
                  <CalendarDays size={17} />
                  {event.dates}
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            EVENT DETAILS
        ====================================================== */}

        <section className="mt-8 md:mt-10">

          <div className="bg-white border border-gray-200 rounded-[28px] shadow-sm overflow-hidden">

            <div className="p-6 md:p-9">

              <div className="flex flex-col lg:flex-row lg:justify-between gap-8">

                <div className="max-w-3xl">

                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-500">
                    About this pilgrimage
                  </p>

                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-950 mt-2">
                    Plan your complete pilgrimage
                  </h2>

                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-4">
                    {event.overview}
                  </p>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 lg:min-w-[290px]">

                  <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                        <MapPin
                          size={20}
                          className="text-sky-500"
                        />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
                          Location
                        </p>

                        <p className="font-bold text-gray-900 mt-0.5">
                          {event.location}
                        </p>
                      </div>

                    </div>

                  </div>


                  <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                        <CalendarDays
                          size={20}
                          className="text-sky-500"
                        />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
                          Event dates
                        </p>

                        <p className="font-bold text-gray-900 mt-0.5">
                          {event.dates}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </div>


              {/* QUICK EVENT DETAILS */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">

                <div className="flex gap-3">

                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                    <Hotel
                      size={19}
                      className="text-sky-500"
                    />
                  </div>

                  <div>
                    <p className="font-bold text-gray-900">
                      Accommodation
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Multiple stay options available.
                    </p>
                  </div>

                </div>


                <div className="flex gap-3">

                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                    <Utensils
                      size={19}
                      className="text-sky-500"
                    />
                  </div>

                  <div>
                    <p className="font-bold text-gray-900">
                      Lunch & Dinner
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Both meals are required.
                    </p>
                  </div>

                </div>


                <div className="flex gap-3">

                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                    <Clock3
                      size={19}
                      className="text-sky-500"
                    />
                  </div>

                  <div>
                    <p className="font-bold text-gray-900">
                      Flexible duration
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Multi-day or 6/12/24 hour stays.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            STAY OPTIONS
        ====================================================== */}

        <section className="mt-12 md:mt-14">

          <div className="mb-7">

            <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-500">
              Accommodation
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 mt-1">
              Where do you want to stay?
            </h2>

            <p className="text-gray-500 mt-2">
              Compare stays near the pilgrimage, just like a hotel booking platform.
            </p>

          </div>


          <div className="space-y-5">

            {event.stays.map((stay) => {

              const isSelected =
                selectedStay?.id === stay.id;

              return (
                <article
                  key={stay.id}
                  className={`
                    bg-white
                    rounded-[26px]
                    overflow-hidden
                    border-2
                    transition-all
                    duration-200
                    ${
                      isSelected
                        ? "border-sky-500 shadow-xl shadow-sky-500/10"
                        : "border-gray-200 shadow-sm hover:border-sky-200 hover:shadow-lg"
                    }
                  `}
                >

                  <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_220px]">

                    {/* IMAGE */}

                    <div className="relative h-60 md:h-full min-h-[250px]">

                      <img
                        src={stay.image}
                        alt={stay.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />

                      <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 rounded-full px-3 py-1.5 text-xs font-bold">
                        {stay.type}
                      </span>

                    </div>


                    {/* INFORMATION */}

                    <div className="p-6 md:p-7">

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                        <div>

                          <h3 className="text-xl md:text-2xl font-extrabold text-gray-950">
                            {stay.name}
                          </h3>

                          <div className="flex flex-wrap items-center gap-4 mt-2">

                            <span className="inline-flex items-center gap-1.5 text-sm text-gray-700">
                              <Star
                                size={16}
                                className="fill-amber-400 text-amber-400"
                              />

                              <strong>
                                {stay.rating}
                              </strong>

                              <span className="text-gray-400">
                                ({stay.reviews})
                              </span>
                            </span>

                            <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                              <MapPin size={15} />
                              {stay.distance}
                            </span>

                          </div>

                        </div>

                      </div>


                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">

                        {stay.features.map(
                          (feature) => (
                            <div
                              key={feature}
                              className="flex items-center gap-2 text-sm text-gray-600"
                            >
                              <CheckCircle2
                                size={16}
                                className="text-sky-500 shrink-0"
                              />

                              <span>
                                {feature}
                              </span>

                            </div>
                          )
                        )}

                      </div>

                    </div>


                    {/* PRICE */}

                    <div className="border-t md:border-t-0 md:border-l border-gray-100 p-6 md:p-7 flex flex-col justify-between">

                      <div className="md:text-right">

                        <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
                          Starting from
                        </p>

                        <p className="text-2xl md:text-3xl font-extrabold text-gray-950 mt-1">
                          ₹{stay.price.toLocaleString("en-IN")}
                        </p>

                        <p className="text-sm text-gray-500">
                          per night
                        </p>

                      </div>


                      <button
                        type="button"
                        onClick={() =>
                          handleStaySelect(stay)
                        }
                        className={`
                          w-full
                          rounded-xl
                          py-3.5
                          px-5
                          font-bold
                          flex
                          items-center
                          justify-center
                          gap-2
                          transition-all
                          mt-6
                          ${
                            isSelected
                              ? "bg-sky-500 text-white"
                              : "bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white"
                          }
                        `}
                      >
                        {isSelected
                          ? "Stay Selected"
                          : "Select Stay"}

                        <ArrowRight size={17} />

                      </button>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        </section>


        {/* =====================================================
            BOOKING
        ====================================================== */}

        {selectedStay && (

          <section
            id="booking"
            className="mt-14 scroll-mt-6"
          >

            <div className="mb-7">

              <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-500">
                Booking
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 mt-1">
                Complete your pilgrimage
              </h2>

              <p className="text-gray-500 mt-2">
                Choose your dates, duration, travellers, contact details and meals.
              </p>

            </div>


            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-7 items-start"
            >

              {/* =================================================
                  LEFT
              ================================================== */}

              <div className="space-y-6">


                {/* SELECTED STAY */}

                <div className="bg-white border border-sky-200 rounded-[26px] shadow-sm p-5 md:p-6">

                  <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center shrink-0">
                        <Hotel
                          size={22}
                          className="text-sky-500"
                        />
                      </div>

                      <div>

                        <p className="text-xs uppercase tracking-wider font-bold text-sky-500">
                          Selected stay
                        </p>

                        <h3 className="text-lg md:text-xl font-extrabold text-gray-950 mt-0.5">
                          {selectedStay.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {selectedStay.distance}
                        </p>

                      </div>

                    </div>


                    <button
                      type="button"
                      onClick={() => {
                        setSelectedStay(null);
                        setShowSuccess(false);
                      }}
                      className="text-sm font-bold text-sky-500 hover:text-sky-700"
                    >
                      Change
                    </button>

                  </div>

                </div>


                {/* =================================================
                    DATE + DURATION
                ================================================== */}

                <div className="bg-white border border-gray-200 rounded-[26px] shadow-sm p-6 md:p-8">

                  <div className="flex items-center gap-3 mb-6">

                    <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center">
                      <CalendarDays
                        size={21}
                        className="text-sky-500"
                      />
                    </div>

                    <div>

                      <h3 className="text-xl font-extrabold text-gray-950">
                        When are you staying?
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Choose multiple days or a shorter stay.
                      </p>

                    </div>

                  </div>


                  {/* MODE */}

                  <div className="grid grid-cols-2 gap-2 bg-gray-100 rounded-2xl p-1.5 mb-6">

                    <button
                      type="button"
                      onClick={() =>
                        setStayMode("days")
                      }
                      className={`
                        rounded-xl
                        py-3
                        text-sm
                        font-bold
                        transition-all
                        ${
                          stayMode === "days"
                            ? "bg-white text-gray-950 shadow-sm"
                            : "text-gray-500 hover:text-gray-800"
                        }
                      `}
                    >
                      Multiple Days
                    </button>


                    <button
                      type="button"
                      onClick={() =>
                        setStayMode("hours")
                      }
                      className={`
                        rounded-xl
                        py-3
                        text-sm
                        font-bold
                        transition-all
                        ${
                          stayMode === "hours"
                            ? "bg-white text-gray-950 shadow-sm"
                            : "text-gray-500 hover:text-gray-800"
                        }
                      `}
                    >
                      Short Stay
                    </button>

                  </div>


                  {/* MULTIPLE DAYS */}

                  {stayMode === "days" && (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      <div>

                        <label
                          htmlFor="checkIn"
                          className="block text-sm font-bold text-gray-700 mb-2"
                        >
                          Check-in
                        </label>

                        <div className="relative">

                          <CalendarDays
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          />

                          <input
                            id="checkIn"
                            name="checkIn"
                            type="date"
                            required
                            value={checkIn}
                            onChange={(e) => {
                              setCheckIn(
                                e.target.value
                              );

                              /*
                               * If user changes check-in
                               * after choosing an earlier
                               * check-out, clear the invalid
                               * check-out.
                               */
                              if (
                                checkOut &&
                                e.target.value >= checkOut
                              ) {
                                setCheckOut("");
                              }
                            }}
                            className="w-full h-14 bg-white border border-gray-200 rounded-xl pl-12 pr-4 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          />

                        </div>

                      </div>


                      <div>

                        <label
                          htmlFor="checkOut"
                          className="block text-sm font-bold text-gray-700 mb-2"
                        >
                          Check-out
                        </label>

                        <div className="relative">

                          <CalendarDays
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          />

                          <input
                            id="checkOut"
                            name="checkOut"
                            type="date"
                            required
                            min={
                              checkIn
                                ? checkIn
                                : undefined
                            }
                            value={checkOut}
                            onChange={(e) =>
                              setCheckOut(
                                e.target.value
                              )
                            }
                            className="w-full h-14 bg-white border border-gray-200 rounded-xl pl-12 pr-4 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          />

                        </div>

                      </div>

                    </div>

                  )}


                  {/* SHORT STAY */}

                  {stayMode === "hours" && (

                    <div className="space-y-5">

                      <div>

                        <label
                          htmlFor="shortStayDate"
                          className="block text-sm font-bold text-gray-700 mb-2"
                        >
                          Date
                        </label>

                        <div className="relative">

                          <CalendarDays
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          />

                          <input
                            id="shortStayDate"
                            name="shortStayDate"
                            type="date"
                            required
                            value={checkIn}
                            onChange={(e) =>
                              setCheckIn(
                                e.target.value
                              )
                            }
                            className="w-full h-14 bg-white border border-gray-200 rounded-xl pl-12 pr-4 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          />

                        </div>

                      </div>


                      <div>

                        <label
                          htmlFor="stayHours"
                          className="block text-sm font-bold text-gray-700 mb-2"
                        >
                          Duration
                        </label>

                        <div className="relative">

                          <Clock3
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          />

                          <select
                            id="stayHours"
                            value={stayHours}
                            onChange={(e) =>
                              setStayHours(
                                e.target.value
                              )
                            }
                            className="appearance-none w-full h-14 bg-white border border-gray-200 rounded-xl pl-12 pr-12 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          >
                            <option value="6">
                              6 Hours
                            </option>

                            <option value="12">
                              12 Hours
                            </option>

                            <option value="24">
                              24 Hours
                            </option>
                          </select>

                          <ChevronDown
                            size={18}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          />

                        </div>

                      </div>

                    </div>

                  )}


                  {/* DURATION DISPLAY */}

                  <div className="mt-6 bg-sky-50 border border-sky-100 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">

                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-sky-600">
                        Your duration
                      </p>

                      <p className="font-extrabold text-gray-950 mt-1">
                        {durationText}
                      </p>
                    </div>

                    <Clock3
                      size={21}
                      className="text-sky-500"
                    />

                  </div>

                </div>


                {/* =================================================
                    PILGRIMS
                ================================================== */}

                <div className="bg-white border border-gray-200 rounded-[26px] shadow-sm p-6 md:p-8">

                  <div className="flex items-center gap-3 mb-6">

                    <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center">
                      <Users
                        size={21}
                        className="text-sky-500"
                      />
                    </div>

                    <div>

                      <h3 className="text-xl font-extrabold text-gray-950">
                        Travellers
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        How many pilgrims are travelling?
                      </p>

                    </div>

                  </div>


                  <div className="relative">

                    <Users
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />

                    <select
                      id="pilgrimCount"
                      name="pilgrimCount"
                      value={pilgrimCount}
                      onChange={(e) =>
                        setPilgrimCount(
                          e.target.value
                        )
                      }
                      className="appearance-none w-full h-14 bg-white border border-gray-200 rounded-xl pl-12 pr-12 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    >

                      <option value="1">
                        1 Pilgrim
                      </option>

                      <option value="2">
                        2 Pilgrims
                      </option>

                      <option value="3-5">
                        Family (3-5)
                      </option>

                      <option value="6+">
                        Group (6+)
                      </option>

                    </select>

                    <ChevronDown
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />

                  </div>

                </div>


                {/* =================================================
                    CONTACT
                ================================================== */}

                <div className="bg-white border border-gray-200 rounded-[26px] shadow-sm p-6 md:p-8">

                  <div className="flex items-center gap-3 mb-6">

                    <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center">
                      <User
                        size={21}
                        className="text-sky-500"
                      />
                    </div>

                    <div>

                      <h3 className="text-xl font-extrabold text-gray-950">
                        Contact details
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        We will use these details for your booking.
                      </p>

                    </div>

                  </div>


                  <div className="space-y-5">

                    {/* NAME */}

                    <div>

                      <label
                        htmlFor="fullName"
                        className="block text-sm font-bold text-gray-700 mb-2"
                      >
                        Full name
                      </label>

                      <div className="relative">

                        <User
                          size={19}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />

                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) =>
                            setFullName(
                              e.target.value
                            )
                          }
                          placeholder="Enter your full name"
                          className="w-full h-14 bg-white border border-gray-200 rounded-xl pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />

                      </div>

                    </div>


                    {/* PHONE + EMAIL */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      <div>

                        <label
                          htmlFor="phone"
                          className="block text-sm font-bold text-gray-700 mb-2"
                        >
                          Phone number
                        </label>

                        <div className="relative">

                          <Phone
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          />

                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) =>
                              setPhone(
                                e.target.value
                              )
                            }
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full h-14 bg-white border border-gray-200 rounded-xl pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          />

                        </div>

                      </div>


                      <div>

                        <label
                          htmlFor="email"
                          className="block text-sm font-bold text-gray-700 mb-2"
                        >
                          Email address
                        </label>

                        <div className="relative">

                          <Mail
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          />

                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) =>
                              setEmail(
                                e.target.value
                              )
                            }
                            placeholder="you@example.com"
                            className="w-full h-14 bg-white border border-gray-200 rounded-xl pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          />

                        </div>

                      </div>

                    </div>

                  </div>

                </div>


                {/* =================================================
                    FOOD
                ================================================== */}

                <div className="bg-white border border-gray-200 rounded-[26px] shadow-sm p-6 md:p-8">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center">
                      <Utensils
                        size={21}
                        className="text-sky-500"
                      />
                    </div>

                    <div>

                      <h3 className="text-xl font-extrabold text-gray-950">
                        Food requirements
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Lunch and dinner are required.
                      </p>

                    </div>

                  </div>


                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

                    {/* LUNCH */}

                    <label
                      className={`
                        cursor-pointer
                        rounded-2xl
                        border-2
                        p-5
                        transition-all
                        ${
                          lunch
                            ? "border-sky-500 bg-sky-50"
                            : "border-gray-200 bg-white"
                        }
                      `}
                    >

                      <input
                        type="checkbox"
                        checked={lunch}
                        onChange={(e) =>
                          setLunch(
                            e.target.checked
                          )
                        }
                        className="sr-only"
                      />

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                          <Utensils
                            size={21}
                            className={
                              lunch
                                ? "text-sky-500"
                                : "text-gray-400"
                            }
                          />

                          <div>

                            <p className="font-bold text-gray-950">
                              Lunch
                            </p>

                            <p className="text-xs text-gray-500 mt-0.5">
                              Required
                            </p>

                          </div>

                        </div>

                        <CheckCircle2
                          size={22}
                          className={
                            lunch
                              ? "text-sky-500"
                              : "text-gray-300"
                          }
                        />

                      </div>

                    </label>


                    {/* DINNER */}

                    <label
                      className={`
                        cursor-pointer
                        rounded-2xl
                        border-2
                        p-5
                        transition-all
                        ${
                          dinner
                            ? "border-sky-500 bg-sky-50"
                            : "border-gray-200 bg-white"
                        }
                      `}
                    >

                      <input
                        type="checkbox"
                        checked={dinner}
                        onChange={(e) =>
                          setDinner(
                            e.target.checked
                          )
                        }
                        className="sr-only"
                      />

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                          <Utensils
                            size={21}
                            className={
                              dinner
                                ? "text-sky-500"
                                : "text-gray-400"
                            }
                          />

                          <div>

                            <p className="font-bold text-gray-950">
                              Dinner
                            </p>

                            <p className="text-xs text-gray-500 mt-0.5">
                              Required
                            </p>

                          </div>

                        </div>

                        <CheckCircle2
                          size={22}
                          className={
                            dinner
                              ? "text-sky-500"
                              : "text-gray-300"
                          }
                        />

                      </div>

                    </label>

                  </div>


                  {(!lunch || !dinner) && (

                    <p className="mt-4 text-sm font-bold text-red-500">
                      Both Lunch and Dinner must be selected to continue.
                    </p>

                  )}

                </div>

              </div>


              {/* =================================================
                  RIGHT SUMMARY
              ================================================== */}

              <aside className="lg:sticky lg:top-6">

                <div className="bg-white rounded-[26px] border border-gray-200 shadow-xl overflow-hidden">

                  {/* HEADER */}

                  <div className="bg-gray-950 text-white p-6">

                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400 font-bold">
                      Booking summary
                    </p>

                    <h3 className="text-xl font-extrabold mt-2">
                      {event.title}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-300 text-sm mt-3">
                      <MapPin size={15} />
                      {event.location}
                    </div>

                  </div>


                  {/* CONTENT */}

                  <div className="p-6 space-y-5">

                    {/* STAY */}

                    <div className="flex gap-3">

                      <Hotel
                        size={19}
                        className="text-sky-500 shrink-0 mt-0.5"
                      />

                      <div>

                        <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
                          Stay
                        </p>

                        <p className="text-sm font-bold text-gray-900 mt-1">
                          {selectedStay.name}
                        </p>

                      </div>

                    </div>


                    {/* DURATION */}

                    <div className="flex gap-3">

                      <Clock3
                        size={19}
                        className="text-sky-500 shrink-0 mt-0.5"
                      />

                      <div>

                        <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
                          Duration
                        </p>

                        <p className="text-sm font-bold text-gray-900 mt-1">
                          {durationText}
                        </p>

                      </div>

                    </div>


                    {/* DATE */}

                    <div className="flex gap-3">

                      <CalendarDays
                        size={19}
                        className="text-sky-500 shrink-0 mt-0.5"
                      />

                      <div>

                        <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
                          Date
                        </p>

                        <p className="text-sm font-bold text-gray-900 mt-1">
                          {checkIn || "Not selected"}
                          {stayMode === "days" &&
                            checkOut
                            ? ` → ${checkOut}`
                            : ""}
                        </p>

                      </div>

                    </div>


                    {/* PILGRIMS */}

                    <div className="flex gap-3">

                      <Users
                        size={19}
                        className="text-sky-500 shrink-0 mt-0.5"
                      />

                      <div>

                        <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
                          Pilgrims
                        </p>

                        <p className="text-sm font-bold text-gray-900 mt-1">
                          {pilgrimCount}
                        </p>

                      </div>

                    </div>


                    {/* FOOD */}

                    <div className="flex gap-3">

                      <Utensils
                        size={19}
                        className="text-sky-500 shrink-0 mt-0.5"
                      />

                      <div>

                        <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
                          Food
                        </p>

                        <p className="text-sm font-bold text-gray-900 mt-1">
                          Lunch + Dinner
                        </p>

                      </div>

                    </div>


                    {/* PRICE */}

                    <div className="border-t border-gray-100 pt-5">

                      <div className="flex items-center justify-between gap-4">

                        <div>
                          <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
                            Stay estimate
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            Based on selected duration
                          </p>
                        </div>

                        <p className="text-2xl font-extrabold text-gray-950">
                          ₹{stayTotal.toLocaleString("en-IN")}
                        </p>

                      </div>

                    </div>


                    {/* SUBMIT */}

                    <button
                      type="submit"
                      disabled={
                        isSubmitting ||
                        !lunch ||
                        !dinner
                      }
                      className="
                        w-full
                        h-14
                        rounded-xl
                        bg-sky-500
                        hover:bg-sky-600
                        disabled:bg-gray-300
                        disabled:cursor-not-allowed
                        text-white
                        font-extrabold
                        flex
                        items-center
                        justify-center
                        gap-2
                        transition-colors
                      "
                    >

                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Complete Booking
                          <ArrowRight size={18} />
                        </>
                      )}

                    </button>


                    <div className="flex items-start gap-2 text-xs text-gray-400 leading-5">
                      <ShieldCheck
                        size={15}
                        className="text-sky-500 shrink-0 mt-0.5"
                      />

                      <span>
                        Your contact details are used to process this pilgrimage booking request.
                      </span>
                    </div>

                  </div>

                </div>

              </aside>

            </form>

          </section>

        )}


        {/* =====================================================
            SUCCESS
        ====================================================== */}

        {showSuccess && selectedStay && (

          <section
            id="confirmation"
            className="mt-10 scroll-mt-6"
          >

            <div className="bg-white border-2 border-emerald-200 rounded-[28px] p-6 md:p-9 shadow-sm">

              <div className="flex items-start gap-4">

                <div className="w-13 h-13 min-w-[52px] rounded-full bg-emerald-50 flex items-center justify-center">

                  <CheckCircle2
                    size={28}
                    className="text-emerald-500"
                  />

                </div>

                <div>

                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-500">
                    Request received
                  </p>

                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-950 mt-1">
                    Booking request submitted
                  </h2>

                  <p className="text-gray-500 mt-2 leading-relaxed">
                    Your pilgrimage booking request has been submitted successfully.
                    Our team can follow up using the contact details you provided.
                  </p>

                </div>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">

                <div className="bg-gray-50 rounded-2xl p-5">

                  <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
                    Event
                  </p>

                  <p className="font-bold text-gray-950 mt-1">
                    {event.title}
                  </p>

                </div>


                <div className="bg-gray-50 rounded-2xl p-5">

                  <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
                    Stay
                  </p>

                  <p className="font-bold text-gray-950 mt-1">
                    {selectedStay.name}
                  </p>

                </div>


                <div className="bg-gray-50 rounded-2xl p-5">

                  <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
                    Duration
                  </p>

                  <p className="font-bold text-gray-950 mt-1">
                    {durationText}
                  </p>

                </div>


                <div className="bg-gray-50 rounded-2xl p-5">

                  <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
                    Food
                  </p>

                  <p className="font-bold text-gray-950 mt-1">
                    Lunch + Dinner
                  </p>

                </div>

              </div>


              <Link
                href="/pilgrim"
                className="inline-flex items-center gap-2 mt-7 bg-gray-950 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                Explore More Pilgrimages
                <ArrowRight size={18} />
              </Link>

            </div>

          </section>

        )}


        {/* =====================================================
            IMPORTANT PLACES + TRAVEL
        ====================================================== */}

        <section className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* PLACES */}

          <div className="bg-white rounded-[26px] border border-gray-200 p-6 md:p-8 shadow-sm">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center">
                <Compass
                  size={21}
                  className="text-sky-500"
                />
              </div>

              <div>

                <p className="text-xs uppercase tracking-wider font-bold text-sky-500">
                  Explore
                </p>

                <h2 className="text-2xl font-extrabold text-gray-950">
                  Important Places
                </h2>

              </div>

            </div>


            <div className="space-y-3">

              {event.places.map(
                (place) => (

                  <div
                    key={place}
                    className="flex items-center gap-3 bg-gray-50 hover:bg-sky-50 rounded-xl p-4 transition-colors"
                  >

                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0">
                      <MapPin
                        size={17}
                        className="text-sky-500"
                      />
                    </div>

                    <span className="font-semibold text-gray-700">
                      {place}
                    </span>

                  </div>

                )
              )}

            </div>

          </div>


          {/* TRAVEL */}

          <div className="bg-white rounded-[26px] border border-gray-200 p-6 md:p-8 shadow-sm">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center">
                <Bus
                  size={21}
                  className="text-sky-500"
                />
              </div>

              <div>

                <p className="text-xs uppercase tracking-wider font-bold text-sky-500">
                  Transportation
                </p>

                <h2 className="text-2xl font-extrabold text-gray-950">
                  Getting There
                </h2>

              </div>

            </div>


            <div className="space-y-3">

              {event.travel.map(
                (travel) => (

                  <div
                    key={travel}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-4"
                  >

                    <CheckCircle2
                      size={18}
                      className="text-sky-500 shrink-0"
                    />

                    <span className="font-semibold text-gray-700">
                      {travel}
                    </span>

                  </div>

                )
              )}

            </div>

          </div>

        </section>


        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <section className="mt-12 mb-8">

          <div className="bg-gray-950 rounded-[28px] p-7 md:p-10 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-400">
                CrowdGrid Pilgrimages
              </p>

              <h2 className="text-2xl md:text-3xl font-extrabold mt-2">
                Explore another spiritual journey
              </h2>

              <p className="text-gray-400 mt-2">
                Discover more pilgrimage events across India.
              </p>

            </div>


            <Link
              href="/pilgrim"
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-extrabold px-7 py-4 rounded-xl transition-colors"
            >
              View All Events
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}