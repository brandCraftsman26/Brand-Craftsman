import { Config } from "@measured/puck";
import Hero from "@/components/Hero";
import PageHero from "@/components/PageHero";
import ServicesBento from "@/components/ServicesBento";
import Methodology from "@/components/Methodology";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import TestimonialSlider from "@/components/TestimonialSlider";
import CTASection from "@/components/CTASection";
import About from "@/components/About";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import Counters from "@/components/Counters";
import IntegrationsBrands from "@/components/IntegrationsBrands";
import LogoSlider from "@/components/LogoSlider";

type Props = {
  HeadingBlock: { title: string };
  TextBlock: { content: string };
  HeroBlock: { headline: string; subheadline: string; ctaText: string };
  AICustomBlock: { prompt: string; generatedHtml: string };
  MainHero: Record<string, never>;
  PageHeroBlock: { title: string; description: string; primaryCtaLabel: string; primaryCtaHref: string; secondaryCtaLabel: string; secondaryCtaHref: string; bgImage: string };
  ServicesBentoBlock: Record<string, never>;
  MethodologyBlock: Record<string, never>;
  PricingBlock: Record<string, never>;
  FAQBlock: Record<string, never>;
  TestimonialSliderBlock: Record<string, never>;
  CTASectionBlock: Record<string, never>;
  AboutBlock: Record<string, never>;
  FeaturesShowcaseBlock: Record<string, never>;
  CountersBlock: Record<string, never>;
  IntegrationsBrandsBlock: Record<string, never>;
  LogoSliderBlock: Record<string, never>;
};

export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
      ),
    },
    TextBlock: {
      fields: {
        content: { type: "textarea" },
      },
      defaultProps: {
        content: "Write some text here...",
      },
      render: ({ content }) => (
        <div style={{ padding: 64 }}>
          <p className="text-lg text-neutral-600">{content}</p>
        </div>
      ),
    },
    HeroBlock: {
      fields: {
        headline: { type: "text" },
        subheadline: { type: "textarea" },
        ctaText: { type: "text" }
      },
      defaultProps: {
        headline: "Build Your Vision",
        subheadline: "The ultimate AI-powered website builder.",
        ctaText: "Get Started"
      },
      render: ({ headline, subheadline, ctaText }) => (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-24 text-center">
          <h1 className="text-6xl font-extrabold mb-6">{headline}</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{subheadline}</p>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl">
            {ctaText}
          </button>
        </div>
      )
    },
    AICustomBlock: {
      fields: {
        prompt: { type: "text" },
        generatedHtml: { type: "textarea" },
      },
      defaultProps: {
        prompt: "A beautiful feature section with 3 columns",
        generatedHtml: "",
      },
      render: ({ prompt, generatedHtml }) => {
        if (!generatedHtml) {
          return (
            <div className="p-12 border-2 border-dashed border-purple-400 bg-purple-50 text-center">
              <h3 className="text-xl font-bold text-purple-800">AI Custom Block</h3>
              <p className="text-purple-600 mb-4">Prompt: {prompt}</p>
              <p className="text-sm">Click &quot;Evolve Design&quot; or &quot;Generate Blocks&quot; in the top bar to build this section.</p>
            </div>
          );
        }
        return <div dangerouslySetInnerHTML={{ __html: generatedHtml }} />;
      }
    },
    MainHero: {
      render: () => <Hero />
    },
    PageHeroBlock: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        primaryCtaLabel: { type: "text" },
        primaryCtaHref: { type: "text" },
        secondaryCtaLabel: { type: "text" },
        secondaryCtaHref: { type: "text" },
        bgImage: { type: "text" },
      },
      defaultProps: {
        title: "Page Title",
        description: "Page description goes here.",
        primaryCtaLabel: "Get Started",
        primaryCtaHref: "/contact",
        secondaryCtaLabel: "Learn More",
        secondaryCtaHref: "/about",
        bgImage: "/img/founders-hero.png"
      },
      render: ({ title, description, primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref, bgImage }) => (
        <PageHero 
          title={title} 
          description={description} 
          primaryCta={{ label: primaryCtaLabel, href: primaryCtaHref }}
          secondaryCta={{ label: secondaryCtaLabel, href: secondaryCtaHref }}
          bgImage={bgImage}
        />
      )
    },
    ServicesBentoBlock: {
      render: () => <ServicesBento />
    },
    MethodologyBlock: {
      render: () => <Methodology />
    },
    PricingBlock: {
      render: () => <Pricing />
    },
    FAQBlock: {
      render: () => <FAQ />
    },
    TestimonialSliderBlock: {
      render: () => <TestimonialSlider />
    },
    CTASectionBlock: {
      render: () => <CTASection />
    },
    AboutBlock: {
      render: () => <About />
    },
    FeaturesShowcaseBlock: {
      render: () => <FeaturesShowcase />
    },
    CountersBlock: {
      render: () => <Counters />
    },
    IntegrationsBrandsBlock: {
      render: () => <IntegrationsBrands />
    },
    LogoSliderBlock: {
      render: () => <LogoSlider />
    }
  },
};
