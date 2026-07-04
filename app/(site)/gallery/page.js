import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export const metadata = {
  title: "Gallery | Wemisville Driving School",
  description: "Photos and videos of Wemisville Driving School's vehicles, simulators, and training in action.",
};

const ITEMS = [
  "Simulator training",
  "Practical road session",
  "Classroom theory",
  "Vehicle fleet",
  "Graduation day",
  "Instructor & student",
  "FRSC test day",
  "Corporate training group",
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="See us in action"
        title="Gallery"
        desc="Photos and videos from training sessions, our vehicles and simulators, and graduation days. Replace these placeholders with real photos supplied by the school."
      />
      <section className="py-14 md:py-20">
        <Container className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {ITEMS.map((label) => (
            <ImagePlaceholder key={label} label={label} ratio="aspect-square" />
          ))}
        </Container>
      </section>
    </>
  );
}
