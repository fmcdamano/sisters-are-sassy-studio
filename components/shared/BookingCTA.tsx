import Link from "next/link";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function BookingCTA() {
  return (
    <section className="bg-ink py-28 md:py-36 overflow-hidden">
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-3xl">
            <p className="text-[11px] tracking-[0.22em] uppercase text-cream/35 mb-6 font-body">
              Ready when you are
            </p>
            <h2 className="font-heading italic text-5xl md:text-6xl lg:text-7xl text-cream leading-[1.0] mb-8">
              Let&apos;s create something<br />
              <span className="text-terracotta">worth keeping.</span>
            </h2>
            <p className="text-cream/55 text-base md:text-lg font-body leading-relaxed max-w-md mb-12">
              Sessions fill quickly. Reach out now and we&apos;ll find the perfect time to photograph your family.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="font-body text-xs tracking-[0.18em] uppercase px-9 py-3.5 bg-cream text-ink hover:bg-cream-warm transition-colors duration-300"
              >
                Book a Session
              </Link>
              <Link
                href="/portfolio"
                className="font-body text-xs tracking-[0.18em] uppercase px-9 py-3.5 border border-cream/25 text-cream/65 hover:border-cream/60 hover:text-cream transition-all duration-300"
              >
                See Our Work
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
