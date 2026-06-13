import { listLeads } from "@/lib/repositories/leads-repository";
import { listAllListings } from "@/lib/repositories/listings-repository";

export default async function AdminDashboardPage() {
  const [listings, leads] = await Promise.all([listAllListings(), listLeads()]);
  const activeListings = listings.filter((listing) => listing.status === "active").length;
  const soldOrRented = listings.filter(
    (listing) => listing.status === "sold" || listing.status === "rented",
  ).length;
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);
  const newLeads7d = leads.filter((lead) => new Date(lead.createdAt) >= last7Days).length;

  return (
    <main>
      <h1 className="text-4xl">Dashboard</h1>
      <p className="mt-2 text-[var(--color-text-muted)]">
        Vue d&apos;ensemble en temps reel des activites commerciales et operationnelles.
      </p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4">
          <p className="text-sm text-[var(--color-text-muted)]">Biens actifs</p>
          <p className="mt-2 text-3xl font-semibold">{activeListings}</p>
        </article>
        <article className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4">
          <p className="text-sm text-[var(--color-text-muted)]">Nouvelles demandes (7j)</p>
          <p className="mt-2 text-3xl font-semibold">{newLeads7d}</p>
        </article>
        <article className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4">
          <p className="text-sm text-[var(--color-text-muted)]">Biens vendus/loues</p>
          <p className="mt-2 text-3xl font-semibold">{soldOrRented}</p>
        </article>
        <article className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4">
          <p className="text-sm text-[var(--color-text-muted)]">Total leads</p>
          <p className="mt-2 text-3xl font-semibold">{leads.length}</p>
        </article>
      </section>
    </main>
  );
}
