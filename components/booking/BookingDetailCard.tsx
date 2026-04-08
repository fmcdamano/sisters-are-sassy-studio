import { Card, CardContent } from "@/components/ui/card";
import { getPackageById } from "@/lib/constants/packages";
import { formatDate } from "@/lib/utils";
import type { BookingStatus } from "@/lib/types/booking";

interface BookingDetailCardProps {
  firstName: string;
  lastName: string;
  eventType: string;
  eventDate: Date | string;
  packageId: string;
  contactNumber: string;
  email?: string | null;
  status: BookingStatus;
  createdAt: Date | string;
}

export function BookingDetailCard({
  firstName,
  lastName,
  eventType,
  eventDate,
  packageId,
  contactNumber,
  email,
  createdAt,
}: BookingDetailCardProps) {
  const pkg = getPackageById(packageId);

  const rows = [
    { label: "Name", value: `${firstName} ${lastName}` },
    { label: "Session Type", value: pkg?.label ?? eventType },
    { label: "Preferred Date", value: formatDate(eventDate) },
    { label: "Package", value: pkg ? `${pkg.label} — ₱${pkg.price.toLocaleString()}` : packageId },
    { label: "Contact Number", value: contactNumber },
    { label: "Email", value: email ?? "Not provided" },
    { label: "Booked on", value: formatDate(createdAt) },
  ];

  return (
    <Card>
      <CardContent className="p-0">
        <div className="px-6 pt-5 pb-3 border-b border-light-gray">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Your Booking Details
          </p>
        </div>
        <dl className="divide-y divide-light-gray">
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-2 gap-4 px-6 py-4">
              <dt className="text-sm text-gray-500">{row.label}</dt>
              <dd className="text-sm font-medium text-charcoal text-right">{row.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
