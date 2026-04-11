import { NextRequest, NextResponse } from "next/server";
import { SLOT_MANIFEST } from "@/lib/integrations/slotProtocol";

export async function GET(req: NextRequest) {
  const configuredSecret = process.env.WEBSITE_SYNC_SECRET;
  const incomingSecret = req.headers.get("x-slot-secret");

  if (!configuredSecret || incomingSecret !== configuredSecret) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(SLOT_MANIFEST);
}
