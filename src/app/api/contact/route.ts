import { NextResponse } from "next/server";

import { createLead, leadInputSchema } from "@/lib/services/leads";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = leadInputSchema.safeParse({
    ...payload,
    source: "contact_page",
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid contact payload",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const lead = await createLead(parsed.data);
  return NextResponse.json({ message: "Contact message sent", lead }, { status: 201 });
}
