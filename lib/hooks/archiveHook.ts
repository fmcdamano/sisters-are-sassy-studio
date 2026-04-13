/**
 * Archive Integration Hook — Pipeline C (Bookings)
 *
 * STATUS: ACTIVE in Phase 3. Sends the full booking payload to the
 * omen-studio-archive ingest endpoint on every confirmed booking.
 *
 * Activation requirements:
 *   ARCHIVE_INGEST_URL  — e.g. https://archive.sistersaresassystudio.com
 *   ARCHIVE_INGEST_SECRET — shared secret; must match WEBSITE_INGEST_SECRET
 *                           in the archive app's environment
 *
 * Safety guarantees:
 *   - Fire-and-forget: never awaits a response that blocks the booking flow
 *   - Never throws: all errors are swallowed and logged only
 *   - 5-second timeout: prevents slow archive responses from hanging the booking API
 */

export interface ArchiveIngestPayload {
  token: string;
  source: "WEBSITE";
  status: "CONFIRMED";
  firstName: string;
  lastName: string;
  sessionType: string;
  packageId: string;
  preferredDate: string; // ISO string
  contactNumber: string;
  email?: string | null;
  notes?: string | null;
  archivePayloadJson?: string | null;
}

// NOT async — returns void synchronously so no floating Promise enters the RSC event loop.
// fetch runs entirely in the background via .then().catch(); clearTimeout always fires.
export function emitToArchive(payload: ArchiveIngestPayload): void {
  const url = process.env.ARCHIVE_INGEST_URL;
  const secret = process.env.ARCHIVE_INGEST_SECRET;

  // Silently skip if not configured — does not block booking creation
  if (!url || !secret) {
    console.log("[Archive Hook] ARCHIVE_INGEST_URL or ARCHIVE_INGEST_SECRET not set — skipping");
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  fetch(`${url}/api/bookings/ingest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Ingest-Secret": secret,
    },
    body: JSON.stringify(payload),
    signal: controller.signal,
  })
    .then(() => clearTimeout(timeout))
    .catch((err) => {
      clearTimeout(timeout);
      console.error("[Archive Hook] emitToArchive failed (non-blocking):", err);
    });
}
