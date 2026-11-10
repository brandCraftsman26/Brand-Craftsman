import React from "react";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiShield,
  FiStar,
  FiLayers,
  FiHelpCircle,
  FiArrowLeft,
} from "react-icons/fi";
import { SERVICES_DATA, getServiceBySlug } from "@/lib/services-data";
import FloatingGeometry from "@/components/3d/FloatingGeometry";
import PortfolioStrip from "@/components/PortfolioStrip";

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found | Brand Craftsman" };
  }

  return {
    title: `${service.name} | Brand Craftsman - Web Design & Marketing`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return notFound();
  }

  const relatedServices = SERVICES_DATA.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-16 transition-colors duration-300">
      {/* Back Button & Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        >
          <FiArrowLeft className="w-3.5 h-3.5" /> Back to All Services
        </Link>
      </div>

      {/* Service Hero */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-16 text-center overflow-hidden">
        <FloatingGeometry scene="services" className="opacity-40 dark:opacity-70" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 font-general text-xs uppercase tracking-widest border border-violet-500/20 backdrop-blur-md">
            <FiLayers /> {service.category} // {service.badge}
          </div>

          <h1 className="font-zentry text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wide leading-[1.08] mb-6">
            {service.name}
          </h1>

          <p className="font-robert-regular text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {service.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-violet-500/25 flex items-center gap-2"
            >
              Inquire About {service.name} <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolios"
              className="px-8 py-3.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-sm border border-zinc-200 dark:border-zinc-800 transition-all duration-300"
            >
              View Live Work
            </Link>
          </div>
        </div>
      </section>

      {/* Deliverables & Deliverable Specs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 border-t border-zinc-100 dark:border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest font-general">
              Precision Execution
            </span>
            <h2 className="font-zentry text-2xl sm:text-3xl font-black uppercase tracking-wide leading-tight mt-2 mb-6">
              What We Deliver
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-robert-regular">
              Every engagement is held to rigorous craftsmanship standards. You receive full source files, production-ready assets, documentation, and dedicated implementation guidance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 flex items-start gap-3"
                >
                  <FiCheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Impact Card */}
          <div className="p-8 md:p-10 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold">
                <FiStar className="w-5 h-5" />
              </div>
              <h3 className="font-zentry text-2xl font-black uppercase">Client Advantages</h3>
            </div>

            <div className="space-y-5">
              {service.benefits.map((b, i) => (
                <div key={i} className="border-b border-zinc-800 pb-4 last:border-none last:pb-0">
                  <h4 className="font-robert-medium font-bold text-base text-white mb-1">{b.title}</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed font-robert-regular">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-zinc-100 dark:border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest font-general">
            Strategic Methodology
          </span>
          <h2 className="font-zentry text-2xl sm:text-3xl font-black uppercase tracking-wide leading-tight mt-2 mb-4">
            How The Project Unfolds
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {service.process.map((step, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 relative group"
            >
              <span className="text-4xl font-black text-violet-500/30 group-hover:text-violet-500/60 font-zentry transition-colors block mb-4">
                {step.step}
              </span>
              <h3 className="font-zentry text-xl font-bold uppercase mb-2 text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed font-robert-regular">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Scope Tiers */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-zinc-100 dark:border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-violet-500 uppercase tracking-widest font-general">
            Transparent Engagement
          </span>
          <h2 className="font-zentry text-2xl sm:text-3xl font-black uppercase tracking-wide leading-tight mt-2 mb-4">
            Tailored Scope Tiers
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Choose the tier that matches your current growth stage, or request a custom scope tailored to your team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {service.packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                idx === 1
                  ? "bg-gradient-to-b from-violet-900/30 to-zinc-900/80 border-2 border-violet-500 shadow-2xl relative"
                  : "bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {idx === 1 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-violet-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="font-zentry text-2xl font-bold uppercase mb-1 text-gray-900 dark:text-white">
                  {pkg.tier}
                </h3>
                <p className="text-xs text-violet-500 font-semibold mb-6">
                  Ideal For: {pkg.idealFor}
                </p>

                <div className="space-y-3 mb-8">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-gray-300">
                      <FiCheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className={`w-full py-3 px-4 rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  idx === 1
                    ? "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/25"
                    : "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white"
                }`}
              >
                Request Consultation
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-16 border-t border-zinc-100 dark:border-zinc-900">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center font-bold">
            <FiHelpCircle className="w-5 h-5" />
          </div>
          <h2 className="font-zentry text-2xl sm:text-3xl font-black uppercase tracking-wide leading-tight text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {service.faqs.map((faq, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800"
            >
              <h3 className="font-robert-medium font-bold text-base text-gray-900 dark:text-white mb-2">
                {faq.q}
              </h3>
              <p className="font-robert-regular text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Services */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-zinc-100 dark:border-zinc-900">
        <h2 className="font-zentry text-2xl font-bold uppercase mb-6 text-gray-900 dark:text-white">
          Explore Related Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedServices.map((r) => (
            <Link
              key={r.slug}
              href={`/services/${r.slug}`}
              className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/60 transition-all group"
            >
              <span className="text-[10px] font-bold text-violet-500 uppercase tracking-widest mb-1 block">
                {r.category}
              </span>
              <h3 className="font-zentry text-xl font-bold uppercase mb-2 text-gray-900 dark:text-white group-hover:text-violet-500 transition-colors">
                {r.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                {r.tagline}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Live Client Portfolios */}
      <PortfolioStrip
        title="Live Projects & Production Portfolios"
        subtitle={`Experience live client platforms developed with the same high-standard craftsmanship as our ${service.name}.`}
        maxItems={8}
      />

      <Footer />
    </div>
  );
}
