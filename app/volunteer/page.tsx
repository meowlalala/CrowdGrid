"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { submitVolunteer } from "@/app/actions";
import { Check, Send, AlertCircle } from "lucide-react";

export default function VolunteerPage() {
  const [skills, setSkills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const toggleSkill = (skill: string) => {
    setSkills((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : [...current, skill]
    );
  };

  const handleSubmit = async (formData: FormData) => {
    if (skills.length === 0) {
      toast.error("Please select at least one skill.");
      return;
    }

    setIsSubmitting(true);
    skills.forEach((skill) => formData.append("skills", skill));

    const result = await submitVolunteer(formData);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Volunteer Registration submitted successfully!");
      setSkills([]);
      formRef.current?.reset();
    }
    setIsSubmitting(false);
  };

  const skillOptions = [
    { id: "first-aid", title: "First Aid", description: "Medical assistance" },
    { id: "logistics", title: "Logistics", description: "Crowd control & routing" },
    { id: "translation", title: "Translation", description: "Multi-lingual support" },
    { id: "information", title: "Information", description: "Guiding pilgrims" },
  ];

  return (
    <main className="flex-1 px-4 py-8 max-w-2xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">
          Volunteer Registration
        </h1>
        <p className="text-gray-600">
          Join our network to assist pilgrims during their journey. Your support makes a difference.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        <form ref={formRef} action={handleSubmit} className="space-y-8">
          
          {/* PERSONAL INFO */}
          <section className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required id="fullName" name="fullName" type="text" placeholder="Enter your full name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input required id="phone" name="phone" type="tel" defaultValue="+91 " className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input id="email" name="email" type="email" placeholder="Optional" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
                </div>
              </div>
            </div>
          </section>

          {/* AVAILABILITY */}
          <section className="space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
              Availability
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration of Stay</label>
                <select required id="duration" name="duration" defaultValue="" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer">
                  <option value="" disabled>Select duration...</option>
                  <option value="1-3">1-3 Days</option>
                  <option value="4-7">4-7 Days</option>
                  <option value="7+">More than 7 Days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Zone</label>
                <div className="grid grid-cols-2 gap-3 h-[50px]">
                  <label className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-700">
                    <input required name="zone" type="radio" value="base-camp" className="sr-only" />
                    <span className="text-sm font-medium">Base Camp</span>
                  </label>
                  <label className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-700">
                    <input required name="zone" type="radio" value="transit-route" className="sr-only" />
                    <span className="text-sm font-medium">Transit Route</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* SKILLS */}
          <section className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                Skills & Expertise
              </h2>
              <p className="text-sm text-gray-500 mt-2">Select any areas where you can provide assistance.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {skillOptions.map((skill) => {
                const selected = skills.includes(skill.id);
                return (
                  <label key={skill.id} className="relative block cursor-pointer group">
                    <input type="checkbox" className="sr-only" checked={selected} onChange={() => toggleSkill(skill.id)} />
                    <div className={`border rounded-xl p-4 transition-all flex items-start gap-3 ${selected ? "border-emerald-500 bg-emerald-50 shadow-sm" : "border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100"}`}>
                      <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors border ${selected ? "bg-emerald-500 border-emerald-500" : "bg-white border-gray-300"}`}>
                        {selected && <Check size={14} className="text-white" />}
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${selected ? "text-emerald-800" : "text-gray-900"}`}>{skill.title}</div>
                        <div className={`text-xs mt-1 ${selected ? "text-emerald-700" : "text-gray-500"}`}>{skill.description}</div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:shadow-lg hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            <Send size={20} />
            {isSubmitting ? "Submitting..." : "Submit Registration"}
          </button>
        </form>
      </div>
    </main>
  );
}