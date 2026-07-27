import Hero from "@/components/Hero";
import LogoSlider from "@/components/LogoSlider";
import About from "@/components/About";
import ServicesBento from "@/components/ServicesBento";
import Methodology from "@/components/Methodology";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <Hero />
      <LogoSlider />
      <About />
      <ServicesBento />
      <Methodology />
      <FAQ />
      <Footer />
    </main>
  );
}
