import {
  getListingBySlug as repoGetListingBySlug,
  listFeaturedListings,
  listListings,
  type ListingFilters,
} from "@/lib/repositories/listings-repository";

export type { ListingFilters };

export async function getListings(filters: ListingFilters = {}) {
  return listListings(filters);
}

export async function getListingBySlug(slug: string) {
  return repoGetListingBySlug(slug);
}

export async function getFeaturedListings(limit = 6) {
  return listFeaturedListings(limit);
}
