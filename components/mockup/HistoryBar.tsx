"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { HistoryItem } from "@/lib/types";
import { HistoryGalleryModal } from "./HistoryGalleryModal";

type HistoryBarProps = {
  items: HistoryItem[];
  activeId?: string | null;
  onItemSelect: (item: HistoryItem) => void;
  className?: string;
};

export function HistoryBar({ items, activeId, onItemSelect, className }: HistoryBarProps) {
  const [showGallery, setShowGallery] = useState(false);

  const handleGallerySelect = (item: HistoryItem) => {
    setShowGallery(false);
    onItemSelect(item);
  };

  return (
    <>
      <section aria-label="Generation history" className={cn("px-4 sm:px-6 lg:px-8", className)}>
        <div className="mx-auto flex max-w-[1400px] gap-4 rounded-panel bg-surface p-4 shadow-sm">
          <div className="shrink-0">
            <h2 className="text-sm font-semibold text-primary">History</h2>
            <button
              type="button"
              onClick={() => setShowGallery(true)}
              className="mt-0.5 text-xs text-muted transition-colors hover:text-primary"
            >
              View All
            </button>
          </div>

          <div className="scrollbar-hide flex min-w-0 flex-1 gap-2 overflow-x-auto">
            {items.map((item) => {
              const isActive = item.id === activeId;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onItemSelect(item)}
                  aria-label={`Load generation ${item.id}`}
                  aria-pressed={isActive}
                  className={cn(
                    "relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl transition-all hover:scale-105",
                    isActive
                      ? "ring-2 ring-peach ring-offset-2 ring-offset-surface"
                      : "opacity-80 hover:opacity-100",
                  )}
                >
                  <Image
                    src={item.thumbnailUrl}
                    alt={`History thumbnail ${item.id}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <HistoryGalleryModal
        open={showGallery}
        onClose={() => setShowGallery(false)}
        items={items}
        activeId={activeId}
        onSelect={handleGallerySelect}
      />
    </>
  );
}
