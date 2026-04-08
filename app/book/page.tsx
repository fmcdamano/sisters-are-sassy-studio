import { Suspense } from "react";
import type { Metadata } from "next";
import { BookingForm } from "@/components/booking/BookingForm";

export const metadata: Metadata = {
  title: "Book a Session — Portrait Photography in Tacloban City, Leyte",
  description:
    "Book a newborn, maternity, family, or birthday portrait session with Sisters are Sassy Studio in Tacloban City, Leyte, Philippines.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a Session — Sisters are Sassy Studio",
    description:
      "Reserve your portrait session in Tacloban City, Leyte, Philippines.",
    url: "/book",
  },
  robots: { index: true, follow: true },
};

export default function BookPage() {
  return (
    <section className="section-py">
      <div className="section-container">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <p className="text-teal text-xs font-semibold uppercase tracking-widest mb-3">
              Let&apos;s do this
            </p>
            <h1 className="font-heading text-4xl md:text-5xl text-charcoal mb-4">
              Book a Session
            </h1>
            <p className="text-gray-500 leading-relaxed">
              Tell us a little about your session and we&apos;ll confirm everything by email. It only takes a few minutes.
            </p>
          </div>

          {/* Form — wrapped in Suspense because BookingForm uses useSearchParams */}
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-gray-400 text-sm">Loading form…</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
