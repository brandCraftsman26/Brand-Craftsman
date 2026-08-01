/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import {
  FiChevronDown, FiMenu, FiX, FiHome, FiInfo, FiBriefcase, FiImage,
  FiFileText, FiPhone, FiShield, FiLogOut, FiLogIn, FiUserPlus,
  FiUser, FiDollarSign, FiZap, FiEdit3, FiPenTool, FiPrinter,
  FiTrendingUp, FiCode, FiSmartphone, FiSend, FiMessageCircle,
  FiType, FiCopy, FiVideo, FiSearch, FiFeather, FiCheckCircle,
  FiArrowRight, FiGlobe, FiLayers, FiMonitor
} from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";
import ContactModal from "./ContactModal";
import { Show, UserButton, SignInButton, SignUpButton, useUser, useAuth } from "@clerk/nextjs";

/* ─────────────────────────── DATA ─────────────────────────── */

const serviceCategories = [
  {
    title: "Branding & Design",
    icon: <FiPenTool />,
    color: "from-violet-500 to-purple-600",
    items: [
      { name: "Branding", slug: "branding", icon: <FiFeather />, desc: "Craft a unique identity" },
      { name: "Logo Designing", slug: "logo-designing", icon: <FiEdit3 />, desc: "Memorable logos" },
      { name: "Printing", slug: "printing", icon: <FiPrinter />, desc: "Premium print materials" },
    ],
  },
  {
    title: "Development",
    icon: <FiCode />,
    color: "from-blue-500 to-cyan-500",
    items: [
      { name: "Web Development", slug: "web-development", icon: <FiMonitor />, desc: "Modern web apps" },
      { name: "Mobile App Dev", slug: "mobile-app-development", icon: <FiSmartphone />, desc: "iOS & Android" },
      { name: "AI Website Builder", slug: "ai-website-builder", icon: <FiLayers />, desc: "Build with AI" },
    ],
  },
  {
    title: "Marketing",
    icon: <FiTrendingUp />,
    color: "from-orange-500 to-rose-500",
    items: [
      { name: "Digital Marketing", slug: "digital-marketing", icon: <FiGlobe />, desc: "Grow online" },
      { name: "Social Media", slug: "social-media-marketing", icon: <FiMessageCircle />, desc: "Build engagement" },
      { name: "WhatsApp Marketing", slug: "whatsapp-marketing", icon: <FiSend />, desc: "Direct outreach" },
      { name: "Press Release", slug: "press-release", icon: <FiFileText />, desc: "Public relations" },
      { name: "Traditional Marketing", slug: "traditional-marketing", icon: <FiBriefcase />, desc: "Offline campaigns" },
    ],
  },
];

