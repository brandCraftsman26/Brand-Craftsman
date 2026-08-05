-- ============================================================
-- Brand Craftsman – Phase 2 Migration (Portfolios, Reviews, Logos, Blogs, Analytics)
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. CMS PORTFOLIOS
CREATE TABLE IF NOT EXISTS public.cms_portfolios (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  category      TEXT NOT NULL DEFAULT 'Web Development',
  image         TEXT,
  description   TEXT,
  metrics       JSONB DEFAULT '{"leadGrowth": "+50%", "conversionUplift": "+30%"}',
  client_name   TEXT,
  tech_stack    TEXT[] DEFAULT '{}',
  is_published  BOOLEAN DEFAULT true,
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- 2. CMS REVIEWS / TESTIMONIALS
CREATE TABLE IF NOT EXISTS public.cms_reviews (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author       TEXT NOT NULL,
  role         TEXT NOT NULL,
  company      TEXT,
  avatar_url   TEXT,
  quote        TEXT NOT NULL,
  rating       INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  sort_order   INT DEFAULT 0,
  is_featured  BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- 3. CMS LOGOS / CAROUSEL BRANDS
CREATE TABLE IF NOT EXISTS public.cms_logos (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  logo_url     TEXT NOT NULL,
  website_url  TEXT,
  sort_order   INT DEFAULT 0,
  is_active    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- 4. CMS BLOGS & INSIGHTS
CREATE TABLE IF NOT EXISTS public.cms_blogs (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title          TEXT NOT NULL,
  slug           TEXT UNIQUE NOT NULL,
  category       TEXT NOT NULL DEFAULT 'Web Design',
  read_time      TEXT DEFAULT '5 min read',
  author         TEXT DEFAULT 'Brand Craftsman Team',
  excerpt        TEXT,
  content_json   TEXT, -- Rich text paragraphs or markdown
  feature_image  TEXT,
  is_published   BOOLEAN DEFAULT true,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

-- 5. ANALYTICS & HEATMAP EVENTS
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      TEXT, -- clerk_id or anon id
  event_type   TEXT NOT NULL DEFAULT 'click', -- 'click', 'pageview', 'scroll'
  path         TEXT NOT NULL,
  x_pos        INT,
  y_pos        INT,
  element_tag  TEXT,
  metadata     JSONB DEFAULT '{}',
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_cms_portfolios_slug ON public.cms_portfolios (slug);
CREATE INDEX IF NOT EXISTS idx_cms_blogs_slug ON public.cms_blogs (slug);
CREATE INDEX IF NOT EXISTS idx_analytics_events_path ON public.analytics_events (path);

-- RLS POLICIES
ALTER TABLE public.cms_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read portfolios" ON public.cms_portfolios FOR SELECT USING (is_published = true);
CREATE POLICY "Public read reviews" ON public.cms_reviews FOR SELECT USING (true);
CREATE POLICY "Public read logos" ON public.cms_logos FOR SELECT USING (is_active = true);
CREATE POLICY "Public read blogs" ON public.cms_blogs FOR SELECT USING (is_published = true);
CREATE POLICY "Anyone insert analytics" ON public.analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read analytics" ON public.analytics_events FOR SELECT USING (true);

-- REALTIME SUBSCRIPTIONS
DO $$
BEGIN
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.cms_portfolios; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.cms_reviews; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.cms_logos; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.cms_blogs; EXCEPTION WHEN duplicate_object THEN NULL; END;
  BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE public.analytics_events; EXCEPTION WHEN duplicate_object THEN NULL; END;
END $$;

-- SEED PORTFOLIOS
INSERT INTO public.cms_portfolios (title, slug, category, image, description, metrics, client_name, tech_stack) VALUES
  ('Kovai Tex Printing Portal', 'kovai-tex-printing', 'Printing', '/img/portfolio_printing_1785511380254.png', 'Modern industrial print catalog and quotation engine built for Kovai Tex.', '{"leadGrowth": "+62%", "conversionUplift": "+45%"}', 'Kovai Tex Industries', ARRAY['Next.js', 'Tailwind', 'Supabase']),
  ('Aura Luxe Brand Identity', 'aura-luxe-branding', 'Branding', '/img/portfolio_branding_1785511392412.png', 'Complete brand identity, logo, stationery, and packaging design system.', '{"leadGrowth": "+80%", "conversionUplift": "+55%"}', 'Aura Luxe Global', ARRAY['Brand Strategy', 'Logo Design', 'Figma']),
  ('Apex Digital SaaS Engine', 'apex-digital-saas', 'Websites', '/img/portfolio_website_1785511403920.png', 'High-conversion SaaS web application engineered for maximum SEO ranking.', '{"leadGrowth": "+110%", "conversionUplift": "+75%"}', 'Apex Digital Systems', ARRAY['React', 'TypeScript', 'Tailwind'])
ON CONFLICT (slug) DO NOTHING;

-- SEED REVIEWS
INSERT INTO public.cms_reviews (author, role, company, quote, rating) VALUES
  ('Karthik Subbaraj', 'CEO & Founder', 'Kovai Tex', 'Brand Craftsman transformed our traditional print business into a digital powerhouse. Our online inquiries increased by 62% in 60 days!', 5),
  ('Priya Ramasamy', 'Marketing Director', 'Aura Luxe', 'The brand design and hyper-responsive website built by Brand Craftsman set a new standard in our industry.', 5),
  ('Dr. Anand V', 'Managing Director', 'Coimbatore Health', 'Fastest web development agency in Coimbatore. Outstanding design aesthetics and rock-solid SEO performance.', 5)
ON CONFLICT DO NOTHING;

-- SEED LOGOS
INSERT INTO public.cms_logos (name, logo_url, website_url, sort_order) VALUES
  ('Search Pin', '/img/logo-dark.png', 'https://searchpin.in', 1),
  ('Brand Craftsman', '/img/logo-light.png', 'https://brandcraftsman.com', 2),
  ('Kovai Tex', '/img/logo-dark.png', 'https://kovaitex.com', 3)
ON CONFLICT DO NOTHING;

-- SEED BLOGS
INSERT INTO public.cms_blogs (title, slug, category, read_time, author, excerpt, feature_image) VALUES
  ('Why Next.js 15 & Supabase Are Dominating Web Development in 2026', 'nextjs-15-supabase-web-development-2026', 'Web Development', '6 min read', 'Search Pin Team', 'Explore how serverless architecture, instant database subscriptions, and Next.js Turbopack provide unmatched page speed and SEO dominance.', '/img/blog_nextjs_new.png'),
  ('The Master Guide to Local SEO for Coimbatore Businesses', 'local-seo-guide-coimbatore-businesses', 'Digital Marketing', '8 min read', 'Brand Craftsman Agency', 'Learn how top Coimbatore brands leverage hyper-targeted keywords, Google Business Profile optimization, and fast landing pages to dominate local search.', '/img/blog_seo_new.png'),
  ('Crafting Visual Brand Identities That Convert Visitors into Retainers', 'visual-brand-identities-that-convert', 'Branding Strategy', '5 min read', 'Design Guild', 'A deep dive into typography, dark glassmorphic UI, color psychology, and how cohesive branding impacts customer conversion rates.', '/img/blog_story_new.png')
ON CONFLICT (slug) DO NOTHING;
