"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { PortfolioImage } from "@/lib/constants/portfolio";

const FOCUSABLE_SELECTORS =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface LightboxModalProps {
  images: PortfolioImage[];
  initialIndex: number;
  onClose: () => void;
}

export function LightboxModal({ images, initialIndex, onClose }: LightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handlePrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation + complete focus trap (WCAG 2.1 AA 2.1.2)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") { handlePrev(); return; }
      if (e.key === "ArrowRight") { handleNext(); return; }

      // Tab focus trap — keep focus inside the dialog
      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = Array.from(
          dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
        ).filter((el) => !el.closest("[hidden]"));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    // Lock scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus close button on mount for accessibility
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, handlePrev, handleNext]);

  const current = images[currentIndex];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      {/* Content — stop click propagation so clicking image doesn't close */}
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close image viewer"
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded"
        >
          <X size={28} />
        </button>

        {/* Image */}
        <div className="relative w-full rounded-card overflow-hidden bg-black/50"
          style={{ aspectRatio: "4/3" }}>
          <Image
            src={`/portfolio/${current.filename}`}
            alt={current.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1024px"
            priority
          />
        </div>

        {/* Caption */}
        <div className="text-center mt-4">
          <p className="text-white/60 text-sm">{current.category}</p>
          <p className="text-white/40 text-xs mt-1">
            {currentIndex + 1} / {images.length}
          </p>
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded hidden md:flex"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded hidden md:flex"
            >
              <ChevronRight size={40} />
            </button>

            {/* Mobile swipe hint buttons (below image) */}
            <div className="flex items-center justify-center gap-6 mt-4 md:hidden">
              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="text-white/70 hover:text-white transition-colors"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next image"
                className="text-white/70 hover:text-white transition-colors"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
