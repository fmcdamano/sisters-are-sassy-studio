import { ScrollReveal } from "@/components/home/ScrollReveal";

const testimonials = [
  {
    quote: "The photos took my breath away. They captured something I didn't even know I was feeling.",
    name: "Maria Santos",
    session: "Newborn Session",
  },
  {
    quote: "Every image tells a story. Our family portraits are now the most treasured things in our home.",
    name: "Ana Reyes",
    session: "Family Session",
  },
  {
    quote: "I felt so comfortable during the shoot. The sisters have a gift for making you feel seen.",
    name: "Joy Alcantara",
    session: "Maternity Session",
  },
];

export function TrustSignals() {
  return (
    <section className="section-py bg-cream-warm">
      <div className="section-container">
        <ScrollReveal className="mb-14 text-center">
          <p className="text-[11px] tracking-[0.22em] uppercase text-ink-muted mb-4 font-body">Testimonials</p>
          <h2 className="font-heading italic text-4xl md:text-5xl text-ink">What our clients say.</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <div className="flex flex-col gap-6">
                <span className="font-heading italic text-6xl text-terracotta leading-none">&ldquo;</span>
                <p className="font-heading italic text-xl md:text-2xl text-ink leading-[1.4]">{t.quote}</p>
                <div>
                  <p className="font-body text-xs tracking-[0.18em] uppercase text-ink">{t.name}</p>
                  <p className="font-body text-xs text-ink-muted mt-0.5">{t.session}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
