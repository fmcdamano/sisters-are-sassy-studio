import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/db";
import { emitToArchive } from "@/lib/hooks/archiveHook";
import { sendBookingConfirmationEmail } from "@/lib/email/sendConfirmationEmail";

/**
 * POST /api/bookings
 * Creates a new booking. Steps:
 * 1. Validate required fields
 * 2. Generate unique token with nanoid
 * 3. Persist to Neon PostgreSQL via Prisma
 * 4. Send confirmation email via Resend (if email provided)
 * 5. Fire dormant archive hook (Phase 3 integration)
 * 6. Return { token }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, eventType, eventDate, packageId, contactNumber, email } = body;

    // Validate required fields
    if (!firstName?.trim() || !lastName?.trim()) {
      return NextResponse.json({ error: "First and last name are required." }, { status: 400 });
    }
    if (!eventType) {
      return NextResponse.json({ error: "Session type is required." }, { status: 400 });
    }
    if (!eventDate) {
      return NextResponse.json({ error: "Preferred date is required." }, { status: 400 });
    }
    if (!packageId) {
      return NextResponse.json({ error: "Package selection is required." }, { status: 400 });
    }
    if (!contactNumber?.trim()) {
      return NextResponse.json({ error: "Contact number is required." }, { status: 400 });
    }

    // Validate future date
    const parsedDate = new Date(eventDate);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format." }, { status: 400 });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (parsedDate <= today) {
      return NextResponse.json({ error: "Event date must be in the future." }, { status: 400 });
    }

    const token = nanoid(12);
    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth() + 1; // 1-indexed

    // Build archive payload — mirrors Pipeline A's Session model exactly.
    // Stored on booking.archivePayload for Phase 3 wire-up. Never mutated after creation.
    const archivePayload = {
      lastName: lastName.trim(),
      firstName: firstName.trim(),
      year,
      month,
      tags: eventType, // comma-separated, matches Pipeline A's tags field
    };

    const booking = await prisma.booking.create({
      data: {
        token,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        year,
        month,
        eventDate: parsedDate,
        eventType,
        packageId,
        contactNumber: contactNumber.trim(),
        email: email?.trim() || null,
        status: "CONFIRMED",
        // Pass the plain object — Prisma serialises Json? fields correctly
        // for both SQLite (dev) and PostgreSQL (production).
        archivePayload,
      },
    });

    // Send confirmation email — fire-and-forget, never throws
    if (booking.email) {
      sendBookingConfirmationEmail({
        firstName: booking.firstName,
        lastName: booking.lastName,
        token: booking.token,
        eventType: booking.eventType,
        eventDate: booking.eventDate,
        packageId: booking.packageId,
        email: booking.email,
      }).catch(console.error);
    }

    // Fire integration hook — DORMANT in Phase 2
    await emitToArchive({
      lastName: booking.lastName,
      firstName: booking.firstName,
      year: booking.year,
      month: booking.month,
      eventType: booking.eventType,
    });

    return NextResponse.json({ token: booking.token }, { status: 201 });
  } catch (error) {
    console.error("[API] POST /api/bookings error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
