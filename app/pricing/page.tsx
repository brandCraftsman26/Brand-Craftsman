"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import PageHero from "@/components/PageHero";
import { FiCheck, FiArrowRight, FiZap } from "react-icons/fi";

const CTASection = dynamic(() => import("@/components/CTASection"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

const plans = {
  monthly: [
    {
      tier: "Branding & Print",
      label: "Visual Identity & Print Setup",
      price: "₹14,999",
      period: "/package",
      cta: "Order Branding Pack",
      popular: false,
      features: [
        "Custom Logo & Iconography Suite",
        "HD Business Cards & Printing Designs",
        "Brand Style Guide & Color System",
        "Social Media Kit & Header Banners",
        "Vector Print-Ready Source Files",
        "High-Fidelity Product Mockups",
        "3 Rounds of Iterative Revisions",
      ],
    },
    {
      tier: "Web & SEO Growth",
      label: "Most Popular // Scalable Digital Engine",
      price: "₹29,999",
      period: "/mo",
      cta: "Launch Web & SEO",
      popular: true,
      features: [
        "High-Speed Next.js Custom Web App",
        "Search Pin Technical SEO & Schema",
        "Mobile Responsive & Glassmorphism UI",
        "Coimbatore Local Keyword Domination",
        "Core Web Vitals Performance Tuning",
        "Google Ads & Analytics Dashboard",
        "Monthly Growth & Conversion Reports",
        "WhatsApp & Lead CRM Integration",
        "Continuous Performance A/B Testing",
      ],
    },
    {
      tier: "Enterprise Omni-Suite",
      label: "Full App & Digital Marketing",
      price: "Custom",
      period: "",
      cta: "Contact Enterprise Sales",
      popular: false,
      features: [
        "Everything in Web & SEO Growth",
        "Custom iOS & Android Mobile Apps",
        "Omni-Channel Social & Performance Marketing",
        "Dedicated Account Lead & Strategist",
        "White-Glove 24/7 Priority SLA",
        "REST API & Cloud Database Architecture",
        "Multi-Brand Management & Press Release",
        "Quarterly Executive Growth Reviews",
      ],
    },
  ],
  yearly: [
    {
      tier: "Branding & Print",
      label: "Visual Identity & Print Setup",
      price: "₹12,499",
      period: "/package",
      cta: "Order Branding Pack",
      popular: false,
      features: [
        "Custom Logo & Iconography Suite",
        "HD Business Cards & Printing Designs",
        "Brand Style Guide & Color System",
        "Social Media Kit & Header Banners",
        "Vector Print-Ready Source Files",
        "High-Fidelity Product Mockups",
        "3 Rounds of Iterative Revisions",
      ],
    },
    {
      tier: "Web & SEO Growth",
      label: "Most Popular // Save 20% Annual",
      price: "₹23,999",
      period: "/mo",
      cta: "Launch Web & SEO",
      popular: true,
      features: [
        "High-Speed Next.js Custom Web App",
        "Search Pin Technical SEO & Schema",
        "Mobile Responsive & Glassmorphism UI",
        "Coimbatore Local Keyword Domination",
        "Core Web Vitals Performance Tuning",
        "Google Ads & Analytics Dashboard",
        "Monthly Growth & Conversion Reports",
        "WhatsApp & Lead CRM Integration",
        "Continuous Performance A/B Testing",
      ],
    },
    {
      tier: "Enterprise Omni-Suite",
      label: "Full App & Digital Marketing",
      price: "Custom",
      period: "",
      cta: "Contact Enterprise Sales",
      popular: false,
      features: [
        "Everything in Web & SEO Growth",
        "Custom iOS & Android Mobile Apps",
        "Omni-Channel Social & Performance Marketing",
        "Dedicated Account Lead & Strategist",
        "White-Glove 24/7 Priority SLA",
        "REST API & Cloud Database Architecture",
        "Multi-Brand Management & Press Release",
        "Quarterly Executive Growth Reviews",
      ],
    },
  ],
};

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const activePlans = isYearly ? plans.yearly : plans.monthly;

  return (
    <>
      <PageHero
        title="Transparent Pricing Plans"
        description="Clear, honest pricing for every stage of your business. Zero hidden fees, no surprise costs — designed for maximum ROI."
        primaryCta={{ label: "Start Your Project", href: "/contact" }}
        secondaryCta={{ label: "Compare Capabilities", href: "#plans" }}
      />

      {/* Pricing Section */}
      <section id="plans" className="py-24 md:py-36 bg-slate-50 dark:bg-[#07011F] overflow-hidden">
        {/* Intellio Mesh Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#6766FF]/10 blur-[160px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Toggle */}
          <div className="flex flex-col items-center mb-16">
            <p className="font-robert-medium text-slate-800 dark:text-zinc-100 text-lg md:text-xl font-bold mb-6">
              Save up to <span className="text-cyan-400">20% OFF</span> with annual billing.
            </p>
            <div className="flex items-center gap-3 p-2 rounded-full bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-xl">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-8 py-3 rounded-full font-general text-xs md:text-sm uppercase tracking-widest font-bold transition-all duration-300 ${
                  !isYearly
                    ? "bg-gradient-to-r from-[#6766FF] to-[#00F0FF] text-white shadow-lg shadow-indigo-500/30"
                    : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-8 py-3 rounded-full font-general text-xs md:text-sm uppercase tracking-widest font-bold transition-all duration-300 ${
                  isYearly
                    ? "bg-gradient-to-r from-[#6766FF] to-[#00F0FF] text-white shadow-lg shadow-indigo-500/30"
                    : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {activePlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-3xl p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between ${
                  plan.popular
                    ? "bg-[#0F0927] text-white border-2 border-cyan-400 shadow-[0_0_50px_rgba(0,240,255,0.3)] scale-[1.03]"
                    : "bg-white dark:bg-[#0F0927]/80 border border-slate-200 dark:border-white/10 hover:border-cyan-400/50 hover:shadow-xl"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-[#6766FF] via-[#00F0FF] to-[#FF007A] text-white font-general text-xs uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(103,102,255,0.6)] flex items-center gap-2">
                    <FiZap className="w-4 h-4 text-yellow-300 animate-bounce" /> MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="text-center mb-8">
                    <span className={`font-general text-xs uppercase tracking-widest font-bold ${plan.popular ? "text-cyan-400" : "text-indigo-600 dark:text-cyan-400"}`}>
                      {plan.label}
                    </span>
                    <h3 className={`font-zentry text-4xl md:text-5xl lg:text-6xl font-black uppercase mt-3 mb-1 ${plan.popular ? "text-white" : "text-slate-900 dark:text-white"}`}>
                      {plan.price}
                    </h3>
                    {plan.period && (
                      <p className={`font-robert-medium text-sm font-semibold ${plan.popular ? "text-zinc-300" : "text-slate-600 dark:text-zinc-400"}`}>
                        {plan.period}
                      </p>
                    )}
                  </div>

                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3.5">
                        <FiCheck className={`w-5 h-5 flex-shrink-0 ${plan.popular ? "text-cyan-400" : "text-emerald-500"}`} />
                        <span className={`font-robert-medium text-base font-semibold ${plan.popular ? "text-zinc-100" : "text-slate-800 dark:text-zinc-200"}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="/contact"
                  className={plan.popular ? "btn-genz w-full justify-center" : "btn-genz-outline w-full justify-center"}
                >
                  {plan.cta}
                  <FiArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </>
  );
}
