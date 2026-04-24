"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Transparent hero treatment only on the homepage while at the top
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isTransparent
          ? "bg-transparent py-5"
          : "bg-cream/90 backdrop-blur-md border-b border-cream-deep/40 py-3"
      )}
    >
      <div className="section-container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Sisters Are Sassy Studio" width={34} height={34} />
          <span
            className={cn(
              "font-heading text-lg tracking-wide transition-colors duration-300",
              isTransparent ? "text-cream" : "text-ink"
            )}
          >
            Sisters Are Sassy
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-body text-xs tracking-[0.18em] uppercase ink-underline transition-colors duration-300",
                isTransparent ? "text-cream" : "text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className={cn(
              "font-body text-xs tracking-[0.18em] uppercase px-5 py-2.5 border transition-all duration-300",
              isTransparent
                ? "border-cream/60 text-cream hover:border-cream hover:bg-cream/10"
                : "border-ink text-ink hover:bg-ink hover:text-cream"
            )}
          >
            Book a Session
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={cn(
            "md:hidden flex flex-col gap-[5px] p-2 transition-colors",
            isTransparent ? "text-cream" : "text-ink"
          )}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Navigation menu"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen ? "true" : "false"}
        >
          <span className={cn("block w-6 h-px bg-current transition-all duration-300", menuOpen && "rotate-45 translate-y-[9px]")} />
          <span className={cn("block w-6 h-px bg-current transition-all duration-300", menuOpen && "opacity-0")} />
          <span className={cn("block w-6 h-px bg-current transition-all duration-300", menuOpen && "-rotate-45 -translate-y-[9px]")} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div id="mobile-menu" className={cn("md:hidden overflow-hidden transition-all duration-500 bg-cream", menuOpen ? "max-h-72 border-b border-cream-deep/40" : "max-h-0")}>
        <nav className="section-container py-7 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-xs tracking-[0.18em] uppercase text-ink ink-underline"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="font-body text-xs tracking-[0.18em] uppercase text-ink border border-ink px-5 py-2.5 self-start hover:bg-ink hover:text-cream transition-all duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Book a Session
          </Link>
        </nav>
      </div>
    </header>
  );
}
