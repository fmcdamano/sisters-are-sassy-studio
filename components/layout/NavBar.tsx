"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // On homepage at the very top, float transparent over the hero image
  const isTransparent = isHomepage && !scrolled && !menuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300",
        isTransparent
          ? "bg-transparent"
          : scrolled
            ? "bg-white/97 backdrop-blur-sm shadow-sm"
            : "bg-white/95 backdrop-blur-sm"
      )}
    >
      <nav
        className="section-container flex items-center justify-between h-16 md:h-18"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          aria-label="Sisters are Sassy Studio — home"
        >
          <Image
            src="/logo.svg"
            alt="Sisters are Sassy Studio logo"
            width={40}
            height={40}
            className="w-8 h-8 md:w-9 md:h-9"
            priority
          />
          <span
            className={cn(
              "font-heading text-sm md:text-base font-semibold leading-tight hidden sm:block transition-colors duration-300",
              isTransparent ? "text-white" : "text-charcoal"
            )}
          >
            Sisters are Sassy
            <br />
            <span className={isTransparent ? "text-white/70" : "text-teal"}>Studio</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.15em] font-body transition-colors duration-200",
                isTransparent
                  ? pathname === link.href
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                  : pathname === link.href
                    ? "text-teal"
                    : "text-charcoal hover:text-teal"
              )}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/book"
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.15em] font-body px-6 py-3 transition-colors duration-200",
              isTransparent
                ? "bg-white/15 hover:bg-white/25 text-white border border-white/30 hover:border-white/60"
                : "bg-teal hover:bg-teal-hover text-white"
            )}
          >
            Book a Session
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={cn(
            "md:hidden p-2 transition-colors duration-200",
            isTransparent ? "text-white" : "text-charcoal hover:text-teal"
          )}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu — always opaque */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-light-gray bg-white animate-fade-in"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="section-container py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-3 py-3 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-teal/10 text-teal"
                    : "text-charcoal hover:bg-off-white hover:text-teal"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-light-gray">
              <Link
                href="/book"
                className="block w-full text-center bg-teal hover:bg-teal-hover text-white text-xs font-semibold uppercase tracking-[0.15em] py-3.5 transition-colors"
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
