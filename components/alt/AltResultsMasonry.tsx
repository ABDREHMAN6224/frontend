"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import type { GenerateResponse } from "@/lib/types";

type AltResultsMasonryProps = {
  result: GenerateResponse | null;
  isLoading?: boolean;
  skeletonCount?: number;
};

export function AltResultsMasonry({
  result,
  isLoading = false,
  skeletonCount = 6,
}: AltResultsMasonryProps) {
  if (isLoading) {
    return (
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3" aria-busy="true">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div
            key={`sk-${i}`}
            className="mb-4 h-48 animate-pulse break-inside-avoid rounded-2xl bg-white/10"
          />
        ))}
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-center">
        <p className="max-w-md text-lg text-white/40">
          Your creations will cascade here. Use the dock below to begin.
        </p>
      </div>
    );
  }

  const altBase = result.prompt.slice(0, 80);

  return (
    <div className="space-y-8">
      <blockquote className="border-l-2 border-violet-400/60 pl-6">
        <p className="text-xl font-light leading-relaxed text-white/90 sm:text-2xl">
          &ldquo;{result.prompt}&rdquo;
        </p>
        <footer className="mt-3 text-sm text-violet-300">{result.model}</footer>
      </blockquote>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {result.items.map((item, i) => (
          <div
            key={item.id}
            className={cn(
              "group relative mb-4 h-56 break-inside-avoid overflow-hidden rounded-2xl animate-fade-in-up sm:h-auto",
              i % 3 === 0 ? "sm:h-72" : i % 3 === 1 ? "sm:h-56" : "sm:h-64",
            )}
          >
            {item.type === "video" ? (
              <video
                src={item.url}
                className="h-full w-full object-cover"
                controls
                muted
                playsInline
                aria-label={`${altBase} — video ${i + 1}`}
              />
            ) : (
              <Image
                src={item.url}
                alt={`${altBase} — variation ${i + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
