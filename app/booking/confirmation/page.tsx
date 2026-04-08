import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { ConfirmationCard } from "@/components/booking/ConfirmationCard";

export const metadata: Metadata = {
  title: "Booking Confirmed — Sisters are Sassy Studio",
  description: "Your session has been booked with Sisters are Sassy Studio in Tacloban City, Leyte.",
  robots: { index: false, follow: false },
};

interface ConfirmationPageProps {
  searchParams: { token?: string };
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const { token } = searchParams;

  if (!token) notFound();

  const booking = await prisma.booking.findUnique({ where: { token } });
  if (!booking) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sistersaresassystudio.com";

  return (
    <section className="section-py">
      <div className="section-container">
        <ConfirmationCard
          firstName={booking.firstName}
          lastName={booking.lastName}
          token={booking.token}
          eventType={booking.eventType}
          eventDate={booking.eventDate}
          packageId={booking.packageId}
          email={booking.email}
          siteUrl={siteUrl}
        />
      </div>
    </section>
  );
}
