import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendStudioNotificationEmail } from "@/lib/email/sendConfirmationEmail";
import type { BookingStatus } from "@/lib/types/booking";

const ALLOWED_PATCH_STATUSES: BookingStatus[] = ["SCOPE_CHANGE_REQUESTED", "SOFT_CANCELLED"];

/**
 * GET /api/bookings/[token]
 * Returns booking details for a given token.
 * Returns 404 with a user-friendly message if not found.
 */
export async function GET(
  _request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { token: params.token },
      select: {
        token: true,
        firstName: true,
        lastName: true,
        eventType: true,
        eventDate: true,
        packageId: true,
        contactNumber: true,
        email: true,
        status: true,
        scopeNotes: true,
        createdAt: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found. Please check your QR code or confirmation email." },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("[API] GET /api/bookings/[token] error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

/**
 * PATCH /api/bookings/[token]
 * Updates booking status (scope change or reschedule request).
 * Only SCOPE_CHANGE_REQUESTED and SOFT_CANCELLED are allowed from the client.
 */
export async function PATCH(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const body = await request.json();
    const { status, scopeNotes } = body as {
      status?: BookingStatus;
      scopeNotes?: string;
    };

    if (!status || !ALLOWED_PATCH_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Status must be one of: ${ALLOWED_PATCH_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    // Verify booking exists before updating
    const existing = await prisma.booking.findUnique({
      where: { token: params.token },
      select: { token: true, status: true, firstName: true, lastName: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    // Don't allow re-requesting if already in the same state
    if (existing.status === status) {
      return NextResponse.json(
        { error: "Booking is already in the requested status." },
        { status: 409 }
      );
    }

    const updated = await prisma.booking.update({
      where: { token: params.token },
      data: {
        status,
        ...(scopeNotes ? { scopeNotes } : {}),
      },
      select: { token: true, status: true },
    });

    // Notify studio owner of the change
    sendStudioNotificationEmail({
      firstName: existing.firstName,
      lastName: existing.lastName,
      token: existing.token,
      requestType: status,
      scopeNotes,
    }).catch(console.error);

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[API] PATCH /api/bookings/[token] error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
