import dynamic from "next/dynamic";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

const CTASection = dynamic(() => import("@/components/CTASection"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export const metadata: Metadata = {
  title: "Features | Brand Craftsman — High-Performance SaaS Capabilities",
  description: "Discover the powerful features that set Brand Craftsman apart. From custom web design to data-driven SEO, explore our comprehensive digital solutions.",
};

const featureSticky = [
  {
    title: "Website Competitor Analysis",
    description: "Dive into keyword cluster research with Search Pin analytical tools. Identify high-intent search queries relevant to your industry and engineer high-ranking content architectures.",
    features: ["Search Pin Keyword Mapping", "Live Competitor Tracking", "High-ROI Content Architecture"],
    gradient: "from-[#6766FF] to-[#00F0FF]",
  },
  {
    title: "Customised Technical SEO",
    description: "Tailor your search engine optimization with bespoke schema structures and Next.js speed optimization. Stay ahead of search engine algorithm updates with agile, data-driven execution.",
    features: ["JSON-LD Schema Engineering", "Page Speed & Core Web Vitals", "Dominant Organic Search Rankings"],
    gradient: "from-[#0DB561] to-[#00F0FF]",
  },
  {
    title: "Local SEO & Conversion Boost",
    description: "Dominate local search rankings in Coimbatore and beyond, driving qualified leads straight to your business. Integrated with automated lead capture funnels.",
    features: ["Google Business Profile Scaling", "Local Keyword Dominance", "Automated Lead Capture Funnels"],
    gradient: "from-[#FF007A] to-[#FF9F31]",
  },
];

const howItWorks = [
  { title: "Create High-Impact Campaigns", description: "Design visual campaigns that captivate your audience and turn clicks into loyal customers." },
  { title: "Automate Lead Workflows", description: "Streamline customer acquisition with intelligent digital automation that saves time and scales revenue." },
  { title: "Scale Your Market Reach", description: "Expand into new territories with Search Pin data-driven growth strategies." },
];

const excellenceCards = [
  { icon: "📊", title: "Comprehensive Analytics", description: "Gain real-time visibility into traffic, conversion rates, and revenue ROI with custom reporting." },
  { icon: "⚡", title: "Lightning Fast Performance", description: "Ultra-fast Next.js architecture ensuring <1s load times and 100/100 Lighthouse performance scores." },
  { icon: "🎯", title: "Precision Audience Targeting", description: "Engage your exact ideal customer profile across search, display, and social media channels." },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        title="SaaS Features & Capabilities"
        description="Discover the powerful engineering and marketing capabilities that set Brand Craftsman apart. From custom web development to dominant technical SEO."
        primaryCta={{ label: "Start Your Project", href: "/contact" }}
        secondaryCta={{ label: "View Pricing", href: "/pricing" }}
      />

      {/* Feature Sections */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-[#07011F] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {featureSticky.map((feature, index) => (
              <div
                key={index}
                className="relative rounded-3xl bg-white dark:bg-[#0F0927]/90 border border-slate-200 dark:border-white/10 p-8 md:p-12 overflow-hidden hover:shadow-[0_0_40px_rgba(103,102,255,0.2)] transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                  <div className="w-full lg:w-1/2">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-general text-xs uppercase tracking-widest font-bold mb-4">
                      FEATURE // 0{index + 1}
                    </div>

                    <h3 className="font-zentry text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase mb-4 leading-tight">
                      {feature.title}
                    </h3>

                    {/* High Contrast Description */}
                    <p className="font-robert-medium text-slate-700 dark:text-zinc-200 leading-relaxed mb-6 text-base md:text-lg font-medium">
                      {feature.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {feature.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-800 dark:text-zinc-100 font-robert-medium font-semibold text-base">
                          <FiCheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <a href="/contact" className="btn-genz group">
                      Unlock Capability
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </a>
                  </div>

                  <div className="w-full lg:w-1/2">
                    <div className={`relative aspect-[4/3] rounded-2xl bg-gradient-to-br ${feature.gradient} p-[2px] shadow-2xl`}>
                      <div className="absolute inset-[2px] rounded-[14px] bg-[#07011F] overflow-hidden p-6 flex flex-col justify-between">
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                          </div>
                          <span className="text-xs font-mono text-cyan-400 font-bold">ANALYSIS ENGINE</span>
                        </div>
                        <div className="space-y-3 my-4">
                          <div className="h-4 w-2/3 rounded bg-white/20" />
                          <div className="h-3 w-full rounded bg-white/10" />
                          <div className="h-3 w-4/5 rounded bg-white/10" />
                          <div className="mt-4 grid grid-cols-3 gap-2">
                            {[65, 90, 75].map((val, idx) => (
                              <div key={idx} className="rounded-xl bg-white/[0.05] p-3 border border-white/10">
                                <span className="text-[10px] text-white/50 block">METRIC {idx + 1}</span>
                                <span className="text-xl font-bold text-white">+{val}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-[#080220] border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-cyan-400 font-general text-xs uppercase tracking-widest font-bold mb-4">
              METHODOLOGY
            </span>
            <h2 className="font-zentry text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              Next-Level Execution
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-[#0F0927]/80 border border-white/10 hover:border-cyan-400/60 backdrop-blur-xl transition-all duration-500 text-center hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#6766FF] to-[#00F0FF] text-white font-black text-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  0{index + 1}
                </div>
                <h3 className="font-robert-medium text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="font-robert-regular text-zinc-200 leading-relaxed text-base font-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Excellence Cards */}
      <section className="py-24 md:py-32 bg-slate-50 dark:bg-[#07011F] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-zentry text-4xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase">
              Excellence Starts Here
            </h2>
            <p className="font-robert-medium text-slate-700 dark:text-zinc-200 text-lg md:text-xl mt-4 font-semibold">
              Revolutionise your online growth with Brand Craftsman. Comprehensive solutions designed to transform your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {excellenceCards.map((card, index) => (
              <div
                key={index}
                className="group p-8 rounded-3xl bg-white dark:bg-[#0F0927]/80 border border-slate-200 dark:border-white/10 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="text-5xl mb-5">{card.icon}</div>
                <h4 className="font-robert-medium text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {card.title}
                </h4>
                <p className="font-robert-regular text-slate-700 dark:text-zinc-300 leading-relaxed text-base">
                  {card.description}
                </p>
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
