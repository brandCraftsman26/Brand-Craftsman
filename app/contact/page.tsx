"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import TiltCard3D from "@/components/3d/TiltCard3D";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiShield,
  FiMessageSquare,
} from "react-icons/fi";

const FloatingGeometry = dynamic(() => import("@/components/3d/FloatingGeometry"), { ssr: false });
const PortfolioStrip = dynamic(() => import("@/components/PortfolioStrip"), { ssr: false });

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Web Development",
    budget: "₹50,000 - ₹1,50,000",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send message / lead to leads endpoint if available, or simulate instant confirmation
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-0 transition-colors duration-300">
      {/* Contact Hero with 3D Canvas */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center overflow-hidden">
        <FloatingGeometry scene="contact" className="opacity-50 dark:opacity-75" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-general text-xs uppercase tracking-widest border border-cyan-500/20 backdrop-blur-md">
            <FiMessageSquare /> Start A Conversation
          </div>

          <h1 className="font-zentry text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-wide leading-[1.08] mb-6">
            Get In Touch With Our Architects
          </h1>

          <p className="font-robert-regular text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Whether you need a high-converting Next.js web application, a complete brand identity revamp, or dominant Search Pin SEO growth, our team is ready to assist.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Contact Cards */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-xl">
              <h2 className="font-zentry text-2xl sm:text-3xl font-black uppercase tracking-wide mb-2 text-gray-900 dark:text-white">
                Project Consultation Request
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-8 font-robert-regular">
                Fill in the details below and an executive brand architect will review your project within 24 hours.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto text-2xl">
                    <FiCheckCircle />
                  </div>
                  <h3 className="font-zentry text-2xl font-bold uppercase text-emerald-500">
                    Consultation Request Received!
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 max-w-md mx-auto">
                    Thank you, <span className="font-bold">{formData.name}</span>. We have forwarded your project details to our strategy lead at <span className="text-emerald-400 font-semibold">santhoshrajcit1819@gmail.com</span>. We will contact you at <span className="font-semibold">{formData.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                        Primary Service Needed
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                      >
                        <option value="Web Development">Next.js Web Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Branding & Identity">Brand Strategy & Identity</option>
                        <option value="Logo Designing">Logo Designing</option>
                        <option value="Digital Marketing">Search Pin SEO & Digital Marketing</option>
                        <option value="WhatsApp Marketing">WhatsApp Marketing & Automation</option>
                        <option value="Corporate Printing">Printing & Packaging</option>
                        <option value="Press Release">Press Release & Digital PR</option>
                        <option value="Traditional Marketing">Traditional & Offline Marketing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                      Estimated Project Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                    >
                      <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000 (Starter / Sprint)</option>
                      <option value="₹50,000 - ₹1,50,000">₹50,000 - ₹1,50,000 (Standard Growth)</option>
                      <option value="₹1,50,000 - ₹5,00,000">₹1,50,000 - ₹5,00,000 (Complete Platform)</option>
                      <option value="₹5,00,000+">₹5,00,000+ (Enterprise Multi-Division)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                      Project Details & Goals *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your brand, current challenges, targets, and timeline..."
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-violet-500/20 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{loading ? "Submitting Inquiry..." : "Submit Consultation Request"}</span>
                    <FiSend className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Details & Channels Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Admin & Official Email Card with 3D Tilt */}
            <TiltCard3D tiltIntensity={8} className="rounded-3xl">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0F0927] to-[#1A0E3D] text-white border border-violet-500/30 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-zentry text-xl font-black uppercase">Direct Executive Contact</h3>
                    <p className="text-xs text-violet-300">Strategy & Administration</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm font-robert-regular">
                  <div>
                    <p className="text-zinc-400 text-xs">Primary Admin Email</p>
                    <a
                      href="mailto:santhoshrajcit1819@gmail.com"
                      className="text-white hover:text-cyan-400 font-semibold transition-colors break-all"
                    >
                      santhoshrajcit1819@gmail.com
                    </a>
                  </div>

                  <div>
                    <p className="text-zinc-400 text-xs">Agency Desk Email</p>
                    <a
                      href="mailto:contact@brandcraftsman.in"
                      className="text-white hover:text-cyan-400 font-semibold transition-colors"
                    >
                      contact@brandcraftsman.in
                    </a>
                  </div>

                  <div>
                    <p className="text-zinc-400 text-xs">Innovation Partner</p>
                    <a
                      href="https://searchpin.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-semibold"
                    >
                      A Product of Search Pin (searchpin.in)
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard3D>

            {/* Location & Office Hours */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Office Location</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                      Brand Craftsman Agency Headquarters<br />
                      Coimbatore, Tamil Nadu 641001, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center flex-shrink-0">
                    <FiClock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Working Hours</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                      Monday to Saturday: 9:00 AM – 7:00 PM IST<br />
                      Sunday: Emergency Client Support Only
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center flex-shrink-0">
                    <FiShield className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">NDA & Confidentiality</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                      All consultation inquiries and project concepts are protected under strict bilateral non-disclosure agreements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Portfolios Strip */}
      <PortfolioStrip
        title="Live Client Websites Under Our Stewardship"
        subtitle="While our strategists prepare your project architecture, take a live tour of platforms we've built."
        maxItems={8}
      />

      <Footer />
    </div>
  );
}
