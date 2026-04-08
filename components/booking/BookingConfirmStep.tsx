"use client";
import { Pencil, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPackageById } from "@/lib/constants/packages";
import { formatDate } from "@/lib/utils";
import type { BookingFormData } from "./BookingForm";

const EVENT_TYPE_LABELS: Record<string, string> = {
  newborn: "Newborn",
  maternity: "Maternity",
  birthday: "Birthday / Children",
  family: "Family Portrait",
  professional: "Professional / Group",
  easter: "Easter Baby",
  toddler: "Toddler",
  christmas: "Christmas",
};

interface BookingConfirmStepProps {
  formData: BookingFormData;
  onEdit: () => void;
  onConfirm: () => void;
  submitting: boolean;
}

export function BookingConfirmStep({
  formData,
  onEdit,
  onConfirm,
  submitting,
}: BookingConfirmStepProps) {
  const pkg = getPackageById(formData.packageId);

  const rows = [
    { label: "Name", value: `${formData.firstName} ${formData.lastName}` },
    { label: "Session Type", value: EVENT_TYPE_LABELS[formData.eventType] ?? formData.eventType },
    { label: "Package", value: pkg ? `${pkg.label} — ₱${pkg.price.toLocaleString()}` : formData.packageId },
    { label: "Preferred Date", value: formData.eventDate ? formatDate(formData.eventDate) : "—" },
    { label: "Contact Number", value: formData.contactNumber },
    { label: "Email", value: formData.email || "Not provided" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="text-studio-success" size={24} />
        <div>
          <h2 className="font-heading text-xl text-charcoal">Review your booking</h2>
          <p className="text-sm text-gray-500">Please confirm your details before submitting.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
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

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        By confirming, you agree that this is a booking <em>request</em>. We&apos;ll contact you on your
        provided number to confirm date availability and finalize your session.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={onEdit}
          disabled={submitting}
        >
          <Pencil size={15} />
          Edit details
        </Button>
        <Button
          type="button"
          size="lg"
          className="flex-1"
          onClick={onConfirm}
          disabled={submitting}
        >
          {submitting ? "Submitting…" : "Confirm & Book"}
        </Button>
      </div>
    </div>
  );
}
