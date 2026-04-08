import { Resend } from "resend";
import BookingConfirmationEmail from "./BookingConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY ?? "re_placeholder_no_email");

interface SendConfirmationEmailParams {
  firstName: string;
  lastName: string;
  token: string;
  eventType: string;
  eventDate: Date;
  packageId: string;
  email: string;
}

/**
 * Sends the booking confirmation email to the client.
 * Never throws — booking flow must complete even if email fails.
 */
export async function sendBookingConfirmationEmail(
  params: SendConfirmationEmailParams
): Promise<void> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const bookingUrl = `${siteUrl}/booking/${params.token}`;

  const { error } = await resend.emails.send({
    from: process.env.FROM_EMAIL ?? "onboarding@resend.dev",
    to: params.email,
    bcc: process.env.STUDIO_NOTIFICATION_EMAIL, // studio owner receives a copy of every confirmation
    subject: "Your booking is confirmed — Sisters are Sassy Studio",
    react: BookingConfirmationEmail({ ...params, bookingUrl }),
  });

  if (error) {
    console.error("[Email] Failed to send booking confirmation:", error);
  }
}

/**
 * Notifies the studio owner when a client submits a scope change or reschedule request.
 * Never throws.
 */
export async function sendStudioNotificationEmail(params: {
  firstName: string;
  lastName: string;
  token: string;
  requestType: "SCOPE_CHANGE_REQUESTED" | "SOFT_CANCELLED";
  scopeNotes?: string;
}): Promise<void> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const bookingUrl = `${siteUrl}/booking/${params.token}`;
  const subject =
    params.requestType === "SCOPE_CHANGE_REQUESTED"
      ? `Scope change requested — ${params.firstName} ${params.lastName}`
      : `Reschedule requested — ${params.firstName} ${params.lastName}`;

  const { error } = await resend.emails.send({
    from: process.env.FROM_EMAIL ?? "onboarding@resend.dev",
    to: process.env.STUDIO_NOTIFICATION_EMAIL ?? "",
    subject,
    text: [
      `Client: ${params.firstName} ${params.lastName}`,
      `Request type: ${params.requestType}`,
      params.scopeNotes ? `Notes: ${params.scopeNotes}` : "",
      `Booking link: ${bookingUrl}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("[Email] Failed to send studio notification:", error);
  }
}
