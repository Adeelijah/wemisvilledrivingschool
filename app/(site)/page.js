import Link from "next/link";
import Container from "@/components/Container";
import LaneDivider from "@/components/LaneDivider";
import PlateBadge from "@/components/PlateBadge";
import Gauge from "@/components/Gauge";
import CourseCard from "@/components/CourseCard";
import { enrollSteps, testimonials } from "@/lib/courses";
import { getCoursesWithPrices } from "@/lib/course-pricing";
import { site, whatsappLink } from "@/lib/site";

const WHY = [
  { title: "FRSC Accredited", desc: "Officially recognised training that meets federal road-safety standards." },
  { title: "Simulation Technology", desc: "Simulator training sessions are included in all three driving courses." },
  { title: "Experienced Instructors", desc: "Patient, structured teaching for first-time and returning drivers." },
  { title: "Personalised Training", desc: "Pace and focus areas adjusted to how you actually learn." },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const displayCourses = await getCoursesWithPrices();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-asphalt text-paper">
        <div className="absolute inset-x-0 bottom-0">
          <LaneDivider tone="dark" />
        </div>
        <Container className="grid gap-10 py-16 md:grid-cols-[1.2fr_1fr] md:items-center md:py-24">
          <div>
            <PlateBadge tone="yellow" className="mb-5">FRSC ACCREDITED · AKURE · LEKKI</PlateBadge>
            <h1 className="font-display text-4xl uppercase leading-[1.05] tracking-wide text-paper md:text-6xl">
              Learn to drive with real confidence
            </h1>
            <p className="mt-5 max-w-md text-base text-chalkLine/90 md:text-lg">
              Basic driving courses and professional-driver retraining from an FRSC-accredited school in Akure.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/enroll"
                className="rounded-[4px] bg-signal px-6 py-3 font-body text-sm font-bold text-ink transition-transform hover:-translate-y-0.5 hover:bg-signalDark"
              >
                Enroll Now
              </Link>
              <a
                href={whatsappLink("Hi Wemisville, I'd like to ask about your driving courses.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[4px] border-2 border-paper px-6 py-3 font-body text-sm font-bold text-paper transition-transform hover:-translate-y-0.5 hover:bg-paper hover:text-ink"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
          <div className="flex justify-center rounded-md bg-paper/5 p-6 md:justify-end">
            <Gauge value={site.rating} sub={`${site.reviewCount} Google reviews`} />
          </div>
        </Container>
      </section>

      {/* COURSES */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-plate text-xs uppercase tracking-[0.2em] text-road">What we offer</p>
              <h2 className="font-display text-3xl uppercase tracking-wide text-ink md:text-4xl">Our Courses</h2>
            </div>
            <Link href="/courses" className="font-body text-sm font-bold text-road hover:underline">
              View other services
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {displayCourses.map((course) => (
              <CourseCard key={course.code} course={course} />
            ))}
          </div>
        </Container>
      </section>

      <LaneDivider />

      {/* WHY CHOOSE US */}
      <section className="bg-chalk py-16 md:py-24">
        <Container>
          <p className="font-plate text-xs uppercase tracking-[0.2em] text-road">Why Wemisville</p>
          <h2 className="mb-10 font-display text-3xl uppercase tracking-wide text-ink md:text-4xl">
            Built on safety, backed by results
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((item) => (
              <div key={item.title} className="border-2 border-ink bg-paper p-5">
                <h3 className="font-display text-lg uppercase tracking-wide text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-slate">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW TO ENROLL — real sequence, numbering earns its place */}
      <section className="py-16 md:py-24">
        <Container>
          <p className="font-plate text-xs uppercase tracking-[0.2em] text-road">The process</p>
          <h2 className="mb-10 font-display text-3xl uppercase tracking-wide text-ink md:text-4xl">
            How to get your license
          </h2>
          <div className="grid gap-8 md:grid-cols-4">
            {enrollSteps.map((step, i) => (
              <div key={step.n} className="relative">
                <div className="font-display text-5xl text-signal/70">{step.n}</div>
                <h3 className="mt-2 font-display text-lg uppercase tracking-wide text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-slate">{step.desc}</p>
                {i < enrollSteps.length - 1 && (
                  <div className="mt-6 hidden h-[2px] w-full bg-lanes bg-[length:20px_2px] text-ink/20 md:block" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <LaneDivider />

      {/* TESTIMONIALS */}
      <section className="bg-ink py-16 text-paper md:py-24">
        <Container>
          <p className="font-plate text-xs uppercase tracking-[0.2em] text-signal">Reviews</p>
          <h2 className="mb-10 font-display text-3xl uppercase tracking-wide text-paper md:text-4xl">
            What our students say
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="border border-chalkLine/20 bg-asphalt p-6">
                <div className="mb-3 font-plate text-signal" aria-label="5 out of 5 stars">★★★★★</div>
                <p className="text-sm text-chalkLine/90">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-4 font-body text-sm font-semibold text-paper">{t.name}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA BANNER */}
      <section className="bg-road py-14">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-3xl uppercase tracking-wide text-paper md:text-4xl">
            Ready to start? Enroll today.
          </h2>
          <Link
            href="/enroll"
            className="rounded-[4px] bg-signal px-8 py-3.5 font-body text-sm font-bold text-ink transition-transform hover:-translate-y-0.5 hover:bg-signalDark"
          >
            Fill Inquiry Form
          </Link>
        </Container>
      </section>
    </>
  );
}
