import type { Metadata } from "next";
import { BookingManagementClient } from "./BookingManagementClient";

// noindex must be set here via generateMetadata, not inline JSX.
// A <meta> tag inside a Client Component body renders in <body>, not <head>,
// and is ignored by search engines. generateMetadata ensures Next.js injects
// the correct robots tag into <head> at request time.
export async function generateMetadata({
  params,
}: {
  params: { token: string };
}): Promise<Metadata> {
  return {
    title: "Your Booking — Sisters are Sassy Studio",
    description: "View and manage your session booking with Sisters are Sassy Studio.",
    robots: { index: false, follow: false },
    // Prevent this page from being shared or cached via Open Graph
    openGraph: undefined,
  };
}

interface BookingManagementPageProps {
  params: { token: string };
}

export default function BookingManagementPage({ params }: BookingManagementPageProps) {
  return <BookingManagementClient token={params.token} />;
}
