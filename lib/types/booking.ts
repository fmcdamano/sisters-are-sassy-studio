/**
 * Booking status type.
 *
 * Defined here (rather than imported from @prisma/client) because SQLite does
 * not support Prisma enums — the DB field is a plain String. When switching to
 * PostgreSQL for production, restore the enum in prisma/schema.prisma and swap
 * this type for: import type { BookingStatus } from "@prisma/client"
 */
export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SCOPE_CHANGE_REQUESTED"
  | "SOFT_CANCELLED"
  | "COMPLETED";
