import { prisma } from "@/lib/prisma";
import PuckRenderer from "@/components/PuckRenderer";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = await prisma.builderPage.findFirst({
    where: { slug: "home", isPublished: true },
  });
  
  if (!page) {
    return { title: "Home" };
  }

  return {
    title: page.title,
  };
}

export default async function Home() {
  const page = await prisma.builderPage.findFirst({
    where: { slug: "home", isPublished: true },
  });

  if (!page) {
    return notFound();
  }

  const data = JSON.parse(page.contentJson);

  return (
    <>
      <PuckRenderer data={data} />
      <Footer />
    </>
  );
}
