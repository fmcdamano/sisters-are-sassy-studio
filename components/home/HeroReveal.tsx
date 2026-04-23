"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as "spring", stiffness: 55, damping: 18 },
  },
};

export function HeroReveal() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col justify-end h-full pb-20 md:pb-28 pt-36"
    >
      <motion.p
        variants={item}
        className="text-cream/50 text-[11px] tracking-[0.22em] uppercase mb-7 font-body"
      >
        Sisters Are Sassy Studio — Tacloban City, Leyte
      </motion.p>

      <motion.h1
        variants={item}
        className="font-heading italic text-5xl md:text-7xl lg:text-[5.5rem] text-cream leading-[0.92]"
      >
        Every moment<br />
        deserves to be<br />
        remembered.
      </motion.h1>

      <motion.p
        variants={item}
        className="text-cream/65 text-base md:text-lg font-body leading-relaxed max-w-sm mt-8"
      >
        Newborn portraits, family sessions, and milestone celebrations — photographed with intention in Leyte.
      </motion.p>

      <motion.div variants={item} className="flex flex-wrap gap-4 mt-10">
        <a
          href="/book"
          className="font-body text-xs tracking-[0.18em] uppercase px-8 py-3.5 bg-cream text-ink hover:bg-cream-warm transition-colors duration-300"
        >
          Book a Session
        </a>
        <a
          href="/portfolio"
          className="font-body text-xs tracking-[0.18em] uppercase px-8 py-3.5 border border-cream/50 text-cream hover:border-cream hover:bg-cream/10 transition-all duration-300"
        >
          View Portfolio
        </a>
      </motion.div>
    </motion.div>
  );
}
