export interface PortfolioImage {
  filename: string;
  /** Descriptive alt text — includes session type and location for SEO */
  alt: string;
  /** Human-readable category label */
  category: string;
  /** Matches FilterBar chip values: newborn | easter | toddler | birthday | maternity | family | professional | christmas */
  filterTag: string;
  /** Recommended as hero image */
  isHeroCandidate?: boolean;
}

/**
 * All 25 portfolio images.
 * Source: test-photos/ in project root.
 * Deploy: copy to public/portfolio/ before launch.
 *
 * {IMAGE: Copy all files from test-photos/ to public/portfolio/ before launch}
 */
export const PORTFOLIO_IMAGES: PortfolioImage[] = [
  {
    filename: "newborn-pink-robe-crib.jpg",
    alt: "Newborn baby in pink robe resting in a crib — newborn portrait session in Tacloban City, Leyte",
    category: "Newborn",
    filterTag: "newborn",
    isHeroCandidate: true,
  },
  {
    filename: "newborn-basket-blue-name-board.jpg",
    alt: "Newborn baby in a wicker basket with blue name board — studio newborn photography in Tacloban City",
    category: "Newborn",
    filterTag: "newborn",
  },
  {
    filename: "newborn-basket-giraffe-teal.jpg",
    alt: "Newborn baby in a teal-accented basket with giraffe prop — newborn session in Leyte, Philippines",
    category: "Newborn",
    filterTag: "newborn",
  },
  {
    filename: "easter-baby-bunny-backdrop.jpg",
    alt: "Baby in Easter bunny costume with floral backdrop — Easter baby portrait in Tacloban City",
    category: "Easter Baby",
    filterTag: "easter",
  },
  {
    filename: "toddler-girl-peach-flowers-01.jpg",
    alt: "Toddler girl in peach dress surrounded by flowers — toddler portrait session in Tacloban City, Leyte",
    category: "Toddler",
    filterTag: "toddler",
  },
  {
    filename: "toddler-girl-peach-flowers-02.jpg",
    alt: "Toddler girl in peach floral outfit — toddler milestone photography in Leyte, Philippines",
    category: "Toddler",
    filterTag: "toddler",
  },
  {
    filename: "toddler-sisters-rocking-horse.jpg",
    alt: "Two toddler sisters on a rocking horse — sibling portrait session in Tacloban City",
    category: "Toddler & Siblings",
    filterTag: "toddler",
  },
  {
    filename: "birthday-baby-safari-costume.jpg",
    alt: "Baby in safari costume for first birthday — themed birthday portrait in Tacloban City, Leyte",
    category: "Birthday",
    filterTag: "birthday",
  },
  {
    filename: "birthday-baby-chinese-newyear.jpg",
    alt: "Baby in Chinese New Year themed outfit — cultural milestone portrait in Tacloban City",
    category: "Birthday",
    filterTag: "birthday",
  },
  {
    filename: "birthday-baby-ballerina-pink.jpg",
    alt: "Baby ballerina in pink tutu — birthday portrait session in Tacloban City, Leyte",
    category: "Birthday",
    filterTag: "birthday",
  },
  {
    filename: "siblings-summer-beach-backdrop.jpg",
    alt: "Siblings in front of summer beach backdrop — sibling birthday portrait in Tacloban City",
    category: "Birthday & Siblings",
    filterTag: "birthday",
  },
  {
    filename: "maternity-champagne-gown-white.jpg",
    alt: "Expecting mother in champagne gown against white backdrop — maternity portrait in Tacloban City, Leyte",
    category: "Maternity",
    filterTag: "maternity",
  },
  {
    filename: "maternity-seated-warm-backdrop.jpg",
    alt: "Pregnant woman seated on a warm-toned backdrop — maternity photography in Leyte, Philippines",
    category: "Maternity",
    filterTag: "maternity",
  },
  {
    filename: "maternity-tulle-gown-boho.jpg",
    alt: "Expecting mother in flowing boho tulle gown — maternity portrait session in Tacloban City, Leyte",
    category: "Maternity",
    filterTag: "maternity",
    isHeroCandidate: true,
  },
  {
    filename: "maternity-family-denim-white.jpg",
    alt: "Maternity family portrait in denim and white — family maternity session in Tacloban City",
    category: "Maternity & Family",
    filterTag: "maternity",
  },
  {
    filename: "family-newborn-dog-teal.jpg",
    alt: "Family of four with newborn and dog against teal backdrop — family newborn portrait in Tacloban City",
    category: "Family & Newborn",
    filterTag: "family",
  },
  {
    filename: "family-newborn-five-white.jpg",
    alt: "Family of five with newborn in white — family portrait session in Tacloban City, Leyte",
    category: "Family & Newborn",
    filterTag: "family",
  },
  {
    filename: "family-portrait-golden-backdrop.jpg",
    alt: "Family portrait in front of golden backdrop — family photography in Tacloban City, Leyte",
    category: "Family",
    filterTag: "family",
  },
  {
    filename: "group-family-elders-portrait.jpg",
    alt: "Multi-generational family group portrait — large family session in Tacloban City, Philippines",
    category: "Group & Family",
    filterTag: "family",
  },
  {
    filename: "professional-nurses-group-white.jpg",
    alt: "Group of nurses in white uniforms — professional group portrait in Tacloban City, Leyte",
    category: "Professional",
    filterTag: "professional",
  },
  {
    filename: "professional-doctors-laughing-teal.jpg",
    alt: "Medical team laughing in front of teal backdrop — professional group portrait in Tacloban City",
    category: "Professional",
    filterTag: "professional",
  },
  {
    filename: "christmas-family-plaid-pajamas.jpg",
    alt: "Family in matching plaid pajamas — Christmas family portrait in Tacloban City, Leyte",
    category: "Christmas",
    filterTag: "christmas",
  },
  {
    filename: "christmas-family-baby-white-sweater.jpg",
    alt: "Family with baby in white Christmas sweater — holiday portrait session in Tacloban City",
    category: "Christmas",
    filterTag: "christmas",
  },
  {
    filename: "christmas-family-green-shirts.jpg",
    alt: "Family in matching green shirts for Christmas — holiday family portrait in Leyte, Philippines",
    category: "Christmas",
    filterTag: "christmas",
  },
  {
    filename: "christmas-mom-four-kids.jpg",
    alt: "Mother with four children in Christmas outfits — holiday portrait session in Tacloban City, Leyte",
    category: "Christmas",
    filterTag: "christmas",
  },
];

