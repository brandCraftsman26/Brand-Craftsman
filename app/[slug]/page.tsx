import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { getDynamicPageFromDB } from "@/lib/db/cms";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getDynamicPageFromDB(slug);
  
  if (!page) {
    return { title: "Page Not Found | Brand Craftsman" };
  }

  return {
    title: `${page.title} | Brand Craftsman`,
    description: page.metaDescription || "Brand Craftsman - Web Design & Digital Marketing",
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getDynamicPageFromDB(slug);

  if (!page) {
    return notFound();
  }

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-zentry text-4xl sm:text-6xl font-black uppercase tracking-wide mb-6">
          {page.title}
        </h1>
        <div className="prose dark:prose-invert max-w-none">
          {page.components && page.components.map((comp, idx) => (
            <div key={idx} className="my-8 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-xl font-bold mb-2">{comp.type} Component</h3>
              <pre className="text-xs bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl overflow-x-auto">
                {JSON.stringify(comp.props, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
