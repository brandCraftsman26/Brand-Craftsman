/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
<<<<<<< HEAD
=======
import Image from "next/image";
>>>>>>> 4ec1d50 (fourth commit)
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiChevronDown, FiMenu, FiX, FiHome, FiInfo, FiBriefcase, FiImage, FiFileText, FiPhone, FiUser, FiDownload, FiDollarSign, FiCheckCircle, FiShield, FiLogOut, FiLogIn, FiUserPlus } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";
import ContactModal from "./ContactModal";
import { useAuth } from "@/context/AuthContext";

const serviceItems = [
  { name: "Digital Marketing", slug: "digital-marketing" },
  { name: "Branding", slug: "branding" },
  { name: "Logo Designing", slug: "logo-designing" },
  { name: "Printing", slug: "printing" },
  { name: "Traditional Marketing", slug: "traditional-marketing" },
  { name: "Web Development", slug: "web-development" },
  { name: "Mobile App Development", slug: "mobile-app-development" },
  { name: "Press Release", slug: "press-release" },
  { name: "Social Media Marketing", slug: "social-media-marketing" },
  { name: "WhatsApp Marketing", slug: "whatsapp-marketing" },
];

const NavBar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const selectedService = "";

  const { isLoggedIn, user, login, logout } = useAuth();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const hasDarkHero = pathname === '/' || pathname === '/about';
  const isAtTop = !mounted || currentScrollY === 0;
  const isTransparentAtTop = hasDarkHero && isAtTop;

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Fix Logo: show light/white logo when top transparent or dark theme active
  const showWhiteLogo = isTransparentAtTop || (mounted && resolvedTheme === "dark");
  const logoSrc = showWhiteLogo ? "/img/logo-light.png" : "/img/logo-dark.png";

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
      <header className={clsx(
        "absolute top-1/2 w-full -translate-y-1/2 rounded-2xl backdrop-blur-lg border shadow-lg transition-all duration-300",
        isTransparentAtTop 
          ? "bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10" 
          : "bg-white/90 dark:bg-black/90 border-gray-200 dark:border-white/10"
      )}>
        <nav className="flex size-full items-center justify-between p-4">
<<<<<<< HEAD
          <div className="flex items-center gap-7">
            {/* Logo handles dark mode swapping if mounted */}
            <Link href="/" className="cursor-pointer">
              <img
                src={(mounted && !isTransparentAtTop && resolvedTheme === "light") ? "/img/logo-light.png" : "/img/logo-dark.png"}
                alt="Brand Craftsman Logo"
                className="w-48 object-contain transition-opacity duration-300"
=======
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="cursor-pointer flex items-center">
              <Image
                src={logoSrc}
                alt="Brand Craftsman Logo"
                width={192}
                height={48}
                priority
                className="w-44 h-auto object-contain transition-opacity duration-300"
>>>>>>> 4ec1d50 (fourth commit)
              />
            </Link>
            
            {/* Get a Quote Button */}
            <div className="hidden md:block">
              <button onClick={() => setIsModalOpen(true)}>
                <Button
<<<<<<< HEAD
                  id="services-button"
                  title="Services"
                  rightIcon={<FiChevronDown className={clsx("transition-transform duration-300", { "rotate-180": isServicesOpen })} />}
                  containerClass="bg-blue-50 flex items-center justify-center gap-1 !py-2 !px-4"
                  isLinkWrapper
=======
                  id="quote-button"
                  title="Get a Quote"
                  containerClass="flex items-center justify-center gap-1 !py-2 !px-4"
>>>>>>> 4ec1d50 (fourth commit)
                />
              </button>
            </div>
          </div>

          <div className="flex h-full items-center">
            {/* Nav Links */}
<<<<<<< HEAD
            <div className="hidden md:flex gap-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={clsx("nav-hover-btn transition-colors", 
