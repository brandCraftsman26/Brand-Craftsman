"use client";
import Image from "next/image";

import React, { useRef } from "react";
import { FiMonitor, FiSmartphone, FiTrendingUp, FiPrinter, FiTv, FiMessageSquare, FiFeather, FiShare2 } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    slug: "branding",
    title: "Pro Branding & Identity Design",
    icon: <FiFeather className="w-9 h-9 mb-4 relative z-10" />,
    description: "We develop a whole visual and psychological universe for your organization, crafting brand identities that attract and retain loyal customers.",
    features: ["Strategy & Positioning", "Logo & Visual Identity", "Brand Guidelines", "Packaging Design"],
    className: "lg:col-span-2 lg:row-span-1",
    gradient: "from-[#0F2027] via-[#203A43] to-[#2C5364]",
    glowColor: "group-hover:shadow-cyan-500/30",
    iconColor: "text-cyan-400",
    accentColor: "text-cyan-300",
    bgImage: "/img/services/branding.png",
  },
  {
    id: 2,
    slug: "digital-marketing",
    title: "Data-Driven Digital Marketing",
    icon: <FiTrendingUp className="w-9 h-9 mb-4 relative z-10" />,
    description: "High-ROI campaigns that drive qualified traffic, optimize conversion funnels, and capture market share rapidly.",
    features: ["SEO Optimization", "PPC Advertising", "Growth Funnels"],
    className: "lg:col-span-1 lg:row-span-1",
    gradient: "from-[#11998e] via-[#1a6b5a] to-[#38ef7d]",
    glowColor: "group-hover:shadow-emerald-500/30",
    iconColor: "text-emerald-400",
    accentColor: "text-emerald-300",
    bgImage: "/img/services/digital-marketing.png",
  },
  {
    id: 3,
    slug: "web-development",
    title: "Web Design & Development",
    icon: <FiMonitor className="w-9 h-9 mb-4 relative z-10" />,
    description: "Hyper-fast, secure, custom websites engineered for modern performance and high conversion rates.",
    features: ["UX/UI Design", "Next.js & Full Stack", "E-Commerce"],
    className: "lg:col-span-1 lg:row-span-1",
    gradient: "from-[#667eea] via-[#5a3f8a] to-[#764ba2]",
    glowColor: "group-hover:shadow-violet-500/30",
    iconColor: "text-violet-400",
    accentColor: "text-violet-300",
    bgImage: "/img/services/web-development.png",
  },
  {
    id: 4,
    slug: "mobile-app-development",
    title: "Custom Mobile App Development",
    icon: <FiSmartphone className="w-9 h-9 mb-4 relative z-10" />,
    description: "Native and cross-platform mobile solutions for iOS & Android built with sleek UI/UX and solid backend architecture.",
    features: ["iOS & Android", "Cross-Platform", "App UI/UX"],
    className: "lg:col-span-1 lg:row-span-1",
    gradient: "from-[#f093fb] via-[#9b3a7a] to-[#f5576c]",
    glowColor: "group-hover:shadow-pink-500/30",
    iconColor: "text-pink-400",
    accentColor: "text-pink-300",
    bgImage: "/img/services/mobile-apps.png",
  },
  {
    id: 5,
    slug: "social-media-marketing",
    title: "Social Media & Performance Ads",
    icon: <FiShare2 className="w-9 h-9 mb-4 relative z-10" />,
    description: "Engage target demographics across Meta, LinkedIn, and Google with high-converting creative ad funnels.",
    features: ["Meta & LinkedIn Ads", "Viral Content Strategy", "Performance Analytics"],
    className: "lg:col-span-1 lg:row-span-1",
    gradient: "from-[#f7971e] via-[#b35c00] to-[#ffd200]",
    glowColor: "group-hover:shadow-amber-500/30",
    iconColor: "text-amber-400",
    accentColor: "text-amber-300",
    bgImage: "/img/services/social-media.png",
  },
  {
    id: 6,
    slug: "whatsapp-marketing",
    title: "WhatsApp & Direct Engagement",
    icon: <FiMessageSquare className="w-9 h-9 mb-4 relative z-10" />,
    description: "Automated chat funnels and precision broadcast campaigns with WhatsApp API and CRM integrations.",
    features: ["WhatsApp API", "Automated Chat Funnels", "CRM Integration"],
    className: "lg:col-span-1 lg:row-span-1",
    gradient: "from-[#00c6ff] via-[#005577] to-[#0072ff]",
    glowColor: "group-hover:shadow-sky-500/30",
    iconColor: "text-sky-400",
    accentColor: "text-sky-300",
    bgImage: "/img/services/whatsapp.png",
  },
  {
    id: 7,
    slug: "printing",
    title: "Offset & Digital Printing",
    icon: <FiPrinter className="w-9 h-9 mb-4 relative z-10" />,
    description: "Premium physical brand collateral, offset and digital print solutions with luxury paper finishing.",
    features: ["Brochures & Catalogs", "Business Cards", "Packaging & Merch"],
    className: "lg:col-span-1 lg:row-span-1",
    gradient: "from-[#00B4DB] via-[#0083B0] to-[#005C97]",
    glowColor: "group-hover:shadow-cyan-500/30",
    iconColor: "text-cyan-300",
    accentColor: "text-cyan-200",
    bgImage: "/img/services/printing.png",
  },
  {
    id: 8,
    slug: "traditional-marketing",
    title: "Traditional & Outdoor Marketing",
    icon: <FiTv className="w-9 h-9 mb-4 relative z-10" />,
    description: "High-impact outdoor media, billboards, TV, radio, and event marketing strategies to dominate regional presence.",
    features: ["Billboards & OOH", "Print & Magazine", "Event & TV Ads"],
    className: "lg:col-span-1 lg:row-span-1",
    gradient: "from-[#E55D87] via-[#5FC3E4] to-[#43CBFF]",
    glowColor: "group-hover:shadow-blue-500/30",
    iconColor: "text-blue-400",
    accentColor: "text-blue-300",
    bgImage: "/img/services/traditional-marketing.png",
  },
];

