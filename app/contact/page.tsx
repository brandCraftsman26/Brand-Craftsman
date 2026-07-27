"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer";
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageSquare, FiCheckCircle } from "react-icons/fi";

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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-16 transition-colors duration-300">
      
      {/* Contact Hero Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-general text-xs uppercase tracking-widest border border-blue-500/20">
          <FiMessageSquare /> Let's Build Your Legacy
        </div>

        <h1 className="font-zentry text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6">
          Contact Brand Craftsman
        </h1>

        <p className="font-robert-regular text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Ready to scale your business with premier branding, web design, and Search Pin powered digital marketing in Coimbatore? Connect with our founders today.
        </p>
      </section>

      {/* Main Contact Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info & Office Details */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="font-zentry text-3xl font-black uppercase text-black dark:text-white">
                Get In Touch With Our Team
              </h2>
              <p className="font-robert-regular text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                Whether you have a localized retail concept, an ambitious tech startup, or an established enterprise looking for a complete digital overhaul, Brand Craftsman is ready to execute.
              </p>
            </div>

            <div className="space-y-4 font-general text-sm sm:text-base">
              <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-xl shrink-0">
                  <FiMapPin />
                </div>
                <div>
                  <h3 className="font-bold text-black dark:text-white uppercase font-zentry text-sm">Head Office Location</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Coimbatore, Tamil Nadu, India</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xl shrink-0">
                  <FiPhone />
                </div>
                <div>
                  <h3 className="font-bold text-black dark:text-white uppercase font-zentry text-sm">Direct Phone / WhatsApp</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">+91 98765 43210 / +91 91234 56789</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-xl shrink-0">
                  <FiMail />
                </div>
                <div>
                  <h3 className="font-bold text-black dark:text-white uppercase font-zentry text-sm">Email Inquiries</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">hello@brandcraftsman.com / contact@searchpin.in</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl border border-white/10 space-y-3">
              <h3 className="font-zentry text-xl font-bold uppercase text-yellow-400">
                Obligation-Free Consultation
              </h3>
              <p className="font-robert-regular text-xs sm:text-sm text-blue-100">
                Schedule a 30-minute strategic consultation with founders Santhosh & Hari. You will receive a tailored growth roadmap for your brand.
              </p>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="bg-gray-50 dark:bg-zinc-900 p-8 sm:p-10 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <FiCheckCircle className="text-5xl text-emerald-500 mx-auto" />
                <h3 className="font-zentry text-3xl font-bold uppercase text-black dark:text-white">
                  Message Sent Successfully!
                </h3>
                <p className="font-robert-regular text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto">
                  Thank you for reaching out to Brand Craftsman. Dedicated project manager will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-blue-600 text-white font-general text-xs uppercase font-bold rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-zentry text-2xl font-bold uppercase text-black dark:text-white mb-2">
                  Send Us A Message
                </h3>

                <div>
                  <label className="block text-xs font-general uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2 font-bold">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Santhosh Shanmugasundaram"
                    className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-general uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2 font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="santhosh@example.com"
                      className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-general uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2 font-bold">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-general uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2 font-bold">
                    Primary Service Needed
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-gray-800 dark:text-gray-200"
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
                  <label className="block text-xs font-general uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2 font-bold">
                    Project Details & Goals *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your business, current challenges, and project objectives..."
                    className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-yellow-400 text-black font-bold uppercase rounded-xl tracking-wider hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  <FiSend /> Send Inquiries Now
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
