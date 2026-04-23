import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

const previews = [
  {
    filename: "newborn-pink-robe-crib.jpg",
    alt: "Newborn portrait",
    label: "Newborn",
    gridClass: "md:row-span-2",
    heightClass: "h-[520px] md:h-full",
  },
  {
    filename: "maternity-champagne-gown-white.jpg",
    alt: "Maternity portrait",
    label: "Maternity",
    gridClass: "",
    heightClass: "h-[280px]",
  },
  {
    filename: "family-portrait-golden-backdrop.jpg",
    alt: "Family portrait",
    label: "Family",
    gridClass: "",
    heightClass: "h-[280px]",
  },
  {
    filename: "christmas-family-plaid-pajamas.jpg",
    alt: "Christmas family session",
    label: "Christmas",
    gridClass: "md:col-span-2",
    heightClass: "h-[340px]",
  },
];

export function PortfolioPreviewGrid() {
  return (
    <section className="section-py bg-cream-warm">
      <div className="section-container">
        <ScrollReveal className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase text-ink-muted mb-4 font-body">
                Our Work
              </p>
              <h2 className="font-heading italic text-4xl md:text-5xl lg:text-6xl text-ink">
                Moments frozen<br />in time.
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="font-body text-xs tracking-[0.18em] uppercase text-ink ink-underline self-start md:self-end pb-px"
            >
              View Full Portfolio
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-[3px]">
          {previews.map((item, i) => (
            <ScrollReveal key={item.filename} delay={i * 0.07} className={item.gridClass}>
              <Link
                href="/portfolio"
                className={`group relative block overflow-hidden bg-cream-deep w-full ${item.heightClass}`}
              >
                <Image
                  src={`/portfolio/${item.filename}`}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase text-cream bg-ink/50 backdrop-blur-sm px-3 py-1.5">
                    {item.label}
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
