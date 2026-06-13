import { getAdminFirestore } from "@/lib/firebase/admin";
import { mockListings } from "@/lib/mock/listings";
import type { Property } from "@/types/property";

export type ListingFilters = {
  wilaya?: string;
  transactionType?: "sale" | "rent";
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type ListingMutationInput = Omit<Property, "id" | "slug" | "createdAt" | "updatedAt"> & {
  slug?: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const inMemoryListingStore: Property[] = [...mockListings];

function applyFilters(items: Property[], filters: ListingFilters = {}) {
  return items.filter((listing) => {
    if (listing.status !== "active") {
      return false;
    }

    if (filters.wilaya && listing.wilaya.toLowerCase() !== filters.wilaya.toLowerCase()) {
      return false;
    }

    if (filters.transactionType && listing.transactionType !== filters.transactionType) {
      return false;
    }

    if (filters.propertyType && listing.propertyType !== filters.propertyType) {
      return false;
    }

    if (typeof filters.minPrice === "number" && listing.priceDzd < filters.minPrice) {
      return false;
    }

    if (typeof filters.maxPrice === "number" && listing.priceDzd > filters.maxPrice) {
      return false;
    }

    return true;
  });
}

function normalizeProperty(id: string, data: Record<string, unknown>): Property | null {
  if (typeof data.slug !== "string" || typeof data.title !== "string") {
    return null;
  }

  return {
    id,
    slug: data.slug,
    title: data.title,
    transactionType: (data.transactionType as Property["transactionType"]) ?? "sale",
    propertyType: (data.propertyType as Property["propertyType"]) ?? "apartment",
    status: (data.status as Property["status"]) ?? "draft",
    priceDzd: Number(data.priceDzd ?? 0),
    negotiable: Boolean(data.negotiable),
    wilaya: String(data.wilaya ?? ""),
    commune: String(data.commune ?? ""),
    address: typeof data.address === "string" ? data.address : undefined,
    latitude: typeof data.latitude === "number" ? data.latitude : undefined,
    longitude: typeof data.longitude === "number" ? data.longitude : undefined,
    areaM2: Number(data.areaM2 ?? 0),
    rooms: Number(data.rooms ?? 0),
    bedrooms: Number(data.bedrooms ?? 0),
    bathrooms: Number(data.bathrooms ?? 0),
    floor: typeof data.floor === "string" ? data.floor : undefined,
    totalFloors: typeof data.totalFloors === "number" ? data.totalFloors : undefined,
    yearBuilt: typeof data.yearBuilt === "number" ? data.yearBuilt : undefined,
    condition: (data.condition as Property["condition"]) ?? "new",
    description: String(data.description ?? ""),
    amenities: Array.isArray(data.amenities)
      ? (data.amenities.filter((item) => typeof item === "string") as Property["amenities"])
      : [],
    images: Array.isArray(data.images)
      ? (data.images.filter((item) => typeof item === "object") as Property["images"])
      : [],
    featured: Boolean(data.featured),
    createdAt: String(data.createdAt ?? new Date().toISOString()),
    updatedAt: String(data.updatedAt ?? new Date().toISOString()),
  };
}

export async function listListings(filters: ListingFilters = {}): Promise<Property[]> {
  const db = getAdminFirestore();

  if (!db) {
    return applyFilters(mockListings, filters);
  }

  const snapshot = await db.collection("listings").where("status", "==", "active").get();
  const items = snapshot.docs
    .map((doc) => normalizeProperty(doc.id, doc.data() as Record<string, unknown>))
    .filter((item): item is Property => Boolean(item));

  return applyFilters(items, filters);
}

export async function getListingBySlug(slug: string): Promise<Property | null> {
  const db = getAdminFirestore();

  if (!db) {
    return mockListings.find((listing) => listing.slug === slug && listing.status === "active") ?? null;
  }

  const snapshot = await db
    .collection("listings")
    .where("slug", "==", slug)
    .where("status", "==", "active")
    .limit(1)
    .get();

  const doc = snapshot.docs[0];
  if (!doc) {
    return null;
  }

  return normalizeProperty(doc.id, doc.data() as Record<string, unknown>);
}

export async function listFeaturedListings(limit = 6): Promise<Property[]> {
  const db = getAdminFirestore();

  if (!db) {
    return mockListings.filter((listing) => listing.featured && listing.status === "active").slice(0, limit);
  }

  const snapshot = await db
    .collection("listings")
    .where("status", "==", "active")
    .where("featured", "==", true)
    .limit(limit)
    .get();

  return snapshot.docs
    .map((doc) => normalizeProperty(doc.id, doc.data() as Record<string, unknown>))
    .filter((item): item is Property => Boolean(item));
}

export async function listAllListings(): Promise<Property[]> {
  const db = getAdminFirestore();
  if (!db) {
    return [...inMemoryListingStore].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  const snapshot = await db.collection("listings").get();
  return snapshot.docs
    .map((doc) => normalizeProperty(doc.id, doc.data() as Record<string, unknown>))
    .filter((item): item is Property => Boolean(item));
}

export async function createListing(input: ListingMutationInput): Promise<Property> {
  const db = getAdminFirestore();
  const now = new Date().toISOString();
  const slug = input.slug?.trim() ? input.slug.trim() : slugify(input.title);

  if (!db) {
    const listing: Property = {
      ...input,
      id: crypto.randomUUID(),
      slug,
      createdAt: now,
      updatedAt: now,
    };
    inMemoryListingStore.push(listing);
    return listing;
  }

  const ref = db.collection("listings").doc();
  const listing: Property = {
    ...input,
    id: ref.id,
    slug,
    createdAt: now,
    updatedAt: now,
  };

  await ref.set(listing);
  return listing;
}

export async function updateListing(
  id: string,
  input: Partial<ListingMutationInput>,
): Promise<Property | null> {
  const db = getAdminFirestore();
  const updatedAt = new Date().toISOString();

  if (!db) {
    const index = inMemoryListingStore.findIndex((listing) => listing.id === id);
    if (index === -1) {
      return null;
    }

    const current = inMemoryListingStore[index];
    const next: Property = {
      ...current,
      ...input,
      slug: input.slug?.trim() ? input.slug.trim() : input.title ? slugify(input.title) : current.slug,
      updatedAt,
    };
    inMemoryListingStore[index] = next;
    return next;
  }

  const ref = db.collection("listings").doc(id);
  const existing = await ref.get();
  if (!existing.exists) {
    return null;
  }

  const data = existing.data() as Property;
  const payload = {
    ...input,
    slug: input.slug?.trim() ? input.slug.trim() : input.title ? slugify(input.title) : data.slug,
    updatedAt,
  };
  await ref.set(payload, { merge: true });
  const updated = await ref.get();
  return normalizeProperty(updated.id, updated.data() as Record<string, unknown>);
}

export async function updateListingStatus(
  id: string,
  status: Property["status"],
): Promise<Property | null> {
  return updateListing(id, { status });
}

export async function deleteListing(id: string): Promise<boolean> {
  const db = getAdminFirestore();
  if (!db) {
    const index = inMemoryListingStore.findIndex((listing) => listing.id === id);
    if (index === -1) {
      return false;
    }
    inMemoryListingStore.splice(index, 1);
    return true;
  }

  const ref = db.collection("listings").doc(id);
  const existing = await ref.get();
  if (!existing.exists) {
    return false;
  }
  await ref.delete();
  return true;
}
