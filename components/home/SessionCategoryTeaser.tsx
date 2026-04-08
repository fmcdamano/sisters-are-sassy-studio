import Image from "next/image";
import Link from "next/link";
import { SESSION_CATEGORIES } from "@/lib/constants/portfolio";

export function SessionCategoryTeaser() {
  return (
    <section className="section-py">
      {/* Section header */}
      <div className="section-container mb-8 text-center">
        <p className="text-teal text-[10px] font-semibold uppercase tracking-[0.3em] mb-2 font-body">
          What we offer
        </p>
        <h2 className="font-heading italic text-charcoal text-3xl md:text-4xl">
          What are you celebrating?
        </h2>
      </div>

      {/*
        Desktop: 5 columns, full-bleed image tiles with overlaid label.
        Mobile: 2-column grid.
        No border radius — editorial, magazine feel.
      */}

      {/* Desktop grid */}
      <div className="hidden md:flex w-full gap-0.5 h-[480px]">
        {SESSION_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/portfolio?filter=${cat.slug}`}
            className="relative flex-1 overflow-hidden group"
            aria-label={`View ${cat.label} sessions`}
          >
            <Image
              src={`/portfolio/${cat.image}`}
              alt={cat.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="20vw"
            />
            {/* Dark gradient at bottom */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(to top, rgba(20,20,20,0.72) 0%, rgba(20,20,20,0.0) 55%)",
              }}
              aria-hidden="true"
            />
            {/* Teal hover tint */}
            <div
              className="absolute inset-0 bg-teal/0 group-hover:bg-teal/20 transition-colors duration-300"
              aria-hidden="true"
            />
            {/* Category label — overlaid at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-heading italic text-white text-xl leading-tight">
                {cat.label}
              </p>
              <span className="mt-1 block text-white/60 text-[10px] font-body uppercase tracking-[0.25em] transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                View sessions
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile: 2-column grid */}
      <div className="md:hidden grid grid-cols-2 gap-0.5">
        {SESSION_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/portfolio?filter=${cat.slug}`}
            className="relative h-[240px] overflow-hidden group"
            aria-label={`View ${cat.label} sessions`}
          >
            <Image
              src={`/portfolio/${cat.image}`}
              alt={cat.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="50vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(20,20,20,0.70) 0%, transparent 55%)",
              }}
              aria-hidden="true"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="font-heading italic text-white text-lg leading-tight">
                {cat.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
