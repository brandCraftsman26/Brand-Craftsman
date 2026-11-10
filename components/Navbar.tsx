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
  FiFileText, FiPhone, FiEdit3, FiPenTool, FiPrinter,
  FiTrendingUp, FiCode, FiSmartphone, FiSend, FiMessageCircle,
  FiFeather, FiArrowRight, FiGlobe, FiLayers, FiMonitor
} from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";
import ContactModal from "./ContactModal";
import { useAuth } from "@/components/providers/AuthProvider";

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
      { name: "Custom Web Solutions", slug: "web-development", icon: <FiLayers />, desc: "High-performance apps" },
    ],
  },
  {
    title: "Marketing",
    icon: <FiTrendingUp />,
    color: "from-fuchsia-500 to-pink-500",
    items: [
      { name: "Digital Marketing", slug: "digital-marketing", icon: <FiGlobe />, desc: "Grow online" },
      { name: "Social Media", slug: "social-media-marketing", icon: <FiMessageCircle />, desc: "Build engagement" },
      { name: "WhatsApp Marketing", slug: "whatsapp-marketing", icon: <FiSend />, desc: "Direct outreach" },
      { name: "Press Release", slug: "press-release", icon: <FiFileText />, desc: "Public relations" },
      { name: "Traditional Marketing", slug: "traditional-marketing", icon: <FiBriefcase />, desc: "Offline campaigns" },
    ],
  },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services", hasMega: "services" as const },
  { name: "Portfolios", href: "/portfolios" },
  { name: "Blog", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

const mobileLinks = [
  { name: "Home", href: "/", icon: <FiHome /> },
  { name: "About", href: "/about", icon: <FiInfo /> },
  { name: "Services", href: "/services", icon: <FiBriefcase />, hasSub: true },
  { name: "Portfolios", href: "/portfolios", icon: <FiImage /> },
  { name: "Blog", href: "/blogs", icon: <FiFileText /> },
  { name: "Contact", href: "/contact", icon: <FiPhone /> },
];

/* ─────────────────────────── COMPONENT ─────────────────────────── */

const NavBar = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const [activeMega, setActiveMega] = useState<"services" | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const selectedService = "";

  const navContainerRef = useRef<HTMLDivElement>(null);
  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  const hasDarkHero = true; // All public pages have dark hero
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

  const handleMegaEnter = useCallback((menu: "services") => {
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

              {/* Auth.js Authentication State */}
              {authLoading ? (
                <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse hidden sm:block" />
              ) : user ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1 rounded-full bg-slate-800/80 border border-slate-700 hover:border-indigo-500 transition-colors">
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.displayName || "User Avatar"}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center">
                        {(user.displayName || user.email || "U").slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-white truncate">{user.displayName || "User"}</p>
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {user.role === "admin" ? "Admin" : "Verified"}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 font-semibold transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

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
                            key={`${cat.title}-${item.name}`}
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
          <div className="relative bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-5 py-5 flex justify-between items-center">
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
                            key={`${sub.name}-${sub.slug}`}
                            href={`/services/${sub.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-500 hover:text-white transition-colors font-general"
                          >
                            <span className="text-violet-500">{sub.icon}</span>
                            {sub.name}
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

          {/* Mobile CTA */}
          <div className="border-t border-gray-200 dark:border-zinc-800 p-4">
            <button
              onClick={() => { setIsMobileMenuOpen(false); setIsModalOpen(true); }}
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 py-3 text-center text-xs font-bold uppercase text-white tracking-wider shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all cursor-pointer"
            >
              Get a Free Quote
            </button>
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
