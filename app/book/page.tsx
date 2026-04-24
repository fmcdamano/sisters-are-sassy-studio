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
    <>
      <section className="pt-36 pb-4 section-container">
        <p className="text-[11px] tracking-[0.22em] uppercase text-ink-muted mb-4 font-body">Book a Session</p>
        <h1 className="font-heading italic text-5xl md:text-7xl lg:text-[5.5rem] text-ink leading-[0.92]">
          Let's create<br />something beautiful.
        </h1>
      </section>

      <div className="section-container pb-24">
        <div className="max-w-xl mx-auto">
          {/* Form — wrapped in Suspense because BookingForm uses useSearchParams */}
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-ink-muted text-sm">Loading form…</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </>
  );
}
