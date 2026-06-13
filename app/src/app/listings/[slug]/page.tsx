import { notFound } from "next/navigation";

import { LeadEnquiryForm } from "@/components/listings/lead-enquiry-form";
import { OsmMap } from "@/components/public/osm-map";
import { getListingBySlug } from "@/lib/services/listings";
import { formatDzd } from "@/lib/utils/format";

type ListingDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  const defaultCoordinates: Record<string, { lat: number; lng: number }> = {
    Alger: { lat: 36.7538, lng: 3.0588 },
    Oran: { lat: 35.6971, lng: -0.6308 },
    Annaba: { lat: 36.9, lng: 7.7667 },
    Constantine: { lat: 36.365, lng: 6.6147 },
  };

  const fallback = defaultCoordinates[listing.wilaya] ?? defaultCoordinates.Alger;
  const lat = listing.latitude ?? fallback.lat;
  const lng = listing.longitude ?? fallback.lng;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)]">
          {listing.transactionType === "sale" ? "A vendre" : "A louer"}
        </p>
        <h1 className="mt-2 text-4xl sm:text-5xl">{listing.title}</h1>
        <p className="mt-2 text-[var(--color-text-muted)]">
          {listing.commune}, {listing.wilaya}
        </p>
        <p className="mt-4 text-2xl font-semibold">{formatDzd(listing.priceDzd)}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <section>
          <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={listing.images[0]?.url}
              alt={listing.images[0]?.alt ?? listing.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-8 grid gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5 sm:grid-cols-2">
            <p>Surface: {listing.areaM2} m2</p>
            <p>Pieces: {listing.rooms}</p>
            <p>Chambres: {listing.bedrooms}</p>
            <p>Salles de bain: {listing.bathrooms}</p>
            <p>Type: {listing.propertyType}</p>
            <p>Etat: {listing.condition}</p>
          </div>

          <div className="mt-8 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5">
            <h2 className="text-2xl">Description</h2>
            <p className="mt-3 leading-7 text-[var(--color-text-muted)]">{listing.description}</p>

            <h3 className="mt-6 text-xl">Equipements</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {listing.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1 text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5">
            <h2 className="text-2xl">Localisation</h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Position approximate du bien: {listing.commune}, {listing.wilaya}
            </p>
            <div className="mt-4">
              <OsmMap latitude={lat} longitude={lng} label={`Carte ${listing.title}`} heightClassName="h-80" />
            </div>
          </div>
        </section>

        <aside className="h-fit rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] lg:sticky lg:top-6">
          <h2 className="text-2xl">Demande d&apos;information</h2>
          <LeadEnquiryForm listingId={listing.id} />
        </aside>
      </div>
    </main>
  );
}
