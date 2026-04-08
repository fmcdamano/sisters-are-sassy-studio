import Link from "next/link";

interface BookingCTAProps {
  sessionType?: string;
}

export function BookingCTA({ sessionType }: BookingCTAProps) {
  const bookHref = sessionType ? `/book?type=${sessionType}` : "/book";

  return (
    <section className="bg-teal">
      <div className="section-container py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-white/60 text-[10px] font-semibold uppercase tracking-[0.3em] mb-5 font-body">
            Ready when you are
          </p>
          <h2 className="font-heading italic text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8">
            Ready to book your session?
          </h2>
          <p className="text-white/75 text-base md:text-lg leading-relaxed mb-10 max-w-lg font-body">
            It only takes a few minutes to reserve your date. Tell us what you&apos;re celebrating and we&apos;ll take care of everything from there.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <Link
              href={bookHref}
              className="inline-block bg-white hover:bg-off-white text-teal text-xs font-semibold uppercase tracking-[0.2em] px-10 py-4 transition-colors duration-200 font-body"
            >
              Book a Session
            </Link>
            <Link
              href="/portfolio"
              className="text-white/70 hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-200 pb-0.5 border-b border-white/30 hover:border-white/70 font-body"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
