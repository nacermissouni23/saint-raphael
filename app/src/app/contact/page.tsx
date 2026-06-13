import { ContactForm } from "@/components/public/contact-form";
import { OsmMap } from "@/components/public/osm-map";
import { getAgencySettings } from "@/lib/repositories/settings-repository";

export default async function ContactPage() {
  const settings = await getAgencySettings();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 lg:px-12">
      <section className="mb-8">
        <h1 className="text-5xl">Contact</h1>
        <p className="mt-3 max-w-3xl text-[var(--color-text-muted)]">
          Une question, une visite ou un projet de vente ? Notre equipe vous repond rapidement.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5">
            <h2 className="text-2xl">Informations agence</h2>
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">{settings.address}</p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{settings.email}</p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{settings.officeHours}</p>
            <div className="mt-3 grid gap-1 text-sm">
              {settings.phones.map((phone) => (
                <p key={phone}>{phone}</p>
              ))}
            </div>
            <a
              href={`https://wa.me/${settings.phones[0].replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white"
            >
              WhatsApp direct
            </a>
          </div>

          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
            <h3 className="text-xl">Localisation</h3>
            <div className="mt-3">
              <OsmMap
                latitude={36.7538}
                longitude={3.0588}
                label="Diar Dzair Alger Centre"
                heightClassName="h-72"
              />
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
