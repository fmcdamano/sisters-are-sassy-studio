import Image from "next/image";
import { ScrollReveal } from "@/components/home/ScrollReveal";

export function StudioStory() {
  return (
    <section className="section-py section-container">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Image side */}
        <ScrollReveal>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/portfolio/maternity-champagne-gown-white.jpg"
              alt="Sisters Are Sassy Studio"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </ScrollReveal>
        {/* Text side */}
        <ScrollReveal delay={0.15}>
          <p className="text-[11px] tracking-[0.22em] uppercase text-ink-muted mb-6 font-body">Our Story</p>
          <h2 className="font-heading italic text-4xl md:text-5xl lg:text-[3.5rem] text-ink leading-[0.95] mb-8">
            Two sisters.<br />One vision.
          </h2>
          <div className="space-y-4 font-body text-base text-ink/70 leading-relaxed">
            <p>Sisters Are Sassy Studio was born from a shared belief — that the moments you can&apos;t get back deserve to be captured beautifully.</p>
            <p>Based in Tacloban City, Leyte, we specialize in newborn portraits, maternity sessions, family photography, and milestone celebrations. Every session is a collaboration, every image a keepsake.</p>
            <p>We create a warm, unhurried space so you can simply be present — and let us handle the rest.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
