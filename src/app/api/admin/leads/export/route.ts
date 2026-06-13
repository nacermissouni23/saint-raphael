import { NextResponse } from "next/server";

import { requireAdminUser } from "@/lib/auth/require-admin";
import { exportLeadsCsv } from "@/lib/repositories/leads-repository";

export async function GET() {
  const auth = await requireAdminUser();
  if (!auth.ok) {
    return auth.response;
  }

  const csv = await exportLeadsCsv();
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=leads.csv",
    },
  });
}
