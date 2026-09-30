import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import PlateBadge from "@/components/PlateBadge";
import { site, whatsappLink } from "@/lib/site";

export const metadata = {
  title: "Contact | Wemisville Driving School",
  description: "Visit, call, or WhatsApp Wemisville Driving School in Oba-Ile, Akure.",
};

export default function ContactPage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=15&output=embed`;

  return (
    <>
      <PageHero eyebrow="Get in touch" title="Contact Us" desc="Reach us by phone, WhatsApp, or visit the school directly." />

      <section className="py-14 md:py-20">
        <Container className="grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <PlateBadge tone="yellow">FRSC ACCREDITED</PlateBadge>
            </div>
            <div>
              <h2 className="font-display text-lg uppercase tracking-wide text-ink">Address</h2>
              <p className="mt-1 text-slate">{site.address}</p>
            </div>
            <div>
              <h2 className="font-display text-lg uppercase tracking-wide text-ink">Phone</h2>
              <a href={site.phoneHref} className="mt-1 block text-road hover:underline">{site.phoneDisplay}</a>
            </div>
            <div>
              <h2 className="font-display text-lg uppercase tracking-wide text-ink">Email</h2>
              <a href={`mailto:${site.email}`} className="mt-1 block text-road hover:underline">{site.email}</a>
            </div>
            <div>
              <h2 className="font-display text-lg uppercase tracking-wide text-ink">Hours</h2>
              <p className="mt-1 text-slate">{site.hours}</p>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={site.phoneHref}
                className="rounded-[4px] border-2 border-ink bg-signal px-6 py-3 font-body text-sm font-bold text-ink transition-colors hover:bg-signalDark"
              >
                Call Now
              </a>
              <a
                href={whatsappLink("Hi Wemisville, I'd like to get in touch.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[4px] bg-road px-6 py-3 font-body text-sm font-bold text-paper transition-colors hover:bg-roadLight"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="h-80 w-full overflow-hidden border-2 border-ink md:h-full">
            <iframe
              title="Wemisville Driving School location"
              src={mapSrc}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
