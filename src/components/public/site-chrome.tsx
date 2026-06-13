"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const WHATSAPP_NUMBER = "+213770538730";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [menuOpen, setMenuOpen] = useState(false);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[rgba(250,250,248,0.94)] backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-12">
          <Link href="/" className="text-xl font-semibold tracking-wide">
            Saint Raphael
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
            <Link
              href="/admin"
              className="rounded-full border border-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-[var(--color-primary)]"
            >
              Admin
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white sm:inline-block"
            >
              Contactez-nous
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center md:hidden"
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d={menuOpen ? "M18.3 5.7a1 1 0 00-1.4 0L12 10.6 7.1 5.7a1 1 0 10-1.4 1.4L10.6 12l-4.9 4.9a1 1 0 101.4 1.4L12 13.4l4.9 4.9a1 1 0 001.4-1.4L13.4 12l4.9-4.9a1 1 0 000-1.4z" : "M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"} />
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-[var(--color-border)] bg-white px-6 pb-5 pt-3 md:hidden">
            <nav className="grid gap-3 text-sm">
              <Link href="/listings" onClick={() => setMenuOpen(false)} className="hover:text-[var(--color-primary)]">
                Biens
              </Link>
              <Link href="/a-propos" onClick={() => setMenuOpen(false)} className="hover:text-[var(--color-primary)]">
                A propos
              </Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-[var(--color-primary)]">
                Contact
              </Link>
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full border border-[var(--color-primary)] px-4 py-2 text-center text-sm font-semibold text-[var(--color-primary)]"
              >
                Admin
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Contactez-nous
              </Link>
            </nav>
          </div>
        )}
      </header>
      <div className="flex-1">{children}</div>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
        aria-label="WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      <footer className="mt-14 border-t border-[var(--color-border)] bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 text-sm sm:px-10 lg:grid-cols-3 lg:px-12">
          <div>
            <p className="text-lg font-semibold">Agence Immobiliere Saint Raphael</p>
            <p className="mt-2 text-[var(--color-text-muted)]">
              Agence immobiliere a El Biar, Alger. Vente, location et investissement.
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
              25, rue Dziri Abdelkader, El Biar 16010
            </p>
            <p className="text-[var(--color-text-muted)]">0770 53 87 30</p>
            <a
              href="https://www.facebook.com/p/Agence-Immobiliere-Saint-Raphael-100064280701379/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-[var(--color-primary)] hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
