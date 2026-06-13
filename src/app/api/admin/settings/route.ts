import { NextResponse } from "next/server";

import { requireAdminUser } from "@/lib/auth/require-admin";
import { getAgencySettings, updateAgencySettings } from "@/lib/repositories/settings-repository";
import type { AgencySettings } from "@/types/settings";

export async function GET() {
  const auth = await requireAdminUser();
  if (!auth.ok) {
    return auth.response;
  }

  const settings = await getAgencySettings();
  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  const auth = await requireAdminUser();
  if (!auth.ok) {
    return auth.response;
  }

  const payload = (await request.json().catch(() => null)) as Partial<AgencySettings> | null;
  if (!payload) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const settings = await updateAgencySettings(payload);
  return NextResponse.json({ settings });
}
