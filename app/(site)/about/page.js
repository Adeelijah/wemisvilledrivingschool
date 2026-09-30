import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import PlateBadge from "@/components/PlateBadge";
import Image from "next/image";
import LaneDivider from "@/components/LaneDivider";

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
              Driving isn&apos;t just about learning the controls. It&apos;s about becoming confident enough to make the right decisions when the road gets busy.
            </p>
            <p className="mt-4 text-slate">
              Wemisville Driving School was built to help learners develop that confidence through patient instruction, practical training and real-world driving experience.
            </p>
            <p className="mt-4 text-slate">
              From first-time learners getting behind the wheel for the first time to drivers looking to strengthen their skills, Wemisville focuses on helping each learner understand the vehicle, understand the road and become a safer, more confident driver.
            </p>
            <p className="mt-4 text-slate">
              Our goal is simple: to help people become genuinely ready for the road.
            </p>
            <div className="mt-6">
              <PlateBadge tone="yellow">FRSC ACCREDITED</PlateBadge>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-slate/40 bg-chalk">
            <Image
              src="/facilityphoto.jpg"
              alt="Wemisville's yellow driving school facility with training cars parked outside."
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <LaneDivider />

      <section className="bg-chalk py-14 md:py-20">
        <Container>
          <p className="font-plate text-xs uppercase tracking-[0.2em] text-road">Accreditation</p>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-wide text-ink">FRSC Accreditation</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[3/4] w-full overflow-hidden border-2 border-slate/40 bg-chalk md:max-w-sm">
              <Image
                src="/frsctestday.jpg"
                alt="Wemisville representatives standing with FRSC officials at the driving school."
                fill
                sizes="(min-width: 768px) 384px, 100vw"
                className="object-cover"
              />
            </div>
            <p className="text-slate">
              Wemisville Driving School is accredited by the Federal Road Safety Corps (FRSC), meaning our
              curriculum and testing preparation align with federal road-safety standards.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <p className="font-plate text-xs uppercase tracking-[0.2em] text-road">Our team</p>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-wide text-ink">Instructors</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              { src: "/instructor1.jpg", name: "Mr. Wemimo", experience: "20+ years of experience" },
              { src: "/instructor2.jpg", name: "Mr. Timileyin", experience: "15+ years of experience" },
            ].map((instructor) => (
              <div key={instructor.name} className="border-2 border-ink bg-paper p-5">
                <div className="relative aspect-square w-full overflow-hidden border-2 border-slate/40 bg-chalk">
                  <Image
                    src={instructor.src}
                    alt={`Portrait of ${instructor.name}, Wemisville driving instructor.`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 font-display text-lg uppercase tracking-wide text-ink">{instructor.name}</h3>
                <p className="text-sm text-slate">{instructor.experience}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
