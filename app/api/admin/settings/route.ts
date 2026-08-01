import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let config = await prisma.siteConfig.findUnique({
      where: { id: "global" },
    });

    if (!config) {
      config = await prisma.siteConfig.create({
        data: { id: "global" },
      });
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error("Error fetching site config:", error);
    return NextResponse.json({ error: "Failed to fetch configuration" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { siteName, headerLogoUrl, footerCopyright, socialLinks } = data;

    const config = await prisma.siteConfig.upsert({
      where: { id: "global" },
      update: {
        siteName,
        headerLogoUrl,
        footerCopyright,
        socialLinks: socialLinks ? JSON.stringify(socialLinks) : null,
      },
      create: {
        id: "global",
        siteName,
        headerLogoUrl,
        footerCopyright,
        socialLinks: socialLinks ? JSON.stringify(socialLinks) : null,
      },
    });

    return NextResponse.json(config);
  } catch (error) {
    console.error("Error updating site config:", error);
    return NextResponse.json({ error: "Failed to update configuration" }, { status: 500 });
  }
}
