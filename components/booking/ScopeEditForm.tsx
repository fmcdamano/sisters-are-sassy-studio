"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import type { BookingStatus } from "@/lib/types/booking";

interface ScopeEditFormProps {
  token: string;
  currentStatus: BookingStatus;
  onStatusChange: (newStatus: BookingStatus) => void;
}

export function ScopeEditForm({ token, currentStatus, onStatusChange }: ScopeEditFormProps) {
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(
    currentStatus === "SCOPE_CHANGE_REQUESTED"
  );

  if (submitted || currentStatus === "SOFT_CANCELLED" || currentStatus === "COMPLETED") {
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!notes.trim()) {
      toast.error("Please describe what you'd like to change.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`/api/bookings/${token}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "SCOPE_CHANGE_REQUESTED", scopeNotes: notes.trim() }),
      });
      if (!res.ok) throw new Error("Request failed.");
      toast.success("Change request sent! We'll be in touch to confirm.");
      setSubmitted(true);
      onStatusChange("SCOPE_CHANGE_REQUESTED");
    } catch {
      toast.error("Something went wrong. Please try again or contact us on Facebook.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw size={18} className="text-teal" />
          <h2 className="font-heading text-lg text-charcoal">Request a change</h2>
        </div>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          Want to upgrade your package, change your background theme, or adjust your session
          details? Describe what you&apos;d like and we&apos;ll be in touch to confirm.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="scope-notes">What would you like to change?</Label>
            <Textarea
              id="scope-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. I'd like to upgrade to the Family Portrait package and change the backdrop to the floral theme."
              className="min-h-[120px]"
            />
          </div>
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Sending request…" : "Send Change Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
