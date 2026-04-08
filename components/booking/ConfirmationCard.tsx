import { CheckCircle2, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { QRCodeDisplay } from "./QRCodeDisplay";
import { getPackageById } from "@/lib/constants/packages";
import { formatDate } from "@/lib/utils";

interface ConfirmationCardProps {
  firstName: string;
  lastName: string;
  token: string;
  eventType: string;
  eventDate: Date | string;
  packageId: string;
  email?: string | null;
  siteUrl: string;
}

export function ConfirmationCard({
  firstName,
  lastName,
  token,
  eventType,
  eventDate,
  packageId,
  email,
  siteUrl,
}: ConfirmationCardProps) {
  const pkg = getPackageById(packageId);
  const bookingUrl = `${siteUrl}/booking/${token}`;

  const summaryRows = [
    { label: "Name", value: `${firstName} ${lastName}` },
    { label: "Session Type", value: pkg?.label ?? eventType },
    { label: "Preferred Date", value: formatDate(eventDate) },
    { label: "Booking Reference", value: token },
  ];

  return (
    <div className="max-w-lg mx-auto space-y-8">
      {/* Success banner */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-studio-success/15 mb-4">
          <CheckCircle2 className="text-studio-success" size={32} />
        </div>
        <h1 className="font-heading text-3xl md:text-4xl text-charcoal mb-3">
          You&apos;re all booked in!
        </h1>
        <p className="text-gray-500 leading-relaxed">
          We&apos;re so excited to capture this moment with you. Your confirmation email is on its way — along with your unique QR code to view or manage your session anytime.
        </p>
        {email && (
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-gray-500 bg-white border border-light-gray rounded-full px-4 py-2">
            <Mail size={14} className="text-teal" />
            Confirmation sent to <strong>{email}</strong>
          </div>
        )}
      </div>

      {/* Booking summary */}
      <Card>
        <CardContent className="p-0">
          <div className="px-6 pt-5 pb-3 border-b border-light-gray">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Booking Summary
            </p>
          </div>
          <dl className="divide-y divide-light-gray">
            {summaryRows.map((row) => (
              <div key={row.label} className="grid grid-cols-2 gap-4 px-6 py-4">
                <dt className="text-sm text-gray-500">{row.label}</dt>
                <dd
                  className={`text-sm font-medium text-right ${
                    row.label === "Booking Reference"
                      ? "font-mono text-teal"
                      : "text-charcoal"
                  }`}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      {/* QR code */}
      <Card>
        <CardContent className="p-8">
          <p className="text-center font-heading text-lg text-charcoal mb-6">
            Your Booking QR Code
          </p>
          <QRCodeDisplay value={bookingUrl} token={token} />
          <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
            Screenshot or download this QR code — it&apos;s your booking reference.
            You can use it to view or request changes to your session at any time.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
