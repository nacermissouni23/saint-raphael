import { getAgencySettings } from "@/lib/repositories/settings-repository";
import { listAllListings } from "@/lib/repositories/listings-repository";

export default async function AboutPage() {
  const [settings, listings] = await Promise.all([getAgencySettings(), listAllListings()]);
  const soldOrRented = listings.filter(
    (item) => item.status === "sold" || item.status === "rented",
  ).length;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 lg:px-12">
      <section>
        <h1 className="text-5xl">A propos de {settings.agencyName}</h1>
        <p className="mt-4 max-w-3xl leading-8 text-[var(--color-text-muted)]">
          Depuis 2014, notre agence accompagne acheteurs, investisseurs et proprietaires avec une
          approche humaine, des annonces verifiees et un suivi commercial transparent.
        </p>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <article className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4">
          <p className="text-sm text-[var(--color-text-muted)]">Annees d&apos;activite</p>
          <p className="mt-2 text-3xl font-semibold">12+</p>
        </article>
        <article className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4">
          <p className="text-sm text-[var(--color-text-muted)]">Biens vendus/loues</p>
          <p className="mt-2 text-3xl font-semibold">{soldOrRented}</p>
        </article>
        <article className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4">
          <p className="text-sm text-[var(--color-text-muted)]">Wilayas couvertes</p>
          <p className="mt-2 text-3xl font-semibold">48</p>
        </article>
      </section>

      <section className="mt-12">
        <h2 className="text-4xl">Notre equipe</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {settings.agents.map((agent) => (
            <article
              key={agent.id}
              className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4"
            >
              <h3 className="text-2xl">{agent.name}</h3>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{agent.specialisation}</p>
              <p className="mt-3 text-sm font-medium">{agent.phone}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-4xl">Partenaires</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Notaire El Manar",
            "Banque Nationale Algerie",
            "Credit Habitat Plus",
            "Cabinet Juridique Atlas",
          ].map((partner) => (
            <div
              key={partner}
              className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white px-4 py-3 text-sm"
            >
              {partner}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
