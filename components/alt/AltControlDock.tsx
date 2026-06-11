"use client";

import { Loader2, Sparkles } from "lucide-react";
import { ASPECT_RATIOS, IMAGE_COUNTS, MODELS } from "@/lib/constants";
import type { MediaType } from "@/lib/types";
import { cn } from "@/lib/cn";

type AltControlDockProps = {
  prompt: string;
  mediaType: MediaType;
  count: number;
  aspectRatio: string;
  model: string;
  isGenerating: boolean;
  onPromptChange: (value: string) => void;
  onMediaTypeChange: (type: MediaType) => void;
  onCountChange: (count: number) => void;
  onAspectRatioChange: (ratio: string) => void;
  onModelChange: (model: string) => void;
  onGenerate: () => void;
};

export function AltControlDock({
  prompt,
  mediaType,
  count,
  aspectRatio,
  model,
  isGenerating,
  onPromptChange,
  onMediaTypeChange,
  onCountChange,
  onAspectRatioChange,
  onModelChange,
  onGenerate,
}: AltControlDockProps) {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:bottom-8 sm:left-1/2 sm:right-auto sm:w-full sm:max-w-2xl sm:-translate-x-1/2">
      <div className="rounded-3xl border border-white/15 bg-black/60 p-4 shadow-2xl backdrop-blur-2xl sm:p-5">
        <div className="mb-3 flex gap-2" role="tablist" aria-label="Media type">
          {(["image", "video"] as const).map((type) => (
            <button
              key={type}
              type="button"
              role="tab"
              aria-selected={mediaType === type}
              onClick={() => onMediaTypeChange(type)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors",
                mediaType === type ? "bg-violet-500 text-white" : "text-white/50 hover:text-white",
              )}
            >
              {type}
            </button>
          ))}
        </div>

        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          rows={2}
          aria-label="Generation prompt"
          placeholder="Describe your vision…"
          className="mb-3 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-violet-400/50"
        />

        <div className="mb-3 flex flex-wrap gap-2">
          <select
            aria-label="Image count"
            value={count}
            onChange={(e) => onCountChange(Number(e.target.value))}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none"
          >
            {IMAGE_COUNTS.map((n) => (
              <option key={n} value={n} className="bg-zinc-900">
                {n} images
              </option>
            ))}
          </select>
          <select
            aria-label="Aspect ratio"
            value={aspectRatio}
            onChange={(e) => onAspectRatioChange(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none"
          >
            {ASPECT_RATIOS.map((r) => (
              <option key={r} value={r} className="bg-zinc-900">
                {r}
              </option>
            ))}
          </select>
          <select
            aria-label="Model"
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none"
          >
            {MODELS.map((m) => (
              <option key={m} value={m} className="bg-zinc-900">
                {m}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {isGenerating ? "Creating…" : "Create"}
        </button>
      </div>
    </div>
  );
}
