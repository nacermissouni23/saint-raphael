"use client";

import { useEffect, useMemo, useState } from "react";

import type { Property } from "@/types/property";

type MediaItem = {
  id: string;
  url: string;
  alt: string;
  listingTitle: string;
};

export function AdminMediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/admin/listings", { cache: "no-store" });
      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as { items: Property[] };
      const media = data.items.flatMap((listing) =>
        listing.images.map((image) => ({
          id: image.id,
          url: image.url,
          alt: image.alt,
          listingTitle: listing.title,
        })),
      );
      setItems(media);
    }

    void load();
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return items;
    }

    const value = query.toLowerCase();
    return items.filter(
      (item) =>
        item.listingTitle.toLowerCase().includes(value) || item.alt.toLowerCase().includes(value),
    );
  }, [items, query]);

  return (
    <section className="space-y-4">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Filtrer par bien"
        className="w-full max-w-sm rounded-lg border border-[var(--color-border)] px-3 py-2"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white"
          >
            <div className="aspect-[4/3] bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt={item.alt} className="h-full w-full object-cover" />
            </div>
            <div className="p-3">
              <p className="line-clamp-2 text-sm font-medium">{item.listingTitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
