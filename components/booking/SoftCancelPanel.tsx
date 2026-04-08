"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarX2 } from "lucide-react";
import type { BookingStatus } from "@/lib/types/booking";

interface SoftCancelPanelProps {
  token: string;
  currentStatus: BookingStatus;
  onStatusChange: (newStatus: BookingStatus) => void;
}

export function SoftCancelPanel({ token, currentStatus, onStatusChange }: SoftCancelPanelProps) {
  const [submitting, setSubmitting] = useState(false);

  // Don't show if already in a terminal/requested state
  if (
    currentStatus === "SOFT_CANCELLED" ||
    currentStatus === "COMPLETED"
  ) {
    return null;
  }

  async function handleRequest() {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/bookings/${token}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "SOFT_CANCELLED" }),
      });
      if (!res.ok) throw new Error("Request failed.");
      toast.success("Reschedule request sent. We'll contact you to confirm your new date.");
      onStatusChange("SOFT_CANCELLED");
    } catch {
      toast.error("Something went wrong. Please contact us directly on Facebook.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="border-orange-100">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <CalendarX2 size={18} className="text-orange-500" />
          <h2 className="font-heading text-lg text-charcoal">Need to reschedule?</h2>
        </div>

        {/* CRITICAL: This copy must be unambiguous — never use the word "cancel" as an action */}
        <p className="text-sm text-gray-600 leading-relaxed mb-2">
          <strong>Tapping the button below does not cancel your booking.</strong>
        </p>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          It sends us a message that you&apos;d like to discuss rescheduling. We will contact you
          directly to confirm your new date. Your session remains active until we speak with you.
        </p>

        <Button
          variant="outline"
          className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300"
          onClick={handleRequest}
          disabled={submitting}
        >
          {submitting ? "Sending request…" : "Request to Reschedule"}
        </Button>
      </CardContent>
    </Card>
  );
}
