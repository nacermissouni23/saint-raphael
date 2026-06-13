import { NextResponse } from "next/server";

import { requireAdminUser } from "@/lib/auth/require-admin";
import { updateLeadStatus } from "@/lib/repositories/leads-repository";
import type { LeadStatus } from "@/types/lead";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: Context) {
  const auth = await requireAdminUser();
  if (!auth.ok) {
    return auth.response;
  }

  const { id } = await context.params;
  const payload = (await request.json().catch(() => null)) as { status?: LeadStatus } | null;
  const status = payload?.status;

  if (!status) {
    return NextResponse.json({ message: "Missing status" }, { status: 400 });
  }

  const updated = await updateLeadStatus(id, status);
  if (!updated) {
    return NextResponse.json({ message: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({ lead: updated });
}
