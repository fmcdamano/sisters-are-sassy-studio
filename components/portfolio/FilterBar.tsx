"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const filters = [
  { value: "all", label: "All" },
  { value: "newborn", label: "Newborn" },
  { value: "maternity", label: "Maternity" },
  { value: "family", label: "Family" },
  { value: "birthday", label: "Birthday" },
  { value: "toddler", label: "Toddler" },
  { value: "easter", label: "Easter" },
  { value: "christmas", label: "Christmas" },
  { value: "professional", label: "Professional" },
];

export function FilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = searchParams.get("filter") ?? "all";

  const setFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete("filter");
    else params.set("filter", value);
    router.push(`/portfolio?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-7 overflow-x-auto scrollbar-hide pb-1">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => setFilter(filter.value)}
          aria-pressed={active === filter.value}
          className={cn(
            "font-body text-xs tracking-[0.18em] uppercase whitespace-nowrap pb-1.5 border-b-[1.5px] transition-all duration-200 flex-shrink-0",
            active === filter.value
              ? "border-ink text-ink"
              : "border-transparent text-ink-muted hover:text-ink"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
