import { CheckCircle2, RefreshCw, Clock } from "lucide-react";
import type { BookingStatus } from "@/lib/types/booking";

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; description: string; colorClass: string; icon: React.ReactNode }
> = {
  PENDING: {
    label: "Pending",
    description: "Your booking request has been received. We'll be in touch shortly to confirm.",
    colorClass: "bg-yellow-50 border-yellow-200 text-yellow-800",
    icon: <Clock size={18} className="text-yellow-600" />,
  },
  CONFIRMED: {
    label: "Confirmed",
    description: "Your session is confirmed! We look forward to seeing you.",
    colorClass: "bg-studio-success/10 border-studio-success/30 text-studio-success",
    icon: <CheckCircle2 size={18} className="text-studio-success" />,
  },
  SCOPE_CHANGE_REQUESTED: {
    label: "Change Requested",
    description:
      "We've received your change request and will be in touch to confirm the updated details.",
    colorClass: "bg-blue-50 border-blue-200 text-blue-800",
    icon: <RefreshCw size={18} className="text-blue-600" />,
  },
  SOFT_CANCELLED: {
    label: "Reschedule Requested",
    description:
      "We've received your reschedule request. We'll contact you directly to confirm your new date.",
    colorClass: "bg-orange-50 border-orange-200 text-orange-800",
    icon: <RefreshCw size={18} className="text-orange-600" />,
  },
  COMPLETED: {
    label: "Session Complete",
    description: "Your session has been completed. Thank you for choosing Sisters are Sassy Studio!",
    colorClass: "bg-studio-success/10 border-studio-success/30 text-studio-success",
    icon: <CheckCircle2 size={18} className="text-studio-success" />,
  },
};

interface BookingStatusBannerProps {
  status: BookingStatus;
}

export function BookingStatusBanner({ status }: BookingStatusBannerProps) {
  const config = STATUS_CONFIG[status];

  return (
    <div
      className={`flex items-start gap-3 rounded-btn border px-4 py-3.5 ${config.colorClass}`}
      role="status"
      aria-live="polite"
    >
      <span className="shrink-0 mt-0.5">{config.icon}</span>
      <div>
        <p className="font-semibold text-sm">{config.label}</p>
        <p className="text-sm mt-0.5 opacity-90">{config.description}</p>
      </div>
    </div>
  );
}
