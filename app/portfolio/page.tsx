import { Suspense } from "react";
import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
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
      {/* Page Header */}
      <section className="bg-white border-b border-light-gray">
        <div className="section-container py-12 md:py-16">
          <p className="text-teal text-xs font-semibold uppercase tracking-widest mb-3">
            Our work
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-charcoal mb-4">
            Portfolio
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-xl leading-relaxed">
            Every image here tells a real story — families, newborns, milestones, and celebrations, all captured right here in Tacloban City since 2013.
          </p>
        </div>
      </section>

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
