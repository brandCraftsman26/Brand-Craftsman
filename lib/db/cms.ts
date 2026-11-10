import { query } from "./postgres";

export interface BlogItem {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  readTime: string;
  publishedAt: string;
  image: string;
  featured?: boolean;
}

export interface PortfolioItem {
  id?: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery?: string[];
  results?: { label: string; value: string }[];
  featured?: boolean;
}

export interface DynamicPageItem {
  id?: string;
  slug: string;
  title: string;
  metaDescription?: string;
  components: Array<{
    type: string;
    props: Record<string, unknown>;
  }>;
  published: boolean;
  updatedAt: Date | string;
}

// Fallback seed data in case database is unreachable or newly initialized
const DEFAULT_BLOGS: BlogItem[] = [
  {
    slug: "future-of-web-design-2025",
    title: "The Future of Web Design: Trends to Watch in 2025 & Beyond",
    excerpt: "Discover the latest trends in UI/UX design, micro-interactions, AI-driven layouts, and 3D web graphics that are shaping modern digital experiences.",
    content: "As digital craftsmanship continues to evolve, the web design landscape is driven by seamless interactivity, intelligent personalization, and performance-first visual storytelling.",
    author: "Santhosh Raj",
    category: "Web Design",
    readTime: "5 min read",
    publishedAt: "2025-01-15",
    image: "/img/blog_nextjs_new.png",
    featured: true,
  },
  {
    slug: "seo-strategies-coimbatore-businesses",
    title: "Mastering Local SEO & Growth Marketing for Modern Brands",
    excerpt: "A comprehensive guide for businesses looking to dominate search rankings, maximize organic reach, and capture high-intent leads.",
    content: "Search engine optimization is no longer just about keywords — it's about topical authority, technical speed, structured metadata, and user intent.",
    author: "Brand Craftsman Team",
    category: "Digital Marketing",
    readTime: "7 min read",
    publishedAt: "2025-02-01",
    image: "/img/blog_seo_new.png",
    featured: false,
  },
];

import { PORTFOLIO_WEBSITES } from "@/lib/portfolio-data";

const DEFAULT_PORTFOLIOS: PortfolioItem[] = PORTFOLIO_WEBSITES.map((w) => ({
  slug: w.slug,
  title: w.title,
  category: w.category,
  client: w.client,
  description: w.description,
  fullDescription: `${w.description} Built and engineered by Brand Craftsman with modern web architecture (${w.techStack.join(", ")}). Live interactive application accessible at ${w.url}.`,
  image: w.image || "/img/portfolio_website_1785511403920.png",
  results: [
    { label: "Metric", value: w.metric },
    { label: "Domain", value: w.domain },
  ],
  featured: w.featured,
}));

// --- BLOG HELPER METHODS (PostgreSQL) ---
export async function getBlogsFromDB(): Promise<BlogItem[]> {
  try {
    const res = await query<{
      id: string;
      slug: string;
      title: string;
      excerpt: string;
      content: string;
      author: string;
      category: string;
      read_time: string;
      published_at: Date;
      image: string;
      featured: boolean;
    }>(
      `SELECT id, slug, title, excerpt, content, author, category, 
              read_time, published_at, image, featured 
       FROM cms_blogs 
       ORDER BY published_at DESC`
    );

    if (res.rows.length === 0) {
      return DEFAULT_BLOGS;
    }

    return res.rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      author: row.author,
      category: row.category,
      readTime: row.read_time,
      publishedAt: row.published_at ? new Date(row.published_at).toISOString().split("T")[0] : "Recently",
      image: row.image,
      featured: row.featured,
    }));
  } catch (error) {
    console.warn("PostgreSQL not accessible for getBlogsFromDB, falling back to default blogs:", error);
    return DEFAULT_BLOGS;
  }
}

export async function getBlogBySlugFromDB(slug: string): Promise<BlogItem | null> {
  try {
    const res = await query<{
      id: string;
      slug: string;
      title: string;
      excerpt: string;
      content: string;
      author: string;
      category: string;
      read_time: string;
      published_at: Date;
      image: string;
      featured: boolean;
    }>(
      `SELECT id, slug, title, excerpt, content, author, category, 
              read_time, published_at, image, featured 
       FROM cms_blogs 
       WHERE slug = $1 LIMIT 1`,
      [slug]
    );

    if (res.rows.length === 0) {
      return DEFAULT_BLOGS.find((b) => b.slug === slug) || null;
    }

    const row = res.rows[0];
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      author: row.author,
      category: row.category,
      readTime: row.read_time,
      publishedAt: row.published_at ? new Date(row.published_at).toISOString().split("T")[0] : "Recently",
      image: row.image,
      featured: row.featured,
    };
  } catch (error) {
    console.warn(`PostgreSQL error in getBlogBySlugFromDB for [${slug}]:`, error);
    return DEFAULT_BLOGS.find((b) => b.slug === slug) || null;
  }
}

