import { AdminMediaLibrary } from "@/components/admin/dashboard/admin-media-library";

export default function AdminMediaPage() {
  return (
    <main>
      <h1 className="text-4xl">Medias</h1>
      <p className="mt-2 text-[var(--color-text-muted)]">
        Bibliotheque des images attachees aux annonces avec vision globale par bien.
      </p>
      <div className="mt-6">
        <AdminMediaLibrary />
      </div>
    </main>
  );
}
