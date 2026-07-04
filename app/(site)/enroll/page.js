import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import EnrollForm from "@/components/EnrollForm";

export const metadata = {
  title: "Enroll | Wemisville Driving School",
  description: "Send an inquiry to enroll in a Wemisville Driving School course.",
};

export default function EnrollPage() {
  return (
    <>
      <PageHero
        eyebrow="Get started"
        title="Enroll / Send an Inquiry"
        desc="Fill in your details and we'll reach out to confirm your course and schedule."
      />
      <section className="py-14 md:py-20">
        <Container className="max-w-2xl">
          <Suspense fallback={null}>
            <EnrollForm />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
