"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { submitPilgrimage } from "@/app/actions";
import { MapPin, Calendar, Users, CheckCircle, Search, Zap, Send, Ticket } from "lucide-react";

export default function PilgrimPage() {
  const [packageType, setPackageType] = useState<"standard" | "express">("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    
    // Ensure packageType is added to form data
    formData.set("packageType", packageType);

    const result = await submitPilgrimage(formData);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Pilgrimage request submitted successfully!");
      formRef.current?.reset();
      setPackageType("standard");
    }
    setIsSubmitting(false);
  };

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-8 space-y-12">
      
      {/* FEATURED EVENT HERO */}
      <section>
        <div
          className="relative w-full h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex items-end p-6 md:p-10 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKnBKwYRmjXEC93ptZVLhAxSTIS-IIK5K38Im3W32GPMpxuBnfDynOH3XeiSYa-XmNPylFJ22c4uu-MFTQp5-B6KuXTmca_RM3-neC8SbAc-6lcUOvOvwuDvA4Ftbn6gQsi-fZrNeNH-vEdFJ5CzHg45r2HXMRWLIqNnhvtLx6T7pdUOoJw1wrn4HXXdCE2lKZAafAsFlWo3LUQdlxWGZ78CBxgJp3QFZ978PcIPL_OnN88lIZe41w')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />

          <div className="relative z-10 text-white w-full max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 backdrop-blur-md text-white text-xs font-bold mb-3 border border-sky-400/30">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
              FEATURED EVENT
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-white">
              Maha Kumbh Mela 2025
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-0 font-medium">
              Experience the largest peaceful gathering in the world. Join millions in a profound spiritual journey.
            </p>
          </div>
        </div>
      </section>

      <form ref={formRef} action={handleSubmit} className="space-y-12">
        {/* PLAN YOUR PILGRIMAGE */}
        <section className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl p-6 md:p-10 border border-sky-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-300/10 rounded-full blur-3xl -mr-32 -mt-32" />

          <h2 className="text-2xl font-bold mb-8 relative z-10 flex items-center gap-2 text-gray-900">
            <MapPin className="text-sky-500" />
            Plan Your Pilgrimage
          </h2>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="destination" className="block text-xs font-bold text-sky-900 mb-2 tracking-wider">
                DESTINATION
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input required id="destination" name="destination" type="text" placeholder="e.g. Varanasi, Ayodhya" className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all font-medium" />
              </div>
            </div>

            <div>
              <label htmlFor="dates" className="block text-xs font-bold text-sky-900 mb-2 tracking-wider">
                DATES
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input required id="dates" name="dates" type="text" placeholder="e.g. Oct 15 - Oct 20" className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all font-medium" />
              </div>
            </div>

            <div>
              <label htmlFor="pilgrimCount" className="block text-xs font-bold text-sky-900 mb-2 tracking-wider">
                PILGRIMS
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select required id="pilgrimCount" name="pilgrimCount" defaultValue="" className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-4 appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all font-medium cursor-pointer">
                  <option value="" disabled>Select Pilgrims</option>
                  <option value="1">1 Pilgrim</option>
                  <option value="2">2 Pilgrims</option>
                  <option value="3-5">Family (3-5)</option>
                  <option value="6+">Group (6+)</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* MANAGEMENT OPTIONS */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Select Package
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* STANDARD */}
            <div 
              onClick={() => setPackageType("standard")}
              className={`bg-white rounded-3xl border-2 p-8 flex flex-col cursor-pointer transition-all ${packageType === "standard" ? "border-gray-900 shadow-md scale-[1.01]" : "border-gray-200 hover:border-gray-300 hover:shadow-sm"}`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Standard</h3>
                <Ticket className={packageType === "standard" ? "text-gray-900" : "text-gray-400"} size={28} />
              </div>

              <p className="text-gray-600 mb-8 flex-grow">
                Self-guided journey with essential grid access and basic amenities.
              </p>

              <ul className="space-y-4 mb-8 border-t border-gray-100 pt-6">
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle className="text-gray-900 mt-0.5" size={20} />
                  Standard Entry Pass
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle className="text-gray-900 mt-0.5" size={20} />
                  General Assembly Access
                </li>
                <li className="flex items-start gap-3 text-gray-400 font-medium">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 mt-0.5" />
                  No Express Ticketing
                </li>
              </ul>

              <div className={`w-full font-bold rounded-xl py-4 flex justify-center items-center gap-2 transition-colors ${packageType === "standard" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500"}`}>
                {packageType === "standard" ? "Selected" : "Select Standard"}
              </div>
            </div>

            {/* EXPRESS */}
            <div 
              onClick={() => setPackageType("express")}
              className={`bg-white rounded-3xl border-2 p-8 flex flex-col relative cursor-pointer transition-all ${packageType === "express" ? "border-sky-500 shadow-lg shadow-sky-500/10 scale-[1.01]" : "border-sky-100 hover:border-sky-200 hover:shadow-sm"}`}
            >
              <div className="absolute top-6 right-6 bg-gradient-to-r from-sky-500 to-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Zap size={14} className="fill-white" />
                RECOMMENDED
              </div>

              <div className="mb-4 flex items-center mt-2">
                <h3 className="text-2xl font-bold text-sky-500">Express</h3>
              </div>

              <p className="text-gray-600 mb-8 flex-grow">
                Priority access with dedicated guidance and premium amenities.
              </p>

              <ul className="space-y-4 mb-8 border-t border-sky-50 pt-6">
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle className="text-sky-500 mt-0.5" size={20} />
                  Priority Express Pass
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle className="text-sky-500 mt-0.5" size={20} />
                  Dedicated Viewing Areas
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle className="text-sky-500 mt-0.5" size={20} />
                  Guided Assistance Available
                </li>
              </ul>

              <div className={`w-full font-bold rounded-xl py-4 flex justify-center items-center gap-2 transition-colors ${packageType === "express" ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white" : "bg-sky-50 text-sky-600"}`}>
                {packageType === "express" ? "Selected" : "Select Express"}
              </div>
            </div>
          </div>
        </section>

        {/* SUBMIT */}
        <div className="pt-8 border-t border-gray-200 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-10 bg-gray-900 text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isSubmitting ? "Processing..." : "Complete Booking"}
            <Send size={18} className="ml-1" />
          </button>
        </div>
      </form>
    </main>
  );
}