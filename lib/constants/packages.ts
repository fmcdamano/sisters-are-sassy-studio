/**
 * Session package definitions.
 *
 * CLIENT CONFIRMATION REQUIRED before launch:
 * Confirm package names, inclusions, durations, and pricing.
 * These are working placeholders — fully functional for development.
 */

export interface Package {
  id: string;
  label: string;
  slug: string;
  price: number;
  duration: string;
  includes: string[];
  description: string;
  bookingNote?: string;
  bestFor?: string;
}

export const PACKAGES: Package[] = [
  {
    id: "newborn",
    label: "Newborn Session",
    slug: "newborn",
    price: 4500,
    duration: "Up to 2 hours in-studio",
    description:
      "Capture those impossibly tiny fingers and toes in the sleepy, curled-up poses that only happen in the first two weeks.",
    includes: [
      "3 themed setups (backdrop + props coordinated per setup)",
      "Outfit changes between setups",
      "20 fully edited digital photos via private online gallery",
      "1 parent/sibling pose included at no extra charge",
    ],
    bookingNote:
      "Book your newborn session in advance — ideally before baby arrives. We recommend scheduling between 5–14 days after birth for those sleepy newborn poses.",
  },
  {
    id: "maternity",
    label: "Maternity Session",
    slug: "maternity",
    price: 3500,
    duration: "Up to 1.5 hours in-studio",
    description:
      "A beautiful celebration of the journey to motherhood — elegant, warm, and completely you.",
    includes: [
      "2 outfit/backdrop setups",
      "Access to studio gown wardrobe",
      "15 fully edited digital photos",
      "Optional partner or sibling inclusion",
    ],
    bookingNote:
      "Best scheduled between 28–34 weeks — when your bump is beautifully round and you're still comfortable.",
  },
  {
    id: "birthday",
    label: "Children & Birthday Session",
    slug: "birthday",
    price: 3000,
    duration: "Up to 1.5 hours in-studio",
    description:
      "Milestone moments deserve milestone photos. From first birthdays to Easter portraits, we make every celebration unforgettable.",
    includes: [
      "1 themed setup (balloon, props, decorated backdrop)",
      "15 fully edited digital photos",
      "Costume / outfit styling assistance",
    ],
    bestFor:
      "First birthdays, Easter baby sessions, milestone portraits, themed kids' portraits.",
  },
  {
    id: "family",
    label: "Family Portrait Session",
    slug: "family",
    price: 4000,
    duration: "Up to 2 hours in-studio",
    description:
      "Everyone together, everyone looking great. Group and individual compositions that capture the real warmth of your family.",
    includes: [
      "Up to 6 family members",
      "2 backdrop options",
      "20 fully edited digital photos",
      "Group and individual sub-group compositions included",
    ],
    bookingNote:
      "Perfect for Christmas portraits, anniversary celebrations, and any moment worth gathering the whole family for.",
  },
  {
    id: "professional",
    label: "Professional & Group Session",
    slug: "professional",
    price: 5500,
    duration: "Up to 2 hours in-studio",
    description:
      "Clean, confident, and polished — professional portraits for teams, clinics, schools, and businesses.",
    includes: [
      "Up to 10 people",
      "Multiple neutral backdrop options",
      "25 fully edited digital photos",
      "Individual headshots for each subject included",
    ],
    bestFor:
      "Corporate teams, medical groups, school faculty, business partners, uniforms or professional attire.",
  },
] as const;

export type PackageId = (typeof PACKAGES)[number]["id"];

export function getPackageById(id: string): Package | undefined {
  return PACKAGES.find((p) => p.id === id);
}
