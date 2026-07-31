import dynamic from "next/dynamic";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { FiSmartphone, FiTablet, FiMonitor, FiDownload } from "react-icons/fi";

const CTASection = dynamic(() => import("@/components/CTASection"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export const metadata: Metadata = {
  title: "Download | Brand Craftsman — Get Our Tools On Any Device",
  description: "Download Brand Craftsman tools and resources on any device. Access our design resources, brand kits, and productivity tools on mobile, tablet, and desktop.",
};

const downloadOptions = [
  {
    icon: <FiSmartphone className="w-10 h-10" />,
    title: "Mobile App",
    subtitle: "iOS & Android",
    description: "Stay connected on the go with our mobile app for real-time project updates and collaboration.",
    gradient: "from-blue-600 to-orange-600",
    buttons: [
      { label: "App Store", icon: "🍎" },
      { label: "Google Play", icon: "▶" },
    ],
  },
  {
    icon: <FiTablet className="w-10 h-10" />,
    title: "Tablet Version",
    subtitle: "iPad & Android Tablets",
    description: "Design and review on a larger screen with our optimized tablet experience.",
    gradient: "from-emerald-500 to-teal-500",
    buttons: [
      { label: "App Store", icon: "🍎" },
      { label: "Google Play", icon: "▶" },
    ],
  },
];

export default function DownloadPage() {
  return (
    <>
      <PageHero
        title="Download On Any Device"
        description="Access Brand Craftsman tools and resources on any device. Stay productive whether you're at your desk or on the move."
        primaryCta={{ label: "Get Started Now", href: "/contact" }}
        secondaryCta={{ label: "View Features", href: "/features" }}
      />

      {/* Apps for all devices */}
      <section className="py-20 md:py-28 bg-blue-50 dark:bg-[#09090b]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 font-general text-xs uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              Multi-Platform
            </span>
            <h2 className="font-zentry text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-white uppercase">
              Apps For All Your Devices
            </h2>
          </div>

          {/* Mobile & Tablet cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
            {downloadOptions.map((option, index) => (
              <div
                key={index}
                className="group relative rounded-3xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 p-8 md:p-10 overflow-hidden hover:shadow-xl hover:shadow-violet-500/5 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br opacity-5 blur-3xl" />
                
                {/* Device mockup */}
                <div className={`relative w-full aspect-[16/10] rounded-2xl bg-gradient-to-br ${option.gradient} p-[2px] mb-8 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <div className="absolute inset-[2px] rounded-[14px] bg-white dark:bg-[#1a1a2e] overflow-hidden flex items-center justify-center">
                    <div className="text-gray-300 dark:text-white/20">
                      {option.icon}
                    </div>
                  </div>
                </div>

                <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${option.gradient} text-white font-general text-xs uppercase tracking-wider mb-3`}>
                  {option.subtitle}
                </span>
                <h3 className="font-zentry text-xl md:text-2xl font-black text-black dark:text-white uppercase mb-3">
                  {option.title}
                </h3>
                <p className="font-robert-regular text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-6">
                  {option.description}
                </p>

                <div className="flex gap-3">
                  {option.buttons.map((btn, i) => (
                    <a
                      key={i}
                      href="#"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/80 font-general text-xs uppercase tracking-wider hover:bg-violet-500 hover:text-white hover:border-violet-500 transition-all duration-300"
                    >
                      <span>{btn.icon}</span>
                      {btn.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop card (full width) */}
          <div className="max-w-5xl mx-auto">
            <div className="group relative rounded-3xl bg-gradient-to-r from-[#1a0533] to-[#2d1b69] p-8 md:p-12 overflow-hidden hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-500">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[100px]" />
              </div>

              <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-[16/10] rounded-2xl bg-white/[0.06] border border-white/[0.08] overflow-hidden flex items-center justify-center">
                    <FiMonitor className="w-20 h-20 text-white/20" />
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <span className="inline-block px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 font-general text-xs uppercase tracking-wider mb-3">
                    Desktop
                  </span>
                  <h3 className="font-zentry text-2xl md:text-3xl font-black text-white uppercase mb-3">
                    Desktop Version
                  </h3>
                  <p className="font-robert-regular text-white/60 leading-relaxed text-sm mb-6">
                    Full-featured desktop application with advanced design tools, real-time collaboration, and seamless integration with your existing workflow.
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#1a0533] font-general text-xs uppercase tracking-wider hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <FiDownload className="w-4 h-4" />
                      Download for Mac
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-general text-xs uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
                    >
                      <FiDownload className="w-4 h-4" />
                      Windows
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </>
  );
}
