import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pages = await prisma.builderPage.findMany({
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(pages);
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { title, slug } = data;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    // Use a default empty Puck JSON payload for initial content
    const defaultContentJson = JSON.stringify({
      content: [],
      root: {},
    });

    const newPage = await prisma.builderPage.create({
      data: {
        userId: session.user?.id || "",
        title,
        slug,
        contentJson: defaultContentJson,
        isPublished: false,
      },
    });

    return NextResponse.json(newPage);
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
  }
}
