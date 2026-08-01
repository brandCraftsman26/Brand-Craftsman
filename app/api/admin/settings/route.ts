import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getServerDb } from "@/lib/supabase/db";

export async function GET() {
  try {
    const adminId = await requireAdmin();
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const supabase = await getServerDb();
    const { data: config, error } = await supabase
      .from("site_config")
      .select("*")
      .eq("id", "global")
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching site config:", error);
      return NextResponse.json({ error: "Failed to fetch configuration" }, { status: 500 });
    }

    if (!config) {
      // Create default config
      const { data: newConfig, error: createError } = await supabase
        .from("site_config")
        .insert({ id: "global" })
        .select()
        .single();

      if (createError) {
        console.error("Error creating site config:", createError);
        return NextResponse.json({ error: "Failed to create configuration" }, { status: 500 });
      }
      return NextResponse.json(newConfig);
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error("Error fetching site config:", error);
    return NextResponse.json({ error: "Failed to fetch configuration" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const adminId = await requireAdmin();
    if (!adminId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { siteName, headerLogoUrl, footerCopyright, socialLinks } = body;

    const supabase = await getServerDb();
    const { data: config, error } = await supabase
      .from("site_config")
      .upsert({
        id: "global",
        site_name: siteName,
        header_logo_url: headerLogoUrl,
        footer_copyright: footerCopyright,
        social_links: socialLinks ? JSON.stringify(socialLinks) : null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error updating site config:", error);
      return NextResponse.json({ error: "Failed to update configuration" }, { status: 500 });
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error("Error updating site config:", error);
    return NextResponse.json({ error: "Failed to update configuration" }, { status: 500 });
  }
}
