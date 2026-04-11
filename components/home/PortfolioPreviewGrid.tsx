import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOMEPAGE_PREVIEW_IMAGES } from "@/lib/constants/portfolio";
import { prisma } from "@/lib/db";

export async function PortfolioPreviewGrid() {
  const slotRows = await prisma.portfolioSlotAsset.findMany({
    where: { slotId: { in: HOMEPAGE_PREVIEW_IMAGES.map((item) => item.slotId).filter(Boolean) as string[] } },
    select: { slotId: true, localPath: true },
  });
  const slotMap = slotRows.reduce<Record<string, string>>((acc, row) => {
    acc[row.slotId] = row.localPath;
    return acc;
  }, {});

  const images = HOMEPAGE_PREVIEW_IMAGES.map((item) => ({
    ...item,
    src: item.slotId && slotMap[item.slotId] ? slotMap[item.slotId] : `/portfolio/${item.filename}`,
  }));
  const [img1, img2, img3, img4] = images;

  return (
    <section className="section-py">
      {/* Section header — constrained */}
      <div className="section-container mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-teal text-[10px] font-semibold uppercase tracking-[0.3em] mb-2 font-body">
            Our work
          </p>
          <h2 className="font-heading italic text-charcoal text-3xl md:text-4xl">
            A few of our favourite moments.
          </h2>
        </div>
        <Link
          href="/portfolio"
          className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal hover:text-teal transition-colors shrink-0 font-body"
        >
          View all <ArrowRight size={13} />
        </Link>
      </div>

      {/*
        Editorial asymmetric grid — no rounded corners, 2px gap.
        Desktop layout (3 cols):
          Row 1 (480px): [img1: col-span-2] [img2: col-span-1, rows 1+2]
          Row 2 (280px): [img3: col-span-1] [img4: col-span-1]
      */}
      <div
        className="hidden md:grid w-full gap-0.5"
        style={{
          gridTemplateColumns: "2fr 1fr",
          gridTemplateRows: "480px 280px",
        }}
      >
        {/* img1 — large landscape, top-left */}
        {img1 && (
          <div className="relative overflow-hidden group">
            <Image
              src={img1.src ?? `/portfolio/${img1.filename}`}
              alt={img1.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="66vw"
            />
          </div>
        )}

        {/* img2 — tall portrait, spans both rows on the right */}
        {img2 && (
          <div className="relative overflow-hidden group" style={{ gridRow: "1 / 3" }}>
            <Image
              src={img2.src ?? `/portfolio/${img2.filename}`}
              alt={img2.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="33vw"
            />
          </div>
        )}

        {/* img3 — bottom left */}
        {img3 && (
          <div className="relative overflow-hidden group">
            <Image
              src={img3.src ?? `/portfolio/${img3.filename}`}
              alt={img3.alt}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              sizes="33vw"
            />
          </div>
        )}

        {/* img4 — bottom middle */}
        {img4 && (
          <div className="relative overflow-hidden group" style={{ gridColumn: "1" }}>
            <Image
              src={img4.src ?? `/portfolio/${img4.filename}`}
              alt={img4.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="33vw"
            />
          </div>
        )}
      </div>

      {/* Mobile: simple 2-column grid */}
      <div className="md:hidden grid grid-cols-2 gap-0.5">
        {images.slice(0, 4).map((image) => (
          <div key={image.filename} className="relative aspect-square overflow-hidden group">
            <Image
              src={image.src ?? `/portfolio/${image.filename}`}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="50vw"
            />
          </div>
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="mt-6 text-center md:hidden">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal hover:text-teal transition-colors font-body"
        >
          View all photos <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  );
}