const aiTools = [
  { name: "AI Content Writer", href: "/dashboard/ai-tools", icon: <FiType />, desc: "Generate quality content", badge: "Popular" },
  { name: "Grammar Checker", href: "/dashboard/ai-tools", icon: <FiCheckCircle />, desc: "Fix grammar instantly" },
  { name: "Plagiarism Checker", href: "/dashboard/ai-tools", icon: <FiSearch />, desc: "Ensure originality" },
  { name: "AI Bypass Tool", href: "/dashboard/ai-tools", icon: <FiZap />, desc: "Humanize AI text", badge: "New" },
  { name: "AI Image Generator", href: "/dashboard/ai-tools", icon: <FiImage />, desc: "Create stunning visuals" },
  { name: "Video Generator", href: "/dashboard/ai-tools", icon: <FiVideo />, desc: "AI-powered videos", badge: "Beta" },
  { name: "AI Copywriter", href: "/dashboard/ai-tools", icon: <FiCopy />, desc: "Marketing copy" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services", hasMega: "services" as const },
  { name: "AI Tools", href: "/dashboard/ai-tools", hasMega: "tools" as const },
  { name: "Portfolios", href: "/portfolios" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

const mobileLinks = [
  { name: "Home", href: "/", icon: <FiHome /> },
  { name: "About", href: "/about", icon: <FiInfo /> },
  { name: "Services", href: "/services", icon: <FiBriefcase />, hasSub: true },
  { name: "AI Tools", href: "/dashboard/ai-tools", icon: <FiZap />, hasSub: true },
  { name: "Portfolios", href: "/portfolios", icon: <FiImage /> },
  { name: "Pricing", href: "/pricing", icon: <FiDollarSign /> },
  { name: "Blog", href: "/blogs", icon: <FiFileText /> },
  { name: "Contact", href: "/contact", icon: <FiPhone /> },
  { name: "Admin Panel", href: "/admin", icon: <FiShield /> },
];

/* ─────────────────────────── COMPONENT ─────────────────────────── */

const NavBar = () => {
  const [activeMega, setActiveMega] = useState<"services" | "tools" | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const selectedService = "";

  const { signOut } = useAuth();
  const { user } = useUser();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  const hasDarkHero = !pathname.startsWith("/admin") && !pathname.startsWith("/dashboard") && !pathname.startsWith("/login") && !pathname.startsWith("/signup");
  const isAtTop = !mounted || currentScrollY === 0;
  const isTransparentAtTop = hasDarkHero && isAtTop;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    if (navContainerRef.current) {
      gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.2,
      });
    }
  }, [isNavVisible]);

  // Close mega menu on route change
  useEffect(() => {
    setActiveMega(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleMegaEnter = useCallback((menu: "services" | "tools") => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setActiveMega(menu);
  }, []);

  const handleMegaLeave = useCallback(() => {
    megaTimeoutRef.current = setTimeout(() => setActiveMega(null), 200);
  }, []);

  // Logo & Nav Text: match dark vs light header state dynamically
  const isDarkHeader = isTransparentAtTop || (mounted && resolvedTheme === "dark");
  const showWhiteLogo = isDarkHeader;
  const logoSrc = showWhiteLogo ? "/img/logo-dark.png" : "/img/logo-light.png";

  // Text color for nav links
  const linkTextClass = isDarkHeader
    ? "text-white font-bold hover:text-cyan-300 drop-shadow-sm"
    : "text-slate-900 font-bold hover:text-blue-600";

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-0 z-50 transition-all duration-700"
      >
        <header
          className={clsx(
            "w-full border-b transition-all duration-300",
            // Glass effect on all pages
            isTransparentAtTop
              ? "bg-black/40 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              : "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-gray-200/80 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          )}
        >
          <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 lg:px-6">
            {/* ─── LEFT: Logo ─── */}
            <Link href="/" className="relative z-10 flex shrink-0 items-center">
              <Image
                src={logoSrc}
                alt="Brand Craftsman - Web Design & Digital Marketing Company in Coimbatore"
                width={200}
                height={50}
                priority
                className="h-10 w-auto object-contain transition-opacity duration-300 sm:h-11"
              />
            </Link>

            {/* ─── CENTER: Nav Links ─── */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.hasMega ? handleMegaEnter(link.hasMega) : setActiveMega(null)}
                  onMouseLeave={() => link.hasMega ? handleMegaLeave() : undefined}
                >
                  <Link
                    href={link.href}
                    className={clsx(
                      "group flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-semibold uppercase tracking-wider font-general transition-all duration-200",
                      linkTextClass,
                      "hover:bg-white/10 dark:hover:bg-white/5",
                      pathname === link.href && "!text-blue-500 dark:!text-blue-400"
                    )}
                  >
                    {link.name}
                    {link.hasMega && (
                      <FiChevronDown className={clsx(
                        "text-xs transition-transform duration-300",
                        activeMega === link.hasMega && "rotate-180"
                      )} />
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {/* ─── RIGHT: Actions ─── */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Get a Quote */}
              <div className="hidden md:block">
                <Button
                  id="quote-button"
                  title="Get a Quote"
                  onClick={() => setIsModalOpen(true)}
                  containerClass="!py-2 !px-5 !text-[11px]"
                />
              </div>

              {/* User Auth */}
              <Show when="signed-in">
                <div className="relative">
                  <UserButton 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "h-7 w-7",
                      }
                    }}
                  >
                    <UserButton.MenuItems>
                      <UserButton.Link
                        label="Admin Panel"
                        labelIcon={<FiShield className="text-indigo-400" />}
                        href="/admin"
                      />
                    </UserButton.MenuItems>
                  </UserButton>
                </div>
              </Show>

              <Show when="signed-out">
                <div className="hidden sm:flex items-center gap-2">
                  <SignInButton mode="modal">
                    <button
                      className={clsx(
                        "rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all font-general flex items-center gap-1 border",
                        isTransparentAtTop
                          ? "text-white border-white/30 hover:bg-white/10"
                          : "text-gray-700 dark:text-white border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-zinc-800"
                      )}
                    >
                      <FiLogIn className="text-sm" /> Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button
                      className="rounded-full bg-gradient-to-r from-blue-600 to-orange-600 px-3.5 py-1.5 text-white text-[11px] font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all font-general flex items-center gap-1"
                    >
                      <FiUserPlus className="text-sm" /> Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </Show>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Hamburger (Mobile) */}
              <button
                className={clsx(
                  "lg:hidden p-2 rounded-xl transition-colors",
                  isTransparentAtTop
                    ? "text-white hover:bg-white/10"
                    : "text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800"
                )}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </nav>

          {/* ═══════════════ MEGA MENU: SERVICES ═══════════════ */}
          <div
            className={clsx(
              "absolute left-0 top-full w-full overflow-hidden transition-all duration-300 ease-out z-[200]",
              activeMega === "services"
                ? "max-h-[550px] opacity-100 visible"
                : "max-h-0 opacity-0 invisible"
            )}
            onMouseEnter={() => handleMegaEnter("services")}
            onMouseLeave={handleMegaLeave}
          >
            <div className="border-t border-b bg-[#0C0621]/95 dark:bg-zinc-950/98 backdrop-blur-3xl border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              <div className="mx-auto max-w-[1440px] px-6 py-8">
                <div className="grid grid-cols-3 gap-8">
                  {serviceCategories.map((cat) => (
                    <div key={cat.title}>
                      <div className="mb-4 flex items-center gap-2.5">
                        <span className={clsx("flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white text-sm shadow-md", cat.color)}>
                          {cat.icon}
                        </span>
                        <h3 className="text-sm font-bold uppercase tracking-wider font-general text-white">
                          {cat.title}
                        </h3>
                      </div>
                      <div className="space-y-1">
                        {cat.items.map((item) => (
                          <Link
                            key={item.slug}
                            href={`/services/${item.slug}`}
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-white/10"
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white group-hover:bg-white/20 transition-colors">
                              {item.icon}
                            </span>
                            <div>
                              <p className="text-sm font-semibold font-general text-white group-hover:text-cyan-300 transition-colors">
                                {item.name}
                              </p>
                              <p className="text-xs text-zinc-300">
                                {item.desc}
                              </p>
                            </div>
                            <FiArrowRight className="ml-auto text-sm opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-cyan-400" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA Row */}
                <div className="mt-6 flex items-center justify-between rounded-2xl px-6 py-4 bg-white/5 border border-white/15 backdrop-blur-md">
                  <div>
                    <p className="text-sm font-bold font-general text-white">
                      Not sure what you need?
                    </p>
                    <p className="text-xs text-zinc-300">
                      Let us help you pick the right plan for your business.
                    </p>
                  </div>
                  <Button
                    id="mega-quote"
                    title="Book a Free Consultation"
                    onClick={() => { setActiveMega(null); setIsModalOpen(true); }}
                    containerClass="!py-2 !px-5 !text-[11px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════ MEGA MENU: AI TOOLS ═══════════════ */}
          <div
            className={clsx(
              "absolute left-0 top-full w-full overflow-hidden transition-all duration-300 ease-out z-[200]",
              activeMega === "tools"
                ? "max-h-[550px] opacity-100 visible"
                : "max-h-0 opacity-0 invisible"
            )}
            onMouseEnter={() => handleMegaEnter("tools")}
            onMouseLeave={handleMegaLeave}
          >
            <div className="border-t border-b bg-[#0C0621]/95 dark:bg-zinc-950/98 backdrop-blur-3xl border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              <div className="mx-auto max-w-[1440px] px-6 py-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md">
                    <FiZap className="text-lg" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider font-general text-white">
                      AI-Powered Tools
                    </h3>
                    <p className="text-xs text-zinc-300">
                      Supercharge your workflow with our on-demand AI suite
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-1 md:grid-cols-4">
                  {aiTools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-white/10"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg bg-white/10 text-white group-hover:bg-white/20 group-hover:scale-110 transition-all">
                        {tool.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold font-general text-white group-hover:text-cyan-300 transition-colors truncate">
                            {tool.name}
                          </p>
                          {tool.badge && (
                            <span className={clsx(
                              "shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                              tool.badge === "New" ? "bg-emerald-500/30 text-emerald-300 border border-emerald-400/30" :
                              tool.badge === "Popular" ? "bg-amber-500/30 text-amber-300 border border-amber-400/30" :
                              "bg-blue-500/30 text-blue-300 border border-blue-400/30"
                            )}>
                              {tool.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-300 truncate">
                          {tool.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Tools CTA */}
                <div className="mt-6 flex items-center justify-between rounded-2xl px-6 py-4 bg-gradient-to-r from-violet-600/30 to-indigo-600/30 border border-violet-400/30 backdrop-blur-md">
                  <div>
                    <p className="text-sm font-bold font-general text-white">
                      Get unlimited access to all AI tools
                    </p>
                    <p className="text-xs text-zinc-300">
                      Starting at just ₹999/month — 7-day free trial included.
                    </p>
                  </div>
                  <Link href="/pricing" onClick={() => setActiveMega(null)}>
                    <Button id="mega-pricing" title="View Plans" containerClass="!py-2 !px-5 !text-[11px]" isLinkWrapper />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* ═══════════════ MOBILE SIDEBAR ═══════════════ */}
      <div className={clsx(
        "fixed inset-0 z-[100] lg:hidden transition-all duration-300 ease-in-out",
        isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      )}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div className={clsx(
          "absolute top-0 left-0 h-[100dvh] w-[88%] max-w-[380px] flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "bg-white dark:bg-zinc-950",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>

          {/* Mobile Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-orange-600 px-5 py-5 flex justify-between items-center">
            <Image
              src="/img/logo-light.png"
              alt="Brand Craftsman"
              width={140}
              height={36}
              className="h-8 w-auto"
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-1.5 rounded-lg bg-white/15 px-2.5 py-1.5 text-xs text-white font-semibold hover:bg-white/25 transition-colors"
              aria-label="Close mobile menu"
            >
              <FiX size={16} /> Close
            </button>
          </div>

          {/* Scrollable Links */}
          <div className="flex-1 overflow-y-auto py-2">
            {mobileLinks.map((item) => (
              <div key={item.name}>
                {item.hasSub ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                      className="flex w-full items-center justify-between px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 text-lg">
                          {item.icon}
                        </span>
                        <span className="font-general text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {item.name}
                        </span>
                      </div>
                      <FiChevronDown className={clsx(
                        "text-gray-400 transition-transform duration-200",
                        mobileExpanded === item.name && "rotate-180"
                      )} />
                    </button>

                    {/* Expanded Sub Items */}
                    <div className={clsx(
                      "overflow-hidden transition-all duration-300",
                      mobileExpanded === item.name ? "max-h-[600px]" : "max-h-0"
                    )}>
                      <div className="bg-gray-50/50 dark:bg-zinc-900/50 py-2 px-3">
                        {item.name === "Services" && serviceCategories.flatMap(c => c.items).map((sub) => (
                          <Link
                            key={sub.slug}
                            href={`/services/${sub.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-500 hover:text-white transition-colors font-general"
                          >
                            <span className="text-violet-500">{sub.icon}</span>
                            {sub.name}
                          </Link>
                        ))}
                        {item.name === "AI Tools" && aiTools.map((tool) => (
                          <Link
                            key={tool.name}
                            href={tool.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-500 hover:text-white transition-colors font-general"
                          >
                            <span className="text-violet-500">{tool.icon}</span>
                            {tool.name}
                            {tool.badge && (
                              <span className="ml-auto rounded-full bg-violet-500/15 px-1.5 py-0.5 text-[9px] font-bold text-violet-500">{tool.badge}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 text-lg">
                      {item.icon}
                    </span>
                    <span className="font-general text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {item.name}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Auth */}
          <div className="border-t border-gray-200 dark:border-zinc-800 p-4">
            <Show when="signed-in">
              <button
                onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                className="w-full rounded-xl bg-rose-500/10 py-2.5 text-center text-xs font-bold uppercase text-rose-500 flex items-center justify-center gap-2"
              >
                <FiLogOut /> Sign Out ({user?.firstName || user?.username || 'User'})
              </button>
            </Show>
            <Show when="signed-out">
              <div className="flex gap-2">
                <SignInButton mode="modal">
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); }}
                    className="flex-1 rounded-xl bg-gray-100 dark:bg-zinc-800 py-2.5 text-center text-xs font-bold uppercase text-gray-900 dark:text-white"
                  >
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); }}
                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-orange-600 py-2.5 text-center text-xs font-bold uppercase text-white"
                  >
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </Show>
          </div>

          {/* Mobile Social Footer */}
          <div className="border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 p-4 flex justify-center gap-6 text-gray-400">
            <a href="#" className="hover:text-violet-500 transition-colors"><FaFacebookF size={16} /></a>
            <a href="#" className="hover:text-violet-500 transition-colors"><FaInstagram size={16} /></a>
            <a href="#" className="hover:text-violet-500 transition-colors"><FaLinkedinIn size={16} /></a>
            <a href="#" className="hover:text-violet-500 transition-colors"><FaXTwitter size={16} /></a>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedService}
      />
    </>
  );
};

export default NavBar;
