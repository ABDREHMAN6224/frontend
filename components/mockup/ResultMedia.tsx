"use client";

import Image from "next/image";
import { memo } from "react";
import { cn } from "@/lib/cn";
import type { MediaItem } from "@/lib/types";

type ResultMediaProps = {
  item: MediaItem;
  alt: string;
  className?: string;
  priority?: boolean;
};

function ResultMediaComponent({ item, alt, className, priority = false }: ResultMediaProps) {
  if (item.type === "video") {
    return (
      <div className={cn("relative aspect-[3/4] overflow-hidden rounded-2xl bg-panel-tint", className)}>
        <video
          src={item.url}
          className="h-full w-full object-cover"
          controls
          muted
          playsInline
          aria-label={alt}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative aspect-[3/4] overflow-hidden rounded-2xl bg-panel-tint", className)}>
      <Image
        src={item.url}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        className="object-cover transition-transform duration-300 hover:scale-105"
        priority={priority}
      />
    </div>
  );
}

export const ResultMedia = memo(ResultMediaComponent);
