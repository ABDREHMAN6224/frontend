"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import type { HistoryItem } from "@/lib/types";

type HistoryBarProps = {
  items: HistoryItem[];
  className?: string;
};

export function HistoryBar({ items, className }: HistoryBarProps) {
  return (
    <section aria-label="Generation history" className={cn("px-4 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto flex max-w-[1400px] gap-4 rounded-panel bg-surface p-4 shadow-sm">
        <div className="shrink-0">
          <h2 className="text-sm font-semibold text-primary">History</h2>
          <button
            type="button"
            className="mt-0.5 text-xs text-muted transition-colors hover:text-primary"
          >
            View All
          </button>
        </div>

        <div className="scrollbar-hide flex min-w-0 flex-1 gap-2 overflow-x-auto">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-label={`View generation ${item.id}`}
              className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl transition-transform hover:scale-105"
            >
              <Image
                src={item.thumbnailUrl}
                alt={`History thumbnail ${item.id}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
