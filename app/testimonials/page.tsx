"use client";

import React from "react";
import Footer from "@/components/Footer";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  FiStar,
  FiMessageSquare,
  FiCheckCircle,
  FiArrowRight,
  FiExternalLink,
} from "react-icons/fi";
import TiltCard3D from "@/components/3d/TiltCard3D";

const FloatingGeometry = dynamic(() => import("@/components/3d/FloatingGeometry"), { ssr: false });
const PortfolioStrip = dynamic(() => import("@/components/PortfolioStrip"), { ssr: false });

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Founder & Director",
    company: "Happy Kurtis",
    website: "happykurtis.com",
    rating: 5,
    quote:
      "Brand Craftsman completely transformed our e-commerce experience. Our mobile checkout speed increased dramatically, and our online sales grew by 140% in the first quarter post-launch.",
    category: "E-Commerce & Retail",
  },
  {
    name: "Suresh Balakrishnan",
    role: "Managing Director",
    company: "Awetech Water Purifier",
    website: "awetechwaterpurifier.in",
    rating: 5,
    quote:
      "The Search Pin SEO integration and high-speed Next.js platform brought us qualified corporate water purification inquiries every single day. The team delivers what they promise.",
    category: "Industrial & Manufacturing",
  },
  {
    name: "Priya Senthil",
    role: "Creative Head",
    company: "SS Fashions",
    website: "ssfashions.net",
    rating: 5,
    quote:
      "Their brand identity guidelines and apparel catalog layouts are of global standard. The visual craftsmanship made our luxury knitwear line stand out immediately in international expos.",
    category: "Fashion & Export",
  },
  {
    name: "David Sterling",
    role: "Operations VP",
    company: "Fortress One Australia",
    website: "fortressone.com.au",
    rating: 5,
    quote:
      "Working across time zones was completely frictionless. The Brand Craftsman team engineered our custom web platform with military precision and flawless responsiveness.",
    category: "Enterprise Security",
  },
  {
    name: "Muruganandam",
    role: "Founder",
    company: "Star Ambulance Services",
    website: "starambulance.in",
    rating: 5,
    quote:
      "In emergency medical services, a slow website can cost lives. Our new platform loads in under a second and emergency phone dispatch buttons convert immediately.",
    category: "Healthcare & Emergency",
  },
  {
    name: "Karthik Subramaniam",
    role: "Head of Marketing",
    company: "NitroWare Technologies",
    website: "nitrowaretechnologies.com",
    rating: 5,
    quote:
      "Their deep technical understanding of modern web frameworks and developer UI gave our software products the commanding brand presence we needed to raise our Series-A.",
    category: "Tech & Software",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-0 transition-colors duration-300">
      {/* Hero with 3D Scene */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center overflow-hidden">
        <FloatingGeometry scene="testimonials" className="opacity-50 dark:opacity-75" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-general text-xs uppercase tracking-widest border border-emerald-500/20 backdrop-blur-md">
            <FiStar /> Verified Client Feedback
          </div>

          <h1 className="font-zentry text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-wide leading-[1.08] mb-6">
            Client Voices & Endorsements
          </h1>

          <p className="font-robert-regular text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Hear directly from founders, managing directors, and brand custodians who trusted Brand Craftsman to architect their digital platforms and scale their revenue.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/portfolios"
              className="px-8 py-3.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-violet-500/25 flex items-center gap-2"
            >
              Inspect Client Websites <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-sm border border-zinc-200 dark:border-zinc-800 transition-all duration-300"
            >
              Start Your Partnership
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Grid with 3D Tilt Cards */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 border-t border-zinc-100 dark:border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <TiltCard3D key={idx} tiltIntensity={10} className="h-full rounded-3xl">
              <div className="p-8 h-full rounded-3xl bg-zinc-50/80 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 shadow-sm hover:shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400 gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <FiStar key={i} className="fill-amber-400 w-4 h-4" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      Verified Client
                    </span>
                  </div>

                  <p className="font-robert-regular text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="border-t border-zinc-200/80 dark:border-zinc-800/80 pt-4">
                  <h4 className="font-zentry text-lg font-bold text-gray-900 dark:text-white uppercase">
                    {t.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {t.role}, <span className="font-semibold text-gray-700 dark:text-gray-300">{t.company}</span>
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-violet-600 dark:text-violet-400">
                    <span>{t.category}</span>
                    <a
                      href={`https://${t.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline font-semibold"
                    >
                      {t.website} <FiExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* Featured Live Client Portfolios */}
      <PortfolioStrip
        title="Experience Their Live Websites"
        subtitle="Test the live platforms of our featured client partners in real desktop and mobile viewports."
        maxItems={8}
      />

      <Footer />
    </div>
  );
}
