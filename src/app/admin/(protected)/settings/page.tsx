import { AdminSettingsForm } from "@/components/admin/dashboard/admin-settings-form";
import { getAgencySettings } from "@/lib/repositories/settings-repository";

export default async function AdminSettingsPage() {
  const settings = await getAgencySettings();

  return (
    <main>
      <h1 className="text-4xl">Parametres</h1>
      <p className="mt-2 text-[var(--color-text-muted)]">
        Configuration de l&apos;agence, coordonnees et informations publiques du site.
      </p>
      <div className="mt-6">
        <AdminSettingsForm initialSettings={settings} />
      </div>
    </main>
  );
}
