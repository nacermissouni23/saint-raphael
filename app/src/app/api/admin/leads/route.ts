import { NextResponse } from "next/server";

import { requireAdminUser } from "@/lib/auth/require-admin";
import { listLeads } from "@/lib/repositories/leads-repository";

export async function GET() {
  const auth = await requireAdminUser();
  if (!auth.ok) {
    return auth.response;
  }

  const items = await listLeads();
  return NextResponse.json({ items, total: items.length });
}
