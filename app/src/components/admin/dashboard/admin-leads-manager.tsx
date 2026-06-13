"use client";

import Link from "next/link";
import { useState } from "react";

import type { Lead, LeadStatus } from "@/types/lead";

export function AdminLeadsManager({ initialItems }: { initialItems: Lead[] }) {
  const [items, setItems] = useState<Lead[]>(initialItems);
  const [loading, setLoading] = useState(false);

  async function loadLeads() {
    setLoading(true);
    const response = await fetch("/api/admin/leads", { cache: "no-store" });
    if (!response.ok) {
      setLoading(false);
      return;
    }

    const data = (await response.json()) as { items: Lead[] };
    setItems(data.items);
    setLoading(false);
  }

  async function onChangeStatus(id: string, status: LeadStatus) {
    const response = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      await loadLeads();
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-[var(--color-text-muted)]">{items.length} demandes</p>
        <Link
          href="/api/admin/leads/export"
          className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm"
        >
          Export CSV
        </Link>
      </div>

      {loading ? <p>Chargement...</p> : null}

      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-[var(--color-bg)] text-[var(--color-text-muted)]">
            <tr>
              <th className="px-3 py-3">Nom</th>
              <th className="px-3 py-3">Telephone</th>
              <th className="px-3 py-3">Source</th>
              <th className="px-3 py-3">Statut</th>
              <th className="px-3 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((lead) => (
              <tr key={lead.id} className="border-t border-[var(--color-border)]">
                <td className="px-3 py-3">{lead.fullName}</td>
                <td className="px-3 py-3">{lead.phone}</td>
                <td className="px-3 py-3">{lead.source}</td>
                <td className="px-3 py-3">{lead.status}</td>
                <td className="px-3 py-3">
                  <select
                    value={lead.status}
                    onChange={(event) =>
                      void onChangeStatus(lead.id, event.target.value as LeadStatus)
                    }
                    className="rounded-lg border border-[var(--color-border)] px-2 py-1"
                  >
                    <option value="new">Nouveau</option>
                    <option value="contacted">Contacte</option>
                    <option value="converted">Converti</option>
                    <option value="closed">Ferme</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
