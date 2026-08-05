import { getServerDb } from "@/lib/supabase/server";
import PuckRenderer from "@/components/PuckRenderer";
import Footer from "@/components/Footer";
import { Metadata } from "next";

// Import all section components as fallback for when no builder page exists
import dynamic from "next/dynamic";
import Hero from "@/components/Hero"; // Hero remains statically imported for fast initial paint

const LogoSlider = dynamic(() => import("@/components/LogoSlider"), { ssr: true });
const ServicesBento = dynamic(() => import("@/components/ServicesBento"), { ssr: true });
const About = dynamic(() => import("@/components/About"), { ssr: true });
const FeaturesShowcase = dynamic(() => import("@/components/FeaturesShowcase"), { ssr: true });
const Counters = dynamic(() => import("@/components/Counters"), { ssr: true });
const Methodology = dynamic(() => import("@/components/Methodology"), { ssr: true });
const TestimonialSlider = dynamic(() => import("@/components/TestimonialSlider"), { ssr: true });
const IntegrationsBrands = dynamic(() => import("@/components/IntegrationsBrands"), { ssr: true });
const Pricing = dynamic(() => import("@/components/Pricing"), { ssr: true });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true });
const CTASection = dynamic(() => import("@/components/CTASection"), { ssr: true });

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await getServerDb();
  const { data: page } = await supabase
    .from("builder_pages")
    .select("title")
    .eq("slug", "home")
    .eq("is_published", true)
    .single();
  
  if (!page) {
    return { title: "Brand Craftsman | Premier Web Design & Digital Marketing Company in Coimbatore" };
  }

  return { title: page.title };
}

export default async function Home() {
  const supabase = await getServerDb();
  const { data: page } = await supabase
    .from("builder_pages")
    .select("*")
    .eq("slug", "home")
    .eq("is_published", true)
    .single();

  // If a published "home" page exists in the builder, render it
  if (page) {
    const data = JSON.parse(page.content_json);
    return (
      <>
        <PuckRenderer data={data} />
        <Footer />
      </>
    );
  }

  // Fallback: render the static home page sections
  return (
    <>
      <Hero />
      <LogoSlider />
      <ServicesBento />
      <About />
      <FeaturesShowcase />
      <Counters />
      <Methodology />
      <TestimonialSlider />
      <IntegrationsBrands />
      <Pricing />
      <FAQ />
      <CTASection />
      <Footer />
    </>
  );
}
