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
      <section className="pt-36 pb-4 section-container">
        <p className="text-[11px] tracking-[0.22em] uppercase text-ink-muted mb-4 font-body">About Us</p>
        <h1 className="font-heading italic text-5xl md:text-7xl lg:text-[5.5rem] text-ink leading-[0.92]">
          The people<br />behind the lens.
        </h1>
      </section>

      <StudioStory />
      <TrustSignals />
      <BookingCTA />
    </>
  );
}