/** The 6 images used in the homepage PortfolioPreviewGrid */
export const HOMEPAGE_PREVIEW_IMAGES = PORTFOLIO_IMAGES.filter((img) =>
  [
    "maternity-tulle-gown-boho.jpg",
    "newborn-pink-robe-crib.jpg",
    "christmas-family-plaid-pajamas.jpg",
    "family-portrait-golden-backdrop.jpg",
    "birthday-baby-ballerina-pink.jpg",
    "professional-nurses-group-white.jpg",
  ].includes(img.filename)
);

/** Session category teasers for the homepage */
export const SESSION_CATEGORIES = [
  {
    label: "Newborn",
    slug: "newborn",
    image: "newborn-pink-robe-crib.jpg",
    alt: "Newborn photography in Tacloban City, Leyte",
  },
  {
    label: "Maternity",
    slug: "maternity",
    image: "maternity-tulle-gown-boho.jpg",
    alt: "Maternity portrait sessions in Tacloban City",
  },
  {
    label: "Family",
    slug: "family",
    image: "family-portrait-golden-backdrop.jpg",
    alt: "Family portrait photography in Tacloban City, Leyte",
  },
  {
    label: "Birthday",
    slug: "birthday",
    image: "birthday-baby-ballerina-pink.jpg",
    alt: "Birthday portrait sessions in Tacloban City",
  },
  {
    label: "Christmas",
    slug: "christmas",
    image: "christmas-family-plaid-pajamas.jpg",
    alt: "Christmas family portraits in Tacloban City, Leyte",
  },
];
