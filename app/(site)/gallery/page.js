import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import Image from "next/image";
import { listGalleryItems } from "@/lib/gallery";

export const metadata = {
  title: "Gallery | Wemisville Driving School",
  description: "Photos of Wemisville Driving School's vehicles, school events, and graduates.",
};

export const dynamic = "force-dynamic";

const LOCAL_ITEMS = [
  { src: "/facilityphoto.jpg", alt: "Wemisville's driving school facility and parked training vehicles." },
  { src: "/frsctestday.jpg", alt: "Wemisville representatives with FRSC officials at the driving school." },
  { src: "/graduationday1.jpg", alt: "A Wemisville graduate holding a graduation certificate with a school representative." },
  { src: "/graduationday2.jpg", alt: "A Wemisville graduate presenting their course completion documents." },
  { src: "/graduationday3.jpg", alt: "A Wemisville graduate holding a certificate and assessment form." },
];

export default async function GalleryPage() {
  let items = [];
  try {
    items = await listGalleryItems();
  } catch {
    console.error("Gallery lookup failed; serving the existing local gallery.");
  }
  const displayItems = items.length > 0
    ? items.map((item) => ({ src: item.imageUrl, alt: item.altText, caption: item.caption, id: item.id }))
    : LOCAL_ITEMS.map((item) => ({ ...item, id: item.src, caption: "" }));

  return (
    <>
      <PageHero
        eyebrow="See us in action"
        title="Gallery"
        desc="Photos of Wemisville's vehicles, school events, and graduates."
      />
      <section className="py-14 md:py-20">
        <Container className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {displayItems.map(({ id, src, alt, caption }) => (
            <figure key={id} className="overflow-hidden border-2 border-slate/40 bg-chalk">
              <div className="relative aspect-square">
              <Image
                src={src}
                alt={alt}
                fill
                unoptimized
                sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
              </div>
              {caption && <figcaption className="px-3 py-2 text-xs text-slate">{caption}</figcaption>}
            </figure>
          ))}
        </Container>
      </section>
    </>
  );
}
