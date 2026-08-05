import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin-client";
import { requireAdmin } from "@/lib/admin";

export async function GET() {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("cms_logos")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch logos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const adminId = await requireAdmin();
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const { id, name, logo_url, website_url, sort_order, is_active } = body;

    if (!name || !logo_url) {
      return NextResponse.json({ error: "Name and logo URL are required" }, { status: 400 });
    }

    const supabase = getAdminClient();
    const payload = {
      ...(id ? { id } : {}),
      name,
      logo_url,
      website_url: website_url || null,
      sort_order: sort_order ?? 0,
      is_active: is_active ?? true,
    };

    const { data: result, error } = await supabase
      .from("cms_logos")
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data: result, message: "Logo saved successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save logo" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const adminId = await requireAdmin();
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const supabase = getAdminClient();
    const { error } = await supabase.from("cms_logos").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ message: "Logo deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete logo" }, { status: 500 });
  }
}
