const phrases = [
  "Newborn Sessions",
  "Family Portraits",
  "Maternity",
  "Birthday Celebrations",
  "Christmas Portraits",
  "Milestone Moments",
  "Professional Headshots",
];

export function MarqueeStrip() {
  const doubled = [...phrases, ...phrases];

  return (
    <div className="overflow-hidden bg-ink py-4 border-y border-cream/10" aria-hidden="true">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((phrase, i) => (
          <span key={`${phrase}-${i}`} className="flex items-center gap-0">
            <span className="font-heading italic text-cream/75 text-xl md:text-2xl px-7">
              {phrase}
            </span>
            <span className="text-terracotta text-xs leading-none">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
