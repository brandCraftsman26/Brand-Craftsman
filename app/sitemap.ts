import { MetadataRoute } from 'next';
import { getServerDb } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://brandcraftsman.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/portfolios`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact-details`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/features`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/testimonials`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const supabase = await getServerDb();
    
    // Fetch dynamic blogs
    const { data: blogs } = await supabase
      .from('cms_blogs')
      .select('slug, updated_at')
      .eq('is_published', true);

    if (blogs) {
      const blogUrls: MetadataRoute.Sitemap = blogs.map((b) => ({
        url: `${baseUrl}/blogs/${b.slug}`,
        lastModified: new Date(b.updated_at || Date.now()),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
      dynamicRoutes = [...dynamicRoutes, ...blogUrls];
    }

    // Fetch dynamic portfolios
    const { data: portfolios } = await supabase
      .from('cms_portfolios')
      .select('slug, updated_at')
      .eq('is_published', true);

    if (portfolios) {
      const portfolioUrls: MetadataRoute.Sitemap = portfolios.map((p) => ({
        url: `${baseUrl}/portfolios/${p.slug}`,
        lastModified: new Date(p.updated_at || Date.now()),
        changeFrequency: 'monthly',
        priority: 0.8,
      }));
      dynamicRoutes = [...dynamicRoutes, ...portfolioUrls];
    }
  } catch {}

  return [...staticRoutes, ...dynamicRoutes];
}
