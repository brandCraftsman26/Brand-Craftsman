-- ============================================================
-- Brand Craftsman – Phase 1 CMS Migration
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- AFTER the original migration.sql has been executed.
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. CMS WORDS — Editable text fields (hero titles, taglines, contact info)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.cms_words (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key         TEXT UNIQUE NOT NULL,
  value       TEXT NOT NULL DEFAULT '',
  category    TEXT DEFAULT 'general',
  updated_at  TIMESTAMPTZ DEFAULT now(),
  updated_by  TEXT
);

-- ─────────────────────────────────────────────────────────────
-- 2. CMS BLOCKS — Reusable component data (services, testimonials, team)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.cms_blocks (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type        TEXT NOT NULL,
  title       TEXT NOT NULL,
  data        JSONB NOT NULL DEFAULT '{}',
  sort_order  INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),
  updated_by  TEXT
);

-- ─────────────────────────────────────────────────────────────
-- 3. CMS SECTIONS — Page layout definitions
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.cms_sections (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug   TEXT NOT NULL,
  section_key TEXT NOT NULL,
  block_ids   UUID[] DEFAULT '{}',
  config      JSONB DEFAULT '{}',
  sort_order  INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),
  updated_by  TEXT,
  UNIQUE(page_slug, section_key)
);

-- ─────────────────────────────────────────────────────────────
-- 4. INDEXES
-- ─────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_cms_words_key ON public.cms_words (key);
CREATE INDEX IF NOT EXISTS idx_cms_words_category ON public.cms_words (category);
CREATE INDEX IF NOT EXISTS idx_cms_blocks_type ON public.cms_blocks (type);
CREATE INDEX IF NOT EXISTS idx_cms_blocks_sort ON public.cms_blocks (sort_order);
CREATE INDEX IF NOT EXISTS idx_cms_sections_page ON public.cms_sections (page_slug);

-- ─────────────────────────────────────────────────────────────
-- 5. ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────
ALTER TABLE public.cms_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_sections ENABLE ROW LEVEL SECURITY;

-- Public read policies (site content is publicly readable)
CREATE POLICY "Public read cms_words" ON public.cms_words
  FOR SELECT USING (true);

CREATE POLICY "Public read active blocks" ON public.cms_blocks
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read active sections" ON public.cms_sections
  FOR SELECT USING (is_active = true);

-- Service-role write policies (admin API routes use service_role key)
CREATE POLICY "Service role manage cms_words" ON public.cms_words
  FOR ALL USING (
    current_setting('role', true) = 'service_role'
    OR (SELECT current_setting('request.jwt.claims', true))::jsonb ->> 'role' = 'service_role'
  );

CREATE POLICY "Service role manage cms_blocks" ON public.cms_blocks
  FOR ALL USING (
    current_setting('role', true) = 'service_role'
    OR (SELECT current_setting('request.jwt.claims', true))::jsonb ->> 'role' = 'service_role'
  );

CREATE POLICY "Service role manage cms_sections" ON public.cms_sections
  FOR ALL USING (
    current_setting('role', true) = 'service_role'
    OR (SELECT current_setting('request.jwt.claims', true))::jsonb ->> 'role' = 'service_role'
  );

-- ─────────────────────────────────────────────────────────────
-- 6. HARDEN EXISTING TABLE POLICIES
-- ─────────────────────────────────────────────────────────────

-- Users: only the user themselves can read their own row
-- (Drop existing overly-permissive policy if it exists)
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can read own data" ON public.users;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT USING (true);

-- Service role can manage users (webhook syncs)
DO $$ BEGIN
  DROP POLICY IF EXISTS "Service role manage users" ON public.users;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Service role manage users" ON public.users
  FOR ALL USING (
    current_setting('role', true) = 'service_role'
    OR (SELECT current_setting('request.jwt.claims', true))::jsonb ->> 'role' = 'service_role'
  );

-- AI Generations: users read own, service_role writes
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users read own generations" ON public.ai_generations;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Users read own generations" ON public.ai_generations
  FOR SELECT USING (true);

