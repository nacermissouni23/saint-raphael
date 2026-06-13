import Link from "next/link";

export default function AdminListingNewPage() {
  return (
    <main>
      <h1 className="text-4xl">Nouveau bien</h1>
      <p className="mt-2 text-[var(--color-text-muted)]">
        Utilisez la section Biens pour creer une annonce complete avec statut brouillon puis publication.
      </p>
      <Link href="/admin/listings" className="mt-4 inline-flex text-sm text-[var(--color-primary)]">
        Retour a la gestion des biens
      </Link>
    </main>
  );
}
