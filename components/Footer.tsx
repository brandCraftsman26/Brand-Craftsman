import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative w-full bg-blue-50 dark:bg-black py-16 px-4 md:px-8 overflow-hidden border-t border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        
        {/* Left Side: Brand & Info */}
        <div className="space-y-6">
          <h2 className="font-zentry text-4xl md:text-5xl lg:text-7xl font-black uppercase text-black dark:text-white leading-none">
            Brand <br className="hidden md:block" /> Craftsman
          </h2>
          <p className="font-robert-regular text-gray-600 dark:text-gray-400 max-w-sm text-base md:text-lg">
            Architecting Digital Excellence as a Masterful Web Design Agency in Coimbatore. Partnered with Search Pin to scale your business.
          </p>
        </div>

        {/* Right Side: CTA & Socials */}
        <div className="flex flex-col items-start md:items-end space-y-8">
          <div className="flex flex-col items-start md:items-end">
            <h4 className="font-general text-sm uppercase tracking-widest text-blue-500 mb-2">
              Ready to Redefine?
            </h4>
            <a 
              href="mailto:hello@brandcraftsman.com" 
              className="text-2xl md:text-3xl font-robert-medium text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              hello@brandcraftsman.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 dark:border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-md text-black dark:text-white hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 dark:border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-md text-black dark:text-white hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 dark:border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-md text-black dark:text-white hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all">
              <FaLinkedinIn size={20} />
            </a>
            <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 dark:border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-md text-black dark:text-white hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-300 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-wrap justify-center md:justify-start gap-6 font-general text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
          <a href="/" className="hover:text-blue-500 transition-colors">Home</a>
          <a href="/about" className="hover:text-blue-500 transition-colors">About Us</a>
          <a href="/services" className="hover:text-blue-500 transition-colors">Services</a>
          <a href="/web-design-digital-marketing-company-in-coimbatore" className="hover:text-blue-500 transition-colors text-blue-600 dark:text-blue-400 font-bold">Landing Page</a>
          <a href="/blogs" className="hover:text-blue-500 transition-colors">Blogs</a>
          <a href="/portfolios" className="hover:text-blue-500 transition-colors">Portfolios</a>
          <a href="/contact" className="hover:text-blue-500 transition-colors">Contact Us</a>
        </div>

        <p className="font-general text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Brand Craftsman. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
