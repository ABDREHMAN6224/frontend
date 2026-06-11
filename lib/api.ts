import type { GenerateRequest, GenerateResponse, HistoryItem } from "./types";

export async function fetchHistory(): Promise<HistoryItem[]> {
  const res = await fetch("/api/history");
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}

export async function generateContent(body: GenerateRequest): Promise<GenerateResponse> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to generate content");
  return res.json();
}
