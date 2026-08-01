/**
 * Hardcoded admin emails for Brand Craftsman.
 * Only these Clerk-authenticated users can access the admin panel,
 * builder, settings, and privileged API routes.
 */
export const ADMIN_EMAILS: readonly string[] = [
  "harisearchpin@gmail.com",
  "santhohracit1819@gmail.com",
] as const;

/**
 * Check if a given email belongs to an admin.
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
