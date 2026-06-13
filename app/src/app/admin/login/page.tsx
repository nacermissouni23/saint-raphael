import Link from "next/link";

import { AdminLoginForm } from "@/components/admin/admin-login-form";

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-16">
      <section className="w-full rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)]">
          Espace Admin
        </p>
        <h1 className="mt-2 text-4xl">Connexion</h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Connectez-vous pour gerer les biens, demandes et parametres.
        </p>
        <AdminLoginForm />
        <Link href="/" className="mt-4 inline-flex text-sm text-[var(--color-primary)] hover:underline">
          Retour au site public
        </Link>
      </section>
    </main>
  );
}
