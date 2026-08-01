"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FiArrowRight, FiShield, FiClock, FiHeadphones } from "react-icons/fi";

const footerLinks = {
  Product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Integrations", href: "/features" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Download", href: "/download" },
  ],
  Support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Help Center", href: "/contact" },
    { name: "FAQ", href: "/#faq" },
    { name: "Status", href: "#" },
  ],
  Resources: [
    { name: "Blog", href: "/blogs" },
    { name: "Portfolios", href: "/portfolios" },
    { name: "Case Studies", href: "/portfolios" },
    { name: "API Docs", href: "#" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Careers", href: "/contact" },
    { name: "Brand Assets", href: "#" },
  ],
};

const footerHighlights = [
  { icon: <FiHeadphones className="w-5 h-5" />, text: "24/7 Support & Free Training" },
  { icon: <FiShield className="w-5 h-5" />, text: "Serious About Security & Privacy" },
  { icon: <FiClock className="w-5 h-5" />, text: "99.9% Uptime Guarantee" },
];

const socialLinks = [
  { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
  { icon: <FaXTwitter />, href: "#", label: "Twitter" },
  { icon: <FaYoutube />, href: "#", label: "YouTube" },
  { icon: <FaInstagram />, href: "#", label: "Instagram" },
  { icon: <FaFacebookF />, href: "#", label: "Facebook" },
];

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-b from-[#0f0a1a] to-[#1a0533] overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-blue-600/5 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Top highlights bar */}
        <div className="py-10 border-b border-white/[0.06]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {footerHighlights.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="font-robert-regular text-white/60 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main footer grid */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand column (2 cols) */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/img/logo-dark.png" 
                alt="Brand Craftsman - Premier Web Design & Digital Marketing Company in Coimbatore" 
                width={200} 
                height={40} 
                className="w-48 h-auto" 
              />
            </Link>
            <p className="font-robert-medium text-white/80 text-base font-bold leading-relaxed mb-2 max-w-sm">
              Architecting Digital Excellence as a Masterful Web Design Agency in Coimbatore. Partnered with Search Pin to scale your business.
            </p>
            <p className="font-zentry text-lg text-emerald-400 font-bold mb-6">
              A Product of Search Pin
            </p>
            <div className="flex flex-col gap-2 mb-6">
              <a href="https://brandcraftsman.in" target="_blank" rel="noopener noreferrer" className="font-robert-medium text-white/40 text-sm hover:text-violet-400 transition-colors duration-300">
                brandcraftsman.in
              </a>
              <a href="https://searchpin.in" target="_blank" rel="noopener noreferrer" className="font-robert-medium text-white/40 text-sm hover:text-violet-400 transition-colors duration-300">
                searchpin.in
              </a>
            </div>

            {/* Newsletter */}
            <div className="mt-4">
              <p className="font-general text-xs uppercase tracking-wider text-white/40 mb-3">Subscribe to our newsletter</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 font-robert-regular text-sm focus:outline-none focus:border-violet-500/50 transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-orange-600 text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                  <FiArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-robert-medium text-white font-bold text-sm mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="font-robert-regular text-white/40 text-sm hover:text-violet-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-zentry text-lg font-black text-white/60 uppercase">BC</span>
            <span className="text-white/20">|</span>
            <p className="font-general text-xs text-white/30">
              © {new Date().getFullYear()} Brand Craftsman. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#" className="font-general text-xs text-white/30 hover:text-white/60 transition-colors uppercase tracking-wider">Security</Link>
            <Link href="#" className="font-general text-xs text-white/30 hover:text-white/60 transition-colors uppercase tracking-wider">Privacy</Link>
            <Link href="#" className="font-general text-xs text-white/30 hover:text-white/60 transition-colors uppercase tracking-wider">Terms</Link>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:bg-violet-500/20 hover:text-violet-400 hover:border-violet-500/30 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
