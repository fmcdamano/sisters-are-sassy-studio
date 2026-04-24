"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const sessions = [
  {
    label: "Newborn",
    description: "Tiny fingers, sleepy yawns.",
    href: "/book?type=newborn",
    filename: "newborn-pink-robe-crib.jpg",
  },
  {
    label: "Maternity",
    description: "The glow before they arrive.",
    href: "/book?type=maternity",
    filename: "maternity-tulle-gown-boho.jpg",
  },
  {
    label: "Family",
    description: "Everyone together, just as you are.",
    href: "/book?type=family",
    filename: "family-portrait-golden-backdrop.jpg",
  },
  {
    label: "Birthday",
    description: "Cake smashes and candle moments.",
    href: "/book?type=birthday",
    filename: "birthday-baby-ballerina-pink.jpg",
  },
  {
    label: "Professional",
    description: "Your face, your story.",
    href: "/book?type=professional",
    filename: "professional-nurses-group-white.jpg",
  },
];

export function SessionCategoryTeaser() {
  return (
    <section className="section-py">
      <div className="section-container">
        <ScrollReveal className="mb-14 text-center">
          <p className="text-[11px] tracking-[0.22em] uppercase text-ink-muted mb-4 font-body">
            Sessions
          </p>
          <h2 className="font-heading italic text-4xl md:text-5xl lg:text-6xl text-ink">
            What would you like<br />to capture?
          </h2>
        </ScrollReveal>

        {/* Desktop: accordion expand-on-hover strips */}
        <div className="hidden md:flex gap-[3px] h-[540px]">
          {sessions.map((session, i) => (
            <motion.div
              key={session.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 55, damping: 18, delay: i * 0.06 }}
              style={{ flex: "1", transition: "flex 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}
              className="relative overflow-hidden h-[540px]"
              onMouseEnter={(e) => { e.currentTarget.style.flex = "2.5"; }}
              onMouseLeave={(e) => { e.currentTarget.style.flex = "1"; }}
            >
              <Link href={session.href} className="group block w-full h-full">
                <Image
                  src={`/portfolio/${session.filename}`}
                  alt={session.label}
                  fill
                  sizes="(max-width: 1024px) 20vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                <div className="absolute bottom-6 left-5 right-5">
                  <p className="font-heading italic text-cream text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-1">
                    {session.description}
                  </p>
                  <p className="font-body text-[10px] tracking-[0.22em] uppercase text-cream/80">
                    {session.label}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile: 2-col grid */}
        <div className="md:hidden grid grid-cols-2 gap-[3px]">
          {sessions.map((session, i) => (
            <Link
              key={session.label}
              href={session.href}
              className={`group relative block overflow-hidden aspect-[3/4] ${i === 0 ? "col-span-2 aspect-[16/9]" : ""}`}
            >
              <Image
                src={`/portfolio/${session.filename}`}
                alt={session.label}
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-cream/90">
                  {session.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
