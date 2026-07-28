import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import LogoSlider from "@/components/LogoSlider";
import About from "@/components/About";

// Dynamically import heavy/below-the-fold components for better performance
const ServicesBento = dynamic(() => import("@/components/ServicesBento"), { ssr: true });
const Pricing = dynamic(() => import("@/components/Pricing"), { ssr: true });
const Methodology = dynamic(() => import("@/components/Methodology"), { ssr: true });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <Hero />
      <LogoSlider />
      <About />
      <ServicesBento />
      <Pricing />
      <Methodology />
      <FAQ />
      <Footer />
    </main>
  );
}
