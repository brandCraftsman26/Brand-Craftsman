import { Metadata } from "next";
import Footer from "@/components/Footer";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Brand Craftsman: The Premier Branding Company in Coimbatore",
  description:
    "Learn about Brand Craftsman, the premier branding and web development company in Coimbatore spearheaded by Santhosh Shanmugasundaram & Hari Prashath. Discover our genesis, Search Pin era, and 5+ year experienced agile community.",
  keywords: [
    "About Brand Craftsman",
    "Branding Company in Coimbatore",
    "Web Design Coimbatore",
    "Digital Marketing Coimbatore",
    "Search Pin",
    "Santhosh Shanmugasundaram",
    "Hari Prashath",
  ],
  alternates: {
    canonical: "https://brandcraftsman.com/about",
  },
  openGraph: {
    title: "About Brand Craftsman: The Premier Branding Company in Coimbatore",
    description:
      "Engineering high-performance identities, bespoke web frameworks, and ROI-driven marketing in Coimbatore.",
    url: "https://brandcraftsman.com/about",
    siteName: "Brand Craftsman",
    locale: "en_IN",
    type: "website",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Brand Craftsman",
  alternateName: "Search Pin Innovation Partner",
  url: "https://brandcraftsman.com/about",
  logo: "https://brandcraftsman.com/img/logo-light.png",
  description:
    "Brand Craftsman is the premier branding and web design agency in Coimbatore, providing visual identity, custom web application architecture, and digital marketing services.",
  founder: [
    {
      "@type": "Person",
      name: "Santhosh Shanmugasundaram",
      jobTitle: "Co-Founder & Branding/Development Lead",
    },
    {
      "@type": "Person",
      name: "Hari Prashath",
      jobTitle: "Co-Founder & Digital Marketing Lead",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "santhoshrajcit1819@gmail.com",
    contactType: "customer service",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutContent />
      <Footer />
    </>
  );
}
