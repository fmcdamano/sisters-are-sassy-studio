"use client";
import { useState, useEffect } from "react";
import { BookingStatusBanner } from "@/components/booking/BookingStatusBanner";
import { BookingDetailCard } from "@/components/booking/BookingDetailCard";
import { ScopeEditForm } from "@/components/booking/ScopeEditForm";
import { SoftCancelPanel } from "@/components/booking/SoftCancelPanel";
import { QRCodeDisplay } from "@/components/booking/QRCodeDisplay";
import type { BookingStatus } from "@/lib/types/booking";

interface BookingData {
  token: string;
  firstName: string;
  lastName: string;
  eventType: string;
  eventDate: string;
  packageId: string;
  contactNumber: string;
  email: string | null;
  status: BookingStatus;
  createdAt: string;
}

interface BookingManagementClientProps {
  token: string;
}

export function BookingManagementClient({ token }: BookingManagementClientProps) {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [status, setStatus] = useState<BookingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<"not_found" | "network" | null>(null);

  useEffect(() => {
    fetch(`/api/bookings/${token}`)
      .then(async (res) => {
        if (res.status === 404) {
          setError("not_found");
          return;
        }
        if (!res.ok) {
          setError("network");
          return;
        }
        const data = await res.json();
        setBooking(data);
        setStatus(data.status);
      })
      .catch(() => setError("network"))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <section className="section-py">
        <div className="section-container max-w-xl mx-auto">
          <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
            Loading your booking…
          </div>
        </div>
      </section>
    );
  }

  if (error === "not_found" || (!booking && !error)) {
    return (
      <section className="section-py">
        <div className="section-container max-w-md mx-auto text-center">
          <div className="mb-6 text-5xl" aria-hidden="true">📷</div>
          <h1 className="font-heading text-3xl text-charcoal mb-4">Booking not found</h1>
          <p className="text-gray-500 leading-relaxed mb-6">
            We couldn&apos;t find a booking with this QR code. It may have expired or the link may
            be incorrect. Please check your confirmation email or contact us on Facebook.
          </p>
          <a
            href="https://www.facebook.com/sistersaresassystudio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal text-sm font-medium hover:underline"
          >
            Contact us on Facebook →
          </a>
        </div>
      </section>
    );
  }

  if (error === "network") {
    return (
      <section className="section-py">
        <div className="section-container max-w-md mx-auto text-center">
          <h1 className="font-heading text-3xl text-charcoal mb-4">Something went wrong</h1>
          <p className="text-gray-500">Please try refreshing the page or contact us on Facebook.</p>
        </div>
      </section>
    );
  }

  if (!booking) return null;

  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://sistersaresassystudio.com";
  const bookingUrl = `${siteUrl}/booking/${token}`;

  return (
    <section className="section-py">
      <div className="section-container">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <p className="text-teal text-xs font-semibold uppercase tracking-widest mb-2">
              Your booking
            </p>
            <h1 className="font-heading text-3xl md:text-4xl text-charcoal">
              {booking.firstName}&apos;s Session
            </h1>
            <p className="text-xs text-gray-400 font-mono mt-1">Ref: {token}</p>
          </div>

          {/* Status banner */}
          {status && <BookingStatusBanner status={status} />}

          {/* Booking details */}
          <BookingDetailCard
            firstName={booking.firstName}
            lastName={booking.lastName}
            eventType={booking.eventType}
            eventDate={booking.eventDate}
            packageId={booking.packageId}
            contactNumber={booking.contactNumber}
            email={booking.email}
            status={status ?? booking.status}
            createdAt={booking.createdAt}
          />

          {/* Scope change form */}
          {status && (
            <ScopeEditForm
              token={token}
              currentStatus={status}
              onStatusChange={(s) => setStatus(s)}
            />
          )}

          {/* Reschedule panel */}
          {status && (
            <SoftCancelPanel
              token={token}
              currentStatus={status}
              onStatusChange={(s) => setStatus(s)}
            />
          )}

          {/* QR Code for sharing / saving */}
          <div className="pt-4 border-t border-light-gray">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 text-center">
              Your booking QR code
            </p>
            <QRCodeDisplay value={bookingUrl} token={token} />
          </div>
        </div>
      </div>
    </section>
  );
}
