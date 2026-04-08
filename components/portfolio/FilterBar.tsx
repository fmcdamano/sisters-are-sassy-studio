"use client";
import { cn } from "@/lib/utils";

export const PORTFOLIO_FILTERS = [
  { label: "All", value: "all" },
  { label: "Newborn", value: "newborn" },
  { label: "Easter Baby", value: "easter" },
  { label: "Toddler", value: "toddler" },
  { label: "Maternity", value: "maternity" },
  { label: "Family", value: "family" },
  { label: "Birthday", value: "birthday" },
  { label: "Christmas", value: "christmas" },
  { label: "Professional", value: "professional" },
];

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto scrollbar-hide py-1"
      role="group"
      aria-label="Filter portfolio by session type"
    >
      {PORTFOLIO_FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          aria-pressed={activeFilter === filter.value}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal",
            activeFilter === filter.value
              ? "bg-teal text-white border-teal"
              : "bg-white text-charcoal border-light-gray hover:border-teal hover:text-teal"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
