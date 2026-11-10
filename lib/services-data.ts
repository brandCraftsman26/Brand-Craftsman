export interface ServiceItem {
  slug: string;
  name: string;
  category: "Branding & Design" | "Development" | "Marketing";
  tagline: string;
  description: string;
  badge: string;
  deliverables: string[];
  benefits: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  packages: { tier: string; idealFor: string; features: string[] }[];
  faqs: { q: string; a: string }[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: "branding",
    name: "Brand Strategy & Identity",
    category: "Branding & Design",
    tagline: "Build a memorable, commanding brand identity that creates instant trust.",
    description:
      "Our Brand Strategy & Identity service transforms businesses into recognized market leaders. We craft comprehensive brand manuals, visual identity guidelines, corporate tone-of-voice, and design systems tailored to your target demographic.",
    badge: "Strategic Core",
    deliverables: [
      "Brand Positioning & Architecture",
      "Comprehensive Brand Guidelines Manual (PDF)",
      "Typography & Color Harmony Systems",
      "Brand Voice & Messaging Framework",
      "Stationery & Collateral Guidelines",
      "Digital & Social Media Asset Kit",
    ],
    benefits: [
      { title: "Command Premium Pricing", desc: "Position your company as an undisputed authority in your niche." },
      { title: "Immediate Customer Trust", desc: "A cohesive, professional look builds subconscious credibility in seconds." },
      { title: "Consistent Multi-Channel Presence", desc: "Maintain perfect visual consistency across web, print, and social media." },
    ],
    process: [
      { step: "01", title: "Discovery & Market Research", desc: "Analyzing your competitive landscape, ideal audience personas, and value proposition." },
      { step: "02", title: "Identity Architecture", desc: "Designing typography, color palettes, iconography, and foundational design rules." },
      { step: "03", title: "Brand Guidelines Compilation", desc: "Creating an authoritative, beautifully formatted brand guide for your entire team." },
    ],
    packages: [
      { tier: "Essential Brand", idealFor: "Startups & Emerging Businesses", features: ["Core Color System", "Typography Hierarchy", "Brand Voice Basics", "Social Kit"] },
      { tier: "Full Brand Identity", idealFor: "Scaling Companies", features: ["Complete Identity System", "40+ Page Brand Manual", "Stationery Kit", "Digital Assets", "Iconography"] },
      { tier: "Enterprise Rebrand", idealFor: "Established Market Leaders", features: ["Full Market Research", "Multi-Division Architecture", "Bespoke Design Systems", "Executive Briefing"] },
    ],
    faqs: [
      { q: "How long does a brand identity project take?", a: "A typical brand identity sprint takes 2 to 4 weeks depending on the scope of research and deliverables required." },
      { q: "What assets do we receive at completion?", a: "You receive vector files, high-resolution exports, font recommendations, and an exhaustive Brand Guidelines PDF." },
    ],
  },
  {
    slug: "logo-designing",
    name: "Logo Designing & Iconography",
    category: "Branding & Design",
    tagline: "Craft an iconic visual mark that endures and resonates across all mediums.",
    description:
      "Your logo is the first and most enduring impression your business makes. We engineer precision vector logos, logomarks, monograms, and custom iconography designed for maximum recognition and scale.",
    badge: "Visual Anchor",
    deliverables: [
      "Custom Vector Primary Logo",
      "Secondary Logos & Monogram Variants",
      "App Icons & Favicon Suite",
      "Monochrome & Dark Mode Variations",
      "Vector Source Files (AI, SVG, EPS, PNG)",
      "Logo Usage Specification Sheet",
    ],
    benefits: [
      { title: "Unforgettable Recognition", desc: "Designed with cognitive simplicity and bold distinctiveness." },
      { title: "Infinite Scalability", desc: "Looks stunning whether on a 16px favicon or a 40-foot billboard." },
      { title: "Full Ownership & Copyright", desc: "Complete transfer of intellectual property and source vectors." },
    ],
    process: [
      { step: "01", title: "Concept Brainstorming", desc: "Hand-sketching and exploring dozens of visual metaphors and directions." },
      { step: "02", title: "Vector Engineering", desc: "Digitizing and refining chosen concepts with golden ratio mathematical precision." },
      { step: "03", title: "Testing & Delivery", desc: "Validating across light, dark, print, and mobile screen environments." },
    ],
    packages: [
      { tier: "Starter Mark", idealFor: "Small Businesses", features: ["3 Unique Concepts", "High-Res PNG & SVG", "Color Variations", "Favicon"] },
      { tier: "Professional Identity", idealFor: "High-Growth Brands", features: ["5 Unique Concepts", "Full Vector Formats", "Monogram + Icon", "Brand Card Assets", "Full Copyright"] },
      { tier: "Iconic Suite", idealFor: "Premium Enterprises", features: ["Unlimited Iterations", "Animated Logo Sting", "Trademark Prep Kit", "Custom Typography"] },
    ],
    faqs: [
      { q: "Do I get full vector files?", a: "Yes, you receive all raw vector formats (SVG, AI, EPS) plus transparent PNGs for all use cases." },
      { q: "Can the logo be used for trademarks?", a: "Yes, all our logo designs are 100% original, created from scratch without stock elements, making them fully trademarkable." },
    ],
  },
  {
    slug: "printing",
    name: "Corporate Printing & Packaging",
    category: "Branding & Design",
    tagline: "High-end corporate print collateral, packaging, and tangible brand materials.",
    description:
      "Physical marketing materials still command immense tactile credibility. From luxury foil-stamped business cards to product packaging, brochures, and corporate presentation kits, we craft tangible assets that impress.",
    badge: "Physical Mastery",
    deliverables: [
      "Luxury Foil & Embossed Business Cards",
      "Tri-fold & Multi-Page Corporate Brochures",
      "Custom Product Packaging & Labels",
      "Exhibition Banners & Roll-Ups",
      "Letterheads, Envelopes & Presentation Folders",
      "Print-Ready CMYK Files with Bleed Specs",
    ],
    benefits: [
      { title: "Tactile Impression", desc: "Physical weight and specialty finishes create lasting sensory brand recall." },
      { title: "Commercial Print Precision", desc: "Flawless prepress setup with exact color codes, crop marks, and bleed zones." },
      { title: "End-to-End Coordination", desc: "We liaise with certified high-precision print manufacturers across South India." },
    ],
    process: [
      { step: "01", title: "Format & Paper Selection", desc: "Selecting grammages (GSM), textures, and specialty finishes (spot UV, foil, matte)." },
      { step: "02", title: "Structural Layout", desc: "Engineering the dielines, typography hierarchy, and CMYK color mappings." },
      { step: "03", title: "Prepress Quality Audit", desc: "Comprehensive prepress inspection to ensure zero misalignments or color shifts." },
    ],
    packages: [
      { tier: "Corporate Essentials", idealFor: "Office Launch", features: ["Business Cards", "Letterhead", "Envelopes", "Print-Ready PDFs"] },
      { tier: "Collateral Suite", idealFor: "Sales & Client Meetings", features: ["Corporate Brochure", "Presentation Folder", "Product Catalog", "Special Finishes"] },
      { tier: "Packaging & Expo", idealFor: "Retail & Trade Shows", features: ["Custom Box Dielines", "Product Labels", "Exhibition Banners", "Merchandise Prints"] },
    ],
    faqs: [
      { q: "Can you provide print-ready dielines for custom boxes?", a: "Yes, we construct exact dielines with fold lines, cut lines, and bleed margins ready for box die-cutting." },
      { q: "Do you handle printing directly?", a: "We provide complete print-ready files and can manage vendor dispatch and print proofing upon request." },
    ],
  },
  {
    slug: "web-development",
    name: "Next.js Web Development",
    category: "Development",
    tagline: "High-performance web applications engineered for speed, conversion, and scale.",
    description:
      "We design and build bespoke web platforms using modern Next.js, React, and TypeScript architectures. Our websites score 95+ on Google Lighthouse, load in under 1 second, and feature intuitive UX that turns visitors into clients.",
    badge: "Flagship Core",
    deliverables: [
      "Custom Next.js & React Web Application",
      "Sub-second Core Web Vitals Optimization",
      "Integrated Content Management System (CMS)",
      "E-Commerce & Payment Gateway Integration",
      "Flawless Mobile & Desktop Responsive Layouts",
      "Automated Lead Capture & CRM Webhooks",
    ],
    benefits: [
      { title: "Blazing Speed (0.8s Load)", desc: "Fast websites rank higher on Google and convert visitors at significantly higher rates." },
      { title: "Zero Vulnerability Surface", desc: "Modern static and edge generation eliminates traditional WordPress security vulnerabilities." },
      { title: "Infinite Scalability", desc: "Handle millions of visitors effortlessly without server crashes or costly upgrades." },
    ],
    process: [
      { step: "01", title: "Architecture & Wireframes", desc: "Mapping information architecture, user journeys, and component blueprints." },
      { step: "02", title: "Full-Stack Engineering", desc: "Coding interactive components, server actions, APIs, and modern CSS animations." },
      { step: "03", title: "Performance & SEO Audit", desc: "Stress-testing across devices, optimizing Core Web Vitals, and implementing rich schema." },
    ],
    packages: [
      { tier: "Brand Showcase", idealFor: "Professional Service Firms", features: ["Custom Multi-Page Design", "Next.js Performance", "Lead Forms", "Search Pin SEO Integration"] },
      { tier: "Dynamic Platform", idealFor: "High-Growth Companies", features: ["Headless CMS", "Blog & Case Studies", "Custom Interactive Features", "Analytics Dashboard"] },
      { tier: "E-Commerce & Portal", idealFor: "Online Retail & SaaS", features: ["Payment Gateways", "Product Catalog", "Customer Accounts", "Automated Workflows"] },
    ],
    faqs: [
      { q: "Why Next.js instead of WordPress?", a: "Next.js delivers 3x faster loading speeds, superior security, zero plugin bloat, and vastly superior Google SEO rankings." },
      { q: "Can we edit content after launch?", a: "Yes, we integrate easy-to-use CMS capabilities so you can update blogs, services, and images without writing code." },
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    category: "Development",
    tagline: "Native and cross-platform iOS and Android apps that captivate mobile users.",
    description:
      "Put your business directly in your customer's pocket. We architect fluid, responsive iOS and Android applications utilizing React Native and modern mobile frameworks with secure backend integration.",
    badge: "Mobile Reach",
    deliverables: [
      "iOS & Android Cross-Platform Application",
      "Native Device Integration (Push Notifications, Camera, GPS)",
      "Secure API & Cloud Database Backend",
      "App Store & Google Play Store Submission",
      "Biometric & Social Login Authentication",
      "Offline Data Caching & Real-Time Sync",
    ],
    benefits: [
      { title: "Direct Customer Engagement", desc: "Send rich push notifications directly to user home screens." },
      { title: "Single Codebase Efficiency", desc: "Build once and deploy seamlessly across both iOS and Android." },
      { title: "Smooth 60fps Performance", desc: "Fluid animations, instant screen transitions, and natural touch gestures." },
    ],
    process: [
      { step: "01", title: "UI/UX Mobile Prototyping", desc: "Designing thumb-friendly interactive mockups and user flows in Figma." },
      { step: "02", title: "Cross-Platform Coding", desc: "Developing native components, state management, and API connections." },
      { step: "03", title: "Store Deployment", desc: "Handling Apple App Store and Google Play compliance, certificates, and approval." },
    ],
    packages: [
      { tier: "MVP Mobile App", idealFor: "New Concept Testing", features: ["iOS & Android Build", "Core User Flows", "API Connection", "Store Deployment"] },
      { tier: "Enterprise Mobile App", idealFor: "Scaling Businesses", features: ["Push Notifications", "In-App Payments", "User Dashboards", "Offline Support"] },
      { tier: "Custom Ecosystem", idealFor: "Full-Scale Platforms", features: ["Real-Time Chat/Sync", "Complex Workflows", "Admin Panel", "Dedicated SLA Support"] },
    ],
    faqs: [
      { q: "Do you publish to both Apple and Google stores?", a: "Yes, we handle the entire submission, review guideline alignment, and publishing process for both stores." },
      { q: "How are app updates handled?", a: "Code-push and over-the-air updates allow seamless patches and content refreshes without requiring app store resubmission." },
    ],
  },
  {
    slug: "digital-marketing",
    name: "Search Pin Digital Marketing & SEO",
    category: "Marketing",
    tagline: "Data-driven SEO, Google Ads, and digital marketing that generates paying clients.",
    description:
      "Backed by Search Pin's deep algorithmic dominance, we turn digital marketing into a predictable revenue engine. We execute technical SEO, local search optimization, Google PPC campaigns, and conversion funnels.",
    badge: "Revenue Engine",
    deliverables: [
      "Technical On-Page & Off-Page SEO Audit",
      "High-Intent Keyword Dominance Strategy",
      "Google Search Console & Analytics Setup",
      "Local Search & Google Business Profile Optimization",
      "Performance PPC Ad Campaigns (Google & Meta)",
      "Monthly Conversion & Traffic Reports",
    ],
    benefits: [
      { title: "Top Google Rankings", desc: "Capture high-intent prospects actively searching for your services." },
      { title: "Lower Cost Per Acquisition", desc: "Laser-targeted campaigns maximize ROI while eliminating wasted ad spend." },
      { title: "Long-Term Organic Traffic", desc: "Build an organic digital asset that continues generating leads for years." },
    ],
    process: [
      { step: "01", title: "Audience & Competitor Intelligence", desc: "Identifying the exact search terms your competitors are capitalizing on." },
      { step: "02", title: "Content & Technical Optimization", desc: "Revamping metadata, schema, site speed, and publishing authoritative content." },
      { step: "03", title: "Conversion Scaling", desc: "A/B testing landing pages and scaling the campaigns that deliver the highest profit." },
    ],
    packages: [
      { tier: "Local Dominance", idealFor: "Regional & City Businesses", features: ["Local SEO", "Google Business Profile", "Citation Building", "Monthly Audit"] },
      { tier: "National Scale", idealFor: "E-Commerce & Pan-India Brands", features: ["Broad Keyword Strategy", "Technical SEO", "High-Authority Backlinks", "Content Production"] },
      { tier: "Full-Funnel Growth", idealFor: "Rapid Growth Enterprises", features: ["SEO + Paid Ads", "Landing Page CRO", "Dedicated Growth Strategist", "Bi-Weekly Reporting"] },
    ],
    faqs: [
      { q: "How soon can we expect organic SEO results?", a: "Local search and technical fixes often show improvements within 30 to 60 days, with exponential growth compounding over 3 to 6 months." },
      { q: "How is Search Pin involved?", a: "Search Pin provides proprietary search data, local indexing, and backlink authority that accelerates ranking velocity." },
    ],
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    category: "Marketing",
    tagline: "Build a loyal social following that elevates brand stature and sparks viral demand.",
    description:
      "Stop posting into the void. We produce thumb-stopping creative reels, carousel graphics, and community growth campaigns across Instagram, LinkedIn, YouTube, and Facebook.",
    badge: "Social Stature",
    deliverables: [
      "Monthly Social Content Calendar",
      "Custom Graphic & Carousel Post Design",
      "Short-Form Video & Reel Production",
      "Copywriting & Hashtag Strategy",
      "Community Management & Response Tracking",
      "Audience Growth & Engagement Metrics",
    ],
    benefits: [
      { title: "Brand Authority & Stature", desc: "A vibrant, polished social presence establishes credibility immediately." },
      { title: "Community Loyalty", desc: "Foster genuine relationships with customers who advocate for your brand." },
      { title: "Viral Discovery", desc: "Short-form video algorithms expose your offerings to thousands of new prospects daily." },
    ],
    process: [
      { step: "01", title: "Content Pillars Strategy", desc: "Defining 4-5 thematic content pillars tailored to your brand personality." },
      { step: "02", title: "Creative Production Sprint", desc: "Batch-producing high-impact reels, graphics, and engaging captions." },
      { step: "03", title: "Distribution & Growth", desc: "Publishing at peak engagement hours and engaging actively with your community." },
    ],
    packages: [
      { tier: "Brand Presence", idealFor: "Consistent Activity", features: ["12 Posts/Month", "Grid Styling", "Copywriting", "Hashtag Set"] },
      { tier: "Growth Accelerator", idealFor: "Rapid Audience Building", features: ["20 Posts + Reels/Month", "Video Editing", "Stories Strategy", "Monthly Analytics"] },
      { tier: "Omnichannel Dominance", idealFor: "Leading Consumer Brands", features: ["Daily Posts & Reels", "Influencer Collaboration", "Paid Social Boosting", "Dedicated Manager"] },
    ],
    faqs: [
      { q: "Do you create video reels as well?", a: "Yes, short-form video reels and motion shorts are central to our social media strategy." },
      { q: "Do we approve content before it goes live?", a: "Always. We provide a full monthly preview deck for your approval before publishing." },
    ],
  },
  {
    slug: "whatsapp-marketing",
    name: "WhatsApp Marketing & Automation",
    category: "Marketing",
    tagline: "Achieve 98% open rates with direct, automated WhatsApp marketing campaigns.",
    description:
      "WhatsApp is the highest-converting direct marketing channel in India. We design compliant WhatsApp Business API workflows, automated customer support bots, and promotional broadcast funnels.",
    badge: "Direct Conversion",
    deliverables: [
      "Official WhatsApp Business API Setup (Green Tick Assistance)",
      "High-Converting Broadcast Template Messaging",
      "Automated Welcome, Cart-Abandonment & Lead Bots",
      "Segmented Customer List Management",
      "Click-to-WhatsApp Ad Funnels",
      "Delivery, Read & Click Rate Analytics",
    ],
    benefits: [
      { title: "98% Open Rates", desc: "Reaches customer phones directly where emails often get buried or spammed." },
      { title: "Instant Two-Way Interaction", desc: "Close sales within seconds via interactive buttons and direct conversational checkout." },
      { title: "24/7 Automated Lead Capture", desc: "Automated chatbots qualify prospects and book meetings even when your team is offline." },
    ],
    process: [
      { step: "01", title: "API Verification & Opt-in Strategy", desc: "Setting up compliant business profile credentials and opt-in frameworks." },
      { step: "02", title: "Funnel & Chatbot Construction", desc: "Building automated conversational flows and interactive catalog responses." },
      { step: "03", title: "Targeted Broadcast Execution", desc: "Dispatching timely promotions and tracking conversion metrics." },
    ],
    packages: [
      { tier: "Broadcast Starter", idealFor: "Customer Updates", features: ["API Setup", "Template Approvals", "Broadcast Tool", "Contact Upload"] },
      { tier: "Automated Conversions", idealFor: "Sales & Support Teams", features: ["Automated Chatbot", "Multi-Agent Inbox", "Cart Recovery", "CRM Webhooks"] },
      { tier: "Enterprise WhatsApp", idealFor: "High-Volume Commerce", features: ["Green Tick Verification", "Custom API Integrations", "Full Funnel Automations", "Dedicated Account Lead"] },
    ],
    faqs: [
      { q: "Is WhatsApp marketing compliant with anti-spam rules?", a: "Yes, we use official Meta WhatsApp Business APIs with pre-approved message templates and explicit opt-in standards." },
      { q: "Can multiple team members answer incoming messages?", a: "Yes, we provide shared team inboxes where multiple representatives can respond to queries from one business number." },
    ],
  },
  {
    slug: "press-release",
    name: "Press Release & Digital PR",
    category: "Marketing",
    tagline: "Gain authority coverage in top national and regional news publications.",
    description:
      "Position your brand as a formidable market leader through curated PR campaigns. We write compelling news releases and distribute them across prominent national media outlets, newspapers, and digital news portals.",
    badge: "Media Stature",
    deliverables: [
      "Professional Journalism-Grade Press Release Drafting",
      "Distribution Across Top Digital News Portals",
      "Regional & National Media Coverage",
      "High-Authority Backlink Placement",
      "Executive Interview & Feature Pitching",
      "Complete Press Clipping & Syndication Report",
    ],
    benefits: [
      { title: "Instant Industry Credibility", desc: "Showcase 'As Seen On' prestigious news outlets on your website and pitch decks." },
      { title: "High-Authority Domain Backlinks", desc: "News syndication delivers elite backlinks that supercharge your Google SEO." },
      { title: "Investor & Customer Trust", desc: "Validated third-party news coverage builds unmatched confidence for big contracts." },
    ],
    process: [
      { step: "01", title: "Newsworthy Story Angle", desc: "Identifying the breakthrough story (funding, launch, milestone, innovation)." },
      { step: "02", title: "PR Draft & Media Review", desc: "Crafting a punchy news release following AP journalistic formatting." },
      { step: "03", title: "Distribution & Syndication", desc: "Transmitting across wire networks and compiling verified publication links." },
    ],
    packages: [
      { tier: "Digital Spotlight", idealFor: "Product Launches", features: ["1 Press Release", "15+ Digital News Portals", "Google News Indexing", "Clipping Report"] },
      { tier: "National Reach", idealFor: "Major Brand Milestones", features: ["Premium Media Placement", "Top National Outlets", "Permanent Links", "SEO Boost"] },
      { tier: "Executive PR Campaign", idealFor: "Enterprise Positioning", features: ["Interview Features", "Multi-Tier Distribution", "Print Newspaper Syndicate", "Crisis & Reputation Advisory"] },
    ],
    faqs: [
      { q: "Where will our press release appear?", a: "Depending on your package, releases are syndicated on Google News, major business journals, regional dailies, and prominent digital portals." },
      { q: "Do the articles stay online permanently?", a: "Yes, digital news releases remain permanently indexed, providing ongoing SEO backlink value and social proof." },
    ],
  },
  {
    slug: "traditional-marketing",
    name: "Traditional & Offline Marketing",
    category: "Marketing",
    tagline: "High-impact outdoor hoardings, newspaper inserts, and experiential branding.",
    description:
      "Digital works best when amplified by strategic real-world visibility. We design, strategize, and coordinate outdoor billboard hoardings, bus shelter branding, print ads, and experiential offline marketing campaigns across Coimbatore and South India.",
    badge: "Real-World Impact",
    deliverables: [
      "High-Resolution Billboard & Hoarding Design",
      "Regional Newspaper & Magazine Print Advertisements",
      "Transit & Bus Shelter Advertising Creatives",
      "Flyer, Pamphlet & Direct Mail Distribution Kits",
      "Corporate Event & Exhibition Stall Architecture",
      "Offline-to-Online QR Code Tracking Mechanisms",
    ],
    benefits: [
      { title: "Mass Local Market Penetration", desc: "Dominate high-traffic arterial junctions and commercial districts." },
      { title: "Tangible Brand Permanence", desc: "Large-format outdoor visuals establish long-lasting household brand recognition." },
      { title: "Trackable Offline Funnels", desc: "Dynamic QR codes track physical billboard impressions directly to web conversions." },
    ],
    process: [
      { step: "01", title: "Location & Readability Analysis", desc: "Analyzing viewing angles, vehicular speeds, and headline readability." },
      { step: "02", title: "Large-Format Creative Design", desc: "Engineering bold, ultra-high-resolution graphics with immediate visual impact." },
      { step: "03", title: "Production & Vendor Proofing", desc: "Supervising color fidelity and installation specifications." },
    ],
    packages: [
      { tier: "Outdoor Spotlight", idealFor: "High-Traffic Visibility", features: ["Billboard Dieline Creative", "Bus Shelter Design", "Print Specs", "QR Tracking"] },
      { tier: "Regional Print Campaign", idealFor: "Mass Awareness", features: ["Newspaper Ad Sets", "Magazine Feature Design", "Pamphlet Inserts", "Prepress Checks"] },
      { tier: "360° Offline Domination", idealFor: "Major Market Launch", features: ["Complete Outdoor Network", "Event Booth Design", "Vehicle Fleet Wraps", "Integrated Digital Bridge"] },
    ],
    faqs: [
      { q: "How do you track results from traditional hoardings?", a: "We embed custom tracked QR codes, dedicated vanity URLs, and localized call-tracking numbers on all outdoor media." },
      { q: "What resolutions are large billboards designed in?", a: "We design in vector-first formats and 300 DPI high-resolution raster plates scaled perfectly to billboard dimensions." },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}
