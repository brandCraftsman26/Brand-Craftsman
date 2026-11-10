import { MetadataRoute } from 'next';
import { PORTFOLIO_WEBSITES } from '@/lib/portfolio-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://brandcraftsman.in';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/web-design-digital-marketing-company-in-coimbatore`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/portfolios`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/signup`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    // Blog detail pages
    { url: `${baseUrl}/blogs/why-brands-fail-without-technical-seo-coimbatore`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs/nextjs-vs-wordpress-web-design-coimbatore`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blogs/search-pin-genesis-branding-stewardship`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Dynamic portfolio routes for all 22 client websites
  const portfolioRoutes: MetadataRoute.Sitemap = PORTFOLIO_WEBSITES.map((site) => ({
    url: `${baseUrl}/portfolios/${site.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...portfolioRoutes];
}
