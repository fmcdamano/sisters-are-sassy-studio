const ITEMS = [
  "Families",
  "Milestones",
  "Memories",
  "All captured with heart",
  "Tacloban City, Leyte",
  "Sisters are Sassy Studio",
  "Since 2013",
];

/** Teal ticker strip between hero and portfolio — scrolls infinitely */
export function MarqueeStrip() {
  // Duplicate items so the loop is seamless (animation translates -50%)
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="bg-teal overflow-hidden py-4 select-none" aria-hidden="true">
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-0 text-white font-body text-[11px] font-semibold uppercase tracking-[0.25em]">
            <span className="px-8">{item}</span>
            <span className="text-white/35">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
