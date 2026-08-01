import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getServerDb } from "@/lib/supabase/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminId = await requireAdmin();
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const supabase = await getServerDb();

    const { data: page, error } = await supabase
      .from("builder_pages")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminId = await requireAdmin();
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const supabase = await getServerDb();

    const updateData: Record<string, unknown> = {};
    if (body.contentJson !== undefined) {
      updateData.content_json = typeof body.contentJson === "string"
        ? body.contentJson
        : JSON.stringify(body.contentJson);
    }
    if (body.isPublished !== undefined) {
      updateData.is_published = body.isPublished;
    }
    if (body.title !== undefined) {
      updateData.title = body.title;
    }

    const { data: updatedPage, error } = await supabase
      .from("builder_pages")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating page:", error);
      return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
    }

    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminId = await requireAdmin();
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const supabase = await getServerDb();

    const { error } = await supabase
      .from("builder_pages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting page:", error);
      return NextResponse.json({ error: "Failed to delete page" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 });
  }
}
