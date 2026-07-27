import React from "react";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { FiCheckCircle, FiStar, FiZap, FiArrowRight, FiShield, FiTrendingUp } from "react-icons/fi";

interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  h1: string;
  h2Intro: string;
  description: string[];
  features: string[];
  benefits: string[];
  process: { step: string; text: string }[];
  searchPinSynergy: string;
  faq: { q: string; a: string }[];
}

const servicesDatabase: Record<string, ServiceData> = {
  "digital-marketing": {
    slug: "digital-marketing",
    title: "Data-Driven Digital Marketing",
    subtitle: "High-ROI Performance Marketing, SEO & Paid Media Campaigns in Coimbatore",
    category: "Performance & SEO",
    h1: "Digital Marketing Company in Coimbatore: Data-Driven Business Growth",
    h2Intro: "Dominate Search Rankings & Multiply Lead Conversions",
    description: [
      "Without a powerful digital marketing engine, even the most beautifully designed brand remains hidden from potential customers. At Brand Craftsman, we deliver performance-focused digital marketing campaigns engineered for high return on ad spend (ROAS) and long-term search engine dominance.",
      "Rooted in our genesis with Search Pin (2024), our digital marketing strategies in Coimbatore combine precise audience segmentation, technical SEO, high-converting PPC funnels, and data analytics to transform business inquiries into revenue."
    ],
    features: [
      "Technical SEO & On-Page Keyword Optimization",
      "Google Ads PPC & Performance Max Campaigns",
      "Social Media Performance Advertising (Meta, LinkedIn)",
      "High-Converting Landing Page Optimization",
      "Local Search Engine Dominance for Coimbatore Businesses"
    ],
    benefits: [
      "Generate qualified B2B & B2C leads within 48 hours via targeted PPC",
      "Achieve long-term #1 Google rankings with Search Pin SEO standards",
      "Transparent reporting with clear ROI and cost-per-lead tracking"
    ],
    process: [
      { step: "01. Market Audit", text: "In-depth competitor analysis, keyword search volume mapping, and audience profiling." },
      { step: "02. Funnel Design", text: "Creating high-converting landing pages, copy, and ad creatives tailored to target demographics." },
      { step: "03. Multi-Channel Launch", text: "Executing synchronized campaigns across Google Search, Meta Ads, and LinkedIn." },
      { step: "04. Continuous Optimization", text: "Weekly A/B testing of ad copy, bids, and landing page elements to maximize conversion rates." }
    ],
    searchPinSynergy: "Powered by Search Pin's analytical framework, our digital marketing campaigns utilize field-tested search methodologies to outrank competitors and capture dominant market share.",
    faq: [
      { q: "How soon will my digital marketing campaign show results?", a: "PPC ad campaigns generate leads within 24 to 48 hours, while organic SEO builds compounding compound growth over 3 to 6 months." },
      { q: "Do you offer localized SEO in Coimbatore?", a: "Yes! We specialize in hyper-local Google Business Profile optimization and geo-targeted keywords for Coimbatore industries." }
    ]
  },

  "branding": {
    slug: "branding",
    title: "Pro Branding & Identity Design",
    subtitle: "Engineering High-Performance Corporate Identities & Brand Architecture",
    category: "Corporate Identity",
    h1: "Premier Branding Company in Coimbatore: Bespoke Identity Engineering",
    h2Intro: "Transforming Business Concepts into Iconic Market Leaders",
    description: [
      "Your brand is what your audience feels in their gut about your company. We construct comprehensive visual and psychological brand universes that command respect, build customer trust, and establish competitive moats.",
      "Brand Craftsman approaches branding not as simple graphic design, but as strategic brand stewardship. We align your product capabilities with consumer expectations to build lasting market authority."
    ],
    features: [
      "Brand Positioning & Strategic Core Messaging",
      "Complete Visual Identity Design & Style Guides",
      "Typography, Color Palette & Design Tokens",
      "Product Packaging & Merchandising Design",
      "Omnichannel Brand Guidelines Documentation"
    ],
    benefits: [
      "Differentiate your company cleanly from regional competitors",
      "Command premium pricing with a world-class visual perception",
      "Ensure 100% consistent brand voice across all customer touchpoints"
    ],
    process: [
      { step: "01. Brand Discovery", text: "Deep dive into company values, founder vision, market gap, and target customer psychology." },
      { step: "02. Identity Concepting", text: "Crafting distinct visual directions, brand marks, typography pairings, and color palettes." },
      { step: "03. Guidelines Creation", text: "Developing comprehensive brand book guidelines for digital and physical deployment." },
      { step: "04. Rollout Execution", text: "Implementing the new identity across web apps, print collateral, and marketing funnels." }
    ],
    searchPinSynergy: "By uniting visual branding design with Search Pin's data-driven market positioning, we ensure your brand looks world-class while remaining deeply relevant to your ideal customer base.",
    faq: [
      { q: "What deliverables are included in a branding package?", a: "You receive primary and secondary logos, brand guidelines PDF, typography rules, color tokens, social templates, and print assets." },
      { q: "Can you rebrand an existing established company?", a: "Yes, we specialize in complete visual and strategic overhauls for legacy firms looking to modernize." }
    ]
  },

  "logo-designing": {
    slug: "logo-designing",
    title: "Custom Logo Designing",
    subtitle: "Timeless Vector Logo Marks & Brand Marks",
    category: "Visual Craft",
    h1: "Professional Logo Designing in Coimbatore | Brand Craftsman",
    h2Intro: "Crafting Iconic Brand Icons That Leave a Lasting Impression",
    description: [
      "A logo is the single most recognized symbol of your enterprise. We design timeless, vector-crisp logos that encapsulate your mission, values, and industry authority in a single glance.",
      "Our senior designers create bespoke vector logos from scratch—no stock templates or generic symbols—ensuring your mark remains distinct and memorable for decades."
    ],
    features: [
      "Custom Hand-Crafted Vector Logo Concepts",
      "Monogram, Wordmark, & Combination Mark Variations",
      "Scalable SVG, EPS, AI, PNG, and PDF Asset Packages",
      "Favicon & App Icon Adaptations",
      "Light & Dark Theme Optimized Versions"
    ],
    benefits: [
      "Own a 100% unique trademarkable logo mark",
      "Scale seamlessly from a smartwatch screen to giant outdoor billboards",
      "Project instant credibility to clients and investors"
    ],
    process: [
      { step: "01. Creative Briefing", text: "Understanding brand attributes, target audience, and preferred visual aesthetics." },
      { step: "02. Vector Drafting", text: "Sketching and digitizing 3-5 distinct creative logo concepts." },
      { step: "03. Refinement", text: "Fine-tuning geometry, spacing, typography, and color harmonies." },
      { step: "04. Master Export", text: "Delivering complete vector source files for web and print applications." }
    ],
    searchPinSynergy: "We design logos with digital visibility in mind, ensuring crisp rendering across Google search results, social avatars, and mobile applications.",
    faq: [
      { q: "How many logo concepts will I see?", a: "We present 3 to 5 distinct creative concepts for your review and feedback." },
      { q: "Do I get full copyright ownership of the logo?", a: "Yes! You receive 100% full legal ownership and raw vector source files." }
    ]
  },

  "printing": {
    slug: "printing",
    title: "Corporate Printing & Collateral",
    subtitle: "Luxury Business Cards, Brochures, Packaging & Event Print Media",
    category: "Physical Print",
    h1: "High-End Corporate Printing Services in Coimbatore",
    h2Intro: "Tangible Print Craftsmanship That Elevates Your Brand Presence",
    description: [
      "In a digital world, premium physical touchpoints leave an unforgettable tactile impression. Brand Craftsman provides end-to-end corporate printing solutions that blend precision graphic design with premium print materials.",
      "From spot-UV business cards and embossed letterheads to multi-page corporate brochures and product packaging, we ensure print perfection."
    ],
    features: [
      "Luxury Business Cards (Spot-UV, Foil Stamping, Velvet Touch)",
      "Corporate Tri-fold & Multi-Page Catalogue Brochures",
      "Product Box & Eco-Friendly Packaging Design",
      "Embossed Stationery, Letterheads & Folders",
      "Large Format Event Banners & Exhibition Stalls"
    ],
    benefits: [
      "Make an extraordinary impression during in-person client meetings",
      "Flawless color matching between digital monitors and physical paper",
      "End-to-end delivery from print file setup to final doorstep delivery"
    ],
    process: [
      { step: "01. Print Design", text: "Designing with exact bleed margins, CMYK color space, and spot finishes." },
      { step: "02. Material Selection", text: "Choosing paper GSM, textures, foil colors, and coating types." },
      { step: "03. Proofing", text: "Conducting pre-press digital and physical proofing." },
      { step: "04. Production", text: "Executing high-precision offset and digital print runs." }
    ],
    searchPinSynergy: "We incorporate QR codes and NFC tech into physical print assets to bridge offline interactions with Search Pin digital conversion funnels.",
    faq: [
      { q: "Can you handle small and large batch print orders?", a: "Yes, we cater to boutique short runs as well as high-volume industrial printing." },
      { q: "Do you design custom packaging for retail products?", a: "Absolutely. We engineer custom dielines and packaging graphics for retail products." }
    ]
  },

  "web-development": {
    slug: "web-development",
    title: "Web Design & Development",
    subtitle: "Next.js, React, Headless CMS & Enterprise E-Commerce Portals",
    category: "Web Engineering",
    h1: "Web Design & Development Company in Coimbatore | Next.js Experts",
    h2Intro: "Architecting Lightning-Fast, High-Converting Web Platforms",
    description: [
      "We design and engineer bespoke web applications that load in milliseconds, look stunning on every device, and are optimized from line one for conversions.",
      "Led by Santhosh Shanmugasundaram, our technical team builds modern web architecture using Next.js, React, TypeScript, and Tailwind CSS to guarantee maximum security, speed, and SEO dominance."
    ],
    features: [
      "Custom Next.js & React Frontend Web Architecture",
      "Responsive UI/UX Mobile-First Design System",
      "Headless CMS Integration (Strapi, Sanity, Contentful)",
      "Bespoke E-Commerce Platforms (Shopify, WooCommerce, Custom Node.js)",
      "Sub-Second Page Load Speeds & 95+ Google Lighthouse Score"
    ],
    benefits: [
      "Eliminate slow loading times that cause potential customers to leave",
      "Rank higher on Google with mobile-first semantic HTML & schema markup",
      "Scale server architecture smoothly during high-traffic viral events"
    ],
    process: [
      { step: "01. Wireframing & UI/UX", text: "Designing interactive Figma prototypes with modern dark/light aesthetics." },
      { step: "02. Next.js Codebase", text: "Writing clean, component-driven TypeScript code with smooth GSAP animations." },
      { step: "03. CMS & API Sync", text: "Connecting database schemas, payment gateways, and CRM tools." },
      { step: "04. Quality Assurance", text: "Rigorously testing cross-browser compatibility, security, and load speeds." }
    ],
    searchPinSynergy: "Our web platforms are natively integrated with Search Pin SEO standards, ensuring your site is structured for instant search engine indexing and organic traffic dominance.",
    faq: [
      { q: "Will my website be mobile friendly?", a: "100% yes! All our web applications are engineered mobile-first with adaptive layouts." },
      { q: "Can I easily update content on my site after launch?", a: "Yes, we integrate user-friendly headless CMS tools so you can update text and images anytime." }
    ]
  },

  "mobile-app-development": {
    slug: "mobile-app-development",
    title: "Custom Mobile App Development",
    subtitle: "Native & Cross-Platform iOS and Android Applications",
    category: "Mobile Software",
    h1: "Mobile App Development Company in Coimbatore | iOS & Android",
    h2Intro: "High-Retention Mobile Apps Engineered for Performance",
    description: [
      "In a mobile-first world, a dedicated application keeps your brand directly inside your customer's pocket. We build high-retention iOS and Android apps that combine fluid UI design with secure cloud backends.",
      "Our mobile engineering community utilizes React Native and Flutter to deliver native-feeling experiences with fast deployment cycles and cost efficiency."
    ],
    features: [
      "Cross-Platform iOS & Android Mobile Development",
      "Intuitive UX/UI Design & Micro-Animations",
      "Secure Cloud Backend APIs (Node.js, Firebase, AWS)",
      "Push Notification & Customer Engagement Workflows",
      "App Store & Google Play Store Submission Management"
    ],
    benefits: [
      "Increase customer retention and lifetime value (LTV)",
      "Send direct instant push notifications for sales and updates",
      "Provide seamless offline and online application functionality"
    ],
    process: [
      { step: "01. App Blueprint", text: "Mapping user flows, wireframes, and backend database architecture." },
      { step: "02. UI/UX Prototype", text: "Crafting fluid, touch-friendly interface designs with dark/light themes." },
      { step: "03. Mobile Engineering", text: "Coding frontend screens and connecting secure API endpoints." },
      { step: "04. Store Launch", text: "Testing builds on physical devices and publishing to Apple App Store & Google Play." }
    ],
    searchPinSynergy: "We integrate App Store Optimization (ASO) strategies to ensure your app ranks at the top of search results in mobile application stores.",
    faq: [
      { q: "Do you build apps for both iOS and Android?", a: "Yes, our cross-platform frameworks ensure single-codebase deployment to both platforms." },
      { q: "Will you help upload the app to Google Play and Apple App Store?", a: "Yes, we handle the complete store submission and compliance process." }
    ]
  },

  "press-release": {
    slug: "press-release",
    title: "Corporate Press Release & PR",
    subtitle: "Strategic Media Distribution & Brand Authority Building",
    category: "PR & Media",
    h1: "Press Release & Media Distribution Services in Coimbatore",
    h2Intro: "Gain National Media Coverage & Build Instant Industry Authority",
    description: [
      "Establishing brand authority requires getting featured in respected media outlets and news portals. Brand Craftsman provides strategic press release writing and global news wire distribution.",
      "We help startups and enterprises publish corporate milestones, product launches, and funding announcements on top news publications."
    ],
    features: [
      "Journalistic Press Release Copywriting",
      "Distribution across 100+ Premium News Outlets & Portals",
      "Targeted Industry & Regional Journalist Pitching",
      "Google News Indexing & Backlink Authority",
      "Comprehensive Media Coverage Report"
    ],
    benefits: [
      "Secure permanent high-authority backlinks for SEO",
      "Build instant trust with prospective investors and enterprise clients",
      "Gain guaranteed indexing on Google News feeds"
    ],
    process: [
      { step: "01. PR Strategy", text: "Identifying newsworthy story angles and key corporate announcements." },
      { step: "02. Copywriting", text: "Writing AP-style professional press releases tailored for journalists." },
      { step: "03. Syndication", text: "Distributing news across premium digital media channels." },
      { step: "04. Reporting", text: "Delivering live published article links and domain authority impact metrics." }
    ],
    searchPinSynergy: "PR links pass immense search engine domain authority directly into Search Pin powered SEO funnels, accelerating keyword rankings.",
    faq: [
      { q: "Which media publications will my press release appear on?", a: "We syndicate releases across Google News, national news portals, business blogs, and industry wires." },
      { q: "Does PR help improve my Google search ranking?", a: "Yes! Premium PR links provide high-authority backlink signals recognized by Google algorithms." }
    ]
  },

  "social-media-marketing": {
    slug: "social-media-marketing",
    title: "Social Media & Performance Ads",
    subtitle: "Meta Ads, LinkedIn B2B Growth, Viral Reels & Community Strategy",
    category: "Social Media & Paid Ads",
    h1: "Social Media Marketing Agency in Coimbatore | Brand Craftsman",
    h2Intro: "Turn Followers into Loyal Buyers with Targeted Social Funnels",
    description: [
      "Social media is where modern brand perception is shaped daily. We manage end-to-end social media growth, creating scroll-stopping reels, carousel graphics, and high-converting Meta & LinkedIn ad campaigns.",
      "Directed by Hari Prashath, our social marketing team combines psychological ad copy with hyper-targeted audience demography to drive sales."
    ],
    features: [
      "Meta Ads (Instagram & Facebook Paid Ad Campaigns)",
      "LinkedIn B2B Lead Generation & Thought Leadership",
      "Viral Short-Form Reel & Video Content Production",
      "Graphic Design for Carousel & Story Content",
      "Community Moderation & Engagement Management"
    ],
    benefits: [
      "Capture customer attention in saturated social feeds",
      "Acquire customers at a lower cost-per-acquisition (CPA)",
      "Build an active, loyal community around your brand identity"
    ],
    process: [
      { step: "01. Content Calendar", text: "Planning weekly reel concepts, graphics, and campaign themes." },
      { step: "02. Creative Production", text: "Shooting high-definition video reels and designing sleek graphics." },
      { step: "03. Ad Campaign Setup", text: "Configuring custom lookalike audiences, retargeting pixels, and ad bidding." },
      { step: "04. Performance Optimization", text: "Scaling top-performing creatives and refining targeting daily." }
    ],
    searchPinSynergy: "Social signals and performance traffic interact directly with Search Pin search funnels to build comprehensive omnichannel market dominance.",
    faq: [
      { q: "Which social media platforms should my business focus on?", a: "For B2C retail we focus heavily on Instagram & Facebook; for B2B tech/manufacturing we prioritize LinkedIn & Google." },
      { q: "Do you handle graphic design and video shooting for reels?", a: "Yes, we handle complete end-to-end creative production." }
    ]
  },

  "whatsapp-marketing": {
    slug: "whatsapp-marketing",
    title: "WhatsApp Marketing & Automated Funnels",
    subtitle: "WhatsApp Business API, Automated Broadcasts & Direct CRM Sync",
    category: "Direct Messaging",
    h1: "WhatsApp Marketing Services in Coimbatore | Brand Craftsman",
    h2Intro: "Direct 98% Open Rate Messaging Funnels That Drive Instant Sales",
    description: [
      "WhatsApp offers an unmatched 98% message open rate. Brand Craftsman builds official WhatsApp Business API integrations and automated chat funnels to communicate directly with your customer base.",
      "Send personalized broadcast updates, automate customer support, and convert cart abandonments directly inside WhatsApp."
    ],
    features: [
      "Official Meta WhatsApp Business API Setup & Green Tick Assistance",
      "Automated Interactive Chatbot Workflows",
      "Targeted Bulk Broadcast Messaging & Customer Segmentation",
      "E-Commerce Order Status & Abandoned Cart Recovery Alerts",
      "CRM & Web Platform Integration"
    ],
    benefits: [
      "Achieve 98% open rates and 45%+ click-through rates on campaigns",
      "Automate 80% of routine customer support inquiries 24/7",
      "Re-engage cold leads instantly with rich interactive media messages"
    ],
    process: [
      { step: "01. API Onboarding", text: "Verifying business manager credentials and setting up WhatsApp API access." },
      { step: "02. Bot Workflow Design", text: "Building automated decision tree chat sequences and quick replies." },
      { step: "03. Audience Upload", text: "Segmenting customer phone lists by past purchase behavior." },
      { step: "04. Broadcast & Analytics", text: "Launching personalized campaigns and tracking real-time responses." }
    ],
    searchPinSynergy: "WhatsApp funnels capture leads generated from Search Pin PPC ads instantly, creating sub-minute lead response times that boost conversion rates by over 300%.",
    faq: [
      { q: "Is WhatsApp marketing compliant with Meta policies?", a: "Yes! We use the official Meta WhatsApp Business API to guarantee 100% policy compliance." },
      { q: "Can we integrate WhatsApp with our website or CRM?", a: "Yes, we connect WhatsApp directly to Next.js websites, Shopify, CRM tools, and databases." }
    ]
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const service = servicesDatabase[resolvedParams.slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-16 transition-colors duration-300">
      
      {/* Service Hero Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-general text-xs uppercase tracking-widest border border-blue-500/20">
          <FiStar className="text-yellow-400" /> {service.category}
        </div>

        <h1 className="font-zentry text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6 max-w-5xl mx-auto">
          {service.h1}
        </h1>

        <p className="font-robert-regular text-lg sm:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          {service.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="px-8 py-4 bg-yellow-400 text-black font-bold uppercase rounded-xl tracking-wider hover:bg-yellow-300 transition-all shadow-[0_0_30px_rgba(250,204,21,0.4)] text-sm sm:text-base"
          >
            Inquire About {service.title}
          </a>
        </div>
      </section>

      {/* Main Service Content */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-gray-200 dark:border-zinc-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-8">
            <h2 className="font-zentry text-3xl sm:text-4xl font-black uppercase leading-tight text-blue-600 dark:text-blue-400">
              {service.h2Intro}
            </h2>

            <div className="font-robert-regular text-gray-700 dark:text-gray-300 space-y-4 text-base sm:text-lg leading-relaxed">
              {service.description.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Search Pin Synergy Box */}
            <div className="bg-blue-50 dark:bg-blue-950/40 p-6 sm:p-8 rounded-3xl border border-blue-200 dark:border-blue-800 space-y-3">
              <h3 className="font-zentry text-xl font-bold uppercase text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <FiZap /> Search Pin Synergy & Strategic Integration
              </h3>
              <p className="font-robert-regular text-gray-800 dark:text-gray-200 text-sm sm:text-base leading-relaxed">
                {service.searchPinSynergy}
              </p>
            </div>

            {/* Step-by-Step Process */}
            <div className="pt-8">
              <h3 className="font-zentry text-2xl sm:text-3xl font-black uppercase mb-6">
                Our Methodical Execution Process
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {service.process.map((p, idx) => (
                  <div key={idx} className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800">
                    <div className="font-zentry text-lg font-bold text-blue-500 uppercase mb-2">{p.step}</div>
                    <p className="font-robert-regular text-gray-700 dark:text-gray-300 text-sm">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Deliverables & Benefits */}
          <div className="space-y-8">
            <div className="p-8 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-6">
              <h3 className="font-zentry text-2xl font-bold uppercase border-b border-gray-200 dark:border-zinc-800 pb-4">
                Core Deliverables
              </h3>
              <ul className="space-y-3 text-sm font-general">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-800 dark:text-gray-200">
                    <FiCheckCircle className="text-blue-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-gradient-to-br from-blue-950 to-black text-white rounded-3xl border border-white/10 shadow-xl space-y-4">
              <h3 className="font-zentry text-2xl font-bold uppercase text-yellow-400">
                Key Business Advantages
              </h3>
              <ul className="space-y-3 text-sm font-robert-regular text-gray-300">
                {service.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Service FAQs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-gray-200 dark:border-zinc-800">
        <h3 className="font-zentry text-3xl font-black uppercase text-center mb-8">
          Service Questions
        </h3>
        <div className="max-w-4xl mx-auto space-y-4">
          {service.faq.map((f, idx) => (
            <div key={idx} className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800">
              <h4 className="font-zentry text-lg font-bold text-blue-500 mb-2">{f.q}</h4>
              <p className="font-robert-regular text-gray-700 dark:text-gray-300 text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
