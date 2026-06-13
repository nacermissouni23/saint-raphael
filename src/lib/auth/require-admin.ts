import { NextResponse } from "next/server";

import { getCurrentAdminUser } from "@/lib/auth/session";

export async function requireAdminUser() {
  const user = await getCurrentAdminUser();
  if (!user) {
    return {
      ok: false as const,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  return { ok: true as const, user };
}
