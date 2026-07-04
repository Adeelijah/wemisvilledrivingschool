import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import CourseCard from "@/components/CourseCard";
import LaneDivider from "@/components/LaneDivider";
import { courses } from "@/lib/courses";
import { whatsappLink } from "@/lib/site";

export const metadata = {
  title: "Courses | Wemisville Driving School",
  description: "Basic, advanced simulator, and corporate/fleet driving courses at Wemisville Driving School, Akure.",
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we offer"
        title="Our Driving Courses"
        desc="Every course combines FRSC-aligned theory, hands-on road practice, and — where relevant — simulator training, tailored to your experience level."
      />
      <section className="py-14 md:py-20">
        <Container className="grid gap-8 md:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.code} course={course} />
          ))}
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
