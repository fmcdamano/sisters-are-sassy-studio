/**
 * Archive Integration Hook — Pipeline B → Pipeline A
 *
 * STATUS: DORMANT in Phase 2. Do not wire up until Phase 3.
 *
 * This function is called on every successful booking confirmation.
 * In Phase 2 it only logs the payload and does nothing else.
 *
 * Phase 3 wire-up:
 * 1. Provision ARCHIVE_API_URL and ARCHIVE_API_KEY environment variables
 * 2. Uncomment the fetch() call below
 * 3. No data model changes required on either side — the mapping is already correct
 *
 * Field mapping (Pipeline B → Pipeline A):
 *   booking.lastName   → session.lastName
 *   booking.firstName  → session.firstName
 *   booking.year       → session.year (Int)
 *   booking.month      → session.month (Int)
 *   booking.eventType  → session.tags (comma-separated String)
 */
export async function emitToArchive(booking: {
  lastName: string;
  firstName: string;
  year: number;
  month: number;
  eventType: string; // comma-separated tags matching Pipeline A's tag format
}): Promise<void> {
  // TODO Phase 3: Wire this function to call omen-studio-archive POST /api/sessions
  // await fetch(`${process.env.ARCHIVE_API_URL}/api/sessions`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "x-api-key": process.env.ARCHIVE_API_KEY ?? "",
  //   },
  //   body: JSON.stringify({
  //     lastName: booking.lastName,
  //     firstName: booking.firstName,
  //     year: booking.year,
  //     month: booking.month,
  //     tags: booking.eventType,
  //   }),
  // });

  console.log("[Phase 3 Hook — DORMANT] Would emit to archive:", booking);
}
