import type { Metadata } from "next";
import { PACKAGES } from "@/lib/constants/packages";
import { ServiceCard } from "@/components/services/ServiceCard";
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
    <>
      {/* Page Header */}
      <section className="bg-white border-b border-light-gray">
        <div className="section-container py-12 md:py-16">
          <p className="text-teal text-xs font-semibold uppercase tracking-widest mb-3">
            What we offer
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-charcoal mb-4">
            Sessions &amp; Packages
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-xl leading-relaxed">
            Every session is thoughtfully crafted to feel natural, joyful, and completely yours. Choose the moment you&apos;re celebrating — we&apos;ll handle everything else.
          </p>
          <p className="mt-3 text-xs text-gray-400">
            All prices in Philippine Peso (₱) · Prices include in-studio session and fully edited digital photos.
          </p>
        </div>
      </section>

      {/* Package Cards */}
      <section className="section-py">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <ServiceCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          {/* Client confirmation note */}
          <p className="mt-8 text-center text-xs text-gray-400 max-w-md mx-auto">
            Pricing and inclusions are subject to confirmation by the studio before your session.
            Contact us on Facebook for the most up-to-date packages.
          </p>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
