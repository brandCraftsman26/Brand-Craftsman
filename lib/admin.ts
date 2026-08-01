import { auth, currentUser } from "@clerk/nextjs/server";
import { isAdminEmail, ADMIN_EMAILS } from "./admin-shared";

export { ADMIN_EMAILS, isAdminEmail };

/**
 * Server-side admin guard for API routes.
 * Returns the userId if the caller is an authenticated admin, otherwise null.
 */
export async function requireAdmin(): Promise<string | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();
  if (!user) return null;

  const primaryEmail = user.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress;

  if (!isAdminEmail(primaryEmail)) return null;

  return userId;
}

/**
 * Server-side auth check. Returns userId or null.
 */
export async function requireAuth(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}
