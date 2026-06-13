import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminListingEditPage({ params }: Props) {
  const { id } = await params;

  return (
    <main>
      <h1 className="text-4xl">Edition du bien</h1>
      <p className="mt-2 text-[var(--color-text-muted)]">
        Edition ciblee du bien {id}. Le mode complet est disponible dans la table de gestion.
      </p>
      <Link href="/admin/listings" className="mt-4 inline-flex text-sm text-[var(--color-primary)]">
        Retour a la gestion des biens
      </Link>
    </main>
  );
}
