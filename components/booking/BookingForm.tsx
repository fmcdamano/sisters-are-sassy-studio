"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookingConfirmStep } from "./BookingConfirmStep";
import { PACKAGES } from "@/lib/constants/packages";

const EVENT_TYPES = [
  { label: "Newborn", value: "newborn" },
  { label: "Maternity", value: "maternity" },
  { label: "Birthday / Children", value: "birthday" },
  { label: "Family Portrait", value: "family" },
  { label: "Professional / Group", value: "professional" },
  { label: "Easter Baby", value: "easter" },
  { label: "Toddler", value: "toddler" },
  { label: "Christmas", value: "christmas" },
];

export interface BookingFormData {
  firstName: string;
  lastName: string;
  eventType: string;
  eventDate: string;
  packageId: string;
  contactNumber: string;
  email: string;
}

const EMPTY_FORM: BookingFormData = {
  firstName: "",
  lastName: "",
  eventType: "",
  eventDate: "",
  packageId: "",
  contactNumber: "",
  email: "",
};

function validate(data: BookingFormData): Partial<Record<keyof BookingFormData, string>> {
  const errors: Partial<Record<keyof BookingFormData, string>> = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  if (!data.lastName.trim()) errors.lastName = "Last name is required.";
  if (!data.eventType) errors.eventType = "Please select a session type.";
  if (!data.eventDate) {
    errors.eventDate = "Please select a preferred date.";
  } else {
    const selected = new Date(data.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected <= today) errors.eventDate = "Please select a future date.";
  }
  if (!data.packageId) errors.packageId = "Please select a package.";
  if (!data.contactNumber.trim()) {
    errors.contactNumber = "Contact number is required.";
  } else if (!/^[\d\s\+\-\(\)]{7,}$/.test(data.contactNumber.trim())) {
    errors.contactNumber = "Please enter a valid phone number.";
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  return errors;
}

export function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"form" | "confirm">("form");
  const [formData, setFormData] = useState<BookingFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  // Pre-populate event type from URL param: /book?type=newborn
  useEffect(() => {
    const type = searchParams.get("type");
    if (type) {
      setFormData((prev) => ({
        ...prev,
        eventType: type,
        packageId: PACKAGES.find((p) => p.slug === type)?.id ?? prev.packageId,
      }));
    }
  }, [searchParams]);

  function handleChange(field: keyof BookingFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleReview() {
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStep("confirm");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed. Please try again.");
      router.push(`/booking/confirmation?token=${data.token}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStep("form");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "confirm") {
    return (
      <BookingConfirmStep
        formData={formData}
        onEdit={() => setStep("form")}
        onConfirm={handleSubmit}
        submitting={submitting}
      />
    );
  }

  // Minimum date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleReview();
      }}
      noValidate
      className="space-y-6"
    >
      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="Maria"
            error={errors.firstName}
            autoComplete="given-name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Reyes"
            error={errors.lastName}
            autoComplete="family-name"
          />
        </div>
      </div>

      {/* Event type */}
      <div className="space-y-1.5">
        <Label htmlFor="eventType">Session Type *</Label>
        <Select value={formData.eventType} onValueChange={(v) => handleChange("eventType", v)}>
          <SelectTrigger id="eventType" error={errors.eventType}>
            <SelectValue placeholder="Select a session type" />
          </SelectTrigger>
          <SelectContent>
            {EVENT_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.eventType && (
          <p id="eventType-error" className="text-xs text-studio-error" role="alert">{errors.eventType}</p>
        )}
      </div>

      {/* Package */}
      <div className="space-y-1.5">
        <Label htmlFor="packageId">Package *</Label>
        <Select value={formData.packageId} onValueChange={(v) => handleChange("packageId", v)}>
          <SelectTrigger id="packageId" error={errors.packageId}>
            <SelectValue placeholder="Select a package" />
          </SelectTrigger>
          <SelectContent>
            {PACKAGES.map((pkg) => (
              <SelectItem key={pkg.id} value={pkg.id}>
                {pkg.label} — ₱{pkg.price.toLocaleString()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.packageId && (
          <p id="packageId-error" className="text-xs text-studio-error" role="alert">{errors.packageId}</p>
        )}
      </div>

      {/* Preferred date */}
      <div className="space-y-1.5">
        <Label htmlFor="eventDate">Preferred Date *</Label>
        <Input
          id="eventDate"
          type="date"
          value={formData.eventDate}
          min={minDate}
          onChange={(e) => handleChange("eventDate", e.target.value)}
          error={errors.eventDate}
        />
        <p className="text-xs text-ink-muted">
          We&apos;ll confirm availability after you submit — this is your preferred date, not a guaranteed booking.
        </p>
      </div>

      {/* Contact number */}
      <div className="space-y-1.5">
        <Label htmlFor="contactNumber">Contact Number *</Label>
        <Input
          id="contactNumber"
          type="tel"
          value={formData.contactNumber}
          onChange={(e) => handleChange("contactNumber", e.target.value)}
          placeholder="+63 912 345 6789"
          error={errors.contactNumber}
          autoComplete="tel"
        />
      </div>

      {/* Email (optional) */}
      <div className="space-y-1.5">
        <Label htmlFor="email">
          Email Address{" "}
          <span className="text-ink-muted font-normal">(optional — for booking confirmation)</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="maria@example.com"
          error={errors.email}
          autoComplete="email"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-ink text-cream hover:bg-ink-soft font-body text-xs tracking-[0.18em] uppercase px-8 py-3.5"
      >
        Review Booking
      </Button>
    </form>
  );
}
