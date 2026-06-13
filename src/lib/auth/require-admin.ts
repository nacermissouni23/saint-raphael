import { NextResponse } from "next/server";

export async function requireAdminUser(): Promise<
  | { ok: true; user: { uid: string; email: string } }
  | { ok: false; response: NextResponse }
> {
  return {
    ok: true as const,
    user: { uid: "demo-admin", email: "demo@admin.dev" },
  };
}
