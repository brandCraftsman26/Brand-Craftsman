import Footer from "@/components/Footer";
import { Metadata } from "next";

// Import all section components
import dynamic from "next/dynamic";
import Hero from "@/components/Hero"; // Hero remains statically imported for fast initial paint

const LogoSlider = dynamic(() => import("@/components/LogoSlider"), { ssr: true });
const ServicesBento = dynamic(() => import("@/components/ServicesBento"), { ssr: true });
const About = dynamic(() => import("@/components/About"), { ssr: true });
const FeaturesShowcase = dynamic(() => import("@/components/FeaturesShowcase"), { ssr: true });
const PortfolioTabs = dynamic(() => import("@/components/PortfolioTabs"), { ssr: true });
const PortfolioStrip = dynamic(() => import("@/components/PortfolioStrip"));
const Counters = dynamic(() => import("@/components/Counters"), { ssr: true });
const Methodology = dynamic(() => import("@/components/Methodology"), { ssr: true });
const TestimonialSlider = dynamic(() => import("@/components/TestimonialSlider"), { ssr: true });
const IntegrationsBrands = dynamic(() => import("@/components/IntegrationsBrands"), { ssr: true });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true });
const CTASection = dynamic(() => import("@/components/CTASection"), { ssr: true });

export const metadata: Metadata = {
  title: "Brand Craftsman | Premier Web Design & Digital Marketing Company in Coimbatore",
};

export default function Home() {
  return (
    <>
      <Hero />
      <LogoSlider />
      <ServicesBento />
      <About />
      <FeaturesShowcase />
      <PortfolioTabs />
      <PortfolioStrip
        title="Our Live Client Portfolios"
        subtitle="Interact with real client websites built by Brand Craftsman — preview live in desktop and mobile."
        maxItems={10}
      />
      <Counters />
      <Methodology />
      <TestimonialSlider />
      <IntegrationsBrands />
      <FAQ />
      <CTASection />
      <Footer />
    </>
  );
}
