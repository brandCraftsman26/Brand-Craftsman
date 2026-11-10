import fs from "fs";
import path from "path";

// Load environment variables from .env.local
try {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
} catch (e) {
  // Ignore
}

import { query, initPostgresSchema } from "../lib/db/postgres";
import bcrypt from "bcryptjs";

const initialBlogs = [
  {
    slug: "future-of-web-design-2025",
    title: "The Future of Web Design: Trends to Watch in 2025 & Beyond",
    excerpt: "Discover the latest trends in UI/UX design, micro-interactions, AI-driven layouts, and 3D web graphics that are shaping modern digital experiences.",
    content: `
# The Future of Web Design in 2025

As digital craftsmanship continues to evolve, the web design landscape in 2025 is driven by seamless interactivity, intelligent personalization, and performance-first visual storytelling.

## Key Trends
1. **Micro-Animations & Dynamic Feedback**: Subtle animations built with GSAP and CSS transitions enhance user engagement without sacrificing load speed.
2. **AI-Enhanced Layouts**: Real-time content adaptation based on user preference and viewport optimization.
3. **Immersive 3D & WebGL**: Interactive product showcases and high-conversion hero sections.

At Brand Craftsman, we combine state-of-the-art UI engineering with conversion-focused design to help enterprise brands stand out.
    `,
    author: "Santhosh Raj",
    category: "Web Design",
    readTime: "5 min read",
    publishedAt: "2025-01-15",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=1200",
    featured: true,
  },
  {
    slug: "seo-strategies-coimbatore-businesses",
    title: "Mastering Local SEO & Growth Marketing for Modern Brands",
    excerpt: "A comprehensive guide for businesses looking to dominate search rankings, maximize organic reach, and capture high-intent leads.",
    content: `
# Driving Organic Growth with Modern SEO

Search engine optimization is no longer just about keywords — it's about topical authority, technical speed, structured metadata, and user intent.

## Essential SEO Pillars
- **Core Web Vitals**: Blazing-fast page loads powered by Next.js static rendering.
- **Structured Data (JSON-LD)**: Rich snippet previews for local services, reviews, and portfolio items.
- **Conversion Rate Optimization**: Turning search traffic into qualified business leads.
    `,
    author: "Brand Craftsman Team",
    category: "Digital Marketing",
    readTime: "7 min read",
    publishedAt: "2025-02-01",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1200",
    featured: false,
  },
];

import { PORTFOLIO_WEBSITES } from "../lib/portfolio-data";

const initialPortfolios = PORTFOLIO_WEBSITES.map((w) => ({
  slug: w.slug,
  title: w.title,
  category: w.category,
  client: w.client,
  description: w.description,
  fullDescription: `${w.description} Engineered with ${w.techStack.join(", ")}. Live interactive platform at ${w.url}.`,
  image: w.image || "/img/portfolio_website_1785511403920.png",
  results: [
    { label: "Metric", value: w.metric },
    { label: "Domain", value: w.domain },
  ],
  featured: w.featured,
}));

async function seed() {
  console.log("============================================");
  console.log(" Seeding PostgreSQL Database for Brand Craftsman");
  console.log("============================================");

  try {
    console.log("1. Ensuring PostgreSQL schema and tables exist...");
    await initPostgresSchema();

    // 2. Seed Default Admin User
    console.log("2. Seeding default admin user profile...");
    const adminPasswordHash = await bcrypt.hash("AdminBrand2026!", 10);
    await query(
      `INSERT INTO user_profiles (id, username, email, display_name, password_hash, role, auth_provider, groups)
       VALUES ($1, $2, $3, $4, $5, 'admin', 'authelia', ARRAY['admin', 'devops']::TEXT[])
       ON CONFLICT (email) DO UPDATE SET
         display_name = EXCLUDED.display_name,
         role = 'admin',
         updated_at = NOW()`,
      [
        "usr_admin_default",
        "admin",
        "admin@brandcraftsman.in",
        "Brand Craftsman Admin",
        adminPasswordHash,
      ]
    );

    // 3. Seed Blogs
    console.log("3. Seeding cms_blogs...");
    for (const blog of initialBlogs) {
      await query(
        `INSERT INTO cms_blogs (slug, title, excerpt, content, author, category, read_time, published_at, image, featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (slug) DO UPDATE SET
           title = EXCLUDED.title,
           content = EXCLUDED.content,
           excerpt = EXCLUDED.excerpt,
           updated_at = NOW()`,
        [
          blog.slug,
          blog.slug === "future-of-web-design-2025" ? "The Future of Web Design: Trends to Watch in 2025 & Beyond" : blog.title,
          blog.excerpt,
          blog.content.trim(),
          blog.author,
          blog.category,
          blog.readTime,
          new Date(blog.publishedAt),
          blog.image,
          blog.featured,
        ]
      );
    }

    // 4. Seed Portfolios
    console.log("4. Seeding cms_portfolios...");
    for (const port of initialPortfolios) {
      await query(
        `INSERT INTO cms_portfolios (slug, title, category, client, description, full_description, image, results, featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (slug) DO UPDATE SET
           title = EXCLUDED.title,
           description = EXCLUDED.description,
           image = EXCLUDED.image,
           updated_at = NOW()`,
        [
          port.slug,
          port.title,
          port.category,
          port.client,
          port.description,
          port.fullDescription,
          port.image,
          JSON.stringify(port.results),
          port.featured,
        ]
      );
    }

    console.log("\n PostgreSQL Seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error(" Error seeding PostgreSQL:", err);
    process.exit(1);
  }
}

seed();