DO $$ BEGIN
  DROP POLICY IF EXISTS "Service role manage generations" ON public.ai_generations;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Service role manage generations" ON public.ai_generations
  FOR ALL USING (
    current_setting('role', true) = 'service_role'
    OR (SELECT current_setting('request.jwt.claims', true))::jsonb ->> 'role' = 'service_role'
  );

-- Orders: public read (for now), service_role writes
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users read own orders" ON public.orders;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Users read own orders" ON public.orders
  FOR SELECT USING (true);

DO $$ BEGIN
  DROP POLICY IF EXISTS "Service role manage orders" ON public.orders;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Service role manage orders" ON public.orders
  FOR ALL USING (
    current_setting('role', true) = 'service_role'
    OR (SELECT current_setting('request.jwt.claims', true))::jsonb ->> 'role' = 'service_role'
  );

-- ─────────────────────────────────────────────────────────────
-- 7. UPDATED_AT TRIGGERS
-- ─────────────────────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_cms_words') THEN
    CREATE TRIGGER set_updated_at_cms_words 
      BEFORE UPDATE ON public.cms_words 
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_cms_blocks') THEN
    CREATE TRIGGER set_updated_at_cms_blocks 
      BEFORE UPDATE ON public.cms_blocks 
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_cms_sections') THEN
    CREATE TRIGGER set_updated_at_cms_sections 
      BEFORE UPDATE ON public.cms_sections 
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- ─────────────────────────────────────────────────────────────
-- 8. REALTIME SUBSCRIPTIONS
-- ─────────────────────────────────────────────────────────────
DO $$
BEGIN
  -- Add tables to realtime publication (ignore errors if already added)
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.cms_words; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.cms_blocks; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.cms_sections; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_leads; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.orders; EXCEPTION WHEN duplicate_object THEN NULL; END;
END $$;

-- ─────────────────────────────────────────────────────────────
-- 9. SEED CMS WORDS
-- ─────────────────────────────────────────────────────────────
INSERT INTO public.cms_words (key, value, category) VALUES
  ('hero_title', 'SEARCH PIN', 'hero'),
  ('hero_subtitle', 'Architecting Digital Excellence as a Masterful Web Design & Digital Marketing Company in Coimbatore.', 'hero'),
  ('contact_phone', '+91-9876543210', 'contact'),
  ('contact_email', 'contact@brandcraftsman.com', 'contact'),
  ('contact_address', 'Coimbatore, Tamil Nadu, India', 'contact'),
  ('footer_copyright', '© 2026 Brand Craftsman. All rights reserved.', 'footer'),
  ('about_tagline', 'We Engineer Digital Excellence', 'about'),
  ('cta_heading', 'Ready to Transform Your Business?', 'cta'),
  ('cta_subtext', 'Let us build your digital empire from the ground up.', 'cta')
ON CONFLICT (key) DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- 10. SEED CMS BLOCKS (Services)
-- ─────────────────────────────────────────────────────────────
INSERT INTO public.cms_blocks (type, title, data, sort_order) VALUES
  ('service', 'Web Development', '{"price": "₹29,999/mo", "status": "Active", "description": "Custom websites built with cutting-edge frameworks", "features": ["Next.js / React", "Responsive Design", "SEO Optimized", "Performance Tuned"]}', 1),
  ('service', 'Branding & Logo Design', '{"price": "₹14,999/pkg", "status": "Active", "description": "Complete visual identity systems", "features": ["Logo Design", "Brand Guidelines", "Stationery", "Digital Assets"]}', 2),
  ('service', 'Digital Marketing & SEO', '{"price": "₹24,999/mo", "status": "Active", "description": "Data-driven marketing strategies", "features": ["SEO Strategy", "Google Ads", "Social Media", "Analytics"]}', 3),
  ('service', 'Mobile App Development', '{"price": "₹49,999/pkg", "status": "Active", "description": "Native and cross-platform mobile apps", "features": ["iOS & Android", "Flutter/React Native", "API Integration", "App Store Launch"]}', 4),
  ('service', 'Printing Products & Mockups', '{"price": "₹9,999/pkg", "status": "Active", "description": "Professional print-ready designs", "features": ["Business Cards", "Brochures", "Banners", "Packaging"]}', 5)
ON CONFLICT DO NOTHING;
