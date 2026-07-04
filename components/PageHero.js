import Container from "./Container";

export default function PageHero({ eyebrow, title, desc }) {
  return (
    <section className="border-b-2 border-ink bg-ink py-14 text-paper md:py-20">
      <Container>
        {eyebrow && (
          <p className="font-plate text-xs uppercase tracking-[0.2em] text-signal">{eyebrow}</p>
        )}
        <h1 className="mt-2 font-display text-4xl uppercase tracking-wide text-paper md:text-5xl">
          {title}
        </h1>
        {desc && <p className="mt-4 max-w-2xl text-chalkLine/85">{desc}</p>}
      </Container>
    </section>
  );
}
