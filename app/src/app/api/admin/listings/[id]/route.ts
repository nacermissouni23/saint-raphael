import { NextResponse } from "next/server";

import { requireAdminUser } from "@/lib/auth/require-admin";
import {
  deleteListing,
  updateListing,
  updateListingStatus,
  type ListingMutationInput,
} from "@/lib/repositories/listings-repository";
import type { Property } from "@/types/property";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: Context) {
  const auth = await requireAdminUser();
  if (!auth.ok) {
    return auth.response;
  }

  const { id } = await context.params;
  const payload = (await request.json().catch(() => null)) as Partial<ListingMutationInput> | null;
  if (!payload) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const updated = await updateListing(id, payload);
  if (!updated) {
    return NextResponse.json({ message: "Listing not found" }, { status: 404 });
  }

  return NextResponse.json({ listing: updated });
}

export async function PATCH(request: Request, context: Context) {
  const auth = await requireAdminUser();
  if (!auth.ok) {
    return auth.response;
  }

  const { id } = await context.params;
  const payload = (await request.json().catch(() => null)) as { status?: Property["status"] } | null;
  const status = payload?.status;
  if (!status) {
    return NextResponse.json({ message: "Missing status" }, { status: 400 });
  }

  const updated = await updateListingStatus(id, status);
  if (!updated) {
    return NextResponse.json({ message: "Listing not found" }, { status: 404 });
  }

  return NextResponse.json({ listing: updated });
}

export async function DELETE(_: Request, context: Context) {
  const auth = await requireAdminUser();
  if (!auth.ok) {
    return auth.response;
  }

  const { id } = await context.params;
  const deleted = await deleteListing(id);
  if (!deleted) {
    return NextResponse.json({ message: "Listing not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted" });
}
