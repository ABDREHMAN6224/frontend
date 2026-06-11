import { NextResponse } from "next/server";
import { HISTORY_THUMBNAILS } from "@/lib/constants";
import type { HistoryItem } from "@/lib/types";

export async function GET() {
  const items: HistoryItem[] = HISTORY_THUMBNAILS.map((item) => ({
    id: item.id,
    thumbnailUrl: item.url,
    type: item.type,
  }));

  return NextResponse.json(items);
}
