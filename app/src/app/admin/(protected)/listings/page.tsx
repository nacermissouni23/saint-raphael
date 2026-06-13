import { AdminListingsManager } from "@/components/admin/dashboard/admin-listings-manager";
import { listAllListings } from "@/lib/repositories/listings-repository";

export default async function AdminListingsPage() {
  const listings = await listAllListings();

  return (
    <main>
      <h1 className="text-4xl">Biens</h1>
      <p className="mt-2 text-[var(--color-text-muted)]">
        Gestion complete des annonces: creation, publication, archivage et suppression.
      </p>
      <div className="mt-6">
        <AdminListingsManager initialItems={listings} />
      </div>
    </main>
  );
}
