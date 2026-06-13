"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";

import { getFirebaseAuthClient } from "@/lib/firebase/client";

type LoginState = "idle" | "submitting" | "error";

export function AdminLoginForm() {
  const router = useRouter();
  const [state, setState] = useState<LoginState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setState("submitting");
    setErrorMessage("");

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const authClient = getFirebaseAuthClient();
    if (!authClient) {
      const localSessionResponse = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: "local-dev-token", email, password }),
      });

      if (!localSessionResponse.ok) {
        setState("error");
        setErrorMessage("Connexion locale echouee. Configurez Firebase ou verifiez l'API.");
        return;
      }

      router.push("/admin");
      router.refresh();
      setState("idle");
      return;
    }

    try {
      const credential = await signInWithEmailAndPassword(authClient, email, password);
      const idToken = await credential.user.getIdToken();

      const sessionResponse = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!sessionResponse.ok) {
        throw new Error("Session creation failed");
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setState("error");
      setErrorMessage("Connexion echouee. Verifiez vos identifiants.");
    } finally {
      setState("idle");
    }
  }

  return (
    <form action={onSubmit} className="mt-6 grid gap-4">
      <label className="text-sm text-[var(--color-text-muted)]">
        Email
        <input
          type="email"
          name="email"
          required
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2"
        />
      </label>
      <label className="text-sm text-[var(--color-text-muted)]">
        Mot de passe
        <input
          type="password"
          name="password"
          required
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2"
        />
      </label>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-full bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)] disabled:opacity-70"
      >
        {state === "submitting" ? "Connexion..." : "Se connecter"}
      </button>
      {state === "error" ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
    </form>
  );
}
