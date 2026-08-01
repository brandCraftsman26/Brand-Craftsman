import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const pages = [
      {
        slug: "home",
        title: "Home",
        data: {
          content: [
            { type: "MainHero", props: { id: "hero-1" } },
            { type: "LogoSliderBlock", props: { id: "logos-1" } },
            { type: "ServicesBentoBlock", props: { id: "services-1" } },
            { type: "AboutBlock", props: { id: "about-1" } },
            { type: "CountersBlock", props: { id: "counters-1" } },
            { type: "MethodologyBlock", props: { id: "methodology-1" } },
            { type: "IntegrationsBrandsBlock", props: { id: "integrations-1" } },
            { type: "PricingBlock", props: { id: "pricing-1" } },
            { type: "FAQBlock", props: { id: "faq-1" } },
            { type: "TestimonialSliderBlock", props: { id: "testimonials-1" } },
            { type: "CTASectionBlock", props: { id: "cta-1" } }
          ],
          root: {}
        }
      },
      {
        slug: "about",
        title: "About Us",
        data: {
          content: [
            { 
              type: "PageHeroBlock", 
              props: { 
                id: "page-hero-about",
                title: "About Brand Craftsman",
                description: "The premier branding, web design, and digital marketing company in Coimbatore. Engineering high-performance brand identities and ROI-driven search strategies.",
                primaryCtaLabel: "Meet Founders",
                primaryCtaHref: "#architects",
                secondaryCtaLabel: "View Our Work",
                secondaryCtaHref: "/portfolios",
                bgImage: "/img/founders-hero.png"
              } 
            },
            { type: "AboutBlock", props: { id: "about-page" } },
            { type: "CountersBlock", props: { id: "counters-about" } },
            { type: "FAQBlock", props: { id: "faq-about" } },
            { type: "CTASectionBlock", props: { id: "cta-about" } }
          ],
          root: {}
        }
      },
      {
        slug: "contact",
        title: "Contact",
        data: {
          content: [
            { 
              type: "PageHeroBlock", 
              props: { 
                id: "page-hero-contact",
                title: "Get In Touch",
                description: "We would love to hear from you. Drop us a line.",
                primaryCtaLabel: "Send Message",
                primaryCtaHref: "#",
                secondaryCtaLabel: "Call Us",
                secondaryCtaHref: "tel:+910000000000",
                bgImage: "/img/founders-hero.png"
              } 
            },
            { type: "CTASectionBlock", props: { id: "cta-contact" } }
          ],
          root: {}
        }
      },
      {
        slug: "features",
        title: "Features",
        data: {
          content: [
            { 
              type: "PageHeroBlock", 
              props: { 
                id: "page-hero-features",
                title: "Our Features",
                description: "Discover what makes us the best.",
                primaryCtaLabel: "View Pricing",
                primaryCtaHref: "/pricing",
                secondaryCtaLabel: "Contact Sales",
                secondaryCtaHref: "/contact",
                bgImage: "/img/founders-hero.png"
              } 
            },
            { type: "FeaturesShowcaseBlock", props: { id: "features-showcase" } },
            { type: "ServicesBentoBlock", props: { id: "services-features" } },
            { type: "IntegrationsBrandsBlock", props: { id: "integrations-features" } },
            { type: "CTASectionBlock", props: { id: "cta-features" } }
          ],
          root: {}
        }
      },
      {
        slug: "pricing",
        title: "Pricing",
        data: {
          content: [
            { 
              type: "PageHeroBlock", 
              props: { 
                id: "page-hero-pricing",
                title: "Pricing Plans",
                description: "Simple, transparent pricing for every stage of your business.",
                primaryCtaLabel: "Get Started",
                primaryCtaHref: "/contact",
                secondaryCtaLabel: "View Features",
                secondaryCtaHref: "/features",
                bgImage: "/img/founders-hero.png"
              } 
            },
            { type: "PricingBlock", props: { id: "pricing-page" } },
            { type: "FAQBlock", props: { id: "faq-pricing" } },
            { type: "CTASectionBlock", props: { id: "cta-pricing" } }
          ],
          root: {}
        }
      },
      {
        slug: "services",
        title: "Services",
        data: {
          content: [
            { 
              type: "PageHeroBlock", 
              props: { 
                id: "page-hero-services",
                title: "Our Services",
                description: "Full-stack development, branding, and marketing.",
                primaryCtaLabel: "View Portfolios",
                primaryCtaHref: "/portfolios",
                secondaryCtaLabel: "Contact Us",
                secondaryCtaHref: "/contact",
                bgImage: "/img/founders-hero.png"
              } 
            },
            { type: "ServicesBentoBlock", props: { id: "services-page" } },
            { type: "MethodologyBlock", props: { id: "methodology-services" } },
            { type: "IntegrationsBrandsBlock", props: { id: "integrations-services" } },
            { type: "CTASectionBlock", props: { id: "cta-services" } }
          ],
          root: {}
        }
      },
      {
        slug: "testimonials",
        title: "Testimonials",
        data: {
          content: [
            { 
              type: "PageHeroBlock", 
              props: { 
                id: "page-hero-testimonials",
                title: "What Our Clients Say",
                description: "Don't just take our word for it.",
                primaryCtaLabel: "Work With Us",
                primaryCtaHref: "/contact",
                secondaryCtaLabel: "View Work",
                secondaryCtaHref: "/portfolios",
                bgImage: "/img/founders-hero.png"
              } 
            },
            { type: "TestimonialSliderBlock", props: { id: "testimonials-page" } },
            { type: "CTASectionBlock", props: { id: "cta-testimonials" } }
          ],
          root: {}
        }
      }
    ];

    const user = await prisma.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: "No user found to attach pages to" }, { status: 400 });
    }

    for (const page of pages) {
      const existing = await prisma.builderPage.findFirst({
        where: { slug: page.slug }
      });

      if (existing) {
        await prisma.builderPage.update({
          where: { id: existing.id },
          data: {
            title: page.title,
            contentJson: JSON.stringify(page.data)
          }
        });
      } else {
        await prisma.builderPage.create({
          data: {
            title: page.title,
            slug: page.slug,
            contentJson: JSON.stringify(page.data),
            userId: user.id,
            isPublished: true
          }
        });
      }
    }

    return NextResponse.json({ message: "Seeded successfully", count: pages.length });
  } catch (error) {
    console.error("Seed error", error);
    return NextResponse.json({ error: "Failed to seed" }, { status: 500 });
  }
}
