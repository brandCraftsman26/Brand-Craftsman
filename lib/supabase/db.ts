import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { createClient as createServerClient } from "@/lib/supabase/server";

/* ─────────────────────────── Types ─────────────────────────── */

export type UserRole = "USER" | "ADMIN";
export type UserPlan = "FREE" | "STARTER" | "PRO" | "AGENCY";

export interface DbUser {
  id: string;
  clerk_id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: UserRole;
  plan: UserPlan;
  credits: number;
  created_at: string;
  updated_at: string;
}

export interface BuilderPage {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  content_json: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteConfig {
  id: string;
  site_name: string;
  header_logo_url: string | null;
  footer_copyright: string;
  social_links: string | null;
  updated_at: string;
}

export interface AiGeneration {
  id: string;
  user_id: string;
  tool_name: string;
  prompt: string;
  response: string;
  credits_used: number;
  created_at: string;
}

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  razorpay_id: string | null;
  plan_purchased: UserPlan | null;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

/* ─────────────────────────── Client helpers ─────────────────────────── */

/** Browser-side Supabase client (for use in client components) */
export function getClientDb() {
  return createBrowserClient();
}

/** Server-side Supabase client (for use in API routes and server components) */
export async function getServerDb() {
  return createServerClient();
}
