import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import CourseCard from "@/components/CourseCard";
import LaneDivider from "@/components/LaneDivider";
import { corporateFleetTraining, courses, otherServices } from "@/lib/courses";
import { whatsappLink } from "@/lib/site";

export const metadata = {
  title: "Courses | Wemisville Driving School",
  description: "Driving courses and other driver services from Wemisville Driving School, Akure.",
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we offer"
        title="Our Driving Courses"
        desc="Explore practical driving courses tailored to your experience level."
      />
      <section className="py-14 md:py-20">
        <Container className="grid gap-8 md:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.code} course={course} />
          ))}
        </Container>
      </section>

      <section className="bg-chalk py-14 md:py-20">
        <Container>
          <div className="mb-8">
            <p className="font-plate text-xs uppercase tracking-[0.2em] text-road">More ways we can help</p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-wide text-ink md:text-4xl">Other Services</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((service) => (
              <article key={service.code} className="flex flex-col border-2 border-ink bg-paper p-5">
                <span className="mb-2 font-plate text-xs tracking-[0.15em] text-road">{service.code}</span>
                <h3 className="font-display text-lg uppercase tracking-wide text-ink">{service.name}</h3>
                <p className="mt-2 text-sm text-slate">{service.description}</p>
                <ul className="mt-4 flex-1 space-y-1.5 text-sm text-ink">
                  {service.services.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-road" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappLink(`Hi Wemisville, I'd like to enquire about ${service.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-[4px] border-2 border-ink bg-signal px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-signalDark"
                >
                  Enquire on WhatsApp
                </a>
              </article>
            ))}
            <article className="flex flex-col border-2 border-ink bg-paper p-5">
              <h3 className="font-display text-lg uppercase tracking-wide text-ink">Corporate / Fleet Training</h3>
              <p className="mt-2 text-sm text-slate">Custom, group-based training for {corporateFleetTraining.audience.toLowerCase()}.</p>
              <ul className="mt-4 flex-1 space-y-1.5 text-sm text-ink">
                {corporateFleetTraining.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-road" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink("Hi Wemisville, I'd like to enquire about Corporate / Fleet Training.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-[4px] border-2 border-ink bg-signal px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-signalDark"
              >
                Enquire on WhatsApp
              </a>
            </article>
          </div>
          <p className="mt-5 max-w-3xl text-xs text-slate">
            Wemisville provides assistance with licence-related processing; driver’s licences are issued by the appropriate licensing authority.
          </p>
        </Container>
      </section>

      <LaneDivider />

      <section className="bg-chalk py-14 md:py-20">
        <Container className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-2xl uppercase tracking-wide text-ink md:text-3xl">
            Not sure which course fits you?
          </h2>
          <p className="max-w-xl text-sm text-slate">
            Tell us your experience level and goals on WhatsApp or through the inquiry form, and we'll recommend the right starting point.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <a
              href={whatsappLink("Hi Wemisville, I'm not sure which course is right for me. Can you help?")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[4px] bg-road px-6 py-3 font-body text-sm font-bold text-paper transition-colors hover:bg-roadLight"
            >
              Ask on WhatsApp
            </a>
            <a
              href="/enroll"
              className="rounded-[4px] border-2 border-ink bg-signal px-6 py-3 font-body text-sm font-bold text-ink transition-colors hover:bg-signalDark"
            >
              Fill Inquiry Form
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
