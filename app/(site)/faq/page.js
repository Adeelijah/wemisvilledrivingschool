import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata = {
  title: "FAQ | Wemisville Driving School",
  description: "Answers to common questions about enrolling, the FRSC test, course duration, and payment.",
};

const FAQS = [
  {
    q: "How do I get a driver's license through Wemisville?",
    a: "Enroll in a course that matches your experience level (see our Courses page), complete theory and practical training, then sit the FRSC test with our support. We guide you through each step.",
  },
  {
    q: "What documents do I need to enroll?",
    a: "Typically a valid means of identification and passport photographs. [Confirm exact requirements with the school and update this answer.]",
  },
  {
    q: "How long does training take?",
    a: "It depends on the course — the Basic Driving Course runs about 4 weeks with flexible scheduling, while the Advanced/Simulator course is shorter. See the Courses page for details.",
  },
  {
    q: "How does the FRSC test process work?",
    a: "After completing your training, we help prepare you for the official FRSC driving test, which assesses both your theory knowledge and practical driving skills.",
  },
  {
    q: "How do I pay for a course?",
    a: "Payment is currently handled in person at the school. Contact us via phone or WhatsApp to confirm current pricing and payment options.",
  },
  {
    q: "Do you offer training for companies or groups?",
    a: "Yes — our Corporate/Fleet Training course supports group enrolment, with an on-site option for organisations. Contact us for a custom quote.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="Questions" title="Frequently Asked Questions" />
      <section className="py-14 md:py-20">
        <Container className="max-w-3xl">
          <FaqAccordion items={FAQS} />
        </Container>
      </section>
    </>
  );
}
