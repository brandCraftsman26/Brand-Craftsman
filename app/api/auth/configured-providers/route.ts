import { NextResponse } from "next/server";

export async function GET() {
  const googleId = process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID || "";
  const facebookId = process.env.AUTH_FACEBOOK_ID || process.env.FACEBOOK_CLIENT_ID || "";
  const appleId = process.env.AUTH_APPLE_ID || process.env.APPLE_CLIENT_ID || "";

  const isConfigured = (val: string) =>
    Boolean(val && !val.includes("dummy") && !val.includes("client-id") && val.trim().length > 10);

  return NextResponse.json({
    google: isConfigured(googleId),
    facebook: isConfigured(facebookId),
    apple: isConfigured(appleId),
  });
}