=======
            <div className="hidden lg:flex items-center gap-5">
              <Link
                href="/"
                className={clsx("nav-hover-btn transition-colors text-[14px] uppercase tracking-wider font-bold font-general", 
                  isTransparentAtTop ? "text-blue-50" : "text-black dark:text-blue-50"
                )}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={clsx("nav-hover-btn transition-colors text-[14px] uppercase tracking-wider font-bold font-general", 
                  isTransparentAtTop ? "text-blue-50" : "text-black dark:text-blue-50"
                )}
              >
                About Us
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <Link
                  href="/services"
                  className={clsx("flex items-center gap-1 nav-hover-btn transition-colors text-[14px] uppercase tracking-wider font-bold font-general", 
>>>>>>> 4ec1d50 (fourth commit)
                    isTransparentAtTop ? "text-blue-50" : "text-black dark:text-blue-50"
                  )}
                >
                  Services <FiChevronDown className={clsx("transition-transform duration-300", { "rotate-180": isServicesOpen })} />
                </Link>

                <div 
                  className={clsx(
                    "absolute top-full left-0 mt-2 w-64 rounded-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl transition-all duration-300 origin-top-left p-2 space-y-1",
                    isServicesOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
                  )}
                >
                  {serviceItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={`/services/${item.slug}`}
                      onClick={() => setIsServicesOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs text-gray-800 dark:text-gray-200 hover:bg-violet-600 hover:text-white rounded-lg transition-colors font-general"
                    >
                      <span>{item.name}</span>
                      <span className="text-xs opacity-60">→</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/portfolios"
                className={clsx("nav-hover-btn transition-colors text-[14px] uppercase tracking-wider font-bold font-general", 
                  isTransparentAtTop ? "text-blue-50" : "text-black dark:text-blue-50"
                )}
              >
                Portfolios
              </Link>

              <Link
                href="/pricing"
                className={clsx("nav-hover-btn transition-colors text-[14px] uppercase tracking-wider font-bold font-general", 
                  isTransparentAtTop ? "text-blue-50" : "text-black dark:text-blue-50"
                )}
              >
                Pricing
              </Link>

              <Link
                href="/blogs"
                className={clsx("nav-hover-btn transition-colors text-[14px] uppercase tracking-wider font-bold font-general", 
                  isTransparentAtTop ? "text-blue-50" : "text-black dark:text-blue-50"
                )}
              >
                Blog
              </Link>

              <Link
                href="/contact"
                className={clsx("nav-hover-btn transition-colors text-[14px] uppercase tracking-wider font-bold font-general", 
                  isTransparentAtTop ? "text-blue-50" : "text-black dark:text-blue-50"
                )}
              >
                Contact
              </Link>
            </div>

<<<<<<< HEAD
            {/* Social Icons */}
            <div className={clsx("ml-10 hidden items-center gap-4 sm:flex transition-colors",
              isTransparentAtTop ? "text-blue-50 dark:text-white" : "text-black dark:text-white"
            )}>
              <a href="#" className="hover:text-blue-300 transition-colors">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors">
                <FaLinkedinIn size={20} />
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors">
                <FaXTwitter size={18} />
              </a>
            </div>
=======
            {/* Auth Buttons or User Icon Dropdown */}
            <div className="ml-5 flex items-center gap-3">
              {isLoggedIn ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <button 
                    className="flex items-center gap-2 p-1.5 rounded-full bg-gradient-to-r from-blue-600 to-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                    aria-label="User Account Menu"
                  >
                    {user?.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.avatar} alt="User avatar" className="w-7 h-7 rounded-full bg-white/20" />
                    ) : (
                      <FiUser className="w-5 h-5" />
                    )}
                    <span className="hidden sm:inline-block pr-2 pl-1 font-general font-semibold text-xs truncate max-w-[100px]">
                      {user?.name || "Craftsman"}
                    </span>
                    <FiChevronDown className="mr-1" />
                  </button>
>>>>>>> 4ec1d50 (fourth commit)

                  {/* Dropdown Menu */}
                  <div className={clsx(
                    "absolute top-full right-0 mt-2 w-52 rounded-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl transition-all duration-300 origin-top-right p-2 space-y-1 z-50",
                    isUserMenuOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
                  )}>
                    <div className="px-3 py-2 border-b border-gray-200 dark:border-zinc-800">
                      <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{user?.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                    </div>

                    <Link
                      href="/admin"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-800 dark:text-gray-200 hover:bg-violet-600 hover:text-white rounded-lg transition-colors font-general"
                    >
                      <FiShield className="text-indigo-400" /> Admin Panel
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors font-general text-left"
                    >
                      <FiLogOut /> Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => login("admin@brandcraftsman.com", "Admin User")}
                    className={clsx(
                      "px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all font-general flex items-center gap-1 border",
                      isTransparentAtTop 
                        ? "text-white border-white/30 hover:bg-white/10" 
                        : "text-slate-800 dark:text-white border-slate-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-zinc-800"
                    )}
                  >
                    <FiLogIn className="text-sm" /> Sign In
                  </button>
                  <button
                    onClick={() => login("client@brandcraftsman.com", "Craftsman User")}
                    className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-orange-600 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all font-general flex items-center gap-1"
                  >
                    <FiUserPlus className="text-sm" /> Sign Up
                  </button>
                </div>
              )}

              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Hamburger Button (Mobile Only) */}
              <button 
                className="lg:hidden p-2 rounded-lg text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Sidebar Drawer Overlay */}
        <div className={clsx(
          "fixed inset-0 z-[100] lg:hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}>
          {/* Dark Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div className={clsx(
            "absolute top-0 left-0 h-[100dvh] w-[85%] max-w-[340px] bg-white dark:bg-zinc-900 shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            
            {/* Header Area */}
            <div className="bg-gradient-to-r from-blue-600 to-orange-600 p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <span className="font-zentry text-xl font-bold tracking-wide">Brand Craftsman</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-semibold hover:bg-white/10 px-2 py-1 rounded-md transition-colors"
                aria-label="Close mobile menu"
              >
                <FiX size={18} /> Close
              </button>
            </div>

            {/* Menu Links (Scrollable) */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="flex flex-col">
                {[
                  { name: "Home", href: "/", icon: <FiHome /> },
                  { name: "About", href: "/about", icon: <FiInfo /> },
                  { name: "Services", href: "/services", icon: <FiBriefcase /> },
                  { name: "Portfolios", href: "/portfolios", icon: <FiImage /> },
                  { name: "Pricing", href: "/pricing", icon: <FiDollarSign /> },
                  { name: "Blogs", href: "/blogs", icon: <FiFileText /> },
                  { name: "Contact", href: "/contact", icon: <FiPhone /> },
                  { name: "Admin Panel", href: "/admin", icon: <FiShield /> },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center px-6 py-3.5 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors group"
                  >
                    <div className="w-8 flex justify-center text-xl text-violet-500 transition-colors">
                      {item.icon}
                    </div>
                    <span className="ml-3 font-general text-[15px] font-medium text-gray-900 dark:text-gray-100">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth actions in Mobile menu */}
            <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
              {isLoggedIn ? (
                <button
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-xl bg-rose-500/10 text-rose-500 font-bold text-xs uppercase flex items-center justify-center gap-2"
                >
                  <FiLogOut /> Sign Out ({user?.name})
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => { login("admin@brandcraftsman.com", "Admin"); setIsMobileMenuOpen(false); }}
                    className="flex-1 py-2.5 rounded-xl bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-white font-bold text-xs uppercase text-center"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { login("client@brandcraftsman.com", "User"); setIsMobileMenuOpen(false); }}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-orange-600 text-white font-bold text-xs uppercase text-center"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
            
            {/* Bottom Footer Area */}
            <div className="p-4 bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 flex justify-center gap-6 text-gray-500">
              <a href="#" className="hover:text-violet-500 transition-colors"><FaFacebookF size={18} /></a>
              <a href="#" className="hover:text-violet-500 transition-colors"><FaInstagram size={18} /></a>
              <a href="#" className="hover:text-violet-500 transition-colors"><FaLinkedinIn size={18} /></a>
              <a href="#" className="hover:text-violet-500 transition-colors"><FaXTwitter size={18} /></a>
            </div>
          </div>
        </div>
      </header>
      </div>
      
      {/* Contact Form Modal */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedService={selectedService} 
      />
    </>
  );
};

export default NavBar;

