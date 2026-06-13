import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { getCurrentAdminUser } from "@/lib/auth/session";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminUser = await getCurrentAdminUser();

  if (!adminUser) {
    redirect("/admin/login");
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
      <aside className="border-r border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
          Diar Dzair Admin
        </p>
        <nav className="mt-8 grid gap-2 text-sm">
          <Link href="/admin" className="rounded-lg px-3 py-2 hover:bg-[var(--color-bg)]">
            Dashboard
          </Link>
          <Link href="/admin/listings" className="rounded-lg px-3 py-2 hover:bg-[var(--color-bg)]">
            Biens
          </Link>
          <Link href="/admin/leads" className="rounded-lg px-3 py-2 hover:bg-[var(--color-bg)]">
            Demandes
          </Link>
          <Link href="/admin/media" className="rounded-lg px-3 py-2 hover:bg-[var(--color-bg)]">
            Medias
          </Link>
          <Link href="/admin/settings" className="rounded-lg px-3 py-2 hover:bg-[var(--color-bg)]">
            Parametres
          </Link>
        </nav>
      </aside>

      <div className="p-6 lg:p-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white px-4 py-3">
          <p className="text-sm text-[var(--color-text-muted)]">Connecte: {adminUser.email ?? adminUser.uid}</p>
          <AdminLogoutButton />
        </header>
        {children}
      </div>
    </div>
  );
}
