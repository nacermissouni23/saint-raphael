"use client";

import { useState } from "react";

type LeadEnquiryFormProps = {
  listingId: string;
};

type FormState = "idle" | "submitting" | "success" | "error";

export function LeadEnquiryForm({ listingId }: LeadEnquiryFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(formData: FormData) {
    setState("submitting");
    setMessage("");

    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? "") || undefined,
      message: String(formData.get("message") ?? ""),
      listingId,
      source: "listing_page",
    };

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setState("error");
      setMessage("Envoi impossible. Verifiez les champs et reessayez.");
      return;
    }

    setState("success");
    setMessage("Votre demande a bien ete envoyee.");
  }

  return (
    <form action={onSubmit} className="mt-4 grid gap-3">
      <input
        type="text"
        name="fullName"
        required
        placeholder="Nom complet"
        className="rounded-lg border border-[var(--color-border)] px-3 py-2"
      />
      <input
        type="tel"
        name="phone"
        required
        placeholder="+213"
        className="rounded-lg border border-[var(--color-border)] px-3 py-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email (optionnel)"
        className="rounded-lg border border-[var(--color-border)] px-3 py-2"
      />
      <textarea
        name="message"
        required
        defaultValue="Je suis interesse(e) par ce bien."
        className="min-h-28 rounded-lg border border-[var(--color-border)] px-3 py-2"
      />
      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-full bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === "submitting" ? "Envoi..." : "Envoyer"}
      </button>
      {message ? (
        <p
          className={`text-sm ${
            state === "success" ? "text-[var(--color-primary)]" : "text-red-600"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
