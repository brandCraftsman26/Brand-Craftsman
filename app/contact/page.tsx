"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import PageHero from "@/components/PageHero";
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageSquare, FiCheckCircle } from "react-icons/fi";

const CTASection = dynamic(() => import("@/components/CTASection"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Digital Marketing",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        title="Contact Brand Craftsman"
        description="Ready to scale your business with premier branding, Next.js web design, and Search Pin performance marketing in Coimbatore? Connect with our team today."
        primaryCta={{ label: "Schedule Consultation", href: "#form" }}
        secondaryCta={{ label: "Call Us Now", href: "tel:+919876543210" }}
      />

      {/* Main Contact Section */}
      <section id="form" className="py-24 md:py-32 bg-slate-50 dark:bg-[#07011F] overflow-hidden">
        {/* Intellio Mesh Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#6766FF]/10 blur-[150px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            
            {/* Contact Info & Office Details */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-500/10 border border-violet-400/30 text-cyan-400 font-general text-xs uppercase tracking-widest font-bold">
                  DIRECT CONTACT // EEAT TRUST
                </span>
                <h2 className="font-zentry text-3xl sm:text-5xl font-black uppercase text-slate-900 dark:text-white">
                  Get In Touch With Our Team
                </h2>
                <p className="font-robert-medium text-slate-700 dark:text-zinc-200 leading-relaxed text-lg font-semibold">
                  Whether you have an established business, a retail brand, or an ambitious startup looking for digital overhaul, Brand Craftsman is ready to execute.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-6 bg-white dark:bg-[#0F0927] rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-400/20 text-cyan-400 flex items-center justify-center text-2xl shrink-0">
                    <FiMapPin />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white uppercase font-zentry text-base">Head Office Location</h3>
                    <p className="text-slate-700 dark:text-zinc-200 text-sm font-medium">Coimbatore, Tamil Nadu, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-white dark:bg-[#0F0927] rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center text-2xl shrink-0">
                    <FiPhone />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white uppercase font-zentry text-base">Direct Phone / WhatsApp</h3>
                    <p className="text-slate-700 dark:text-zinc-200 text-sm font-medium">+91 98765 43210 / +91 91234 56789</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-white dark:bg-[#0F0927] rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg">
                  <div className="w-12 h-12 rounded-2xl bg-purple-400/20 text-purple-400 flex items-center justify-center text-2xl shrink-0">
                    <FiMail />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white uppercase font-zentry text-base">Email Inquiries</h3>
                    <p className="text-slate-700 dark:text-zinc-200 text-sm font-medium">hello@brandcraftsman.com / contact@searchpin.in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="bg-white dark:bg-[#0F0927] p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-white/10 shadow-[0_0_50px_rgba(103,102,255,0.2)]">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <FiCheckCircle className="text-6xl text-emerald-400 mx-auto animate-bounce" />
                  <h3 className="font-zentry text-3xl font-black uppercase text-slate-900 dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="font-robert-medium text-slate-700 dark:text-zinc-200 text-base max-w-md mx-auto font-medium">
                    Thank you for reaching out to Brand Craftsman. A dedicated strategist will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-genz mt-4"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-zentry text-2xl font-black uppercase text-slate-900 dark:text-white mb-2">
                    Send Us A Message
                  </h3>

                  <div>
                    <label className="block text-xs font-general uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2 font-bold">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Santhosh Shanmugasundaram"
                      className="w-full px-4 py-3.5 bg-slate-50 dark:bg-[#080220] border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 text-slate-900 dark:text-white text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-general uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2 font-bold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="santhosh@example.com"
                        className="w-full px-4 py-3.5 bg-slate-50 dark:bg-[#080220] border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 text-slate-900 dark:text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-general uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2 font-bold">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3.5 bg-slate-50 dark:bg-[#080220] border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 text-slate-900 dark:text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-general uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2 font-bold">
                      Primary Service Needed
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3.5 bg-slate-50 dark:bg-[#080220] border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 text-slate-900 dark:text-white text-sm font-medium"
                    >
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Branding">Branding & Corporate Identity</option>
                      <option value="Logo Designing">Logo Designing</option>
                      <option value="Printing">Printing & Packaging</option>
                      <option value="Web Development">Web Design & Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Press Release">Press Release & PR</option>
                      <option value="Social Media Marketing">Social Media Marketing</option>
                      <option value="WhatsApp Marketing">WhatsApp Marketing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-general uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2 font-bold">
                      Project Details & Goals *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your business, current challenges, and project objectives..."
                      className="w-full px-4 py-3.5 bg-slate-50 dark:bg-[#080220] border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-cyan-400 text-slate-900 dark:text-white text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-genz w-full justify-center"
                  >
                    <FiSend /> Send Inquiries Now
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </>
  );
}
