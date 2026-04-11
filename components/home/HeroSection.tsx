import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";

export async function HeroSection() {
  const heroAsset = await prisma.portfolioSlotAsset.findUnique({
    where: { slotId: "hero-primary" },
    select: { localPath: true },
  });
  const heroSrc = heroAsset?.localPath ?? "/portfolio/maternity-tulle-gown-boho.jpg";

  return (
    <section className="relative h-screen w-full overflow-hidden -mt-16">
      {/* Full-bleed hero image */}
      <Image
        src={heroSrc}
        alt="Portrait session — Sisters are Sassy Studio, Tacloban City, Leyte"
        fill
        className="object-cover object-[center_20%]"
        priority
        sizes="100vw"
        quality={90}
      />

      {/* Dual gradient: dark band at top (nav contrast) + dark band at bottom (headline contrast) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,20,20,0.52) 0%, transparent 28%), linear-gradient(to top, rgba(20,20,20,0.78) 0%, rgba(20,20,20,0.10) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content — pinned to bottom-left */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 md:px-14 md:pb-16 lg:px-20 lg:pb-20">
        <p className="text-white/60 text-xs uppercase tracking-[0.3em] mb-4 font-body">
          Tacloban City · Leyte · Philippines
        </p>

        <h1 className="font-heading italic text-white leading-[1.05] mb-8 max-w-xl text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          Families, milestones, and memories — captured with heart.
        </h1>

        <div className="flex items-center gap-6 flex-wrap">
          <Link
            href="/book"
            className="inline-block bg-teal hover:bg-teal-hover text-white text-xs font-body font-semibold uppercase tracking-[0.2em] px-9 py-4 transition-colors duration-200"
          >
            Book a Session
          </Link>
          <Link
            href="/portfolio"
            className="text-white/75 hover:text-white text-xs font-body font-semibold uppercase tracking-[0.2em] transition-colors duration-200 pb-0.5 border-b border-white/30 hover:border-white/70"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
