import { getServerDb } from "@/lib/supabase/db";
import PuckRenderer from "@/components/PuckRenderer";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await getServerDb();
  
  const { data: page } = await supabase
    .from("builder_pages")
    .select("title")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  
  if (!page) {
    return { title: "Page Not Found" };
  }

  return {
    title: `${page.title} | Brand Craftsman`,
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await getServerDb();

  const { data: page } = await supabase
    .from("builder_pages")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!page) {
    return notFound();
  }

  const data = JSON.parse(page.content_json);

  return (
    <div className="pt-16">
      <PuckRenderer data={data} />
      <Footer />
    </div>
  );
}
