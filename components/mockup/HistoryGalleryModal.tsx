"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { HistoryItem } from "@/lib/types";

type HistoryGalleryModalProps = {
  open: boolean;
  onClose: () => void;
  items: HistoryItem[];
  activeId?: string | null;
  onSelect: (item: HistoryItem) => void;
};

export function HistoryGalleryModal({
  open,
  onClose,
  items,
  activeId,
  onSelect,
}: HistoryGalleryModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Generation history gallery"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close gallery"
      />
      <div className="relative z-10 flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-panel bg-surface shadow-xl">
        <div className="flex items-center justify-between border-b border-panel-tint px-5 py-4">
          <h2 className="text-base font-semibold text-primary">All generations</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-muted transition-colors hover:bg-panel-tint hover:text-primary"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-5">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item)}
                aria-label={`Load generation ${item.id}`}
                aria-pressed={item.id === activeId}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-2xl transition-all hover:scale-105",
                  item.id === activeId && "ring-2 ring-peach ring-offset-2 ring-offset-surface",
                )}
              >
                <Image
                  src={item.thumbnailUrl}
                  alt={`History thumbnail ${item.id}`}
                  fill
                  sizes="(max-width: 640px) 33vw, 20vw"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
