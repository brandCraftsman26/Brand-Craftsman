"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiArrowRight, FiZap } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const TiltCard3D = dynamic(() => import("./3d/TiltCard3D"), { ssr: false });

interface FeatureBlock {
  badge: string;
  title: string;
  description: string;
  features: string[];
  imagePosition: "left" | "right";
  gradient: string;
  hyperColor: string;
  imageUrl: string;
}

const featureBlocks: FeatureBlock[] = [
  {
    badge: "Web Architecture",
    title: "Stunning Custom Website Design",
    description: "Build high-converting, hyper-fast responsive websites. Powered by Next.js and Tailwind CSS for instant page loads, smooth micro-interactions, and flawless mobile experiences.",
    features: ["Pixel-Perfect Visual Design", "Lightning Fast Page Speed", "Brand-Aligned UI Components"],
    imagePosition: "left",
    gradient: "from-[#6766FF] via-[#00F0FF] to-[#9D4EDD]",
    hyperColor: "text-cyan-400",
    imageUrl: "/images/features/feature_web_architecture.png",
  },
  {
    badge: "Search Intelligence",
    title: "Data-Driven SEO Solutions",
    description: "Dominate search engine results with Search Pin technical SEO architecture. Structured data, keyword cluster mapping, and speed optimization built directly into every single page.",
    features: ["Keyword Cluster Mapping", "Technical Schema Optimization", "Real-Time Ranking Analytics"],
    imagePosition: "right",
    gradient: "from-[#0DB561] via-[#00F0FF] to-[#6766FF]",
    hyperColor: "text-emerald-400",
    imageUrl: "/images/features/feature_search_intelligence.png",
  },
  {
    badge: "Digital Acceleration",
    title: "Full-Stack Marketing Growth",
    description: "Scale your revenue with targeted performance marketing. We combine social media campaigns, PPC ads, and automated email funnels tailored for ambitious brands.",
    features: ["High-ROI Social Media Ads", "PPC Campaign Management", "Automated Lead Generation"],
    imagePosition: "left",
    gradient: "from-[#FF007A] via-[#FF9F31] to-[#6766FF]",
    hyperColor: "text-pink-400",
    imageUrl: "/img/services/digital-marketing.png",
  },
  {
    badge: "Brand Identity",
    title: "Memorable Brand Experiences",
    description: "Craft a distinct visual language that makes your brand unforgettable. From logo systems to comprehensive brand guidelines, we establish your market authority.",
    features: ["Logo & Identity Design", "Comprehensive Style Guides", "Digital Brand Assets"],
    imagePosition: "right",
    gradient: "from-[#6766FF] via-[#00F0FF] to-[#FF007A]",
    hyperColor: "text-indigo-400",
    imageUrl: "/img/services/branding.png",
  },
  {
    badge: "Engineering",
    title: "Cross-Platform App Solutions",
    description: "Deploy scalable web and mobile applications with cutting-edge tech stacks. Built for maximum speed, enterprise security, and seamless user interaction.",
    features: ["React & Next.js Ecosystem", "Cross-Platform Mobile Apps", "Scalable API Integrations"],
    imagePosition: "left",
    gradient: "from-[#FF9F31] via-[#FF007A] to-[#6766FF]",
    hyperColor: "text-amber-400",
    imageUrl: "/img/services/mobile-apps.png",
  },
];

const FeatureBlockItem = ({ block, index }: { block: FeatureBlock; index: number }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (blockRef.current) observer.observe(blockRef.current);
    return () => observer.disconnect();
  }, []);

  const isLeft = block.imagePosition === "left";

  return (
    <div
      ref={blockRef}
      className={`flex flex-col ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20 py-20 md:py-28`}
    >
      {/* Visual Component Card */}
      <div
        className="w-full lg:w-1/2"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0) scale(1)" : `translateX(${isLeft ? "-40px" : "40px"}) scale(0.95)`,
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <TiltCard3D tiltIntensity={12} glareEnabled={true} className="rounded-3xl">
          <div className={`relative aspect-[4/3] rounded-3xl bg-gradient-to-br ${block.gradient} p-[2px] shadow-[0_0_50px_rgba(103,102,255,0.25)]`}>
            <div className="absolute inset-[2px] rounded-[22px] bg-[#07011F] dark:bg-[#080220] overflow-hidden">
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src={block.imageUrl}
                  alt={block.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Floating Gen-Z Badge */}
            <div className={`absolute -bottom-5 ${isLeft ? "-right-4" : "-left-4"} px-5 py-2.5 rounded-full bg-[#080220] border border-cyan-400/40 shadow-[0_0_25px_rgba(0,240,255,0.4)] backdrop-blur-xl z-20`}>
              <span className="text-xs md:text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <FiZap className="text-cyan-400 animate-pulse" /> 0{index + 1} {"//"} CREATIVE ENGINE
              </span>
            </div>
          </div>
        </TiltCard3D>
      </div>

      {/* Content Side */}
      <div
        className="w-full lg:w-1/2"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateX(0)" : `translateX(${isLeft ? "40px" : "-40px"})`,
          transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
        }}
      >
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-400 dark:text-cyan-400 font-general text-xs uppercase tracking-widest font-bold mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          {block.badge}
        </div>

        {/* Feature Title */}
        <h3 className="font-zentry text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase mb-5 leading-tight tracking-wide">
          {block.title}
        </h3>

        {/* Feature Description - HIGH VISIBILITY */}
        <p className="font-robert-medium text-slate-700 dark:text-zinc-200 text-base md:text-lg lg:text-xl leading-relaxed mb-8 font-medium">
          {block.description}
        </p>

        {/* Feature Points */}
        <ul className="space-y-4 mb-10">
          {block.features.map((feat, i) => (
            <li key={i} className="flex items-center gap-3.5 text-slate-800 dark:text-zinc-100 font-robert-medium text-base font-semibold">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <FiCheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        {/* Gen-Z Trend Button */}
        <Link
          href="/services"
          className="btn-genz group"
        >
          Explore Solutions
          <FiArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
};

const FeaturesShowcase = () => {
  return (
    <section className="relative py-24 md:py-36 bg-slate-50 dark:bg-[#080220] overflow-hidden">
      {/* Intellio-inspired Background Mesh Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full bg-[#6766FF]/15 blur-[150px]" />
        <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-[#FF007A]/10 blur-[150px]" />
        <div className="absolute top-2/3 left-1/3 w-[500px] h-[500px] rounded-full bg-[#00F0FF]/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6766FF] via-[#00F0FF] to-[#FF007A] text-white font-general text-xs md:text-sm uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(103,102,255,0.6)] mb-6">
            <FiZap className="w-4 h-4 text-yellow-300 animate-bounce" />
            CREATIVE DISRUPTION & PERFORMANCE
          </div>

          <h2 className="font-zentry text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white uppercase leading-[1.08] tracking-wide mb-8">
            Why Choose <span className="text-hyper-gradient">Brand Craftsman</span>
          </h2>

          {/* Subheading: BIG, ULTRA-VISIBLE & PROMINENT */}
          <p className="font-robert-medium text-slate-800 dark:text-zinc-100 text-xl md:text-2xl lg:text-3xl leading-relaxed font-bold max-w-3xl mx-auto text-balance">
            We engineer high-impact digital experiences that combine stunning visual aesthetics, cutting-edge code, and revenue-driven SEO strategy.
          </p>
        </div>

        {/* Feature Blocks List */}
        <div className="max-w-6xl mx-auto divide-y divide-gray-300/60 dark:divide-white/10">
          {featureBlocks.map((block, index) => (
            <FeatureBlockItem key={index} block={block} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
