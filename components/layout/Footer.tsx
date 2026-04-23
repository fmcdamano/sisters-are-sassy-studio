import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-ink text-cream/70">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-20 pb-12 border-b border-cream/10">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Sisters Are Sassy Studio"
                width={30}
                height={30}
                className="invert opacity-70"
              />
              <span className="font-heading text-xl text-cream tracking-wide">
                Sisters Are Sassy Studio
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-cream/50">
              Capturing the moments that matter — newborns, families, and every celebration in between. Based in Tacloban City, Leyte.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs tracking-[0.18em] uppercase text-cream/30 mb-4 font-body">Navigate</p>
            {[
              { href: "/portfolio", label: "Portfolio" },
              { href: "/services", label: "Services" },
              { href: "/about", label: "About" },
              { href: "/book", label: "Book a Session" },
            ].map((link) => (
              <div key={link.href}>
                <Link href={link.href} className="text-sm text-cream/60 hover:text-cream transition-colors duration-200 ink-underline">
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-xs tracking-[0.18em] uppercase text-cream/30 mb-4 font-body">Connect</p>
            <a
              href="https://facebook.com/sistersaresassystudio"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-cream/60 hover:text-cream transition-colors duration-200 ink-underline"
            >
              Facebook
            </a>
            <a
              href="tel:+63XXXXXXXXXX"
              className="block text-sm text-cream/60 hover:text-cream transition-colors duration-200"
            >
              Call Us
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-cream/30 tracking-wide">
            &copy; {new Date().getFullYear()} Sisters Are Sassy Studio. All rights reserved.
          </p>
          <p className="text-xs text-cream/20 font-body">Tacloban City, Leyte, Philippines</p>
        </div>
      </div>
    </footer>
  );
}
