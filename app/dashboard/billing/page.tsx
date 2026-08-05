"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { FiCheck, FiZap, FiShield, FiStar } from "react-icons/fi";

export default function UserBillingPage() {
  const { user } = useUser();

  const plans = [
    {
      name: "Starter",
      price: "₹9,999",
      period: "/month",
      description: "Essential AI tools and basic site builder capabilities.",
      features: [
        "100 AI Generation Credits / mo",
        "1 Published Landing Page",
        "Basic SEO Optimization",
        "Email Support",
      ],
      current: false,
      popular: false,
    },
    {
      name: "Pro Agency",
      price: "₹24,999",
      period: "/month",
      description: "Full access to custom AI builders, unlimited revisions, and priority hosting.",
      features: [
        "Unlimited AI Generation Credits",
        "5 Published Pages & Custom Domains",
        "Advanced Realtime CMS Access",
        "Dedicated Account Strategist",
        "24/7 Priority WhatsApp Support",
      ],
      current: true,
      popular: true,
    },
    {
      name: "Enterprise",
      price: "₹49,999",
      period: "/month",
      description: "Full-stack development, custom integrations, and dedicated SLA.",
      features: [
        "Everything in Pro Agency",
        "Custom API Integrations",
        "White-label Client Portals",
        "Dedicated Infrastructure",
      ],
      current: false,
      popular: false,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="font-zentry text-3xl font-black uppercase tracking-tight">
          Plan & Billing Management
        </h1>
        <p className="font-robert-regular text-xs text-gray-400 mt-1">
          Manage your subscription tier, billing details, and active feature entitlements.
        </p>
      </div>

      {/* Current Active Plan Badge */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-zinc-900/40 border border-blue-500/20 backdrop-blur-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-general text-xs font-bold uppercase border border-emerald-500/20">
            <FiShield /> Active Subscription
          </div>
          <h2 className="font-zentry text-2xl md:text-3xl font-black uppercase">
            Pro Agency Plan
          </h2>
          <p className="font-robert-regular text-xs text-gray-400">
            Assigned to account <strong className="text-cyan-400">{user?.primaryEmailAddress?.emailAddress}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 font-general text-xs font-bold uppercase tracking-wider transition-all">
            Manage Payment Methods
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-8 rounded-3xl flex flex-col justify-between transition-all ${
              plan.popular
                ? "bg-gradient-to-b from-blue-950/80 to-zinc-900 border-2 border-blue-500 shadow-2xl relative"
                : "bg-zinc-900 border border-zinc-800"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white font-general text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                <FiStar /> Current Tier
              </span>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="font-zentry text-xl font-black uppercase tracking-wide">{plan.name}</h3>
                <p className="font-robert-regular text-xs text-gray-400 mt-1">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-zentry text-4xl font-black">{plan.price}</span>
                <span className="font-general text-xs text-gray-400 font-bold">{plan.period}</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-zinc-800">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs font-robert-regular text-gray-300">
                    <FiCheck className="text-emerald-400 text-sm flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              disabled={plan.current}
              className={`w-full py-3.5 rounded-full font-general text-xs font-bold uppercase tracking-wider mt-8 transition-all ${
                plan.current
                  ? "bg-zinc-800 text-gray-400 cursor-default"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:scale-105"
              }`}
            >
              {plan.current ? "Active Plan" : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