const BentoCard = ({ service }: { service: typeof services[0] }) => {
  return (
    <a
      href={`/services/${service.slug}`}
      className={`bento-item min-h-[340px] group relative overflow-hidden rounded-3xl border border-white/15 p-7 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-white/40 ${service.glowColor} hover:shadow-2xl ${service.className}`}
      style={{ opacity: 0, transform: "translateY(40px)" }}
    >
      {/* 1. Relative Background Image */}
      <Image
        src={service.bgImage}
        alt={service.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />

      {/* 2. Dark Overlay for Contrast */}
      <div className="absolute inset-0 bg-black/65 transition-colors duration-500 group-hover:bg-black/55" />

      {/* 3. Existing Colour Overlay with EXACT 20% Opacity as requested */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 transition-opacity duration-500 group-hover:opacity-30`} />

      {/* Subtle animated grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} 
      />

      {/* Hover border glow highlight */}
      <div className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-r from-white/20 via-white/10 to-white/20 blur-xs" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="relative bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
          <div className={service.iconColor}>
            {service.icon}
          </div>
          <h3 className="font-zentry text-2xl font-bold uppercase text-white mb-2.5 tracking-wide group-hover:text-white transition-colors drop-shadow-md">
            {service.title}
          </h3>
          <p className="font-robert-regular text-gray-200 text-sm mb-4 leading-relaxed drop-shadow-sm break-words">
            {service.description}
          </p>
        </div>

        <div>
          <ul className="flex flex-wrap gap-2 mb-5">
            {service.features.map((feature, idx) => (
              <li 
                key={idx} 
                className="px-2.5 py-1 rounded-full text-xs font-general bg-white/10 backdrop-blur-md text-white/90 border border-white/15"
              >
                {feature}
              </li>
            ))}
          </ul>

          <div className={`flex items-center text-xs font-general uppercase tracking-wider ${service.accentColor} font-bold group-hover:translate-x-2 transition-transform duration-300`}>
            Explore Service <span className="ml-1.5 text-base">→</span>
          </div>
        </div>
      </div>
    </a>
  );
};

const ServicesBento = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".bento-item", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: "bottom 15%",
      },
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section id="services" className="bg-gray-50 dark:bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <div className="mb-14 text-center md:text-left">
          <h4 className="font-general text-sm uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 mb-2 font-bold">
            A 360-degree Digital & Branding Ecosystem
          </h4>
          <h2 className="font-zentry text-4xl md:text-6xl font-black uppercase text-gray-900 dark:text-white leading-none">
            Our Core <br className="hidden md:block" /> Services
          </h2>
        </div>

        {/* Perfectly Aligned Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <BentoCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesBento;
