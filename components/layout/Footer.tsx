import Link from "next/link";
import Image from "next/image";
import { Facebook, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-light-gray mt-auto">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3" aria-label="Sisters are Sassy Studio">
              {/* {IMAGE: Sisters are Sassy Studio logo SVG, 36x36} */}
              <Image src="/logo.svg" alt="" width={36} height={36} className="w-9 h-9" />
              <span className="font-heading text-charcoal font-semibold">
                Sisters are Sassy Studio
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Families, milestones, and memories — captured with heart in Tacloban City.
            </p>
            <p className="text-xs text-gray-400 mt-2">Tacloban City, Leyte, Philippines</p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Explore
            </p>
            <ul className="space-y-2">
              {[
                { label: "Portfolio", href: "/portfolio" },
                { label: "Services", href: "/services" },
                { label: "About", href: "/about" },
                { label: "Book a Session", href: "/book" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Get in touch
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+63XXXXXXXXXX"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal transition-colors"
                >
                  <Phone size={14} />
                  +63 XXX XXX XXXX
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/sistersaresassystudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal transition-colors"
                >
                  <Facebook size={14} />
                  Sisters are Sassy Studio on Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-light-gray pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © {currentYear} Sisters are Sassy Studio. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">Tacloban City, Leyte, Philippines</p>
        </div>
      </div>
    </footer>
  );
}
