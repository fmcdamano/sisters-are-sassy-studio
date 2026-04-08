import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Package } from "@/lib/constants/packages";

interface ServiceCardProps {
  pkg: Package;
}

export function ServiceCard({ pkg }: ServiceCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardContent className="p-6 md:p-8 flex flex-col h-full">
        {/* Price */}
        <div className="mb-5">
          <p className="text-teal text-xs font-semibold uppercase tracking-widest mb-1">
            {pkg.duration}
          </p>
          <h2 className="font-heading text-2xl md:text-3xl text-charcoal mb-2">{pkg.label}</h2>
          <p className="text-gray-500 text-sm leading-relaxed">{pkg.description}</p>
        </div>

        {/* Price tag */}
        <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-light-gray">
          <span className="font-heading text-4xl font-bold text-charcoal">
            ₱{pkg.price.toLocaleString()}
          </span>
          <span className="text-gray-400 text-sm">/ session</span>
        </div>

        {/* Inclusions */}
        <div className="mb-6 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            What&apos;s included
          </p>
          <ul className="space-y-2.5">
            {pkg.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                <Check
                  size={15}
                  className="text-teal mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Booking note / Best for */}
        {(pkg.bookingNote || pkg.bestFor) && (
          <div className="mb-6 bg-peach/30 rounded-btn p-4 text-sm text-charcoal/80 leading-relaxed italic">
            {pkg.bookingNote ?? pkg.bestFor}
          </div>
        )}

        {/* CTA */}
        <Button asChild className="w-full mt-auto">
          <Link href={`/book?type=${pkg.slug}`}>Book This Session</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
