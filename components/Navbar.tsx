/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";
import ContactModal from "./ContactModal";

const navItems = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolios", href: "/portfolios" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const navContainerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const isAtTop = currentScrollY === 0;

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

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
      <header className={clsx(
        "absolute top-1/2 w-full -translate-y-1/2 rounded-2xl backdrop-blur-lg border shadow-lg transition-all duration-300",
        isAtTop 
          ? "bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10" 
          : "bg-white/80 dark:bg-black/80 border-gray-200 dark:border-white/10"
      )}>
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            {/* Logo handles dark mode swapping if mounted */}
            <a href="/" className="cursor-pointer">
              {mounted && (
                <img
                  src={(!mounted || isAtTop || resolvedTheme === "dark") ? "/img/logo-dark.png" : "/img/logo-light.png"}
                  alt="Brand Craftsman Logo"
                  className="w-48 object-contain transition-opacity duration-300"
                />
              )}
            </a>
            
            {/* Services Dropdown */}
            <div 
              className="relative hidden md:block" 
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <a href="/services">
                <Button
                  id="services-button"
                  title="Services"
                  rightIcon={<FiChevronDown className={clsx("transition-transform duration-300", { "rotate-180": isServicesOpen })} />}
                  containerClass="bg-blue-50 flex items-center justify-center gap-1 !py-2 !px-4"
                />
              </a>
              
              <div 
                className={clsx(
                  "absolute top-full left-0 mt-2 w-64 rounded-xl bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl transition-all duration-300 origin-top-left",
                  isServicesOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
                )}
              >
                <div className="flex flex-col p-2 space-y-1">
                  {serviceItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={`/services/${item.slug}`}
                      onClick={() => setIsServicesOpen(false)}
                      className="px-4 py-2.5 text-sm text-left text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white rounded-lg transition-colors font-general flex items-center justify-between"
                    >
                      <span>{item.name}</span>
                      <span className="text-xs opacity-60">→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-full items-center">
            {/* Nav Links */}
            <div className="hidden md:flex gap-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={clsx("nav-hover-btn transition-colors", 
                    isAtTop ? "text-blue-50" : "text-black dark:text-blue-50"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Social Icons */}
            <div className={clsx("ml-10 hidden items-center gap-4 sm:flex transition-colors",
              isAtTop ? "text-blue-50 dark:text-white" : "text-black dark:text-white"
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

            {/* Theme Toggle - Sun/Moon Slider */}
            <div className="ml-6">
              <ThemeToggle />
            </div>
          </div>
        </nav>
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
