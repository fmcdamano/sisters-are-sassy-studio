import { Suspense } from "react";
import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { FilterBar } from "@/components/portfolio/FilterBar";
import { BookingCTA } from "@/components/shared/BookingCTA";

export const metadata: Metadata = {
  title: "Portfolio — Family & Newborn Photography in Tacloban City, Leyte",
  description:
    "Browse our portfolio of newborn, maternity, family, birthday, and Christmas portrait sessions in Tacloban City, Leyte, Philippines.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio — Sisters are Sassy Studio",
    description:
      "Newborn, maternity, family, and Christmas portrait photography in Tacloban City, Leyte, Philippines.",
    url: "/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-36 pb-12 bg-cream">
        <div className="section-container">
          <p className="text-[11px] tracking-[0.22em] uppercase text-ink-muted mb-4 font-body">
            Portfolio
          </p>
          <h1 className="font-heading italic text-5xl md:text-6xl lg:text-7xl text-ink leading-tight mb-5">
            Photographs that<br />tell your story.
          </h1>
          <p className="text-ink-muted font-body text-base max-w-lg leading-relaxed">
            Browse newborn, maternity, family, and milestone sessions from our studio in Tacloban City.
          </p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-0 z-40 bg-cream/90 backdrop-blur-sm border-b border-cream-deep/40 py-4">
        <div className="section-container">
          <Suspense>
            <FilterBar />
          </Suspense>
        </div>
      </div>

      {/* Grid — wrapped in Suspense because PortfolioGrid uses useSearchParams */}
      <section className="section-py">
        <div className="section-container">
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-gray-400 text-sm">Loading photos…</div>}>
            <PortfolioGrid />
          </Suspense>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
