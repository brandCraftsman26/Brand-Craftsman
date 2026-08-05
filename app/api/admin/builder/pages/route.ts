import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getServerDb } from "@/lib/supabase/server";
import type { BuilderPage } from "@/lib/supabase/db";

export async function GET() {
  try {
    const adminId = await requireAdmin();
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const supabase = await getServerDb();
    const { data: pages, error } = await supabase
      .from("builder_pages")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching pages:", error);
      return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
    }

    return NextResponse.json(pages as BuilderPage[]);
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const adminId = await requireAdmin();
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { title, slug } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const supabase = await getServerDb();
    const { data: newPage, error } = await supabase
      .from("builder_pages")
      .insert({
        user_id: adminId,
        title,
        slug,
        content_json: JSON.stringify({ content: [], root: {} }),
        is_published: false,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating page:", error);
      return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
    }

    return NextResponse.json(newPage);
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
  }
}
