"use client";

import { useState } from "react";

import { formatDzd } from "@/lib/utils/format";
import type { Property } from "@/types/property";

type CreateListingPayload = {
  title: string;
  transactionType: "sale" | "rent";
  propertyType: Property["propertyType"];
  status: Property["status"];
  priceDzd: number;
  negotiable: boolean;
  wilaya: string;
  commune: string;
  areaM2: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  condition: Property["condition"];
  description: string;
  amenities: Property["amenities"];
  images: Property["images"];
  featured: boolean;
};

export function AdminListingsManager({ initialItems }: { initialItems: Property[] }) {
  const [items, setItems] = useState<Property[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadListings() {
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/listings", { cache: "no-store" });
    if (!response.ok) {
      setError("Impossible de charger les listings.");
      setLoading(false);
      return;
    }

    const data = (await response.json()) as { items: Property[] };
    setItems(data.items);
    setLoading(false);
  }

  async function onCreate(formData: FormData) {
    const payload: CreateListingPayload = {
      title: String(formData.get("title") ?? ""),
      transactionType: String(formData.get("transactionType") ?? "sale") as "sale" | "rent",
      propertyType: String(formData.get("propertyType") ?? "apartment") as Property["propertyType"],
      status: "draft",
      priceDzd: Number(formData.get("priceDzd") ?? 0),
      negotiable: false,
      wilaya: String(formData.get("wilaya") ?? ""),
      commune: String(formData.get("commune") ?? ""),
      areaM2: Number(formData.get("areaM2") ?? 0),
      rooms: Number(formData.get("rooms") ?? 0),
      bedrooms: Number(formData.get("bedrooms") ?? 0),
      bathrooms: Number(formData.get("bathrooms") ?? 0),
      condition: "new",
      description: String(formData.get("description") ?? ""),
      amenities: [],
      images: [],
      featured: false,
    };

    const response = await fetch("/api/admin/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      await loadListings();
    }
  }

  async function onStatusChange(id: string, status: Property["status"]) {
    const response = await fetch(`/api/admin/listings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (response.ok) {
      await loadListings();
    }
  }

  async function onDelete(id: string) {
    const response = await fetch(`/api/admin/listings/${id}`, { method: "DELETE" });
    if (response.ok) {
      await loadListings();
    }
  }

  return (
    <section className="space-y-6">
      <form
        action={onCreate}
        className="grid gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <input name="title" placeholder="Titre" required className="rounded-lg border px-3 py-2" />
        <input name="wilaya" placeholder="Wilaya" required className="rounded-lg border px-3 py-2" />
        <input name="commune" placeholder="Commune" required className="rounded-lg border px-3 py-2" />
        <input
          name="priceDzd"
          type="number"
          placeholder="Prix DZD"
          required
          className="rounded-lg border px-3 py-2"
        />
        <input name="areaM2" type="number" placeholder="Surface m2" className="rounded-lg border px-3 py-2" />
        <input name="rooms" type="number" placeholder="Pieces" className="rounded-lg border px-3 py-2" />
        <input name="bedrooms" type="number" placeholder="Chambres" className="rounded-lg border px-3 py-2" />
        <input
          name="bathrooms"
          type="number"
          placeholder="Salles de bain"
          className="rounded-lg border px-3 py-2"
        />
        <select name="transactionType" className="rounded-lg border px-3 py-2">
          <option value="sale">Vente</option>
          <option value="rent">Location</option>
        </select>
        <select name="propertyType" className="rounded-lg border px-3 py-2">
          <option value="apartment">Appartement</option>
          <option value="villa">Villa</option>
          <option value="commercial">Local commercial</option>
          <option value="land">Terrain</option>
          <option value="office">Bureau</option>
          <option value="studio">Studio</option>
          <option value="duplex">Duplex</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          className="rounded-lg border px-3 py-2 lg:col-span-2"
        />
        <button
          type="submit"
          className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white lg:col-span-1"
        >
          Ajouter un bien
        </button>
      </form>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {loading ? <p>Chargement...</p> : null}

      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white">
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead className="bg-[var(--color-bg)] text-[var(--color-text-muted)]">
            <tr>
              <th className="px-3 py-3">Titre</th>
              <th className="px-3 py-3">Wilaya</th>
              <th className="px-3 py-3">Prix</th>
              <th className="px-3 py-3">Statut</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-[var(--color-border)]">
                <td className="px-3 py-3">{item.title}</td>
                <td className="px-3 py-3">{item.wilaya}</td>
                <td className="px-3 py-3">{formatDzd(item.priceDzd)}</td>
                <td className="px-3 py-3">{item.status}</td>
                <td className="px-3 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => void onStatusChange(item.id, "active")}
                      className="rounded-full border px-3 py-1"
                    >
                      Publier
                    </button>
                    <button
                      type="button"
                      onClick={() => void onStatusChange(item.id, "archived")}
                      className="rounded-full border px-3 py-1"
                    >
                      Archiver
                    </button>
                    <button
                      type="button"
                      onClick={() => void onStatusChange(item.id, "sold")}
                      className="rounded-full border px-3 py-1"
                    >
                      Vendu
                    </button>
                    <button
                      type="button"
                      onClick={() => void onDelete(item.id)}
                      className="rounded-full border border-red-300 px-3 py-1 text-red-600"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
