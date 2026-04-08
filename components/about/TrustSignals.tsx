import Image from "next/image";
import Link from "next/link";
import { Facebook, CalendarDays, Camera } from "lucide-react";
import { PORTFOLIO_IMAGES } from "@/lib/constants/portfolio";

const TRUST_STATS = [
  {
    icon: <CalendarDays size={24} className="text-teal" />,
    stat: "Since 2013",
    label: "Over a decade capturing Tacloban's milestones",
  },
  {
    icon: <Camera size={24} className="text-teal" />,
    // TODO: Replace with verified session count from studio owner before launch
    stat: "500+",
    label: "Sessions captured across Leyte",
  },
  {
    icon: <Facebook size={24} className="text-teal" />,
    // TODO: Replace with live follower count from studio's Facebook page before launch
    stat: "1,000+",
    label: "Follow us on Facebook for our latest work",
  },
];

// 6 images for the portfolio strip at the bottom
const STRIP_IMAGES = PORTFOLIO_IMAGES.slice(0, 6);

export function TrustSignals() {
  return (
    <section className="bg-white border-t border-light-gray section-py">
      <div className="section-container">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {TRUST_STATS.map((item, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal/10 mb-4">
                {item.icon}
              </div>
              <p className="font-heading text-2xl text-charcoal font-semibold mb-1">{item.stat}</p>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Facebook CTA */}
        <div className="text-center mb-14">
          <a
            href="https://www.facebook.com/sistersaresassystudio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal hover:text-teal-hover transition-colors border border-teal/30 rounded-full px-5 py-2.5"
          >
            <Facebook size={15} />
            Follow us on Facebook
          </a>
        </div>

        {/* Portfolio strip */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 text-center mb-6">
            A few favorites
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {STRIP_IMAGES.map((img) => (
              <Link
                key={img.filename}
                href="/portfolio"
                className="relative aspect-square rounded-card overflow-hidden group"
                aria-label={`View portfolio — ${img.category}`}
              >
                <Image
                  src={`/portfolio/${img.filename}`}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
              </Link>
            ))}
          </div>
          <p className="text-center mt-4">
            <Link href="/portfolio" className="text-sm text-teal hover:text-teal-hover font-medium transition-colors">
              View the full portfolio →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
