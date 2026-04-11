import { promises as fs } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  verifyPayloadSignature,
  type ArchiveIngestPayload,
} from "@/lib/integrations/slotProtocol";

function fileExtensionFromContentType(contentType: string | null) {
  if (!contentType) return "jpg";
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  return "jpg";
}

export async function POST(req: NextRequest) {
  const secret = process.env.WEBSITE_SYNC_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "WEBSITE_SYNC_SECRET is not configured." }, { status: 500 });
  }

  const signature = req.headers.get("x-omen-signature");
  if (!signature) {
    return NextResponse.json({ message: "Missing signature." }, { status: 401 });
  }

  const rawBody = await req.text();
  if (!verifyPayloadSignature(rawBody, signature, secret)) {
    return NextResponse.json({ message: "Invalid signature." }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as ArchiveIngestPayload;
  if (!payload?.slotId || !payload?.artifactUrl || !payload?.assignmentId) {
    return NextResponse.json({ message: "Invalid payload." }, { status: 400 });
  }

  const current = await prisma.portfolioSlotAsset.findUnique({
    where: { slotId: payload.slotId },
  });
  if (current && current.sourceVersion >= payload.version) {
    return NextResponse.json({ message: "Already applied.", skipped: true });
  }

  const remoteRes = await fetch(payload.artifactUrl, { cache: "no-store" });
  if (!remoteRes.ok) {
    return NextResponse.json({ message: "Artifact download failed." }, { status: 502 });
  }

  const ext = fileExtensionFromContentType(remoteRes.headers.get("content-type"));
  const bytes = Buffer.from(await remoteRes.arrayBuffer());
  const relativePath = `/assigned/${payload.slotId}-v${payload.version}.${ext}`;
  const absolutePath = path.join(process.cwd(), "public", relativePath);

  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await fs.writeFile(absolutePath, bytes);

  await prisma.portfolioSlotAsset.upsert({
    where: { slotId: payload.slotId },
    update: {
      assignmentId: payload.assignmentId,
      sourceFileId: payload.fileId,
      tierLabel: payload.tierLabel,
      sourceVersion: payload.version,
      protocolVersion: payload.protocolVersion,
      localPath: relativePath,
      checksum: payload.checksum ?? null,
    },
    create: {
      slotId: payload.slotId,
      assignmentId: payload.assignmentId,
      sourceFileId: payload.fileId,
      tierLabel: payload.tierLabel,
      sourceVersion: payload.version,
      protocolVersion: payload.protocolVersion,
      localPath: relativePath,
      checksum: payload.checksum ?? null,
    },
  });

  revalidatePath("/");
  revalidatePath("/portfolio");

  return NextResponse.json({ ok: true, slotId: payload.slotId, localPath: relativePath });
}
