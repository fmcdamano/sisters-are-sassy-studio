import type { Metadata } from "next";
import { PACKAGES } from "@/lib/constants/packages";
import { ServicesList } from "@/components/services/ServicesList";
import { BookingCTA } from "@/components/shared/BookingCTA";

export const metadata: Metadata = {
  title: "Services & Packages — Portrait Photography in Tacloban City, Leyte",
  description:
    "Explore our portrait photography packages in Tacloban City, Leyte. Newborn, maternity, family, birthday, and professional sessions starting from ₱3,000.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services & Packages — Sisters are Sassy Studio",
    description:
      "Portrait photography packages for every milestone in Tacloban City, Leyte, Philippines.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <main>
      <section className="pt-36 pb-16 section-container">
        <p className="text-[11px] tracking-[0.22em] uppercase text-ink-muted mb-4 font-body">
          Our Sessions
        </p>
        <h1 className="font-heading italic text-5xl md:text-7xl lg:text-[5.5rem] text-ink leading-[0.92]">
          Choose your<br />perfect session.
        </h1>
      </section>

      <section className="section-py">
        <div className="section-container">
          <ServicesList packages={PACKAGES} />
        </div>
      </section>

      <BookingCTA />
    </main>
  );
}
