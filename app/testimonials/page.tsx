import dynamic from "next/dynamic";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TestimonialSlider from "@/components/TestimonialSlider";

const CTASection = dynamic(() => import("@/components/CTASection"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export const metadata: Metadata = {
  title: "Testimonials | Brand Craftsman — Client Success Stories",
  description: "Read what our clients say about Brand Craftsman. Real testimonials from real businesses that achieved remarkable growth with our digital solutions.",
};

const logoPartners = [
  "TechNova", "DesignHub", "ScaleUp", "GreenLeaf", "FastTrack", "FinServ",
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        title="Client Feedback"
        description="At Brand Craftsman, we value every partnership. Here's what our clients say about working with us."
        primaryCta={{ label: "Start Your Project", href: "/contact" }}
        secondaryCta={{ label: "View Our Work", href: "/portfolios" }}
      />

      {/* Partner logos */}
      <section className="py-12 bg-blue-50 dark:bg-[#09090b] border-b border-gray-200 dark:border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {logoPartners.map((name, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 font-robert-medium text-gray-400 dark:text-gray-600 text-lg tracking-wider hover:text-violet-500 dark:hover:text-violet-400 hover:border-violet-500/30 transition-all duration-300"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSlider />

      {/* Featured testimonial */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#0f0a1a] to-[#1a0533]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-6 h-6 text-amber-400 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              ))}
            </div>
            <blockquote className="font-robert-regular text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed mb-8 italic">
              &ldquo;The team at Brand Craftsman not only delivered what was promised but also provided valuable insights that added immense value to our project. The support team is exceptional! They&apos;ve been responsive and helpful at every step of our journey.&rdquo;
            </blockquote>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl mb-4">
                OG
              </div>
              <h4 className="font-robert-medium text-lg text-white font-bold">Oliver Grioud</h4>
              <p className="font-general text-sm text-white/50 uppercase tracking-wider">CEO, Lava Ltd</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </>
  );
}
