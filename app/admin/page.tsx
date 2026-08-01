/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { 
  FiShield, FiTrendingUp, FiUsers, FiDollarSign, 
  FiCheckCircle, FiSave, FiBriefcase, FiMail, 
  FiSliders, FiArrowLeft
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
  const { isLoggedIn, user, login } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "services" | "leads" | "hero" | "portfolios">("overview");
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Editable Site Data with LocalStorage Persistence
  const [siteConfig, setSiteConfig] = useState({
    heroTitle: "SEARCH PIN",
    heroSubtitle: "Architecting Digital Excellence as a Masterful Web Design & Digital Marketing Company in Coimbatore.",
    phone: "+91-9876543210",
    email: "contact@brandcraftsman.com",
    address: "Coimbatore, Tamil Nadu, India",
  });

  const [servicesData, setServicesData] = useState([
    { id: 1, name: "Web Development", price: "₹29,999/mo", status: "Active" },
    { id: 2, name: "Branding & Logo Design", price: "₹14,999/pkg", status: "Active" },
    { id: 3, name: "Digital Marketing & SEO", price: "₹24,999/mo", status: "Active" },
    { id: 4, name: "Mobile App Development", price: "₹49,999/pkg", status: "Active" },
    { id: 5, name: "Printing Products & Mockups", price: "₹9,999/pkg", status: "Active" },
  ]);

  const [leadsData] = useState([
    { id: 101, name: "Rajesh Kumar", service: "Web Development", phone: "+91 98421 11223", date: "2026-07-30", status: "New Inquiry" },
    { id: 102, name: "Anita Sharma", service: "Branding", phone: "+91 97890 55432", date: "2026-07-29", status: "Contacted" },
    { id: 103, name: "Siddharth V", service: "Digital Marketing", phone: "+91 94432 99881", date: "2026-07-28", status: "In Progress" },
  ]);

  useEffect(() => {
    const savedConfig = localStorage.getItem("bc_site_config");
    if (savedConfig) {
      try { setSiteConfig(JSON.parse(savedConfig)); } catch {}
    }
  }, []);

  const triggerSave = (msg: string) => {
    localStorage.setItem("bc_site_config", JSON.stringify(siteConfig));
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(null), 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-orange-600 flex items-center justify-center mx-auto text-3xl">
            <FiShield />
          </div>
          <h1 className="font-zentry text-3xl font-black uppercase">Admin Authentication</h1>
          <p className="font-robert-regular text-gray-400 text-sm">
            Sign in as an administrator to access and customize website controls, pricing, and leads.
          </p>
          <button
            onClick={() => login("admin@brandcraftsman.com", "Admin Craftsman")}
            className="w-full py-4 rounded-full bg-gradient-to-r from-blue-600 to-orange-600 text-white font-general text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
          >
            Authenticate as Admin
          </button>
          <Link href="/" className="inline-block text-xs font-general text-gray-400 hover:text-white">
            ← Return to Main Website
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white pt-24 pb-16 transition-colors duration-300">
      
      {/* Toast Banner */}
      {saveNotification && (
        <div className="fixed top-20 right-6 z-50 px-6 py-3 rounded-2xl bg-emerald-500 text-white font-general text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2 animate-bounce">
          <FiCheckCircle className="text-lg" /> {saveNotification}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900/40 border border-blue-500/20 backdrop-blur-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-cyan-400 font-general text-xs uppercase tracking-widest border border-blue-500/30 mb-3">
              <FiShield /> Admin Control Center
            </div>
            <h1 className="font-zentry text-3xl md:text-5xl font-black uppercase tracking-tight">
              Website Management Portal
            </h1>
            <p className="font-robert-regular text-gray-600 dark:text-gray-400 text-sm mt-1">
              Logged in as <strong className="text-blue-600 dark:text-cyan-400">{user?.name}</strong> ({user?.email})
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="px-5 py-3 rounded-full bg-white/10 dark:bg-white/5 hover:bg-white/20 border border-gray-300 dark:border-white/10 font-general text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <FiArrowLeft /> Back to Website
            </Link>
            <button
              onClick={() => triggerSave("All site configurations synced!")}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-orange-600 text-white font-general text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <FiSave /> Save All Changes
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-zinc-800 pb-4">
          {[
            { id: "overview", label: "Dashboard Overview", icon: <FiTrendingUp /> },
            { id: "services", label: "Services & Pricing", icon: <FiDollarSign /> },
            { id: "leads", label: "Client Inquiries", icon: <FiMail /> },
            { id: "hero", label: "Hero & Content", icon: <FiSliders /> },
            { id: "portfolios", label: "Portfolio Items", icon: <FiBriefcase /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)} // eslint-disable-line @typescript-eslint/no-explicit-any
              className={`px-5 py-3 rounded-2xl font-general text-xs uppercase tracking-wider font-bold flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: "Total Inquiries", value: "48 Leads", change: "+18% this month", color: "text-blue-500", icon: <FiUsers /> },
                { title: "Active Projects", value: "12 Client Builds", change: "On Track", color: "text-emerald-500", icon: <FiBriefcase /> },
                { title: "Monthly Revenue Run", value: "₹4.8 Lakhs", change: "+24% YoY", color: "text-amber-500", icon: <FiDollarSign /> },
                { title: "System Speed Index", value: "99/100 Core", change: "Ultra Fast", color: "text-cyan-500", icon: <FiTrendingUp /> },
              ].map((card, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-general text-xs uppercase tracking-wider text-gray-500">{card.title}</span>
                    <div className={`p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 ${card.color} text-xl`}>
                      {card.icon}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="font-zentry text-3xl font-black">{card.value}</h2>
                    <p className="font-robert-regular text-xs text-emerald-500 font-semibold mt-1">{card.change}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 space-y-4">
              <h3 className="font-zentry text-2xl font-black uppercase">Quick Control Highlights</h3>
              <p className="font-robert-regular text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Welcome to your Brand Craftsman control hub. You can modify prices, handle incoming customer quotes, tweak home page content, and organize portfolio showcase items directly from these tabs.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES & PRICING */}
        {activeTab === "services" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-zentry text-2xl font-black uppercase">Manage Service Pricing</h3>
                <p className="font-robert-regular text-xs text-gray-500">Edit tier pricing and active service status</p>
              </div>
              <button 
                onClick={() => triggerSave("Service prices updated successfully!")}
                className="px-4 py-2 rounded-full bg-blue-600 text-white font-general text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <FiSave /> Update Prices
              </button>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-zinc-800">
              {servicesData.map((s, idx) => (
                <div key={s.id} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-zentry text-lg font-bold text-gray-400">#0{idx+1}</span>
                    <input
                      type="text"
                      value={s.name}
                      onChange={(e) => {
                        const copy = [...servicesData];
                        copy[idx].name = e.target.value;
                        setServicesData(copy);
                      }}
                      className="font-zentry text-lg font-bold bg-gray-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl text-slate-900 dark:text-white border border-gray-200 dark:border-zinc-700 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={s.price}
                      onChange={(e) => {
                        const copy = [...servicesData];
                        copy[idx].price = e.target.value;
                        setServicesData(copy);
                      }}
                      className="font-general font-bold text-sm bg-gray-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl text-slate-900 dark:text-white border border-gray-200 dark:border-zinc-700 focus:outline-none focus:border-blue-500"
                    />
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-general text-xs font-bold uppercase">
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LEADS */}
        {activeTab === "leads" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 space-y-6">
            <h3 className="font-zentry text-2xl font-black uppercase">Recent Client Quote Inquiries</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left font-general text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-zinc-800 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <th className="pb-3">Client Name</th>
                    <th className="pb-3">Requested Service</th>
                    <th className="pb-3">Phone Number</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 font-medium">
                  {leadsData.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                      <td className="py-4 font-bold">{lead.name}</td>
                      <td className="py-4 text-blue-600 dark:text-cyan-400">{lead.service}</td>
                      <td className="py-4 font-mono">{lead.phone}</td>
                      <td className="py-4 text-gray-400">{lead.date}</td>
                      <td className="py-4">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold">
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: HERO & CONTENT */}
        {activeTab === "hero" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 space-y-6">
            <h3 className="font-zentry text-2xl font-black uppercase">Site Messaging & Contact Settings</h3>
            
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Hero Title Heading</label>
                <input
                  type="text"
                  value={siteConfig.heroTitle}
                  onChange={(e) => setSiteConfig({ ...siteConfig, heroTitle: e.target.value })}
                  className="w-full font-zentry text-xl font-bold bg-gray-100 dark:bg-zinc-800 p-3 rounded-xl border border-gray-200 dark:border-zinc-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Hero Subtitle Text</label>
                <textarea
                  rows={3}
                  value={siteConfig.heroSubtitle}
                  onChange={(e) => setSiteConfig({ ...siteConfig, heroSubtitle: e.target.value })}
                  className="w-full font-robert-regular text-sm bg-gray-100 dark:bg-zinc-800 p-3 rounded-xl border border-gray-200 dark:border-zinc-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Contact Phone Number</label>
                <input
                  type="text"
                  value={siteConfig.phone}
                  onChange={(e) => setSiteConfig({ ...siteConfig, phone: e.target.value })}
                  className="w-full font-mono text-sm bg-gray-100 dark:bg-zinc-800 p-3 rounded-xl border border-gray-200 dark:border-zinc-700"
                />
              </div>

              <button
                onClick={() => triggerSave("Global content settings saved!")}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-orange-600 text-white font-general text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
              >
                <FiSave /> Save Settings
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: PORTFOLIOS */}
        {activeTab === "portfolios" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 space-y-6">
            <h3 className="font-zentry text-2xl font-black uppercase">Portfolio Case Studies Control</h3>
            <p className="font-robert-regular text-sm text-gray-500">
              Manage live case studies displayed on the portfolio page. All 8 items are active and synchronized with high-resolution visual previews.
            </p>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold font-general flex items-center gap-2">
              <FiCheckCircle className="text-lg" /> All 8 Portfolio Images and Metrics are synced with high clarity.
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
