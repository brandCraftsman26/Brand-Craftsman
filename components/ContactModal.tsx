"use client";

import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
}

const ContactModal = ({ isOpen, onClose, selectedService }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the lead data to your backend
    console.log("Lead submitted:", { ...formData, service: selectedService });
    alert("Thank you! We have received your request and will contact you shortly.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div 
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
      >
        <div className="relative bg-blue-50 dark:bg-white/5 p-6 border-b border-gray-100 dark:border-white/10">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
          <h2 className="font-zentry text-3xl font-bold uppercase text-black dark:text-white">Get Started</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1 font-general text-sm">
            You are interested in: <span className="font-semibold text-blue-600 dark:text-blue-400">{selectedService}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input 
              type="text" 
              id="name"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input 
              type="email" 
              id="email"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
            <input 
              type="tel" 
              id="phone"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Details</label>
            <textarea 
              id="message"
              rows={3}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/50 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              placeholder="Tell us a little bit about your project..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full py-3 mt-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-general uppercase text-sm font-bold tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
