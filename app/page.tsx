import { getServerDb } from "@/lib/supabase/server";
import PuckRenderer from "@/components/PuckRenderer";
import Footer from "@/components/Footer";
import { Metadata } from "next";

// Import all section components as fallback for when no builder page exists
import Hero from "@/components/Hero";
import LogoSlider from "@/components/LogoSlider";
import ServicesBento from "@/components/ServicesBento";
import About from "@/components/About";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import Counters from "@/components/Counters";
import Methodology from "@/components/Methodology";
import TestimonialSlider from "@/components/TestimonialSlider";
import IntegrationsBrands from "@/components/IntegrationsBrands";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";

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
