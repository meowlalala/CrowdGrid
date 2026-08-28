"use client";

import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { submitPilgrimage } from "@/app/actions";
import {
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  Zap,
  Send,
  Ticket,
} from "lucide-react";

type PackageType = "standard" | "express";

export default function PilgrimPage() {
  const [packageType, setPackageType] =
    useState<PackageType>("standard");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      // Always send the currently selected package.
      formData.set("packageType", packageType);

      const result = await submitPilgrimage(formData);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Pilgrimage request submitted successfully!");

      form.reset();
      setPackageType("standard");
    } catch (error) {
      console.error("Pilgrimage submission error:", error);

      toast.error(
        "Something went wrong while submitting your pilgrimage request."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-8 md:py-10 space-y-10 md:space-y-12">
      {/* =========================
          FEATURED EVENT
      ========================== */}
      <section>
        <div
          className="relative w-full min-h-[400px] md:min-h-[450px] rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex items-end p-6 md:p-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKnBKwYRmjXEC93ptZVLhAxSTIS-IIK5K38Im3W32GPMpxuBnfDynOH3XeiSYa-XmNPylFJ22c4uu-MFTQp5-B6KuXTmca_RM3-neC8SbAc-6lcUOvOvwuDvA4Ftbn6gQsi-fZrNeNH-vEdFJ5CzHg45r2HXMRWLIqNnhvtLx6T7pdUOoJw1wrn4HXXdCE2lKZAafAsFlWo3LUQdlxWGZ78CBxgJp3QFZ978PcIPL_OnN88lIZe41w')",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

          <div className="relative z-10 text-white w-full max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/20 backdrop-blur-md text-white text-xs font-bold mb-4 border border-sky-300/30">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              FEATURED EVENT
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
              Maha Kumbh Mela 2025
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed font-medium max-w-2xl">
              Experience the largest peaceful gathering in the world.
              Join millions in a profound spiritual journey.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          MAIN FORM
      ========================== */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-10 md:space-y-12"
      >
        {/* =========================
            PLAN YOUR PILGRIMAGE
        ========================== */}
        <section className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl p-6 md:p-10 border border-sky-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-300/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-gray-900">
              <MapPin className="text-sky-500" size={26} />
              Plan Your Pilgrimage
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Destination */}
              <div>
                <label
                  htmlFor="destination"
                  className="block text-xs font-bold text-sky-900 mb-2 tracking-wider"
                >
                  DESTINATION
                </label>

                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />

                  <input
                    required
                    id="destination"
                    name="destination"
                    type="text"
                    placeholder="e.g. Varanasi, Ayodhya"
                    autoComplete="off"
                    className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Dates */}
              <div>
                <label
                  htmlFor="dates"
                  className="block text-xs font-bold text-sky-900 mb-2 tracking-wider"
                >
                  DATES
                </label>

                <div className="relative">
                  <Calendar
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />

                  <input
                    required
                    id="dates"
                    name="dates"
                    type="text"
                    placeholder="e.g. Oct 15 - Oct 20"
                    autoComplete="off"
                    className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Pilgrims */}
              <div>
                <label
                  htmlFor="pilgrimCount"
                  className="block text-xs font-bold text-sky-900 mb-2 tracking-wider"
                >
                  PILGRIMS
                </label>

                <div className="relative">
                  <Users
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
                    size={20}
                  />

                  <select
                    required
                    id="pilgrimCount"
                    name="pilgrimCount"
                    defaultValue=""
                    className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-10 py-4 appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all font-medium cursor-pointer text-gray-900"
                  >
                    <option value="" disabled>
                      Select Pilgrims
                    </option>
                    <option value="1">1 Pilgrim</option>
                    <option value="2">2 Pilgrims</option>
                    <option value="3-5">Family (3-5)</option>
                    <option value="6+">Group (6+)</option>
                  </select>

                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            PACKAGE OPTIONS
        ========================== */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Select Package
            </h2>

            <p className="text-gray-500 mt-2">
              Choose the level of assistance you need for your pilgrimage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* =========================
                STANDARD
            ========================== */}
            <button
              type="button"
              onClick={() => setPackageType("standard")}
              aria-pressed={packageType === "standard"}
              className={`text-left bg-white rounded-3xl border-2 p-7 md:p-8 flex flex-col cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
                packageType === "standard"
                  ? "border-gray-900 shadow-md scale-[1.01]"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                  Standard
                </h3>

                <Ticket
                  className={
                    packageType === "standard"
                      ? "text-gray-900"
                      : "text-gray-400"
                  }
                  size={28}
                />
              </div>

              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                Self-guided journey with essential grid access and basic
                amenities.
              </p>

              <ul className="space-y-4 mb-8 border-t border-gray-100 pt-6">
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle
                    className="text-gray-900 mt-0.5 shrink-0"
                    size={20}
                  />
                  <span>Standard Entry Pass</span>
                </li>

                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle
                    className="text-gray-900 mt-0.5 shrink-0"
                    size={20}
                  />
                  <span>General Assembly Access</span>
                </li>

                <li className="flex items-start gap-3 text-gray-400 font-medium">
                  <span className="w-5 h-5 rounded-full border-2 border-gray-300 mt-0.5 shrink-0" />
                  <span>No Express Ticketing</span>
                </li>
              </ul>

              <div
                className={`w-full font-bold rounded-xl py-4 flex justify-center items-center gap-2 transition-colors ${
                  packageType === "standard"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {packageType === "standard"
                  ? "Selected"
                  : "Select Standard"}
              </div>
            </button>

            {/* =========================
                EXPRESS
            ========================== */}
            <button
              type="button"
              onClick={() => setPackageType("express")}
              aria-pressed={packageType === "express"}
              className={`text-left bg-white rounded-3xl border-2 p-7 md:p-8 flex flex-col relative cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                packageType === "express"
                  ? "border-sky-500 shadow-lg shadow-sky-500/10 scale-[1.01]"
                  : "border-sky-100 hover:border-sky-200 hover:shadow-sm"
              }`}
            >
              <div className="absolute top-6 right-6 bg-gradient-to-r from-sky-500 to-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Zap size={14} className="fill-white" />
                RECOMMENDED
              </div>

              <div className="mb-4 flex items-center mt-2">
                <h3 className="text-2xl font-bold text-sky-500">
                  Express
                </h3>
              </div>

              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                Priority access with dedicated guidance and premium
                amenities.
              </p>

              <ul className="space-y-4 mb-8 border-t border-sky-50 pt-6">
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle
                    className="text-sky-500 mt-0.5 shrink-0"
                    size={20}
                  />
                  <span>Priority Express Pass</span>
                </li>

                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle
                    className="text-sky-500 mt-0.5 shrink-0"
                    size={20}
                  />
                  <span>Dedicated Viewing Areas</span>
                </li>

                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle
                    className="text-sky-500 mt-0.5 shrink-0"
                    size={20}
                  />
                  <span>Guided Assistance Available</span>
                </li>
              </ul>

              <div
                className={`w-full font-bold rounded-xl py-4 flex justify-center items-center gap-2 transition-colors ${
                  packageType === "express"
                    ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white"
                    : "bg-sky-50 text-sky-600"
                }`}
              >
                {packageType === "express"
                  ? "Selected"
                  : "Select Express"}
              </div>
            </button>
          </div>

          {/* Hidden value also keeps the selected package available */}
          <input
            type="hidden"
            name="packageType"
            value={packageType}
          />
        </section>

        {/* =========================
            SUBMIT
        ========================== */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-end gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[220px] px-10 bg-gray-900 text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-gray-800 active:bg-gray-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Complete Booking
                <Send size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}