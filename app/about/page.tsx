import React from "react";
import Footer from "@/components/Footer";
import { FiCheckCircle, FiZap } from "react-icons/fi";

export const metadata = {
  title: "About Us | Brand Craftsman - Premier Branding Company in Coimbatore",
  description: "Learn about Brand Craftsman, founded by Santhosh Shanmugasundaram & Hari Prashath. Discover our genesis from Search Pin (2024), 5+ yr expert community, CSR initiatives, and vision as Coimbatore's top digital agency.",
};

const faqs = [
  {
    q: "1. What makes Brand Craftsman different from other digital marketing agencies in Coimbatore?",
    a: "While many agencies focus solely on either design or marketing, Brand Craftsman combines both at an elite level. Led by Santhosh (Development/Branding) and Hari (Digital Marketing), we guarantee that your beautiful brand is backed by flawless technical architecture and aggressive marketing. Furthermore, our unique community model of 5+ year experienced freelancers allows us to scale instantly to meet any technical demand."
  },
  {
    q: "2. As a startup on a tight budget, can I afford a top-tier branding company in Coimbatore?",
    a: "Absolutely. Our foundational goal is to support new entrepreneurs and startups. We understand startup constraints because we are founders ourselves. We supply scalable, phased solutions that let you build critical brand infrastructure now and expand your digital ecosystem as your revenue grows."
  },
  {
    q: "3. What specific services fall under your branding and development umbrella?",
    a: "We operate as a full-stack digital agency that Coimbatore businesses trust for comprehensive solutions. This includes corporate identity design, logo creation, UI/UX designing, custom web and mobile app development, e-commerce architecture, print media design, and full-scale digital marketing (SEO, PPC, Social Media)."
  },
  {
    q: "4. How does Brand Craftsman contribute to the local community?",
    a: "Social responsibility is baked into our DNA. We actively work to develop skilled students and unemployed individuals in Coimbatore. Through targeted training, especially during college holidays, we teach modern, highly employable skills like frontend web development and digital marketing, serving as a bridge between raw talent and industry requirements."
  },
  {
    q: "5. How fast can we expect to see results after partnering with your branding experts, Coimbatore team?",
    a: "The timeline depends heavily on the service. Visual branding and web development are delivered on strict, project-specific timelines. For digital marketing, Performance/PPC campaigns can generate high-quality leads within 48 hours, while organic SEO and brand-authority building are long-term investments that typically show significant compound growth within 3 to 6 months."
  }
];

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Hero Banner with Founders Image */}
      <section className="relative w-full h-[85vh] md:h-[95vh] overflow-hidden flex items-end">
        {/* Background Image */}
        <Image
          src="/img/founders-hero.png"
          width={1920}
          height={1080}
          alt="Brand Craftsman Founders Santhosh Shanmugasundaram and Hari Prashath collaborating at a high-tech computer workstation"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />

        {/* Hypercolor Gradient Overlays for High Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 dark:from-zinc-950 to-transparent" />

        {/* Hero Content Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md text-white font-general text-xs uppercase tracking-widest border border-white/20 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Premier Branding Agency in Coimbatore
          </div>
          
          <h1 className="font-zentry text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6 text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] max-w-4xl">
            About Brand Craftsman: The Premier Branding Company in Coimbatore
          </h1>

          <p className="font-robert-regular text-lg sm:text-xl text-gray-200 max-w-2xl leading-relaxed drop-shadow-md">
            Architecting digital excellence with world-class branding, modern full-stack development, and Search Pin performance marketing.
          </p>
        </div>
      </section>

      {/* Philosophy Text Block */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-8 z-20 pb-16">
        <div className="max-w-4xl mx-auto font-robert-regular text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-6 bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-800">
          <p>
            At a time when every business fights for a fraction of consumer attention, the right brand can be the difference between obscurity and industry leadership. At Brand Craftsman, we help businesses achieve tangible results such as increased sales, greater market share, and stronger brand recognition by building brands that not only attract but retain loyal customers and open new markets.
          </p>
          <p>
            Welcome to Brand Craftsman. We are more than just a traditional design agency; we are a comprehensive branding company in Coimbatore dedicated to engineering high-performance identities and digital frameworks for modern businesses, aggressive startups, and innovative entrepreneurs.
          </p>
          <p>
            Our philosophy is grounded in the conviction that a brand is the essential bridge between a company&apos;s capabilities and its customers&apos; expectations. When this connection is lacking or undefined, even outstanding products risk failing in the marketplace. What distinguishes Brand Craftsman is our deliberate approach to strengthening this connection. We uniquely combine in-depth visual identity design with planned, data-driven digital marketing developed collaboratively for each client. By uniting these disciplines with a tailored methodology, we clarify the brand message and enhance its market relevance, transforming emerging business notions into established industry leaders.
          </p>
        </div>
      </section>

      {/* Genesis & History Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-gray-200 dark:border-zinc-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-blue-500 font-general text-sm uppercase tracking-widest">
              <FiZap /> Operational Evolution
            </div>
            <h2 className="font-zentry text-3xl sm:text-5xl font-black uppercase leading-tight">
              Our Genesis: From Passion to Market Leadership
            </h2>
            <div className="font-robert-regular text-gray-700 dark:text-gray-300 space-y-4 leading-relaxed">
              <p>
                The story of Brand Craftsman is one of steady evolution, grounded in an in-depth understanding of local and global digital spheres. The journey began long before this agency opened its doors.
              </p>
              <p>
                In 2019, our founders, <strong>Santhosh Shanmugasundaram</strong> and <strong>Hari Prashath</strong>, began their careers as graphic designers and digital marketing strategists at Todo Solution. Through daily campaign management and brand design, they developed key principles of consumer psychology, digital engagement, and market segmentation. During this period, we focused on improving our skills as well as task execution. We broadened our expertise across several rapidly expanding industries, from local retail and service sectors to advanced technological and industrial manufacturing, analyzing why some businesses scaled rapidly while others did not.
              </p>
              <p className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-medium">
                The most glaring perception was the disconnect between technical execution and visual identity. We saw incredible products fail due to poor market segmentation and beautiful brands fail due to a lack of technical visibility.
              </p>
            </div>
          </div>

          {/* Search Pin Era Card */}
          <div className="bg-gradient-to-br from-gray-900 to-black text-white p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            <span className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Milestone Chapter
            </span>
            <h2 className="font-zentry text-3xl sm:text-4xl font-black uppercase text-blue-400">
              The Search Pin Era (2024)
            </h2>
            <div className="font-robert-regular text-gray-300 space-y-4 leading-relaxed text-sm sm:text-base">
              <p>
                The Search Pin is driven by the desire to close this gap. We launched Search Pin in 2024, a highly focused digital marketing company in Coimbatore. Search Pin allowed us to deploy aggressive, ROI-centric marketing strategies for our clients. We helped businesses dominate search engine rankings, execute highly profitable performance marketing campaigns, and build strong social media footprints.
              </p>
              <p>
                However, as we scaled Search Pin and engaged with multiple business owners and ambitious youngsters, we identified a more profound gap: the distinction between marketing services and comprehensive brand stewardship. While marketing promotes products or services, it cannot alone establish or sustain a coherent brand identity across every customer touchpoint. Entrepreneurs needed more than promotional strategies; they needed a holistic partner able to conceptualize brands from inception, build the necessary technical foundations, and execute rigorous marketing campaigns to guarantee lasting success.
              </p>
              <div className="pt-4 border-t border-white/10">
                <h3 className="font-zentry text-xl font-bold uppercase text-white mb-2">
                  Birth of Brand Craftsman
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  This realization birthed Brand Craftsman. We evolved our model to serve as the ultimate bridge between ambitious entrepreneurs and guaranteed business outcomes. Brand Craftsman operates as a full-spectrum digital agency that Coimbatore firms rely on for end-to-end dominance. We supply comprehensive services including corporate identity development, custom web and mobile application creation, digital marketing campaigns, and e-commerce platform engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Architects Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/50 rounded-3xl my-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="font-zentry text-3xl sm:text-5xl font-black uppercase mb-4">
            Meet the Architects of Your Brand
          </h3>
          <p className="font-robert-regular text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            A branding agency is only as potent as the minds driving it. Brand Craftsman is spearheaded by two industry veterans who balance the delicate scales of aesthetic brilliance and analytical execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Santhosh Card */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-lg hover:border-blue-500 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-zentry font-bold text-2xl shadow-md">
                SS
              </div>
              <div>
                <h4 className="font-zentry text-2xl font-bold uppercase">Santhosh Shanmugasundaram</h4>
                <p className="text-blue-500 font-general text-xs uppercase tracking-wider">Branding & Development Specialist</p>
              </div>
            </div>
            <p className="font-robert-regular text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              Santhosh is the technical and creative leader behind the agency. With a unique background that spans from hands-on industrial precision to complex, multi-layered digital architecture, Santhosh understands how things are built—both in the physical world and the digital domain. His expertise rests in developing seamless, high-performance web architectures (including advanced headless setups and modern frontend frameworks) and pairing them with stunning, cinematic visual identities. He makes certain that your brand doesn&apos;t just look world-class, but operates perfectly across every device and platform.
            </p>
          </div>

          {/* Hari Card */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-lg hover:border-emerald-500 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-zentry font-bold text-2xl shadow-md">
                HP
              </div>
              <div>
                <h4 className="font-zentry text-2xl font-bold uppercase">Hari Prashath</h4>
                <p className="text-emerald-500 font-general text-xs uppercase tracking-wider">Digital Marketing Strategist</p>
              </div>
            </div>
            <p className="font-robert-regular text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              Hari is the strategic engine that drives the brand into the consumer consciousness. As a master of digital strategy, Hari understands the algorithms that govern modern commerce. His expertise includes deep-dive SEO, aggressive performance marketing, and localized market penetration. Hari’s approach to marketing is entirely data-centric; every campaign, ad spend, and content rollout is thoroughly tracked and optimized to ensure maximum return on investment. Under his direction, beautiful brands are transformed into highly visible, revenue-generating machines.
            </p>
          </div>
        </div>
      </section>

      {/* Community & Agile Network Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-gray-200 dark:border-zinc-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <h3 className="font-zentry text-3xl sm:text-4xl font-black uppercase leading-tight">
              Our Mutual Strength: The Brand Craftsman Community
            </h3>
            <p className="font-robert-regular text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              We recognize that comprehensive brand building requires a varied array of specialized skills. A single team cannot master every programming language, design trend, and algorithm change. That is why Brand Craftsman operates with a unique, highly agile structural model built on a tightly-knit, elite freelance community.
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/40 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
              <h4 className="font-zentry text-lg font-bold uppercase text-blue-600 dark:text-blue-400 mb-3">
                Core Capability Highlights
              </h4>
              <ul className="space-y-3 font-general text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-blue-500 shrink-0" />
                  <span>All members have more than five years of professional experience</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-blue-500 shrink-0" />
                  <span>Many specialists have completed 30+ branding and development projects</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-blue-500 shrink-0" />
                  <span>Expertise includes mobile app development, marketing management, senior design, and full-stack engineering</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
              <h4 className="font-zentry text-xl font-bold uppercase mb-2 text-blue-500">Mobile App Developers</h4>
              <p className="font-robert-regular text-gray-600 dark:text-gray-400 text-sm">Engineering custom, high-retention iOS and Android applications with native performance and smooth UX.</p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
              <h4 className="font-zentry text-xl font-bold uppercase mb-2 text-emerald-500">Marketing Managers</h4>
              <p className="font-robert-regular text-gray-600 dark:text-gray-400 text-sm">Strategists who handle niche industry outreach, paid ad campaign optimizations, and funnel engineering.</p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
              <h4 className="font-zentry text-xl font-bold uppercase mb-2 text-purple-500">Senior Designers</h4>
              <p className="font-robert-regular text-gray-600 dark:text-gray-400 text-sm">Crafting bespoke UI/UX designs, print collateral, 3D motion elements, and comprehensive brand guidelines.</p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
              <h4 className="font-zentry text-xl font-bold uppercase mb-2 text-pink-500">Full-Stack Developers</h4>
              <p className="font-robert-regular text-gray-600 dark:text-gray-400 text-sm">Building robust backend architectures, custom SaaS products, secure e-commerce systems, and headless APIs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-gray-200 dark:border-zinc-800">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="font-zentry text-3xl sm:text-5xl font-black uppercase mb-4">
            Our Core Values
          </h3>
          <p className="font-robert-regular text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            Our work is governed by a strict set of principles that dictate every line of code we write, every pixel we design, and every campaign we launch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { title: "Craftsmanship Over Compromise", text: "We do not believe in templates or shortcuts. Every brand we build is a bespoke asset, created with meticulous attention to detail." },
            { title: "Data-Driven Empathy", text: "We blend deep analytical data with an insightful understanding of human psychology. We market to real people, using real data to guide our plans." },
            { title: "Unrelenting Innovation", text: "The digital domain changes daily. We continuously upskill, adopting the latest frameworks, AI integrations, and design approaches to keep our clients ahead of the curve." },
            { title: "Absolute Transparency", text: "We operate with total clarity. From pricing frameworks to campaign performance measures, our clients always know exactly where their investment is going." },
            { title: "Community Elevation", text: "We believe that genuine success is shared. We are deeply dedicated to uplifting the community that built us." }
          ].map((val, idx) => (
            <div key={idx} className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm hover:border-blue-500 transition-colors">
              <div className="text-blue-500 font-zentry font-black text-2xl mb-2">0{idx + 1}</div>
              <h4 className="font-zentry text-lg font-bold uppercase mb-3 text-black dark:text-white">{val.title}</h4>
              <p className="font-robert-regular text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">{val.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Responsibility / CSR Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-gray-200 dark:border-zinc-800 bg-blue-900 text-white rounded-3xl my-12 shadow-2xl">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="bg-blue-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
            CSR Initiative
          </span>
          <h3 className="font-zentry text-3xl sm:text-5xl font-black uppercase text-white leading-tight">
            Beyond Business: Our Social Responsibility
          </h3>
          <div className="font-robert-regular text-blue-100 space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              At Brand Craftsman, we believe the real measure of a company is not just its profit margins but the impact it has on its community. As we grew, we saw a significant gap between the raw talent in our local youth and the specific skills required by modern tech and marketing industries.
            </p>
            <p>
              Therefore, Brand Craftsman is fundamentally intertwined with a firm Corporate Social Responsibility (CSR) initiative. Our goal is to actively develop skilled students and empower unemployed individuals in our region.
            </p>
            <p className="bg-blue-800/80 p-6 rounded-2xl border border-blue-400/30 text-white font-medium">
              For example, during the recent collegiate break, we conducted intensive workshops in frontend web development and digital marketing. <strong>Over 60% of participants secured internships or freelance projects within two months.</strong> By dedicating time and resources, especially during school and college holidays, we train students and job seekers with industry-relevant skills like UI/UX design and digital marketing strategy.
            </p>
            <p>
              By closing the educational gap, we cultivate more competitive candidates for the workforce and make a direct, measurable impact on our community through CSR initiatives. When you partner with Brand Craftsman, you play an active role in a CSR-driven ecosystem that upskills local youth and contributes to Coimbatore&apos;s sustainable economic development.
            </p>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-gray-200 dark:border-zinc-800">
        <h3 className="font-zentry text-3xl sm:text-5xl font-black uppercase text-center mb-12">
          Why Partner with Brand Craftsman?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800">
            <h4 className="font-zentry text-2xl font-bold uppercase text-blue-500 mb-3">The Omnichannel Approach</h4>
            <p className="font-robert-regular text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              We do not fragment your brand. Because we handle everything from your physical print assets to your cloud-hosted web architecture and Google Ad campaigns, your brand voice continues universally consistent.
            </p>
          </div>
          <div className="p-8 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800">
            <h4 className="font-zentry text-2xl font-bold uppercase text-emerald-500 mb-3">Startup-Centric Empathy</h4>
            <p className="font-robert-regular text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              We are founders ourselves. We started from the ground up, managed the complexities of launching Search Pin, and evolved into Brand Craftsman. We understand the pressure, budget constraints, and vital need for ROI that startups face.
            </p>
          </div>
          <div className="p-8 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800">
            <h4 className="font-zentry text-2xl font-bold uppercase text-purple-500 mb-3">Premier Network Access</h4>
            <p className="font-robert-regular text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              Partnering with Brand Craftsman grants your business immediate access to our rigorously vetted network of full-stack developers, mobile app engineers, and senior designers. All members possess a minimum of five years of professional experience.
            </p>
          </div>
          <div className="p-8 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800">
            <h4 className="font-zentry text-2xl font-bold uppercase text-amber-500 mb-3">Future-Proofing</h4>
            <p className="font-robert-regular text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              We build with the future in mind. Whether it&apos;s making sure your website architecture can handle sudden viral traffic or designing a logo that will still look modern in a decade, we engineer assets that appreciate in value.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 border-t border-gray-200 dark:border-zinc-800">
        <h5 className="font-general text-xs uppercase tracking-widest text-blue-500 text-center mb-2">
          Got Questions?
        </h5>
        <h2 className="font-zentry text-3xl sm:text-5xl font-black uppercase text-center mb-12">
          Frequently Asked Questions (FAQs)
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-3">
              <h6 className="font-zentry text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                {faq.q}
              </h6>
              <p className="font-robert-regular text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-10 sm:p-16 rounded-3xl shadow-2xl space-y-6">
          <h4 className="font-zentry text-3xl sm:text-5xl font-black uppercase">
            The Next Step: Let&apos;s Build Your Legacy
          </h4>
          <p className="font-robert-regular text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Your brand is the most valuable source your company will ever own. Take a decisive step toward long-term success by partnering with experts who understand how to build, scale, and dominate in today’s competitive environment.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a 
              href="/contact"
              className="px-8 py-4 bg-yellow-400 text-black font-bold uppercase rounded-xl tracking-wider hover:bg-yellow-300 transition-all shadow-lg text-sm sm:text-base"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
