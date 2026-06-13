"use client";

import { useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setState("submitting");
    setMessage("");

    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? "") || undefined,
      message: String(formData.get("message") ?? ""),
      source: "contact_page",
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setState("error");
      setMessage("Echec de l'envoi. Merci de verifier les champs.");
      return;
    }

    setState("success");
    setMessage("Votre message a ete envoye. Nous vous recontacterons rapidement.");
  }

  return (
    <form action={onSubmit} className="grid gap-3 rounded-[var(--radius-card)] border bg-white p-5">
      <input
        name="fullName"
        required
        placeholder="Nom complet"
        className="rounded-lg border border-[var(--color-border)] px-3 py-2"
      />
      <input
        name="phone"
        required
        placeholder="Telephone"
        className="rounded-lg border border-[var(--color-border)] px-3 py-2"
      />
      <input
        name="email"
        type="email"
        placeholder="Email (optionnel)"
        className="rounded-lg border border-[var(--color-border)] px-3 py-2"
      />
      <select name="subject" className="rounded-lg border border-[var(--color-border)] px-3 py-2">
        <option>Demande d&apos;information</option>
        <option>Visite de bien</option>
        <option>Mettre un bien en vente/location</option>
      </select>
      <textarea
        name="message"
        required
        placeholder="Votre message"
        className="min-h-32 rounded-lg border border-[var(--color-border)] px-3 py-2"
      />
      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-full bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white"
      >
        {state === "submitting" ? "Envoi..." : "Envoyer"}
      </button>
      {message ? (
        <p className={`text-sm ${state === "error" ? "text-red-600" : "text-[var(--color-primary)]"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
