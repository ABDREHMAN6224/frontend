import { NextResponse } from "next/server";
import { HISTORY_ITEMS } from "@/lib/constants";

export async function GET() {
  return NextResponse.json(HISTORY_ITEMS);
}
