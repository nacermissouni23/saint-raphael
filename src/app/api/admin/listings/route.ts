import { NextResponse } from "next/server";

import { requireAdminUser } from "@/lib/auth/require-admin";
import {
  createListing,
  listAllListings,
  type ListingMutationInput,
} from "@/lib/repositories/listings-repository";

export async function GET() {
  const auth = await requireAdminUser();
  if (!auth.ok) {
    return auth.response;
  }

  const items = await listAllListings();
  return NextResponse.json({ items, total: items.length });
}

export async function POST(request: Request) {
  const auth = await requireAdminUser();
  if (!auth.ok) {
    return auth.response;
  }

  const payload = (await request.json().catch(() => null)) as ListingMutationInput | null;
  if (!payload || !payload.title || !payload.wilaya || !payload.commune) {
    return NextResponse.json({ message: "Invalid listing payload" }, { status: 400 });
  }

  const created = await createListing(payload);
  return NextResponse.json({ listing: created }, { status: 201 });
}
