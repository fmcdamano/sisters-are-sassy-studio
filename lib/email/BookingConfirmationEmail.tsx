import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { getPackageById } from "@/lib/constants/packages";
import { formatDate } from "@/lib/utils";

interface BookingConfirmationEmailProps {
  firstName: string;
  lastName: string;
  token: string;
  eventType: string;
  eventDate: Date | string;
  packageId: string;
  bookingUrl: string;
}

export default function BookingConfirmationEmail({
  firstName,
  lastName,
  token,
  eventType,
  eventDate,
  packageId,
  bookingUrl,
}: BookingConfirmationEmailProps) {
  const pkg = getPackageById(packageId);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sistersaresassystudio.com";

  // Generate QR code as image via public API — avoids client-side rendering in email
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(bookingUrl)}&color=3DBFB8`;

  return (
    <Html>
      <Head />
      <Preview>
        Session confirmed! Here are your Sisters are Sassy Studio booking details and QR code.
      </Preview>
      <Body
        style={{
          backgroundColor: "#FAF8F5",
          fontFamily: "'DM Sans', Arial, sans-serif",
          margin: "0",
          padding: "0",
        }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "40px auto",
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #E8E8E8",
          }}
        >
          {/* Header */}
          <Section
            style={{
              backgroundColor: "#3DBFB8",
              padding: "32px 40px",
              textAlign: "center",
            }}
          >
            {/* {IMAGE: Sisters are Sassy Studio logo — white version on teal background, 160x48} */}
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: "22px",
                fontWeight: "700",
                letterSpacing: "0.05em",
                margin: "0",
              }}
            >
              Sisters are Sassy Studio
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", margin: "4px 0 0" }}>
              Tacloban City, Leyte, Philippines
            </Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: "40px 40px 0" }}>
            <Heading
              style={{
                fontSize: "24px",
                color: "#2C2C2C",
                fontWeight: "700",
                margin: "0 0 8px",
              }}
            >
              Your booking is confirmed!
            </Heading>
            <Text style={{ color: "#2C2C2C", fontSize: "15px", lineHeight: "1.6", margin: "0 0 24px" }}>
              {`Hi ${firstName},`}
            </Text>
            <Text style={{ color: "#2C2C2C", fontSize: "15px", lineHeight: "1.6", margin: "0 0 24px" }}>
              {`We're so happy you've chosen to celebrate this moment with us. Your session details are below — keep this email close, as your QR code is your booking reference for any changes you may need.`}
            </Text>
          </Section>

          {/* Booking Summary Card */}
          <Section style={{ padding: "0 40px" }}>
            <div
              style={{
                backgroundColor: "#FAF8F5",
                border: "1px solid #E8E8E8",
                borderRadius: "12px",
                padding: "24px",
                marginBottom: "24px",
              }}
            >
              <Text
                style={{ color: "#888", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 12px" }}
              >
                Booking Summary
              </Text>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td style={{ color: "#666", fontSize: "13px", paddingBottom: "8px", width: "40%" }}>Name</td>
                    <td style={{ color: "#2C2C2C", fontSize: "13px", fontWeight: "600", paddingBottom: "8px" }}>
                      {firstName} {lastName}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "#666", fontSize: "13px", paddingBottom: "8px" }}>Session Type</td>
                    <td style={{ color: "#2C2C2C", fontSize: "13px", fontWeight: "600", paddingBottom: "8px" }}>
                      {pkg?.label ?? eventType}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "#666", fontSize: "13px", paddingBottom: "8px" }}>Preferred Date</td>
                    <td style={{ color: "#2C2C2C", fontSize: "13px", fontWeight: "600", paddingBottom: "8px" }}>
                      {formatDate(eventDate)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "#666", fontSize: "13px" }}>Booking Ref</td>
                    <td style={{ color: "#3DBFB8", fontSize: "13px", fontWeight: "700", fontFamily: "monospace" }}>
                      {token}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* QR Code */}
          <Section style={{ padding: "0 40px", textAlign: "center" }}>
            <Text style={{ color: "#2C2C2C", fontSize: "14px", fontWeight: "600", margin: "0 0 12px" }}>
              Your booking QR code
            </Text>
            <Img
              src={qrCodeUrl}
              width="160"
              height="160"
              alt={`QR code for booking ${token}`}
              style={{ margin: "0 auto 12px", display: "block" }}
            />
            <Text style={{ color: "#888", fontSize: "12px", lineHeight: "1.5", margin: "0 0 8px" }}>
              Scan this anytime to view or manage your session.
            </Text>
            <Link
              href={bookingUrl}
              style={{ color: "#3DBFB8", fontSize: "12px", textDecoration: "underline" }}
            >
              {bookingUrl}
            </Link>
          </Section>

          <Hr style={{ borderColor: "#E8E8E8", margin: "32px 40px" }} />

          {/* Closing */}
          <Section style={{ padding: "0 40px 32px" }}>
            <Text style={{ color: "#2C2C2C", fontSize: "14px", lineHeight: "1.6", margin: "0 0 16px" }}>
              If you have any questions before your session, just reach out on Facebook — we&apos;re always happy to help. We can&apos;t wait to see you.
            </Text>
            <Text style={{ color: "#2C2C2C", fontSize: "14px", margin: "0 0 4px" }}>
              With love,
            </Text>
            <Text style={{ color: "#3DBFB8", fontSize: "14px", fontWeight: "700", margin: "0 0 24px" }}>
              Sisters are Sassy Studio
            </Text>
            <Link
              href="https://www.facebook.com/sistersaresassystudio"
              style={{ color: "#3DBFB8", fontSize: "13px", textDecoration: "none" }}
            >
              Follow us on Facebook →
            </Link>
          </Section>

          {/* Footer */}
          <Section
            style={{
              backgroundColor: "#F5F5F5",
              padding: "16px 40px",
              borderTop: "1px solid #E8E8E8",
            }}
          >
            <Text style={{ color: "#AAA", fontSize: "11px", margin: "0", textAlign: "center" }}>
              Sisters are Sassy Studio · Tacloban City, Leyte, Philippines
            </Text>
            <Text style={{ color: "#AAA", fontSize: "11px", margin: "4px 0 0", textAlign: "center" }}>
              You received this email because you submitted a booking request through our website.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
