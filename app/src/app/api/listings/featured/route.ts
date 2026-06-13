import { NextResponse } from "next/server";

import { getFeaturedListings } from "@/lib/services/listings";

export async function GET() {
  const items = await getFeaturedListings(6);
  return NextResponse.json({ items, total: items.length });
}
