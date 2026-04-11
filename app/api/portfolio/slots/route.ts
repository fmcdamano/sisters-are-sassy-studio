import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const rows = await prisma.portfolioSlotAsset.findMany();
  const slots = rows.reduce<Record<string, string>>((acc, row) => {
    acc[row.slotId] = row.localPath;
    return acc;
  }, {});

  return NextResponse.json({ slots });
}
