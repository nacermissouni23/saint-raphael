"use client";

import { useState } from "react";

import type { AgencySettings } from "@/types/settings";

export function AdminSettingsForm({ initialSettings }: { initialSettings: AgencySettings }) {
  const [settings, setSettings] = useState<AgencySettings | null>(initialSettings);
  const [message, setMessage] = useState("");

  async function loadSettings() {
    const response = await fetch("/api/admin/settings", { cache: "no-store" });
    if (!response.ok) {
      return;
    }

    const data = (await response.json()) as { settings: AgencySettings };
    setSettings(data.settings);
  }

  async function onSave(formData: FormData) {
    const payload = {
      agencyName: String(formData.get("agencyName") ?? ""),
      address: String(formData.get("address") ?? ""),
      email: String(formData.get("email") ?? ""),
      officeHours: String(formData.get("officeHours") ?? ""),
      phones: String(formData.get("phones") ?? "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    };

    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setMessage("Parametres sauvegardes.");
      await loadSettings();
      return;
    }

    setMessage("Sauvegarde echouee.");
  }

  if (!settings) {
    return <p>Chargement...</p>;
  }

  return (
    <form
      action={onSave}
      className="grid gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5"
    >
      <label className="text-sm text-[var(--color-text-muted)]">
        Nom de l&apos;agence
        <input
          name="agencyName"
          defaultValue={settings.agencyName}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </label>
      <label className="text-sm text-[var(--color-text-muted)]">
        Adresse
        <input
          name="address"
          defaultValue={settings.address}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </label>
      <label className="text-sm text-[var(--color-text-muted)]">
        Email
        <input
          name="email"
          defaultValue={settings.email}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </label>
      <label className="text-sm text-[var(--color-text-muted)]">
        Horaires
        <input
          name="officeHours"
          defaultValue={settings.officeHours}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </label>
      <label className="text-sm text-[var(--color-text-muted)]">
        Telephones (un par ligne)
        <textarea
          name="phones"
          defaultValue={settings.phones.join("\n")}
          className="mt-1 min-h-28 w-full rounded-lg border px-3 py-2"
        />
      </label>
      <button
        type="submit"
        className="w-fit rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-white"
      >
        Sauvegarder
      </button>
      {message ? <p className="text-sm text-[var(--color-primary)]">{message}</p> : null}
    </form>
  );
}
