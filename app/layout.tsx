import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sistersaresassystudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Sisters are Sassy Studio — Family & Newborn Photographer in Tacloban City, Leyte",
    template: "%s | Sisters are Sassy Studio",
  },
  description:
    "Sisters are Sassy Studio captures your family's most precious moments. Professional newborn, maternity, family, and birthday portrait photography in Tacloban City, Leyte, Philippines.",
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: siteUrl,
    siteName: "Sisters are Sassy Studio",
    images: [
      {
        url: "/portfolio/maternity-tulle-gown-boho.jpg",
        width: 1200,
        height: 630,
        alt: "Sisters are Sassy Studio — Maternity Portrait in Tacloban City, Leyte",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

/** JSON-LD LocalBusiness schema — rendered on every page via layout */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Sisters are Sassy Studio",
  description:
    "Professional family, newborn, maternity, and birthday portrait photography studio in Tacloban City, Leyte, Philippines.",
  url: siteUrl,
  image: `${siteUrl}/portfolio/maternity-tulle-gown-boho.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tacloban City",
    addressRegion: "Leyte",
    addressCountry: "PH",
  },
  // TODO: Replace telephone with studio owner's actual phone number before launch
  telephone: "+63XXXXXXXXXX",
  priceRange: "₱₱",
  // TODO: Confirm studio opening hours with client before launch
  openingHours: "Mo-Sa 09:00-17:00",
  // TODO: Replace with verified Facebook page URL before launch
  sameAs: ["https://www.facebook.com/sistersaresassystudio"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="bg-cream text-ink font-body antialiased grain">
        <NavBar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { fontFamily: "var(--font-dm-sans), system-ui, sans-serif" },
          }}
        />
      </body>
    </html>
  );
}
