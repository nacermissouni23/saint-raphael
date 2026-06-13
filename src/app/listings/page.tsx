import Link from "next/link";

import { ListingsFilterForm } from "@/components/listings/listings-filter-form";
import { getListings } from "@/lib/services/listings";
import { formatDzd } from "@/lib/utils/format";

type ListingsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const params = await searchParams;
  const listings = await getListings({
    wilaya: typeof params.wilaya === "string" ? params.wilaya : undefined,
    transactionType:
      params.transactionType === "sale" || params.transactionType === "rent"
        ? params.transactionType
        : undefined,
    propertyType: typeof params.propertyType === "string" ? params.propertyType : undefined,
    minPrice: typeof params.minPrice === "string" ? Number(params.minPrice) : undefined,
    maxPrice: typeof params.maxPrice === "string" ? Number(params.maxPrice) : undefined,
  });

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 lg:px-12">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl text-[var(--color-text-primary)] sm:text-5xl">Nos biens</h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">{listings.length} biens trouves</p>
        </div>
        <Link
          href="/"
          className="rounded-full border border-[var(--color-border)] px-5 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:border-[var(--color-primary)]"
        >
          Retour a l&apos;accueil
        </Link>
      </div>

      <ListingsFilterForm />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <article
            key={listing.id}
            className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]"
          >
            <div className="aspect-[4/3] w-full bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={listing.images[0]?.url}
                alt={listing.images[0]?.alt ?? listing.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)]">
                {listing.transactionType === "sale" ? "A vendre" : "A louer"}
              </p>
              <h2 className="line-clamp-2 text-2xl leading-tight">{listing.title}</h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                {listing.commune}, {listing.wilaya}
              </p>
              <p className="mt-4 text-lg font-semibold text-[var(--color-text-primary)]">
                {formatDzd(listing.priceDzd)}
              </p>
              <div className="mt-4 text-sm text-[var(--color-text-muted)]">
                {listing.bedrooms} ch. | {listing.bathrooms} sdb | {listing.areaM2} m2
              </div>
              <Link
                href={`/listings/${listing.slug}`}
                className="mt-5 inline-flex rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)]"
              >
                Voir le bien
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
