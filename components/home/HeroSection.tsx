import Image from "next/image";
import { HeroReveal } from "./HeroReveal";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* Full-bleed photography background */}
      <div className="absolute inset-0">
        <Image
          src="/portfolio/newborn-pink-robe-crib.jpg"
          alt="Newborn portrait — Sisters Are Sassy Studio"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient: deep ink at bottom-left, fades toward right */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />
      </div>

      {/* Content — left column, bottom-anchored */}
      <div className="relative z-10 section-container min-h-[100dvh] grid grid-cols-1 md:grid-cols-2">
        <HeroReveal />
        {/* Right column intentionally empty — photography shows through */}
        <div />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-12 z-10 flex items-center gap-3 opacity-40">
        <div className="w-8 h-px bg-cream" />
        <span className="text-cream text-[10px] tracking-[0.28em] uppercase font-body">Scroll</span>
      </div>
    </section>
  );
}
