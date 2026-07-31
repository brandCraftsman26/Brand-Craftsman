import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import LogoSlider from "@/components/LogoSlider";
import PortfolioTabs from "@/components/PortfolioTabs";

// Dynamically import heavy/below-the-fold components for better performance
const Counters = dynamic(() => import("@/components/Counters"), { ssr: true });
const About = dynamic(() => import("@/components/About"), { ssr: true });
const EditingGrid = dynamic(() => import("@/components/EditingGrid"), { ssr: true });
const FeaturesShowcase = dynamic(() => import("@/components/FeaturesShowcase"), { ssr: true });
const IntegrationsBrands = dynamic(() => import("@/components/IntegrationsBrands"), { ssr: true });
const Pricing = dynamic(() => import("@/components/Pricing"), { ssr: true });
const TestimonialSlider = dynamic(() => import("@/components/TestimonialSlider"), { ssr: true });
const Methodology = dynamic(() => import("@/components/Methodology"), { ssr: true });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true });
const CTASection = dynamic(() => import("@/components/CTASection"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <Hero />
      <LogoSlider />
      <Counters />
      <About />
      <PortfolioTabs />
      <EditingGrid />
      <FeaturesShowcase />
      <IntegrationsBrands />
      <Pricing />
      <TestimonialSlider />
      <Methodology />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
