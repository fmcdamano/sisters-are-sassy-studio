import type { Metadata } from "next";
import { StudioStory } from "@/components/about/StudioStory";
import { TrustSignals } from "@/components/about/TrustSignals";
import { BookingCTA } from "@/components/shared/BookingCTA";

export const metadata: Metadata = {
  title: "About — Sisters are Sassy Studio in Tacloban City, Leyte",
  description:
    "Meet the sisters behind Sisters are Sassy Studio — a family portrait photography studio in Tacloban City, Leyte, Philippines, capturing milestones since 2013.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Sisters are Sassy Studio",
    description:
      "Family portrait photography in Tacloban City, Leyte, Philippines since 2013.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-white border-b border-light-gray">
        <div className="section-container py-12 md:py-16">
          <p className="text-teal text-xs font-semibold uppercase tracking-widest mb-3">
            Who we are
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-charcoal mb-4">
            About the Studio
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-xl leading-relaxed">
            A family studio rooted in Tacloban City, Leyte — capturing milestones with heart since 2013.
          </p>
        </div>
      </section>

      <StudioStory />
      <TrustSignals />
      <BookingCTA />
    </>
  );
}
