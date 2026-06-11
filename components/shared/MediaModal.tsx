"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { MediaType } from "@/lib/types";

type MediaModalProps = {
  open: boolean;
  onClose: () => void;
  url: string;
  type: MediaType;
  alt: string;
};

function toFullSizeUrl(url: string): string {
  return url.replace(/\/(\d+)\/(\d+)(?:\?.*)?$/, "/1200/1200");
}

export function MediaModal({ open, onClose, url, type, alt }: MediaModalProps) {
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

  const fullUrl = toFullSizeUrl(url);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close preview"
      />
      <div className="relative z-10 max-h-[90vh] max-w-[min(90vw,900px)] overflow-hidden rounded-2xl bg-surface shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 rounded-full bg-black/50 p-1.5 text-white transition-colors hover:bg-black/70"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        {type === "video" ? (
          <video
            src={url}
            controls
            autoPlay
            className="max-h-[85vh] w-full object-contain"
            aria-label={alt}
          />
        ) : (
          <div className="relative aspect-square w-[min(85vw,800px)]">
            <Image
              src={fullUrl}
              alt={alt}
              fill
              sizes="(max-width: 900px) 90vw, 800px"
              className="object-contain"
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
}
