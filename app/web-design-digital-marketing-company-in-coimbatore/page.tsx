import React from "react";
import Footer from "@/components/Footer";
import ServicesBento from "@/components/ServicesBento";
import FAQ from "@/components/FAQ";
import { FiStar, FiCheckCircle, FiPhoneCall } from "react-icons/fi";

export const metadata = {
  title: "Web Design & Digital Marketing Company in Coimbatore | Brand Craftsman",
  description: "Brand Craftsman is the #1 Web Design & Digital Marketing Company in Coimbatore. We combine high-end branding, bespoke software engineering, and Search Pin SEO strategies to scale your business.",
};

export default function PrimaryKeywordLandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-16 transition-colors duration-300">
      
      {/* Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-general text-xs uppercase tracking-widest border border-blue-500/20">
          <FiStar className="text-yellow-400" /> Premier Agency in Coimbatore
        </div>

        <h1 className="font-zentry text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6 max-w-5xl mx-auto">
          Web Design & Digital Marketing Company in Coimbatore
        </h1>

        <p className="font-robert-regular text-lg sm:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          Engineered for business leaders, ambitious startups, and growth-minded enterprises. We combine bespoke web engineering with performance marketing to scale your revenue.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="px-8 py-4 bg-yellow-400 text-black font-bold uppercase rounded-xl tracking-wider hover:bg-yellow-300 transition-all shadow-[0_0_30px_rgba(250,204,21,0.4)]"
          >
            Get Free Consultation
          </a>
          <a
            href="tel:+919876543210"
            className="px-8 py-4 bg-gray-100 dark:bg-zinc-800 text-black dark:text-white font-bold uppercase rounded-xl tracking-wider hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all flex items-center gap-2"
          >
            <FiPhoneCall /> Call Our Experts
          </a>
        </div>
      </section>

      {/* Key Proof Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-gray-50 dark:bg-zinc-900/60 rounded-3xl border border-gray-200 dark:border-zinc-800 text-center">
          <div>
            <div className="font-zentry text-3xl sm:text-5xl font-black text-blue-500">55%</div>
            <p className="font-general text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mt-1">B2B Lead Growth</p>
          </div>
          <div>
            <div className="font-zentry text-3xl sm:text-5xl font-black text-emerald-500">40%</div>
            <p className="font-general text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mt-1">Retail Lead Uplift</p>
          </div>
          <div>
            <div className="font-zentry text-3xl sm:text-5xl font-black text-purple-500">3X</div>
            <p className="font-general text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mt-1">Customer Inquiries</p>
          </div>
          <div>
            <div className="font-zentry text-3xl sm:text-5xl font-black text-amber-500">30+</div>
            <p className="font-general text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mt-1">Projects Delivered</p>
          </div>
        </div>
      </section>

      {/* Detailed Keyword SEO Content */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-gray-200 dark:border-zinc-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-zentry text-3xl sm:text-5xl font-black uppercase leading-tight">
              Why Brand Craftsman is the Leading Web Design & Digital Marketing Company in Coimbatore
            </h2>
            <div className="font-robert-regular text-gray-700 dark:text-gray-300 space-y-4 text-base leading-relaxed">
              <p>
                In today&apos;s digital-first economy, simply having a website is no longer sufficient. You need a dedicated, high-speed digital sales platform backed by strategic search engine optimization, performance advertising, and unified visual branding.
              </p>
              <p>
                As the top <strong>Web Design & Digital Marketing Company in Coimbatore</strong>, Brand Craftsman bridges the crucial gap between aesthetic web design and ROI-centric digital marketing campaigns. Founded by Santhosh Shanmugasundaram and Hari Prashath, our agency brings 7+ years of hands-on field experience building bespoke digital infrastructure for regional, national, and international clients.
              </p>
              <p>
                Our strategic synergy with <strong>Search Pin</strong> (our dedicated digital marketing arm established in 2024) ensures that your web application isn&apos;t just visual eye candy—it is engineered to rank #1 on Google, capture high-intent organic traffic, and convert visitors into high-paying customers.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 via-zinc-900 to-black p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            <h3 className="font-zentry text-2xl sm:text-3xl font-bold uppercase text-white">
              What Sets Our Coimbatore Agency Apart?
            </h3>
            <ul className="space-y-4 text-sm sm:text-base font-robert-regular text-gray-300">
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-blue-400 text-xl shrink-0 mt-0.5" />
                <span><strong>Bespoke Next.js & React Frameworks:</strong> Ultra-fast page loads, sub-second latency, and responsive mobile-first UI design.</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-blue-400 text-xl shrink-0 mt-0.5" />
                <span><strong>Search Pin Power Ingestion:</strong> Deep technical SEO, schema markup, and localized keyword targeting built directly into the site architecture.</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-blue-400 text-xl shrink-0 mt-0.5" />
                <span><strong>Elite 5+ Year Specialist Network:</strong> Instant access to senior UI designers, full-stack engineers, and ad managers.</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-blue-400 text-xl shrink-0 mt-0.5" />
                <span><strong>Omnichannel Brand Stewardship:</strong> Universal consistency across print, web apps, social media, and Google Ads.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services Bento Overview */}
      <ServicesBento />

      {/* FAQs */}
      <FAQ />

      <Footer />
    </div>
  );
}
