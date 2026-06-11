"use client";

import { cn } from "@/lib/cn";
import type { GenerateResponse } from "@/lib/types";
import { PromptCard } from "./PromptCard";
import { ResultMedia } from "./ResultMedia";

type ResultsGridProps = {
  result: GenerateResponse | null;
  isLoading?: boolean;
  skeletonCount?: number;
  className?: string;
};

function SkeletonTile() {
  return (
    <div className="aspect-[3/4] animate-pulse rounded-2xl bg-panel-tint" aria-hidden="true" />
  );
}

export function ResultsGrid({
  result,
  isLoading = false,
  skeletonCount = 8,
  className,
}: ResultsGridProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          className,
        )}
        aria-busy="true"
        aria-label="Generating content"
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonTile key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  if (!result || result.items.length === 0) {
    return (
      <div
        className={cn(
          "flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-panel-tint bg-surface/50 p-8 text-center",
          className,
        )}
      >
        <p className="text-sm text-muted">
          Your generated {result?.type ?? "image"}s will appear here.
        </p>
      </div>
    );
  }

  const altBase = result.prompt.slice(0, 80);
  const firstRow = result.items.slice(0, 4);
  const secondRowMedia = result.items.slice(4);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
      aria-label="Generated results"
    >
      {firstRow.map((item, i) => (
        <ResultMedia
          key={item.id}
          item={item}
          alt={`${altBase} — variation ${i + 1}`}
          priority={i < 2}
          className="animate-fade-in-up"
        />
      ))}

      <PromptCard
        prompt={result.prompt}
        model={result.model}
        className="animate-fade-in-up"
      />

      {secondRowMedia.map((item, i) => (
        <ResultMedia
          key={item.id}
          item={item}
          alt={`${altBase} — variation ${i + 5}`}
          className="animate-fade-in-up"
        />
      ))}
    </div>
  );
}
