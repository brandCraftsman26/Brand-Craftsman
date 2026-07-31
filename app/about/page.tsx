import React from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import { FiCheckCircle, FiZap, FiShield, FiAward, FiUsers, FiTrendingUp } from "react-icons/fi";

const CTASection = dynamic(() => import("@/components/CTASection"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export const metadata: Metadata = {
  title: "About Us | Brand Craftsman — Premier Branding Company in Coimbatore",
  description: "Learn about Brand Craftsman, founded by Santhosh Shanmugasundaram & Hari Prashath. Discover our genesis from Search Pin (2024), 5+ yr expert community, CSR initiatives, and vision as Coimbatore's top digital agency.",
  openGraph: {
    title: "About Us | Brand Craftsman — Premier Branding Company in Coimbatore",
    description: "Architecting digital excellence with world-class branding, modern full-stack development, and Search Pin performance marketing.",
    url: "https://brandcraftsman.com/about",
    siteName: "Brand Craftsman",
    images: [{ url: "/img/founders-hero.png", width: 1200, height: 630, alt: "Brand Craftsman Founders" }],
    locale: "en_US",
    type: "website",
  },
};

const faqs = [
  {
    q: "What makes Brand Craftsman different from other digital marketing agencies in Coimbatore?",
    a: "While many agencies focus solely on either design or marketing, Brand Craftsman combines both at an elite level. Led by Santhosh (Development/Branding) and Hari (Digital Marketing), we guarantee that your beautiful brand is backed by flawless technical architecture and aggressive marketing. Furthermore, our unique community model of 5+ year experienced freelancers allows us to scale instantly to meet any technical demand."
  },
  {
    q: "As a startup on a tight budget, can I afford a top-tier branding company in Coimbatore?",
    a: "Absolutely. Our foundational goal is to support new entrepreneurs and startups. We understand startup constraints because we are founders ourselves. We supply scalable, phased solutions that let you build critical brand infrastructure now and expand your digital ecosystem as your revenue grows."
  },
  {
    q: "What specific services fall under your branding and development umbrella?",
    a: "We operate as a full-stack digital agency that Coimbatore businesses trust for comprehensive solutions. This includes corporate identity design, logo creation, UI/UX designing, custom web and mobile app development, e-commerce architecture, print media design, and full-scale digital marketing (SEO, PPC, Social Media)."
  },
  {
    q: "How does Brand Craftsman contribute to the local community?",
    a: "Social responsibility is baked into our DNA. We actively work to develop skilled students and unemployed individuals in Coimbatore. Through targeted training, especially during college holidays, we teach modern, highly employable skills like frontend web development and digital marketing, serving as a bridge between raw talent and industry requirements."
  },
  {
    q: "How fast can we expect to see results after partnering with your branding experts in Coimbatore?",
    a: "Visual branding and web development are delivered on strict, project-specific timelines. For digital marketing, Performance/PPC campaigns can generate high-quality leads within 48 hours, while organic SEO and brand-authority building are long-term investments that typically show significant compound growth within 3 to 6 months."
  }
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Brand Craftsman",
  "url": "https://brandcraftsman.com",
  "logo": "https://brandcraftsman.com/img/logo-dark.png",
  "founder": [
    { "@type": "Person", "name": "Santhosh Shanmugasundaram", "jobTitle": "Branding & Development Specialist" },
    { "@type": "Person", "name": "Hari Prashath", "jobTitle": "Digital Marketing Strategist" }
  ],
  "foundingDate": "2024",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Coimbatore",
    "addressRegion": "Tamil Nadu",
    "addressCountry": "India"
  },
  "knowsAbout": ["Web Design", "Digital Marketing", "Branding", "Technical SEO", "App Development"],
  "sameAs": ["https://searchpin.in"]
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <PageHero
        title="About Brand Craftsman"
        description="The premier branding, web design, and digital marketing company in Coimbatore. Engineering high-performance brand identities and ROI-driven search strategies."
        primaryCta={{ label: "Meet Founders", href: "#architects" }}
        secondaryCta={{ label: "View Our Work", href: "/portfolios" }}
        bgImage="/img/founders-hero.png"
      />

      {/* Philosophy Section */}
      <section className="relative py-24 md:py-32 bg-slate-50 dark:bg-[#07011F] overflow-hidden">
        {/* Intellio Mesh Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full bg-[#6766FF]/10 blur-[140px]" />
          <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-[#FF007A]/10 blur-[140px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0F0927]/90 border border-slate-200 dark:border-white/10 shadow-[0_0_50px_rgba(103,102,255,0.25)] backdrop-blur-2xl space-y-6 font-robert-medium text-slate-800 dark:text-zinc-100 text-lg md:text-xl leading-relaxed">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-500/10 border border-violet-400/30 text-cyan-400 font-general text-xs uppercase tracking-widest font-bold mb-2">
              <FiShield className="w-4 h-4 text-cyan-400" />
              TRUST & CREDIBILITY
            </div>
            <p>
              At a time when every business fights for consumer attention, the right brand strategy is the difference between obscurity and market leadership. At Brand Craftsman, we help businesses achieve tangible results such as increased revenue, greater market share, and long-term brand authority.
            </p>
            <p>
              We are more than just a traditional design agency; we are a full-stack branding and software engineering firm in Coimbatore dedicated to building scalable digital frameworks for ambitious founders, enterprise brands, and growing startups.
            </p>
            <p>
              Our philosophy combines in-depth visual identity design with Search Pin data-driven digital marketing developed collaboratively for each client. By uniting these disciplines, we clarify the brand message and enhance its market relevance, transforming emerging companies into industry leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Genesis & History */}
      <section className="py-24 md:py-32 bg-[#080220] border-t border-b border-white/10 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-cyan-400 font-general text-xs uppercase tracking-widest font-bold">
                <FiZap /> OPERATIONAL EVOLUTION
              </div>
              <h2 className="font-zentry text-3xl sm:text-5xl font-black uppercase leading-tight text-white">
                Our Genesis: From Passion to Market Leadership
              </h2>
              <div className="font-robert-medium text-zinc-200 text-base md:text-lg space-y-4 leading-relaxed font-semibold">
                <p>
                  In 2019, our founders, <strong>Santhosh Shanmugasundaram</strong> and <strong>Hari Prashath</strong>, began their careers managing digital campaigns and brand systems at Todo Solution. Through hands-on execution across retail, healthcare, manufacturing, and tech sectors, they identified the core disconnect in the market.
                </p>
                <p className="p-6 rounded-2xl bg-[#0F0927] border border-amber-400/40 text-amber-300 font-medium">
                  The most glaring issue was the divide between design and technical SEO. We saw incredible products fail due to poor search visibility, and beautiful brands collapse due to slow web architecture.
                </p>
              </div>
            </div>

            {/* Search Pin Chapter */}
            <div className="bg-[#0F0927] text-white p-8 sm:p-10 rounded-3xl border border-cyan-400/30 shadow-[0_0_40px_rgba(0,240,255,0.2)] space-y-6">
              <span className="px-4 py-1.5 rounded-full bg-cyan-400/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                Milestone Chapter // 2024
              </span>
              <h3 className="font-zentry text-3xl sm:text-4xl font-black uppercase text-cyan-400">
                The Search Pin Era (2024)
              </h3>
              <p className="font-robert-medium text-zinc-200 text-base leading-relaxed">
                We launched <strong>Search Pin</strong> in 2024 as a specialized performance digital marketing engine. We helped Coimbatore businesses dominate Google search rankings, run high-converting ad campaigns, and build multi-channel brand authority.
              </p>
              <div className="pt-4 border-t border-white/10 space-y-2">
                <h4 className="font-zentry text-xl font-bold uppercase text-white">
                  Birth of Brand Craftsman
                </h4>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  This realization birthed Brand Craftsman — evolving from pure digital marketing into full-spectrum brand stewardship. We combine web architecture, mobile apps, visual identity, and Search Pin growth marketing into one unified agency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Architects Section */}
      <section id="architects" className="py-24 md:py-32 bg-slate-50 dark:bg-[#07011F] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-cyan-400 font-general text-xs uppercase tracking-widest font-bold mb-4">
              LEADERSHIP & EXPERTISE
            </span>
            <h2 className="font-zentry text-4xl sm:text-5xl font-black uppercase text-slate-900 dark:text-white">
              Meet the Architects of Your Brand
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Santhosh Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0F0927]/90 border border-slate-200 dark:border-white/10 hover:border-cyan-400/60 shadow-xl transition-all duration-300 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6766FF] to-[#00F0FF] text-white flex items-center justify-center font-zentry font-black text-2xl shadow-md">
                  SS
                </div>
                <div>
                  <h3 className="font-zentry text-2xl font-bold uppercase text-slate-900 dark:text-white">Santhosh Shanmugasundaram</h3>
                  <p className="text-cyan-400 font-general text-xs uppercase tracking-widest font-bold">Branding & Development Lead</p>
                </div>
              </div>
              <p className="font-robert-medium text-slate-800 dark:text-zinc-200 leading-relaxed text-base">
                Santhosh spearheads full-stack web engineering and visual brand systems. With deep expertise across Next.js, headless CMS, modern frontends, and corporate design standards, he ensures your web applications are blazing fast, secure, and visually stunning.
              </p>
            </div>

            {/* Hari Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0F0927]/90 border border-slate-200 dark:border-white/10 hover:border-emerald-400/60 shadow-xl transition-all duration-300 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0DB561] to-[#00F0FF] text-white flex items-center justify-center font-zentry font-black text-2xl shadow-md">
                  HP
                </div>
                <div>
                  <h3 className="font-zentry text-2xl font-bold uppercase text-slate-900 dark:text-white">Hari Prashath</h3>
                  <p className="text-emerald-400 font-general text-xs uppercase tracking-widest font-bold">Digital Marketing Strategist</p>
                </div>
              </div>
              <p className="font-robert-medium text-slate-800 dark:text-zinc-200 leading-relaxed text-base">
                Hari drives Search Pin digital marketing strategy, technical SEO auditing, performance ad campaigns, and organic growth funnels. His data-centric methodology turns brand visibility into compounding revenue growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Network */}
      <section className="py-24 md:py-32 bg-[#080220] border-t border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="lg:col-span-1 space-y-6">
              <h3 className="font-zentry text-3xl sm:text-4xl font-black uppercase text-white leading-tight">
                Our Agile Expert Community
              </h3>
              <p className="font-robert-medium text-zinc-200 leading-relaxed text-base">
                Brand Craftsman operates with a tightly-knit network of senior freelancers and specialists, all possessing 5+ years of professional experience across development, design, and marketing.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Mobile App Developers", text: "Engineering custom iOS & Android mobile apps with React Native & Flutter.", color: "text-cyan-400", link: "/services/mobile-app-development" },
                { title: "Performance Marketers", text: "Running high-ROI Meta & Google PPC advertising campaigns.", color: "text-emerald-400", link: "/services/digital-marketing" },
                { title: "Senior UI/UX Designers", text: "Designing bespoke interfaces, 3D assets, and style guides.", color: "text-pink-400", link: "/services/logo-designing" },
                { title: "Full-Stack Developers", text: "Building Next.js web applications, REST APIs, and e-commerce platforms.", color: "text-indigo-400", link: "/services/web-development" },
              ].map((item, idx) => (
                <Link href={item.link} key={idx} className="block group">
                  <div className="h-full p-6 rounded-2xl bg-[#0F0927] border border-white/10 group-hover:border-cyan-400/40 transition-all">
                    <h4 className={`font-zentry text-xl font-bold uppercase ${item.color} mb-2 group-hover:scale-105 transition-transform origin-left`}>{item.title}</h4>
                    <p className="font-robert-regular text-zinc-300 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQ data={faqs.map(f => ({ question: f.q, answer: f.a }))} />

      <CTASection />
      <Footer />
    </>
  );
}
