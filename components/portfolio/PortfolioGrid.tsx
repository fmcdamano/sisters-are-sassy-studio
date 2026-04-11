"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { PORTFOLIO_IMAGES } from "@/lib/constants/portfolio";
import { FilterBar } from "./FilterBar";
import { LightboxModal } from "./LightboxModal";
import { Camera } from "lucide-react";

export function PortfolioGrid() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("filter") ?? "all";
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [slotMap, setSlotMap] = useState<Record<string, string>>({});

  // Sync filter with URL param changes (e.g. from SessionCategoryTeaser links)
  useEffect(() => {
    const filter = searchParams.get("filter") ?? "all";
    setActiveFilter(filter);
  }, [searchParams]);

  useEffect(() => {
    fetch("/api/portfolio/slots")
      .then((res) => (res.ok ? res.json() : { slots: {} }))
      .then((data) => setSlotMap(data.slots ?? {}))
      .catch(() => setSlotMap({}));
  }, []);

  const filtered =
    activeFilter === "all"
      ? PORTFOLIO_IMAGES
      : PORTFOLIO_IMAGES.filter((img) => img.filterTag === activeFilter);

  const resolvedImages = filtered.map((image) => ({
    ...image,
    src: image.slotId && slotMap[image.slotId] ? slotMap[image.slotId] : `/portfolio/${image.filename}`,
  }));

  return (
    <>
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div className="mt-6">
        {resolvedImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
            <Camera size={40} strokeWidth={1} />
            <p className="text-sm">No photos in this category yet — check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {resolvedImages.map((image, index) => (
              <button
                key={image.filename}
                onClick={() => setLightboxIndex(index)}
                className="relative aspect-square rounded-card overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
                aria-label={`Open: ${image.alt}`}
              >
                <Image
                  src={image.src ?? `/portfolio/${image.filename}`}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 flex items-end p-3">
                  <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-2 py-0.5 rounded-full">
                    {image.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <LightboxModal
          images={resolvedImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
