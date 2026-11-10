"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  FiAward,
  FiZap,
  FiTrendingUp,
  FiShield,
  FiUsers,
  FiArrowRight,
  FiCheckCircle,
  FiCode,
  FiCompass,
  FiHeart,
  FiHelpCircle,
  FiChevronDown,
  FiGlobe,
  FiMonitor,
  FiSmartphone,
  FiLayers,
  FiMail,
  FiClock,
  FiTarget,
} from "react-icons/fi";

const FloatingGeometry = dynamic(() => import("@/components/3d/FloatingGeometry"), { ssr: false });
const TiltCard3D = dynamic(() => import("@/components/3d/TiltCard3D"), { ssr: false });
const PortfolioStrip = dynamic(() => import("@/components/PortfolioStrip"), { ssr: false });

export default function AboutContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqData = [
    {
      q: "1. What makes Brand Craftsman different from other digital marketing agencies in Coimbatore?",
      a: "While many agencies focus solely on either design or marketing, Brand Craftsman combines both at an elite level. Led by Santhosh (Development/Branding) and Hari (Digital Marketing), we guarantee that your beautiful brand is backed by flawless technical architecture and aggressive marketing. Furthermore, our unique community model of 5+ year experienced freelancers allows us to scale instantly to meet any technical demand.",
    },
    {
      q: "2. As a startup on a tight budget, can I afford a top-tier branding company in Coimbatore?",
      a: "Absolutely. Our foundational goal is to support new entrepreneurs and startups. We understand startup constraints because we are founders ourselves. We supply scalable, phased solutions that let you build critical brand infrastructure now and expand your digital ecosystem as your revenue grows.",
    },
    {
      q: "3. What specific services fall under your branding and development umbrella?",
      a: "We operate as a full-stack digital agency that Coimbatore businesses trust for comprehensive solutions. This includes corporate identity design, logo creation, UI/UX designing, custom web and mobile app development, e-commerce architecture, print media design, and full-scale digital marketing (SEO, PPC, Social Media).",
    },
    {
      q: "4. How does Brand Craftsman contribute to the local community?",
      a: "Social responsibility is baked into our DNA. We actively work to develop skilled students and unemployed individuals in Coimbatore. Through targeted training, especially during college holidays, we teach modern, highly employable skills like frontend web development and digital marketing, serving as a bridge between raw talent and industry requirements.",
    },
    {
      q: "5. How fast can we expect to see results after partnering with your branding experts, Coimbatore team?",
      a: "The timeline depends heavily on the service. Visual branding and web development are delivered on strict, project-specific timelines. For digital marketing, Performance/PPC campaigns can generate high-quality leads within 48 hours, while organic SEO and brand-authority building are long-term investments that typically show significant compound growth within 3 to 6 months.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#07011a] text-slate-900 dark:text-white pt-24 pb-0 transition-colors duration-300 overflow-x-hidden">
      
      {/* ──────────────── 1. HERO SECTION WITH 3D ANIMATION ──────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-20 text-center overflow-hidden">
        {/* Interactive 3D Canvas Background */}
        <FloatingGeometry scene="about" className="opacity-50 dark:opacity-75 pointer-events-none" />

        {/* Ambient Gradient Mesh */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-600/10 dark:bg-violet-600/15 blur-[160px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 font-general text-xs uppercase tracking-widest border border-violet-500/20 backdrop-blur-md font-bold">
            <FiAward className="w-4 h-4 text-violet-500" /> Premier Branding & Digital Architecture
          </div>

          <h1 className="font-zentry text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-wide leading-[1.08] mb-8 text-slate-900 dark:text-white">
            About Brand Craftsman: <span className="text-hyper-gradient">The Premier Branding Company in Coimbatore</span>
          </h1>

          <div className="space-y-6 text-slate-700 dark:text-zinc-200 font-robert-medium text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-left sm:text-center">
            <p className="font-semibold">
              At a time when every business fights for a fraction of consumer attention, the right brand can be the difference between obscurity and industry leadership. At Brand Craftsman, we help businesses achieve tangible results such as increased sales, greater market share, and stronger brand recognition by building brands that not only attract but retain loyal customers and open new markets.
            </p>
            <p>
              Welcome to Brand Craftsman. We are more than just a traditional design agency; we are a comprehensive branding company in Coimbatore dedicated to engineering high-performance identities and digital frameworks for modern businesses, aggressive startups, and innovative entrepreneurs.
            </p>
            <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base">
              Our philosophy is grounded in the conviction that a brand is the essential bridge between a company&apos;s capabilities and its customers&apos; expectations. When this connection is lacking or undefined, even outstanding products risk failing in the marketplace. What distinguishes Brand Craftsman is our deliberate approach to strengthening this connection. We uniquely combine in-depth visual identity design with planned, data-driven digital marketing developed collaboratively for each client. By uniting these disciplines with a tailored methodology, we clarify the brand message and enhance its market relevance, transforming emerging business notions into established industry leaders.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="btn-genz group"
            >
              <span>Schedule Strategy Consultation</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <Link
              href="/portfolios"
              className="btn-genz-outline"
            >
              <FiGlobe className="w-4 h-4 text-cyan-400" /> View 22+ Live Client Portfolios
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-slate-200 dark:border-white/10">
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm">
              <div className="font-zentry text-3xl sm:text-4xl font-black text-cyan-500">55%</div>
              <p className="text-xs uppercase font-general tracking-widest text-slate-500 dark:text-zinc-400 mt-1">B2B Lead Growth</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm">
              <div className="font-zentry text-3xl sm:text-4xl font-black text-emerald-500">40%</div>
              <p className="text-xs uppercase font-general tracking-widest text-slate-500 dark:text-zinc-400 mt-1">Retail Lead Uplift</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm">
              <div className="font-zentry text-3xl sm:text-4xl font-black text-violet-500">3X</div>
              <p className="text-xs uppercase font-general tracking-widest text-slate-500 dark:text-zinc-400 mt-1">Customer Inquiries</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm">
              <div className="font-zentry text-3xl sm:text-4xl font-black text-amber-500">72h</div>
              <p className="text-xs uppercase font-general tracking-widest text-slate-500 dark:text-zinc-400 mt-1">200% Resource Scaling</p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 2. GENESIS SECTION ──────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 sm:py-24 border-t border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-general text-xs uppercase tracking-widest mb-4 border border-cyan-500/20 font-bold">
            <FiCompass /> The Origin Story
          </div>
          
          <h2 className="font-zentry text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wide leading-tight mb-8 text-slate-900 dark:text-white">
            Our Genesis: <span className="text-hyper-gradient">From Passion to Market Leadership</span>
          </h2>

          <div className="space-y-6 text-slate-700 dark:text-zinc-300 font-robert-regular text-base sm:text-lg leading-relaxed">
            <p>
              The story of Brand Craftsman is one of steady evolution, grounded in an in-depth understanding of local and global digital spheres. The journey began long before this agency opened its doors.
            </p>
            <p>
              In 2019, our founders, Santhosh Shanmugasundaram and Hari Prashath, began their careers as graphic designers and digital marketing strategists at Todo Solution. Through daily campaign management and brand design, they developed key principles of consumer psychology, digital engagement, and market segmentation. During this period, we focused on improving our skills as well as task execution. We broadened our expertise across several rapidly expanding industries, from local retail and service sectors to advanced technological and industrial manufacturing, analyzing why some businesses scaled rapidly while others did not.
            </p>
            
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-900/20 via-indigo-900/15 to-cyan-900/20 border border-violet-500/30 backdrop-blur-md my-8">
              <p className="font-robert-medium text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                &ldquo;The most glaring perception was the disconnect between technical execution and visual identity. We saw incredible products fail due to poor market segmentation and beautiful brands fail due to a lack of technical visibility.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 3. SEARCH PIN ERA & BIRTH OF BRAND CRAFTSMAN ──────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 sm:py-24 border-t border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-general text-xs uppercase tracking-widest mb-4 border border-indigo-500/20 font-bold">
            <FiZap /> 2024 Inflection Point
          </div>

          <h2 className="font-zentry text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wide leading-tight mb-8 text-slate-900 dark:text-white">
            The Search Pin Era (2024) & <span className="text-hyper-gradient">The Birth of Brand Craftsman</span>
          </h2>

          <div className="space-y-6 text-slate-700 dark:text-zinc-300 font-robert-regular text-base sm:text-lg leading-relaxed">
            <p>
              The Search Pin is driven by the desire to close this gap. We launched Search Pin in 2024, a highly focused digital marketing company in Coimbatore. Search Pin allowed us to deploy aggressive, ROI-centric marketing strategies for our clients. We helped businesses dominate search engine rankings, execute highly profitable performance marketing campaigns, and build strong social media footprints.
            </p>
            <p>
              However, as we scaled Search Pin and engaged with multiple business owners and ambitious youngsters, we identified a more profound gap: the distinction between marketing services and comprehensive brand stewardship. While marketing promotes products or services, it cannot alone establish or sustain a coherent brand identity across every customer touchpoint. Entrepreneurs needed more than promotional strategies; they needed a holistic partner able to conceptualize brands from inception, build the necessary technical foundations, and execute rigorous marketing campaigns to guarantee lasting success.
            </p>
            <p>
              This realization birthed Brand Craftsman. We evolved our model to serve as the ultimate bridge between ambitious entrepreneurs and guaranteed business outcomes. Brand Craftsman operates as a full-spectrum digital agency that Coimbatore firms rely on for end-to-end dominance. We supply comprehensive services including corporate identity development, custom web and mobile application creation, digital marketing campaigns, and e-commerce platform engineering.
            </p>

            {/* Proof Points in 3D Holographic Tilt Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
              <TiltCard3D tiltIntensity={12} className="rounded-3xl">
                <div className="h-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-lg flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-general">Regional Retail</span>
                    <h3 className="font-zentry text-xl font-bold uppercase mt-2 mb-3 text-slate-900 dark:text-white">
                      E-Commerce & Online Sales
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-robert-regular">
                      Engineered a bespoke e-commerce platform and integrated marketing strategy that enhanced customer experience and significantly increased online sales within three months.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 text-emerald-500 font-zentry font-black text-sm flex items-center gap-1.5">
                    <FiTrendingUp /> Sales Surge in 90 Days
                  </div>
                </div>
              </TiltCard3D>

              <TiltCard3D tiltIntensity={12} className="rounded-3xl">
                <div className="h-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-lg flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-violet-400 font-general">Manufacturing Firm</span>
                    <h3 className="font-zentry text-xl font-bold uppercase mt-2 mb-3 text-slate-900 dark:text-white">
                      High-Quality B2B Pipeline
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-robert-regular">
                      Generated 55% growth in high-quality B2B leads and a 30% increase in conversion rates over six months through our integrated technical framework and SEO pipeline.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 text-emerald-500 font-zentry font-black text-sm flex items-center gap-1.5">
                    <FiTrendingUp /> +55% Leads & +30% Conversions
                  </div>
                </div>
              </TiltCard3D>

              <TiltCard3D tiltIntensity={12} className="rounded-3xl">
                <div className="h-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-lg flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-general">Local Service Provider</span>
                    <h3 className="font-zentry text-xl font-bold uppercase mt-2 mb-3 text-slate-900 dark:text-white">
                      Rebranding & PPC Domination
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-robert-regular">
                      After a complete rebranding and targeted PPC campaign rollout, saw customer requests triple and service revenue double within four months.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 text-emerald-500 font-zentry font-black text-sm flex items-center gap-1.5">
                    <FiTrendingUp /> 3X Inquiries & 2X Revenue
                  </div>
                </div>
              </TiltCard3D>
            </div>

            <p>
              We combined Search Pin&apos;s analytical expertise with high-end design aesthetics, supported by a solid network of top-tier technical talent. Today, Brand Craftsman functions as a beacon for new ventures and established enterprises alike. We exist to ensure that when you launch a product, it doesn&apos;t just enter the market—it commands it.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────── 4. MEET THE ARCHITECTS (3D FOUNDER CARDS) ──────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 sm:py-24 border-t border-slate-200 dark:border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 font-general text-xs uppercase tracking-widest mb-4 border border-violet-500/20 font-bold">
            <FiUsers /> Leadership & Vision
          </div>
          <h2 className="font-zentry text-3xl sm:text-5xl font-black uppercase tracking-wide leading-tight mb-4 text-slate-900 dark:text-white">
            Meet the Architects of Your Brand
          </h2>
          <p className="font-robert-regular text-slate-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
            A branding agency is only as potent as the minds driving it. Brand Craftsman is spearheaded by two industry veterans who balance the delicate scales of aesthetic brilliance and analytical execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Santhosh Shanmugasundaram */}
          <TiltCard3D tiltIntensity={10} glareEnabled={true} className="rounded-3xl">
            <div className="h-full p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
              
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-zentry font-black text-2xl shadow-lg shadow-violet-500/30">
                    SS
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-violet-500 font-general">Co-Founder & Technical Lead</span>
                    <h3 className="font-zentry text-2xl sm:text-3xl font-black uppercase text-slate-900 dark:text-white">
                      Santhosh Shanmugasundaram
                    </h3>
                    <p className="text-xs font-semibold text-cyan-500 uppercase tracking-wider font-general mt-0.5">
                      Branding & Development
                    </p>
                  </div>
                </div>

                <div className="font-robert-regular text-slate-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4">
                  <p>
                    Santhosh is the technical and creative leader behind the agency. With a unique background that spans from hands-on industrial precision to complex, multi-layered digital architecture, Santhosh understands how things are built—both in the physical world and the digital domain.
                  </p>
                  <p>
                    His expertise rests in developing seamless, high-performance web architectures (including advanced headless setups and modern frontend frameworks) and pairing them with stunning, cinematic visual identities. He makes certain that your brand doesn&apos;t just look world-class, but operates perfectly across every device and platform.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex flex-wrap gap-2">
                {["Full-Stack Architecture", "Next.js & React", "Cinematic UI/UX", "Brand Guidelines"].map((badge, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-300 text-xs font-semibold">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard3D>

          {/* Hari Prashath */}
          <TiltCard3D tiltIntensity={10} glareEnabled={true} className="rounded-3xl">
            <div className="h-full p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-zentry font-black text-2xl shadow-lg shadow-cyan-500/30">
                    HP
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-500 font-general">Co-Founder & Strategic Engine</span>
                    <h3 className="font-zentry text-2xl sm:text-3xl font-black uppercase text-slate-900 dark:text-white">
                      Hari Prashath
                    </h3>
                    <p className="text-xs font-semibold text-violet-500 uppercase tracking-wider font-general mt-0.5">
                      Digital Marketing
                    </p>
                  </div>
                </div>

                <div className="font-robert-regular text-slate-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4">
                  <p>
                    Hari is the strategic engine that drives the brand into the consumer consciousness. As a master of digital strategy, Hari understands the algorithms that govern modern commerce. His expertise includes deep-dive SEO, aggressive performance marketing, and localized market penetration.
                  </p>
                  <p>
                    Hari&apos;s approach to marketing is entirely data-centric; every campaign, ad spend, and content rollout is thoroughly tracked and optimized to ensure maximum return on investment. For example, his leadership of a recent multi-channel campaign for a regional retail client resulted in a 40% increase in premium leads and a significant month-over-month sales uplift. Under his direction, beautiful brands are transformed into highly visible, revenue-generating machines.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex flex-wrap gap-2">
                {["Deep-Dive SEO", "Performance Ads", "Search Pin Integration", "Revenue Optimization"].map((badge, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 text-xs font-semibold">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard3D>
        </div>

        <p className="text-center text-slate-600 dark:text-zinc-400 font-robert-medium text-sm sm:text-base mt-10 max-w-2xl mx-auto">
          Together, Santhosh and Hari are recognized as leading branding experts whom Coimbatore businesses trust to negotiate the complexities of modern digital growth.
        </p>
      </section>

      {/* ──────────────── 5. THE BRAND CRAFTSMAN COMMUNITY & AGILE MODEL ──────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 sm:py-24 border-t border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-general text-xs uppercase tracking-widest mb-4 border border-emerald-500/20 font-bold">
            <FiLayers /> Scalable Elite Network
          </div>
          <h2 className="font-zentry text-3xl sm:text-5xl font-black uppercase tracking-wide leading-tight mb-6 text-slate-900 dark:text-white">
            Our Mutual Strength: <span className="text-hyper-gradient">The Brand Craftsman Community</span>
          </h2>
          <p className="font-robert-regular text-slate-700 dark:text-zinc-300 text-base sm:text-lg leading-relaxed text-left sm:text-center">
            We recognize that comprehensive brand building requires a varied array of specialized skills. A single team cannot master every programming language, design trend, and algorithm change. That is why Brand Craftsman operates with a unique, highly agile structural model: a tightly-knit, elite freelance community.
          </p>
        </div>

        {/* 4 Community Capabilities Cards in 3D */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <TiltCard3D tiltIntensity={12} className="rounded-3xl">
            <div className="h-full p-6 rounded-3xl bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 text-xl">
                  <FiSmartphone />
                </div>
                <h3 className="font-zentry text-lg font-bold uppercase text-slate-900 dark:text-white mb-2">
                  Mobile App Developers
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-robert-regular">
                  Engineering custom, high-retention iOS and Android applications with native performance and intuitive interfaces.
                </p>
              </div>
              <span className="text-[11px] font-bold text-cyan-500 uppercase tracking-wider mt-4">iOS & Android</span>
            </div>
          </TiltCard3D>

          <TiltCard3D tiltIntensity={12} className="rounded-3xl">
            <div className="h-full p-6 rounded-3xl bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4 text-xl">
                  <FiTrendingUp />
                </div>
                <h3 className="font-zentry text-lg font-bold uppercase text-slate-900 dark:text-white mb-2">
                  Marketing Managers
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-robert-regular">
                  Strategists who handle niche industry outreach, multi-channel media buys, and specialized campaign execution.
                </p>
              </div>
              <span className="text-[11px] font-bold text-violet-500 uppercase tracking-wider mt-4">Growth & ROI</span>
            </div>
          </TiltCard3D>

          <TiltCard3D tiltIntensity={12} className="rounded-3xl">
            <div className="h-full p-6 rounded-3xl bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4 text-xl">
                  <FiAward />
                </div>
                <h3 className="font-zentry text-lg font-bold uppercase text-slate-900 dark:text-white mb-2">
                  Senior Designers
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-robert-regular">
                  Designing bespoke UI/UX designs, luxury print materials, packaging systems, and comprehensive brand guidelines.
                </p>
              </div>
              <span className="text-[11px] font-bold text-pink-500 uppercase tracking-wider mt-4">Visual Excellence</span>
            </div>
          </TiltCard3D>

          <TiltCard3D tiltIntensity={12} className="rounded-3xl">
            <div className="h-full p-6 rounded-3xl bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 text-xl">
                  <FiCode />
                </div>
                <h3 className="font-zentry text-lg font-bold uppercase text-slate-900 dark:text-white mb-2">
                  Full-Stack Developers
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-robert-regular">
                  Building robust backend architectures, custom SaaS products, secure e-commerce platforms, and API pipelines.
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider mt-4">Next.js & Node.js</span>
            </div>
          </TiltCard3D>
        </div>

        {/* Extended Community Narrative */}
        <div className="max-w-4xl mx-auto space-y-6 text-slate-700 dark:text-zinc-300 font-robert-regular text-base sm:text-lg leading-relaxed">
          <p>
            Every member of this extended community has at least 5 years of hands-on industry experience, with several specialists having participated in more than 30 distinct branding and development projects through multiple domains. To summarize our core freelance capabilities:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-emerald-500 shrink-0 w-5 h-5" />
              <span className="text-sm font-semibold">All members have more than 5 years of professional experience</span>
            </div>
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-emerald-500 shrink-0 w-5 h-5" />
              <span className="text-sm font-semibold">Many specialists have completed 30+ branding & development projects</span>
            </div>
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-emerald-500 shrink-0 w-5 h-5" />
              <span className="text-sm font-semibold">Dedicated specialists in mobile app development & marketing management</span>
            </div>
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-emerald-500 shrink-0 w-5 h-5" />
              <span className="text-sm font-semibold">Expertise in senior design and full-stack engineering</span>
            </div>
          </div>

          <p>
            This agile model allows us to scale resource assignment by up to 200% within 72 hours to meet project demands. When a client wants rapid scaling, the process is simple. Each client is assigned a dedicated project manager who serves as the single point of contact. Requests to increase resources or expand the project&apos;s scope can be made directly to the manager via email or our request portal. The manager then mobilizes the necessary specialists from our vetted freelance network, guaranteeing rapid deployment and steady updates. For example, when a client needed both a mobile app and a social media campaign launched quickly, we assembled a cross-functional team and began development within two days. Clients benefit from both the expertise of a large agency and the personalized service of a boutique firm.
          </p>
          <p>
            Our daily operational mission is precise: To serve as the definitive growth catalyst for new entrepreneurs, ambitious startups, and established business owners. We exist to demystify the complications of the digital domain. We empower clients by providing premium, enterprise-grade branding, flawless technical development, and aggressive marketing strategies that drive measurable, sustainable revenue. We are not merely service providers; we are your strategic partners in market domination.
          </p>
          <p>
            Our vision is to differentiate Brand Craftsman through integrating a unified brand identity with a reliable digital infrastructure, thereby delivering a sustainable competitive advantage. We do not aim only to lead the branding sector in Coimbatore but to set a comprehensive benchmark for holistic brand development and growth. Through accessible, high-quality design and rigorous technical solutions, Brand Craftsman seeks to raise industry standards and empower innovators to achieve measurable, far-reaching impact.
          </p>
        </div>
      </section>

      {/* ──────────────── 6. CORE VALUES ──────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 sm:py-24 border-t border-slate-200 dark:border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 font-general text-xs uppercase tracking-widest mb-4 border border-violet-500/20 font-bold">
            <FiHeart /> Guiding Principles
          </div>
          <h2 className="font-zentry text-3xl sm:text-5xl font-black uppercase tracking-wide leading-tight mb-4 text-slate-900 dark:text-white">
            Our Core Values
          </h2>
          <p className="font-robert-regular text-slate-600 dark:text-zinc-300 text-base sm:text-lg">
            Our work is governed by a strict set of principles that dictate every line of code we write, every pixel we design, and every campaign we launch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Craftsmanship Over Compromise",
              desc: "We do not believe in templates or shortcuts. Every brand we build is a bespoke asset, created with meticulous attention to detail.",
              color: "text-violet-500",
            },
            {
              title: "Data-Driven Empathy",
              desc: "We blend deep analytical data with an insightful understanding of human psychology. We market to real people, using real data to guide our plans.",
              color: "text-cyan-500",
            },
            {
              title: "Unrelenting Innovation",
              desc: "The digital domain changes daily. We continuously upskill, adopting the latest frameworks, AI integrations, and design approaches to keep our clients ahead of the curve.",
              color: "text-pink-500",
            },
            {
              title: "Absolute Transparency",
              desc: "We operate with total clarity. From pricing frameworks to campaign performance measures, our clients always know exactly where their investment is going and what returns it is generating.",
              color: "text-emerald-500",
            },
            {
              title: "Community Elevation",
              desc: "We believe that genuine success is shared. We are deeply dedicated to uplifting the community that built us.",
              color: "text-amber-500",
            },
          ].map((val, idx) => (
            <TiltCard3D key={idx} tiltIntensity={10} className={`rounded-3xl ${idx === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}>
              <div className="h-full p-8 rounded-3xl bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-lg flex flex-col justify-between">
                <div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${val.color} font-general`}>
                    Principle 0{idx + 1}
                  </span>
                  <h3 className="font-zentry text-xl font-black uppercase text-slate-900 dark:text-white mt-2 mb-3">
                    {val.title}
                  </h3>
                  <p className="font-robert-regular text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* ──────────────── 7. CSR SOCIAL RESPONSIBILITY ──────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 sm:py-24 border-t border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-general text-xs uppercase tracking-widest mb-4 border border-emerald-500/20 font-bold">
            <FiHeart /> Social Impact & Empowerment
          </div>

          <h2 className="font-zentry text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wide leading-tight mb-8 text-slate-900 dark:text-white">
            Beyond Business: <span className="text-hyper-gradient">Our Social Responsibility</span>
          </h2>

          <div className="space-y-6 text-slate-700 dark:text-zinc-300 font-robert-regular text-base sm:text-lg leading-relaxed">
            <p>
              At Brand Craftsman, we believe the real measure of a company is not just its profit margins but the impact it has on its community. As we grew, we saw a significant gap between the raw talent in our local youth and the specific skills required by modern tech and marketing industries.
            </p>
            <p>
              Therefore, Brand Craftsman is fundamentally intertwined with a firm Corporate Social Responsibility (CSR) initiative. Our goal is to actively develop skilled students and empower unemployed individuals in our region.
            </p>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/30 to-slate-900/50 border border-emerald-500/30 my-8">
              <div className="flex items-center gap-3 mb-4 text-emerald-400 font-bold text-sm uppercase tracking-widest font-general">
                <FiTarget className="w-5 h-5" /> Demonstrable Outcomes
              </div>
              <p className="font-robert-medium text-base sm:text-lg text-slate-900 dark:text-white leading-relaxed">
                During the recent collegiate break, we conducted intensive workshops in frontend web development and digital marketing. <strong>Over 60% of participants secured internships or freelance projects within two months.</strong> By dedicating time and resources, especially during school and college holidays, we train students and job seekers with industry-relevant skills like UI/UX design and digital marketing strategy.
              </p>
            </div>

            <p>
              By closing the educational gap, we cultivate more competitive candidates for the workforce and make a direct, measurable impact on our community through CSR initiatives. Our hands-on training and workshops have led to concrete results, significantly increasing employment opportunities for participants. When you partner with Brand Craftsman, you play an active role in a CSR-driven ecosystem that upskills local youth and contributes to Coimbatore&apos;s sustainable economic development.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────── 8. WHY PARTNER WITH BRAND CRAFTSMAN? ──────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 sm:py-24 border-t border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-general text-xs uppercase tracking-widest mb-4 border border-cyan-500/20 font-bold">
            <FiShield /> Concrete Advantage
          </div>
          <h2 className="font-zentry text-3xl sm:text-5xl font-black uppercase tracking-wide leading-tight mb-4 text-slate-900 dark:text-white">
            Why Partner with Brand Craftsman?
          </h2>
          <p className="font-robert-regular text-slate-600 dark:text-zinc-300 text-base sm:text-lg">
            Choosing the right agency is a critical pivot point for your business. Here is why new ventures and established companies consistently choose us as their dedicated digital agency in Coimbatore:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <TiltCard3D tiltIntensity={8} className="rounded-3xl">
            <div className="h-full p-8 rounded-3xl bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-violet-500 font-general">01 / Universal Consistency</span>
              <h3 className="font-zentry text-2xl font-bold uppercase text-slate-900 dark:text-white">
                The Omnichannel Approach
              </h3>
              <p className="font-robert-regular text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed">
                We do not fragment your brand. Because we handle everything from your physical print assets to your cloud-hosted web architecture and Google Ad campaigns, your brand voice continues universally consistent.
              </p>
            </div>
          </TiltCard3D>

          <TiltCard3D tiltIntensity={8} className="rounded-3xl">
            <div className="h-full p-8 rounded-3xl bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-500 font-general">02 / Founder-Led DNA</span>
              <h3 className="font-zentry text-2xl font-bold uppercase text-slate-900 dark:text-white">
                Startup-Centric Empathy
              </h3>
              <p className="font-robert-regular text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed">
                We are founders ourselves. We started from the ground up, managed the complexities of launching Search Pin, and evolved into Brand Craftsman. We understand the pressure, budget constraints, and vital need for ROI that startups face.
              </p>
            </div>
          </TiltCard3D>

          <TiltCard3D tiltIntensity={8} className="rounded-3xl md:col-span-2">
            <div className="h-full p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 font-general">03 / Elite Capability</span>
              <h3 className="font-zentry text-2xl font-bold uppercase text-slate-900 dark:text-white">
                Premier Network Access
              </h3>
              <p className="font-robert-regular text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed">
                Partnering with Brand Craftsman grants your business immediate access to our rigorously vetted network of full-stack developers, mobile app engineers, and senior designers. All members possess a minimum of five years of professional experience and have been selected through a multi-stage evaluation process that assesses not only core skills and portfolio quality, but also verifies their collaborative method and dedication to consistent communication. Unlike typical outsourced teams, our specialists regularly participate in collaborative review sessions, cross-train in emerging technologies, and are assessed on both technical delivery and innovative problem-solving in real client projects. This elite talent pool allows us to assemble high-performing, multidisciplinary teams for any project requirement, guaranteeing clients benefit by cutting-edge technical expertise, proven reliability, and innovative design insights.
              </p>
            </div>
          </TiltCard3D>

          <TiltCard3D tiltIntensity={8} className="rounded-3xl md:col-span-2">
            <div className="h-full p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0F0927] border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500 font-general">04 / Long-Term Value</span>
              <h3 className="font-zentry text-2xl font-bold uppercase text-slate-900 dark:text-white">
                Future-Proofing
              </h3>
              <p className="font-robert-regular text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed">
                We build with the future in mind. Whether it&apos;s making sure your website architecture can handle sudden viral traffic or designing a logo that will still look modern in a decade, we engineer assets that appreciate in value.
              </p>
            </div>
          </TiltCard3D>
        </div>
      </section>

      {/* ──────────────── 9. FREQUENTLY ASKED QUESTIONS (FAQS) ──────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-16 sm:py-24 border-t border-slate-200 dark:border-white/10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 font-general text-xs uppercase tracking-widest mb-4 border border-violet-500/20 font-bold">
            <FiHelpCircle /> Clarity & Confidence
          </div>
          <h2 className="font-zentry text-3xl sm:text-4xl font-black uppercase tracking-wide leading-tight text-slate-900 dark:text-white">
            Frequently Asked Questions (FAQs)
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F0927] overflow-hidden transition-all duration-300 shadow-sm"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-zentry text-lg sm:text-xl font-bold uppercase tracking-wide text-slate-900 dark:text-white cursor-pointer"
              >
                <span>{faq.q}</span>
                <FiChevronDown
                  className={`w-5 h-5 text-violet-500 shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 pt-2 text-slate-600 dark:text-zinc-300 font-robert-regular text-sm sm:text-base leading-relaxed border-t border-slate-100 dark:border-white/5">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────── 10. FINAL CTA / NEXT STEP SECTION ──────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 border-t border-slate-200 dark:border-white/10 overflow-hidden">
        {/* Floating 3D centerpiece accent */}
        <FloatingGeometry scene="hero" className="opacity-40 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#0F0927] via-[#150a36] to-[#080220] text-white border border-violet-500/30 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 text-cyan-300 font-general text-xs uppercase tracking-widest mb-6 border border-cyan-400/20 font-bold">
            <FiZap /> Consultation & Onboarding
          </div>

          <h2 className="font-zentry text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide leading-tight mb-6">
            The Next Step: <span className="text-hyper-gradient">Let&apos;s Build Your Legacy</span>
          </h2>

          <div className="font-robert-regular text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed space-y-4 mb-8 text-left sm:text-center">
            <p>
              Your brand is the most valuable source your company will ever own. Rather than entrusting it to fragmented freelancers or agencies lacking a holistic vision, take a decisive step toward long-term success by partnering with experts who understand how to build, scale, and dominate in today’s competitive environment.
            </p>
            <p>
              To get started, simply reach out to Brand Craftsman by phone, email, or our website contact form. Once you connect with us, our team will schedule an initial consultation that is completely obligation-free. During this session, we will discuss your business objectives, answer your questions, and outline potential strategies tailored to your needs. You will leave the meeting with clear next steps and a roadmap designed specifically for your brand’s growth.
            </p>
            <p className="font-semibold text-white">
              Whether you have a localized retail concept, a disruptive SaaS startup, or an established enterprise looking for a massive aesthetic and technical overhaul, Brand Craftsman is ready to execute.
            </p>
            <p className="text-cyan-300 font-zentry font-black text-xl uppercase tracking-wider">
              You have the vision. We have the craftsmanship. Let’s build something extraordinary together.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="btn-genz group"
            >
              <span>Book Obligation-Free Strategy Call</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <a
              href="mailto:santhoshrajcit1819@gmail.com"
              className="btn-genz-outline flex items-center gap-2"
            >
              <FiMail className="w-4 h-4 text-cyan-400" /> Email Leadership Directly
            </a>
          </div>
        </div>
      </section>

      {/* ──────────────── 11. LIVE PORTFOLIOS EMBEDDED STRIP ──────────────── */}
      <PortfolioStrip
        title="Explore Live Brand Craftsman Portfolios"
        subtitle="Interact with real client websites built by Brand Craftsman — test live in desktop and mobile viewports."
        maxItems={8}
        variant="dark"
      />
    </div>
  );
}
