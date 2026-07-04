import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import PlateBadge from "@/components/PlateBadge";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import LaneDivider from "@/components/LaneDivider";
import { site } from "@/lib/site";

export const metadata = {
  title: "About Us | Wemisville Driving School",
  description: "FRSC-accredited driving school in Oba-Ile, Akure — our story, accreditation, and instructors.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Wemisville"
        title="Training safer drivers for Akure"
        desc="A comprehensive training institute engaged in basic driving instruction, advanced driving-simulation technology, and personalised coaching."
      />

      <section className="py-14 md:py-20">
        <Container className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-plate text-xs uppercase tracking-[0.2em] text-road">Our story</p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-wide text-ink">
              Built on safety, trusted by hundreds
            </h2>
            <p className="mt-4 text-slate">
              Wemisville Driving School was founded to give a structured, safety-first path to
              getting licensed. Today, the school is accredited by the Federal Road Safety Corps (FRSC) and has
              built a reputation reflected in a {site.rating}★ rating across {site.reviewCount}+ Google reviews.
            </p>
            <p className="mt-4 text-slate">
              [Replace with the school's full story — founding year, milestones, and what makes the training
              philosophy distinct. Content to be supplied by Wemisville.]
            </p>
            <div className="mt-6">
              <PlateBadge tone="yellow">FRSC ACCREDITED</PlateBadge>
            </div>
          </div>
          <ImagePlaceholder label="School / facility photo" />
        </Container>
      </section>

      <LaneDivider />

      <section className="bg-chalk py-14 md:py-20">
        <Container>
          <p className="font-plate text-xs uppercase tracking-[0.2em] text-road">Accreditation</p>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-wide text-ink">FRSC Accreditation</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
            <ImagePlaceholder label="FRSC certificate" ratio="aspect-[3/4] md:max-w-sm" />
            <p className="text-slate">
              Wemisville Driving School is accredited by the Federal Road Safety Corps (FRSC), meaning our
              curriculum and testing preparation align with federal road-safety standards. [Insert accreditation
              number / certificate details supplied by the school.]
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <p className="font-plate text-xs uppercase tracking-[0.2em] text-road">Our team</p>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-wide text-ink">Instructors</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-2 border-ink bg-paper p-5">
                <ImagePlaceholder label="Instructor photo" ratio="aspect-square" />
                <h3 className="mt-4 font-display text-lg uppercase tracking-wide text-ink">Instructor Name</h3>
                <p className="text-sm text-slate">[Role / years of experience — to be supplied]</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
