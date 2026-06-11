import { NextResponse } from "next/server";
import { ASPECT_RATIO_DIMENSIONS } from "@/lib/constants";
import type { GenerateRequest, GenerateResponse, MediaItem } from "@/lib/types";

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function buildItems(
  prompt: string,
  type: GenerateRequest["type"],
  count: number,
  aspectRatio: string,
  generationId: string,
): MediaItem[] {
  const dims = ASPECT_RATIO_DIMENSIONS[aspectRatio] ?? ASPECT_RATIO_DIMENSIONS["1:1"];

  return Array.from({ length: count }, (_, i) => {
    const seed = `${generationId}-${hashString(prompt)}-${i}`;
    return {
      id: `${generationId}-item-${i}`,
      url:
        type === "image"
          ? `https://picsum.photos/seed/${seed}/${dims.w}/${dims.h}`
          : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      type,
    };
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as GenerateRequest;
  const { prompt, type, count, aspectRatio, model } = body;

  if (!prompt?.trim()) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 800));

  const id = `gen-${Date.now()}`;
  const items = buildItems(prompt, type, Math.min(count, 8), aspectRatio, id);

  const response: GenerateResponse = {
    id,
    prompt,
    model,
    type,
    items,
  };

  return NextResponse.json(response);
}
