import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { PortfolioPreviewGrid } from "@/components/home/PortfolioPreviewGrid";
import { SessionCategoryTeaser } from "@/components/home/SessionCategoryTeaser";
import { BookingCTA } from "@/components/shared/BookingCTA";

export const metadata: Metadata = {
  title:
    "Sisters are Sassy Studio — Family & Newborn Photographer in Tacloban City, Leyte",
  description:
    "Professional newborn, maternity, family, and birthday portrait photography in Tacloban City, Leyte, Philippines. Book your session today.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sisters are Sassy Studio — Family & Newborn Photographer in Tacloban City, Leyte",
    description:
      "Families, friendships, milestones, and memories — all captured with heart in Tacloban City, Leyte.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero is full-viewport; NavBar is fixed/transparent so no top offset needed */}
      <HeroSection />
      <MarqueeStrip />
      <PortfolioPreviewGrid />
      <SessionCategoryTeaser />
      <BookingCTA />
    </>
  );
}
