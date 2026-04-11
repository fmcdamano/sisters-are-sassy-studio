import crypto from "crypto";

export interface SlotSpec {
  slotId: string;
  label: string;
  width: number;
  height: number;
  quality: number;
}

export interface SlotManifest {
  protocolVersion: string;
  slots: SlotSpec[];
}

export interface ArchiveIngestPayload {
  protocolVersion: string;
  assignmentId: string;
  slotId: string;
  tierLabel: string;
  version: number;
  fileId: string;
  artifactUrl: string;
  checksum?: string | null;
  changedAt: string;
}

export const SLOT_MANIFEST: SlotManifest = {
  protocolVersion: "v1",
  slots: [
    { slotId: "hero-primary", label: "Hero Primary", width: 1920, height: 1080, quality: 85 },
    { slotId: "portfolio-feature-1", label: "Portfolio Feature 1", width: 1400, height: 1400, quality: 85 },
    { slotId: "portfolio-feature-2", label: "Portfolio Feature 2", width: 1400, height: 1400, quality: 85 },
    { slotId: "portfolio-feature-3", label: "Portfolio Feature 3", width: 1400, height: 1400, quality: 85 },
    { slotId: "portfolio-feature-4", label: "Portfolio Feature 4", width: 1400, height: 1400, quality: 85 },
  ],
};

export function verifyPayloadSignature(rawBody: string, signature: string, secret: string): boolean {
  const expected = `sha256=${crypto.createHmac("sha256", secret).update(rawBody).digest("hex")}`;
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
