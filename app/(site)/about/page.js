import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import PlateBadge from "@/components/PlateBadge";
import Image from "next/image";
import LaneDivider from "@/components/LaneDivider";

export const metadata = {
  title: "About Us | Wemisville Driving School",
  description: "Established in 2019, Wemisville Driving School trains aspiring drivers and provides retraining programmes for professional drivers.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Established 2019 · About Wemisville"
        title="Driver training for every stage"
        desc="Established in 2019, Wemisville offers basic driving courses for aspiring drivers and retraining programmes for professional drivers seeking to adapt their driving skills to international standards."
      />

      <section className="py-14 md:py-20">
        <Container className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-plate text-xs uppercase tracking-[0.2em] text-road">Our story</p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-wide text-ink">
              Building confident drivers since 2019
            </h2>
            <p className="mt-4 text-slate">
              Wemisville Driving School is a training institute for aspiring drivers, offering basic driving courses.
            </p>
            <p className="mt-4 text-slate">
              We also conduct retraining programmes, especially for professional drivers, to help them adapt their driving skills to international standards.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-chalkLine pt-5">
              <div>
                <p className="font-display text-2xl text-ink md:text-3xl">5,000+</p>
                <p className="mt-1 font-plate text-[9px] uppercase leading-relaxed tracking-[0.08em] text-slate">Trained</p>
              </div>
              <div>
                <p className="font-display text-2xl text-ink md:text-3xl">5,000+</p>
                <p className="mt-1 font-plate text-[9px] uppercase leading-relaxed tracking-[0.08em] text-slate">Certified</p>
              </div>
              <div>
                <p className="font-display text-2xl text-ink md:text-3xl">3,000+</p>
                <p className="mt-1 font-plate text-[9px] uppercase leading-relaxed tracking-[0.08em] text-slate">Licences processed</p>
              </div>
            </div>
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
