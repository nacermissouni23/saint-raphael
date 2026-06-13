"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ListingsFilterForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const values = useMemo(
    () => ({
      wilaya: searchParams.get("wilaya") ?? "",
      transactionType: searchParams.get("transactionType") ?? "",
      propertyType: searchParams.get("propertyType") ?? "",
      minPrice: searchParams.get("minPrice") ?? "",
      maxPrice: searchParams.get("maxPrice") ?? "",
    }),
    [searchParams],
  );

  function onSubmit(formData: FormData) {
    const next = new URLSearchParams();

    const wilaya = String(formData.get("wilaya") ?? "").trim();
    const transactionType = String(formData.get("transactionType") ?? "").trim();
    const propertyType = String(formData.get("propertyType") ?? "").trim();
    const minPrice = String(formData.get("minPrice") ?? "").trim();
    const maxPrice = String(formData.get("maxPrice") ?? "").trim();

    if (wilaya) next.set("wilaya", wilaya);
    if (transactionType) next.set("transactionType", transactionType);
    if (propertyType) next.set("propertyType", propertyType);
    if (minPrice) next.set("minPrice", minPrice);
    if (maxPrice) next.set("maxPrice", maxPrice);

    router.replace(next.toString() ? `${pathname}?${next.toString()}` : pathname);
  }

  function onReset() {
    router.replace(pathname);
  }

  return (
    <form
      action={onSubmit}
      className="mb-8 grid gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4 sm:grid-cols-2 lg:grid-cols-6"
    >
      <label className="text-sm text-[var(--color-text-muted)] lg:col-span-1">
        Wilaya
        <input
          type="text"
          name="wilaya"
          defaultValue={values.wilaya}
          placeholder="Alger"
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
        />
      </label>

      <label className="text-sm text-[var(--color-text-muted)] lg:col-span-1">
        Transaction
        <select
          name="transactionType"
          defaultValue={values.transactionType}
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
        >
          <option value="">Tous</option>
          <option value="sale">Vente</option>
          <option value="rent">Location</option>
        </select>
      </label>

      <label className="text-sm text-[var(--color-text-muted)] lg:col-span-1">
        Type
        <select
          name="propertyType"
          defaultValue={values.propertyType}
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
        >
          <option value="">Tous</option>
          <option value="apartment">Appartement</option>
          <option value="villa">Villa</option>
          <option value="commercial">Local commercial</option>
          <option value="land">Terrain</option>
          <option value="office">Bureau</option>
          <option value="studio">Studio</option>
          <option value="duplex">Duplex</option>
        </select>
      </label>

      <label className="text-sm text-[var(--color-text-muted)] lg:col-span-1">
        Prix min
        <input
          type="number"
          name="minPrice"
          defaultValue={values.minPrice}
          placeholder="0"
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
        />
      </label>

      <label className="text-sm text-[var(--color-text-muted)] lg:col-span-1">
        Prix max
        <input
          type="number"
          name="maxPrice"
          defaultValue={values.maxPrice}
          placeholder="100000000"
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
        />
      </label>

      <div className="flex items-end gap-2 lg:col-span-1">
        <button
          type="submit"
          className="flex-1 rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)]"
        >
          Filtrer
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-primary)]"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