// --- PORTFOLIO HELPER METHODS (PostgreSQL) ---
export async function getPortfoliosFromDB(): Promise<PortfolioItem[]> {
  try {
    const res = await query<{
      id: string;
      slug: string;
      title: string;
      category: string;
      client: string;
      description: string;
      full_description: string;
      image: string;
      gallery: string[] | string;
      results: { label: string; value: string }[] | string;
      featured: boolean;
    }>(
      `SELECT id, slug, title, category, client, description, full_description, 
              image, gallery, results, featured 
       FROM cms_portfolios 
       ORDER BY created_at DESC`
    );

    if (res.rows.length === 0) {
      return DEFAULT_PORTFOLIOS;
    }

    return res.rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      category: row.category,
      client: row.client,
      description: row.description,
      fullDescription: row.full_description,
      image: row.image,
      gallery: typeof row.gallery === "string" ? JSON.parse(row.gallery) : row.gallery || [],
      results: typeof row.results === "string" ? JSON.parse(row.results) : row.results || [],
      featured: row.featured,
    }));
  } catch (error) {
    console.warn("PostgreSQL not accessible for getPortfoliosFromDB, using default portfolios:", error);
    return DEFAULT_PORTFOLIOS;
  }
}

export async function getPortfolioBySlugFromDB(slug: string): Promise<PortfolioItem | null> {
  try {
    const res = await query<{
      id: string;
      slug: string;
      title: string;
      category: string;
      client: string;
      description: string;
      full_description: string;
      image: string;
      gallery: string[] | string;
      results: { label: string; value: string }[] | string;
      featured: boolean;
    }>(
      `SELECT id, slug, title, category, client, description, full_description, 
              image, gallery, results, featured 
       FROM cms_portfolios 
       WHERE slug = $1 LIMIT 1`,
      [slug]
    );

    if (res.rows.length === 0) {
      return DEFAULT_PORTFOLIOS.find((p) => p.slug === slug) || null;
    }

    const row = res.rows[0];
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      category: row.category,
      client: row.client,
      description: row.description,
      fullDescription: row.full_description,
      image: row.image,
      gallery: typeof row.gallery === "string" ? JSON.parse(row.gallery) : row.gallery || [],
      results: typeof row.results === "string" ? JSON.parse(row.results) : row.results || [],
      featured: row.featured,
    };
  } catch (error) {
    console.warn(`PostgreSQL error in getPortfolioBySlugFromDB for [${slug}]:`, error);
    return DEFAULT_PORTFOLIOS.find((p) => p.slug === slug) || null;
  }
}

// --- DYNAMIC PAGE / BUILDER METHODS (PostgreSQL) ---
export async function getDynamicPageFromDB(slug: string): Promise<DynamicPageItem | null> {
  try {
    const res = await query<{
      id: string;
      slug: string;
      title: string;
      meta_description: string;
      components: Array<{ type: string; props: Record<string, unknown> }> | string;
      is_published: boolean;
      updated_at: Date;
    }>(
      `SELECT id, slug, title, meta_description, components, is_published, updated_at 
       FROM builder_pages 
       WHERE slug = $1 AND is_published = TRUE LIMIT 1`,
      [slug]
    );

    if (res.rows.length === 0) return null;

    const row = res.rows[0];
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      metaDescription: row.meta_description,
      components: typeof row.components === "string" ? JSON.parse(row.components) : row.components || [],
      published: row.is_published,
      updatedAt: row.updated_at,
    };
  } catch (error) {
    console.warn(`PostgreSQL error in getDynamicPageFromDB for [${slug}]:`, error);
    return null;
  }
}

// --- LEAD SUBMISSION METHOD (PostgreSQL) ---
export async function saveLeadToDB(leadData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
}) {
  try {
    const res = await query<{ id: string }>(
      `INSERT INTO leads (name, email, phone, service, message, status)
       VALUES ($1, $2, $3, $4, $5, 'new')
       RETURNING id`,
      [
        leadData.name,
        leadData.email,
        leadData.phone || null,
        leadData.service || null,
        leadData.message,
      ]
    );
    return { success: true, id: res.rows[0]?.id };
  } catch (error) {
    console.error("Error saving lead to PostgreSQL:", error);
    return { success: false, error };
  }
}
