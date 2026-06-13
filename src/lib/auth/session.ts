import { cookies } from "next/headers";

import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";
import { getAdminAuth } from "@/lib/firebase/admin";

export async function getAdminSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
}

export async function getCurrentAdminUser() {
  const sessionCookie = await getAdminSessionCookie();
  if (!sessionCookie) {
    return null;
  }

  const adminAuth = getAdminAuth();
  if (!adminAuth) {
    return {
      uid: "local-dev-admin",
      email: "local-admin@diardzair.dev",
    };
  }

  try {
    return await adminAuth.verifySessionCookie(sessionCookie, true);
  } catch {
    return null;
  }
}
