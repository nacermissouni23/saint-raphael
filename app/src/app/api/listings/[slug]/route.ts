import { NextResponse } from "next/server";

import { getListingBySlug } from "@/lib/services/listings";

type Context = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, context: Context) {
  const { slug } = await context.params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    return NextResponse.json({ message: "Listing not found" }, { status: 404 });
  }

  return NextResponse.json({ listing });
}
