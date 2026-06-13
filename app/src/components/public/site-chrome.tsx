"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[rgba(250,250,248,0.94)] backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-12">
          <Link href="/" className="text-xl font-semibold tracking-wide">
            Diar Dzair
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link href="/listings" className="hover:text-[var(--color-primary)]">
              Biens
            </Link>
            <Link href="/a-propos" className="hover:text-[var(--color-primary)]">
              A propos
            </Link>
            <Link href="/contact" className="hover:text-[var(--color-primary)]">
              Contact
            </Link>
          </nav>
          <Link
            href="/contact"
            className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white"
          >
            Contactez-nous
          </Link>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="mt-14 border-t border-[var(--color-border)] bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 text-sm sm:px-10 lg:grid-cols-3 lg:px-12">
          <div>
            <p className="text-lg font-semibold">Diar Dzair</p>
            <p className="mt-2 text-[var(--color-text-muted)]">
              Agence immobiliere premium en Algerie. Vente, location et investissement.
            </p>
          </div>
          <div>
            <p className="font-semibold">Liens rapides</p>
            <div className="mt-2 grid gap-1 text-[var(--color-text-muted)]">
              <Link href="/listings">Tous les biens</Link>
              <Link href="/a-propos">Notre agence</Link>
              <Link href="/contact">Nous contacter</Link>
            </div>
          </div>
          <div>
            <p className="font-semibold">Contact</p>
            <p className="mt-2 text-[var(--color-text-muted)]">
              12 Rue Hassiba Ben Bouali, Alger Centre
            </p>
            <p className="text-[var(--color-text-muted)]">+213 661 23 45 67</p>
          </div>
        </div>
      </footer>
    </>
  );
}
