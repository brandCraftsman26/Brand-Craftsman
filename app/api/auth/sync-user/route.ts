import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST() {
  const session = await auth();
  return NextResponse.json({
    success: true,
    message: "User session handled by Auth.js",
    user: session?.user || null,
  });
}
