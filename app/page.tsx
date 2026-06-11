"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/mockup/Header";
import { HistoryBar } from "@/components/mockup/HistoryBar";
import { HISTORY_THUMBNAILS } from "@/lib/constants";
import type { HistoryItem } from "@/lib/types";

export default function Home() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(
      HISTORY_THUMBNAILS.map((item) => ({
        id: item.id,
        thumbnailUrl: item.url,
        type: item.type,
      })),
    );
  }, []);

  return (
    <div className="min-h-screen bg-cream transition-colors duration-200">
      <Header />
      <div className="space-y-4 py-4">
        <HistoryBar items={history} />
        <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted">Generation workspace loading…</p>
        </main>
      </div>
    </div>
  );
}
