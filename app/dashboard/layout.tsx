"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FiHome, FiCpu, FiCreditCard, FiArrowLeft, FiMenu, FiX, FiZap 
} from "react-icons/fi";
import { UserButton, useUser } from "@clerk/nextjs";

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: <FiHome /> },
    { label: "AI Tools & Generations", href: "/dashboard/projects", icon: <FiCpu /> },
    { label: "Plan & Billing", href: "/dashboard/billing", icon: <FiCreditCard /> },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-zinc-950 border-r border-zinc-800 flex-col">
        <div className="p-6 border-b border-zinc-800">
          <Link href="/" className="flex items-center gap-2">
            <h2 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 uppercase font-zentry tracking-wide">
              Brand Craftsman
            </h2>
          </Link>
          <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase block mt-1">
            Client Portal
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-general text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Card at bottom */}
        <div className="p-4 border-t border-zinc-800 space-y-4">
          <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserButton />
              <div className="overflow-hidden">
                <span className="font-zentry text-xs font-bold block truncate">
                  {user?.fullName || user?.username || "Client User"}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 block truncate">
                  {user?.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-general text-zinc-500 hover:text-zinc-300 transition-colors px-2"
          >
            <FiArrowLeft /> Return to Main Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950/80 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-zinc-900 text-white"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
            <h1 className="font-zentry text-lg font-bold uppercase tracking-tight text-zinc-200">
              User Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-cyan-400 font-general text-xs font-bold uppercase border border-blue-500/20">
              <FiZap className="text-amber-400" /> Pro Workspace
            </div>
            <div className="md:hidden">
              <UserButton />
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-950 border-b border-zinc-800 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-general text-xs font-bold uppercase text-zinc-300 hover:bg-zinc-900"
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
}
