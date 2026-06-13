import { AdminLeadsManager } from "@/components/admin/dashboard/admin-leads-manager";
import { listLeads } from "@/lib/repositories/leads-repository";

export default async function AdminLeadsPage() {
  const leads = await listLeads();

  return (
    <main>
      <h1 className="text-4xl">Demandes</h1>
      <p className="mt-2 text-[var(--color-text-muted)]">
        Suivi CRM des demandes avec changement de statut et export mensuel.
      </p>
      <div className="mt-6">
        <AdminLeadsManager initialItems={leads} />
      </div>
    </main>
  );
}
