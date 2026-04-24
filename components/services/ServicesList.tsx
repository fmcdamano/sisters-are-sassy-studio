"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Package } from "@/lib/constants/packages";

interface ServicesListProps {
  packages: Package[];
}

export function ServicesList({ packages }: ServicesListProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div>
      {packages.map((pkg) => {
        const isOpen = open === pkg.id;

        return (
          <div key={pkg.id} className="border-b border-cream-deep">
            <button
              className="w-full text-left py-8 flex items-center justify-between gap-6 group"
              onClick={() => setOpen(isOpen ? null : pkg.id)}
              aria-expanded={isOpen ? "true" : "false"}
            >
              <span
                className={
                  isOpen
                    ? "font-heading italic text-2xl text-ink"
                    : "font-body text-sm tracking-widest uppercase text-ink-muted"
                }
              >
                {pkg.label}
              </span>

              <div className="flex items-center gap-4 flex-shrink-0">
                {!isOpen && (
                  <span className="font-heading italic text-xl text-ink-muted hidden md:block">
                    ₱{pkg.price.toLocaleString()}
                  </span>
                )}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-ink-muted flex-shrink-0"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-12 grid grid-cols-1 md:grid-cols-[1fr_240px] gap-10">
                    <div>
                      <p className="font-body text-base text-ink/70 leading-relaxed mb-7">
                        {pkg.description}
                      </p>

                      <ul className="space-y-2.5 mb-6">
                        {pkg.includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 font-body text-sm text-ink/70"
                          >
                            <span className="mt-[7px] flex-shrink-0 w-1 h-1 rounded-full bg-terracotta" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {pkg.bookingNote && (
                        <p className="text-xs font-body text-ink-muted italic border-l-2 border-terracotta/30 pl-4 mb-4">
                          {pkg.bookingNote}
                        </p>
                      )}

                      {pkg.bestFor && (
                        <p className="text-xs font-body text-ink-muted">
                          <span className="uppercase tracking-widest text-[10px] text-terracotta">
                            Best for:{" "}
                          </span>
                          {pkg.bestFor}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-5 items-start">
                      <div>
                        <p className="font-heading italic text-3xl text-terracotta">
                          ₱{pkg.price.toLocaleString()}
                        </p>
                        <p className="text-xs tracking-widest uppercase text-ink-muted font-body mt-1">
                          {pkg.duration}
                        </p>
                      </div>

                      <Link
                        href={`/book?type=${pkg.slug}`}
                        className="font-body text-xs tracking-[0.18em] uppercase px-7 py-3 bg-ink text-cream hover:bg-terracotta transition-colors duration-300"
                      >
                        Book this session
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
