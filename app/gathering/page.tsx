"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { submitGathering } from "@/app/actions";
import { Users, Info, MapPin, CheckCircle, ShieldCheck, Flame, Droplets, Phone, Send } from "lucide-react";

export default function GatheringPage() {
  const [policeClearance, setPoliceClearance] = useState(true);
  const [fireSafety, setFireSafety] = useState(false);
  const [sanitation, setSanitation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const toggleStyle = (checked: boolean) => ({
    backgroundColor: checked ? "#f97316" : "#cbd5e1",
  });

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    
    // Append the toggles explicitly since un-checked checkboxes don't submit, but we are using custom buttons
    formData.set("policeClearance", policeClearance.toString());
    formData.set("fireSafety", fireSafety.toString());
    formData.set("sanitation", sanitation.toString());

    const result = await submitGathering(formData);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Gathering request submitted successfully!");
      formRef.current?.reset();
      setPoliceClearance(true);
      setFireSafety(false);
      setSanitation(false);
    }
    setIsSubmitting(false);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* PAGE HEADER */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-1 rounded-full mb-3">
            <Users size={16} className="text-orange-600" />
            <span className="text-orange-600 text-xs font-bold tracking-wider">
              PUBLIC ASSEMBLY
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Organize a Public Gathering
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl text-lg">
            Register your event and secure the necessary clearances to ensure a safe and compliant public assembly.
          </p>
        </div>
      </div>

      <form ref={formRef} action={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* GATHERING DETAILS */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-gray-900 border-b border-gray-100 pb-3">
              <Info className="text-orange-500" />
              Gathering Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
                <input required id="eventName" name="eventName" type="text" placeholder="e.g., Annual City Marathon" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">Purpose of Gathering *</label>
                <select required id="purpose" name="purpose" defaultValue="" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all cursor-pointer">
                  <option value="" disabled>Select gathering type...</option>
                  <option value="protest">Peaceful Protest / Rally</option>
                  <option value="festival">Cultural Festival</option>
                  <option value="sports">Sports Event</option>
                  <option value="religious">Religious Procession</option>
                  <option value="other">Other Public Assembly</option>
                </select>
              </div>

              <div>
                <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-1">Expected Attendees *</label>
                <input required id="attendees" name="attendees" type="number" min="1" placeholder="e.g., 500" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" />
              </div>

              <div>
                <label htmlFor="durationHours" className="block text-sm font-medium text-gray-700 mb-1">Duration (Hours) *</label>
                <input required id="durationHours" name="durationHours" type="number" min="1" max="72" placeholder="e.g., 4" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" />
              </div>
            </div>
          </section>

          {/* LOCATION & SCHEDULE */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-gray-900 border-b border-gray-100 pb-3">
              <MapPin className="text-orange-500" />
              Location & Schedule
            </h2>

            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                  <input required id="startDate" name="startDate" type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" />
                </div>
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                  <input required id="startTime" name="startTime" type="time" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" />
                </div>
              </div>

              <div>
                <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-1">Primary Venue / Assembly Point *</label>
                <input required id="venue" name="venue" type="text" placeholder="Full address of the gathering" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* REQUIRED CLEARANCES */}
          <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-2 text-gray-900 border-b border-gray-100 pb-3">
              <CheckCircle className="text-orange-500" />
              Clearances
            </h2>
            <p className="text-sm text-gray-500 mb-6 mt-3">Select the permits required for your event type.</p>

            <div className="flex flex-col gap-4">
              {/* POLICE */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-blue-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">Police Clearance</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Required for &gt;50 people</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPoliceClearance(!policeClearance)}
                  className="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
                  style={toggleStyle(policeClearance)}
                  role="switch"
                  aria-checked={policeClearance}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${policeClearance ? "translate-x-6" : "translate-x-0"}`} />
                </button>
              </div>

              {/* FIRE */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
                <div className="flex items-center gap-3">
                  <Flame className="text-red-500" />
                  <div>
                    <h3 className="font-bold text-gray-900">Fire Safety NOC</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Enclosed/Stage areas</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFireSafety(!fireSafety)}
                  className="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
                  style={toggleStyle(fireSafety)}
                  role="switch"
                  aria-checked={fireSafety}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${fireSafety ? "translate-x-6" : "translate-x-0"}`} />
                </button>
              </div>

              {/* SANITATION */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
                <div className="flex items-center gap-3">
                  <Droplets className="text-cyan-500" />
                  <div>
                    <h3 className="font-bold text-gray-900">Sanitation Plan</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Waste management</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSanitation(!sanitation)}
                  className="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
                  style={toggleStyle(sanitation)}
                  role="switch"
                  aria-checked={sanitation}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${sanitation ? "translate-x-6" : "translate-x-0"}`} />
                </button>
              </div>
            </div>
          </section>

          {/* EMERGENCY CONTACT */}
          <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-gray-900 border-b border-gray-100 pb-3">
              <Phone className="text-red-500" />
              Emergency Contact
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="organizerName" className="block text-sm font-medium text-gray-700 mb-1">Primary Organizer Name *</label>
                <input required id="organizerName" name="organizerName" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" />
              </div>
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                <input required id="contactNumber" name="contactNumber" type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all" />
              </div>
            </div>
          </section>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:shadow-lg hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            <Send size={20} />
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </main>
  );
}