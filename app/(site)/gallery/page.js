import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import Image from "next/image";

export const metadata = {
  title: "Gallery | Wemisville Driving School",
  description: "Photos and videos of Wemisville Driving School's vehicles, simulators, and training in action.",
};

const ITEMS = [
  { src: "/simulatortraining.jpg", alt: "A student using Wemisville's driving simulator and steering wheel." },
  { src: "/facilityphoto.jpg", alt: "Wemisville's driving school facility and parked training vehicles." },
  { src: "/frsctestday.jpg", alt: "Wemisville representatives with FRSC officials at the driving school." },
  { src: "/graduationday1.jpg", alt: "A Wemisville graduate holding a graduation certificate with a school representative." },
  { src: "/graduationday2.jpg", alt: "A Wemisville graduate presenting their course completion documents." },
  { src: "/graduationday3.jpg", alt: "A Wemisville graduate holding a certificate and assessment form." },
  { src: "/instructor1.jpg", alt: "Portrait of a Wemisville driving instructor in a gray suit." },
  { src: "/instructor2.jpg", alt: "Portrait of a Wemisville driving instructor in a navy suit." },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="See us in action"
        title="Gallery"
        desc="Photos and videos from training sessions, our vehicles and simulators, and graduation days."
      />
      <section className="py-14 md:py-20">
        <Container className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {ITEMS.map(({ src, alt }) => (
            <div key={src} className="relative aspect-square overflow-hidden border-2 border-slate/40 bg-chalk">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
