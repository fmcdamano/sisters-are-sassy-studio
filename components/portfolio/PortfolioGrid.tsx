"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { PORTFOLIO_IMAGES } from "@/lib/constants/portfolio";
import { LightboxModal } from "./LightboxModal";

export function PortfolioGrid() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") ?? "all";
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    filter === "all"
      ? PORTFOLIO_IMAGES
      : PORTFOLIO_IMAGES.filter((img) => img.filterTag === filter);

  return (
    <>
      {/* CSS columns masonry — no JS needed for layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-[3px] [column-gap:3px]">
        {filtered.map((image, i) => (
          <button
            key={image.filename}
            className="group relative block w-full overflow-hidden break-inside-avoid mb-[3px] cursor-zoom-in"
            onClick={() => setLightboxIndex(i)}
            aria-label={`View ${image.alt}`}
          >
            <Image
              src={`/portfolio/${image.filename}`}
              alt={image.alt}
              width={600}
              height={800}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors duration-500" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <LightboxModal
          images={filtered}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
