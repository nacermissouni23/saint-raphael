import { NextRequest, NextResponse } from "next/server";

import { getFeaturedListings, getListings } from "@/lib/services/listings";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const featuredOnly = searchParams.get("featured") === "true";

  if (featuredOnly) {
    return NextResponse.json({ items: await getFeaturedListings() });
  }

  const items = await getListings({
    wilaya: searchParams.get("wilaya") ?? undefined,
    transactionType:
      searchParams.get("transactionType") === "sale" || searchParams.get("transactionType") === "rent"
        ? (searchParams.get("transactionType") as "sale" | "rent")
        : undefined,
    propertyType: searchParams.get("propertyType") ?? undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
  });

  return NextResponse.json({ items, total: items.length });
}
