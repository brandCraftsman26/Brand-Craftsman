import { prisma } from "@/lib/prisma";
import PuckRenderer from "@/components/PuckRenderer";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await prisma.builderPage.findFirst({
    where: { slug, isPublished: true },
  });
  
  if (!page) {
    return { title: "Page Not Found" };
  }

  return {
    title: `${page.title} | Brand Craftsman`,
  };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await prisma.builderPage.findFirst({
    where: { slug, isPublished: true },
  });

  if (!page) {
    return notFound();
  }

  const data = JSON.parse(page.contentJson);

  return (
    <div className="pt-16">
      <PuckRenderer data={data} />
      <Footer />
    </div>
  );
}
