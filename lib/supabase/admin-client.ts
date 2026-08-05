import { createClient } from "@supabase/supabase-js";

/**
 * Service role Supabase client for admin operations.
 * Bypasses RLS policies when SUPABASE_SERVICE_ROLE_KEY is provided.
 * Falls back to public key if service role key is not set.
 */
export function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
  
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
