-- ============================================================
-- Brand Craftsman – Supabase Schema Migration
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Users (synced from Clerk via webhook)
CREATE TABLE IF NOT EXISTS public.users (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id     TEXT UNIQUE NOT NULL,
  email        TEXT UNIQUE NOT NULL,
  name         TEXT,
  image        TEXT,
  role         TEXT DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
  plan         TEXT DEFAULT 'FREE' CHECK (plan IN ('FREE', 'STARTER', 'PRO', 'AGENCY')),
  credits      INT DEFAULT 100,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- 2. Builder Pages (Puck website builder)
CREATE TABLE IF NOT EXISTS public.builder_pages (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       TEXT NOT NULL,  -- clerk_id of the creator
  title         TEXT NOT NULL,
  slug          TEXT NOT NULL,
  content_json  TEXT DEFAULT '{"content":[],"root":{}}',
  is_published  BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, slug)
);

-- 3. Site Config (global settings)
CREATE TABLE IF NOT EXISTS public.site_config (
  id                TEXT PRIMARY KEY DEFAULT 'global',
  site_name         TEXT DEFAULT 'Brand Craftsman',
  header_logo_url   TEXT,
  footer_copyright  TEXT DEFAULT '© 2026 Brand Craftsman. All rights reserved.',
  social_links      TEXT,  -- JSON string
  updated_at        TIMESTAMPTZ DEFAULT now()
);

-- Seed global config row
INSERT INTO public.site_config (id) VALUES ('global') ON CONFLICT (id) DO NOTHING;

-- 4. AI Generations (credit-tracked tool usage)
CREATE TABLE IF NOT EXISTS public.ai_generations (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       TEXT NOT NULL,  -- clerk_id
  tool_name     TEXT NOT NULL,
  prompt        TEXT NOT NULL,
  response      TEXT NOT NULL,
  credits_used  INT DEFAULT 1,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- 5. Contact Leads (quote inquiries)
CREATE TABLE IF NOT EXISTS public.contact_leads (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  service     TEXT,
  message     TEXT,
  status      TEXT DEFAULT 'New Inquiry',
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 6. Orders (payment tracking)
CREATE TABLE IF NOT EXISTS public.orders (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         TEXT NOT NULL,  -- clerk_id
  razorpay_id     TEXT UNIQUE,
  plan_purchased  TEXT CHECK (plan_purchased IN ('FREE', 'STARTER', 'PRO', 'AGENCY')),
  amount          INT NOT NULL,  -- Amount in paise (INR)
  status          TEXT DEFAULT 'PENDING',
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Indexes for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON public.users (clerk_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users (email);
CREATE INDEX IF NOT EXISTS idx_builder_pages_slug ON public.builder_pages (slug);
CREATE INDEX IF NOT EXISTS idx_builder_pages_user ON public.builder_pages (user_id);
CREATE INDEX IF NOT EXISTS idx_ai_generations_user ON public.ai_generations (user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders (user_id);
CREATE INDEX IF NOT EXISTS idx_contact_leads_status ON public.contact_leads (status);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.builder_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow service_role full access (used by our API routes via publishable key)
-- The publishable key acts as an anon key; our API routes run server-side
-- with the service role through the Supabase server client.

-- Public read for builder_pages (published only)
CREATE POLICY "Public can read published pages" ON public.builder_pages
  FOR SELECT USING (is_published = true);

-- Public read for site_config
CREATE POLICY "Public can read site config" ON public.site_config
  FOR SELECT USING (true);

-- Allow authenticated inserts to contact_leads
CREATE POLICY "Anyone can submit leads" ON public.contact_leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can read leads" ON public.contact_leads
  FOR SELECT USING (true);

-- Updated_at auto-trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_users') THEN
    CREATE TRIGGER set_updated_at_users BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_builder_pages') THEN
    CREATE TRIGGER set_updated_at_builder_pages BEFORE UPDATE ON public.builder_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_site_config') THEN
    CREATE TRIGGER set_updated_at_site_config BEFORE UPDATE ON public.site_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_orders') THEN
    CREATE TRIGGER set_updated_at_orders BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
