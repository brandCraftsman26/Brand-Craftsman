"use client";

import React, { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { 
  FiShield, FiTrendingUp, FiUsers, FiDollarSign, 
  FiBriefcase, FiMail, FiSliders, FiArrowLeft, 
  FiEdit3, FiGrid, FiLayers, FiMessageSquare, 
  FiImage, FiFileText, FiActivity 
} from "react-icons/fi";
import { useUser } from "@clerk/nextjs";
import { ADMIN_EMAILS } from "@/lib/admin-shared";

import WordsManager from "@/components/admin/WordsManager";
import BlocksManager from "@/components/admin/BlocksManager";
import SectionsManager from "@/components/admin/SectionsManager";
import PortfoliosManager from "@/components/admin/PortfoliosManager";
import ReviewsManager from "@/components/admin/ReviewsManager";
import LogosManager from "@/components/admin/LogosManager";
import BlogsManager from "@/components/admin/BlogsManager";
import UsersManager from "@/components/admin/UsersManager";
import HeatmapAnalytics from "@/components/admin/HeatmapAnalytics";

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<
    "overview" | "words" | "blocks" | "sections" | "portfolios" | "reviews" | "logos" | "blogs" | "users" | "analytics"
  >("overview");

  const userEmail = user?.primaryEmailAddress?.emailAddress || "";
  const isAdmin = isLoaded && user && ADMIN_EMAILS.includes(userEmail.toLowerCase());

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center mx-auto text-3xl">
            <FiShield />
          </div>
          <h1 className="font-zentry text-3xl font-black uppercase">Access Denied</h1>
          <p className="font-robert-regular text-gray-400 text-sm">
            Your account (<strong className="text-cyan-400">{userEmail || "unknown"}</strong>) does not have admin privileges. Only authorized administrators can access this panel.
          </p>
          <Link 
            href="/" 
            className="inline-block w-full py-4 rounded-full bg-gradient-to-r from-blue-600 to-orange-600 text-white font-general text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
          >
            Return to Website
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white pt-24 pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900/40 border border-blue-500/20 backdrop-blur-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-cyan-400 font-general text-xs uppercase tracking-widest border border-blue-500/30 mb-3">
              <FiShield /> Full-Stack Supabase CMS Admin
            </div>
            <h1 className="font-zentry text-3xl md:text-5xl font-black uppercase tracking-tight">
              Website Management Portal
            </h1>
            <p className="font-robert-regular text-gray-600 dark:text-gray-400 text-sm mt-1">
              Logged in as <strong className="text-blue-600 dark:text-cyan-400">{user?.firstName || user?.username || 'Admin'}</strong> ({userEmail})
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="px-5 py-3 rounded-full bg-white/10 dark:bg-white/5 hover:bg-white/20 border border-gray-300 dark:border-white/10 font-general text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <FiArrowLeft /> Back to Website
            </Link>
            <Link
              href="/admin/builder"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-general text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <FiSliders /> Visual Builder
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-zinc-800 pb-4">
          {[
            { id: "overview", label: "Overview", icon: <FiTrendingUp /> },
            { id: "words", label: "Words", icon: <FiEdit3 /> },
            { id: "blocks", label: "Blocks", icon: <FiGrid /> },
            { id: "sections", label: "Sections", icon: <FiLayers /> },
            { id: "portfolios", label: "Portfolios", icon: <FiBriefcase /> },
            { id: "reviews", label: "Reviews", icon: <FiMessageSquare /> },
            { id: "logos", label: "Logos", icon: <FiImage /> },
            { id: "blogs", label: "Blogs", icon: <FiFileText /> },
            { id: "users", label: "Users", icon: <FiUsers /> },
            { id: "analytics", label: "Heatmap", icon: <FiActivity /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2.5 rounded-2xl font-general text-xs uppercase tracking-wider font-bold flex items-center gap-2 transition-all ${
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
                { title: "Active Portfolios", value: "8 Projects", change: "Synced Live", color: "text-emerald-500", icon: <FiBriefcase /> },
                { title: "Client Reviews", value: "5.0 Rating", change: "100% Positive", color: "text-amber-500", icon: <FiMessageSquare /> },
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
              <h3 className="font-zentry text-2xl font-black uppercase">Real-time CMS Management Hub</h3>
              <p className="font-robert-regular text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Manage all site resources dynamically. Add, edit, or delete <strong>Portfolios</strong>, <strong>Client Reviews</strong>, <strong>Logo Carousels</strong>, <strong>Blogs</strong>, <strong>User Roles & Credits</strong>, and monitor <strong>Heatmap Analytics</strong> in real time.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: WORDS */}
        {activeTab === "words" && <WordsManager />}

        {/* TAB 3: BLOCKS */}
        {activeTab === "blocks" && <BlocksManager />}

        {/* TAB 4: SECTIONS */}
        {activeTab === "sections" && <SectionsManager />}

        {/* TAB 5: PORTFOLIOS */}
        {activeTab === "portfolios" && <PortfoliosManager />}

        {/* TAB 6: REVIEWS */}
        {activeTab === "reviews" && <ReviewsManager />}

        {/* TAB 7: LOGOS */}
        {activeTab === "logos" && <LogosManager />}

        {/* TAB 8: BLOGS */}
        {activeTab === "blogs" && <BlogsManager />}

        {/* TAB 9: USERS */}
        {activeTab === "users" && <UsersManager />}

        {/* TAB 10: HEATMAP ANALYTICS */}
        {activeTab === "analytics" && <HeatmapAnalytics />}
      </div>

      <Footer />
    </div>
  );
}
