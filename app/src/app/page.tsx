import Link from "next/link";

import { getFeaturedListings } from "@/lib/services/listings";
import { formatDzd } from "@/lib/utils/format";

export default async function Home() {
  const featured = await getFeaturedListings(6);

  return (
    <main>
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                Diar Dzair
              </p>
              <h1 className="text-5xl leading-[1.05] text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl">
                Trouvez votre chez-vous en Algerie
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
                Plateforme immobiliere premium pour acheter, louer et investir. Parcourez les biens
                dans les principales wilayas et contactez notre equipe en quelques secondes.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/listings"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)]"
                >
                  Explorer les biens
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-primary)] px-7 py-3 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white"
                >
                  Contacter l&apos;agence
                </Link>
              </div>
            </div>

            <form
              action="/listings"
              method="get"
              className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                Recherche rapide
              </p>
              <div className="mt-5 grid gap-4">
                <label className="text-sm text-[var(--color-text-muted)]">
                  Type de transaction
                  <select
                    name="transactionType"
                    className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
                  >
                    <option value="sale">Vente</option>
                    <option value="rent">Location</option>
                  </select>
                </label>
                <label className="text-sm text-[var(--color-text-muted)]">
                  Wilaya
                  <input
                    name="wilaya"
                    placeholder="Alger"
                    className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
                  />
                </label>
                <label className="text-sm text-[var(--color-text-muted)]">
                  Type de bien
                  <select
                    name="propertyType"
                    className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
                  >
                    <option value="apartment">Appartement</option>
                    <option value="villa">Villa</option>
                    <option value="commercial">Local commercial</option>
                    <option value="land">Terrain</option>
                    <option value="office">Bureau</option>
                  </select>
                </label>
                <button
                  type="submit"
                  className="mt-2 rounded-full bg-[var(--color-accent)] px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:bg-[#bf903b]"
                >
                  Rechercher
                </button>
              </div>
            </form>
          </div>

          <div className="section-rule mt-16 pt-8 text-sm text-[var(--color-text-muted)]">
            10 ans d&apos;experience  |  Plus de 1200 biens vendus  |  Couverture nationale
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-4xl">Biens a la une</h2>
            <Link href="/listings" className="text-sm font-semibold text-[var(--color-primary)]">
              Voir tous les biens
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <article
                key={listing.id}
                className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white"
              >
                <div className="aspect-[4/3] bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={listing.images[0]?.url}
                    alt={listing.images[0]?.alt ?? listing.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 text-2xl">{listing.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    {listing.commune}, {listing.wilaya}
                  </p>
                  <p className="mt-3 font-semibold">{formatDzd(listing.priceDzd)}</p>
                  <Link href={`/listings/${listing.slug}`} className="mt-3 inline-flex text-sm text-[var(--color-primary)]">
                    Voir le bien
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3ece0] px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl">Ils nous font confiance</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Service impeccable du debut a la signature. - Rania, Oran",
              "Equipe reactive et conseils precis pour investir. - Karim, Alger",
              "Excellent accompagnement sur notre local commercial. - Fatima, Annaba",
              "Des biens de qualite avec de vraies informations. - Sofiane, Setif",
            ].map((quote) => (
              <blockquote
                key={quote}
                className="rounded-[var(--radius-card)] border border-[var(--color-primary)] bg-white p-4 text-sm leading-6"
              >
                {quote}
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-[var(--radius-card)] bg-[var(--color-primary)] px-8 py-10 text-center text-white md:flex-row md:text-left">
          <div>
            <h2 className="text-3xl">Vous avez un bien a vendre ou a louer ?</h2>
            <p className="mt-2 text-sm text-white/90">
              Contactez notre equipe pour une estimation rapide et une mise en marche immediate.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full border border-white px-6 py-3 text-sm font-semibold hover:bg-white hover:text-[var(--color-primary)]"
          >
            Contactez-nous
          </Link>
        </div>
      </section>
    </main>
  );
}
