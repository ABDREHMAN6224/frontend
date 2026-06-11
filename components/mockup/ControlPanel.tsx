"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { DEFAULT_PROMPT, MODELS } from "@/lib/constants";
import type { MediaType } from "@/lib/types";
import { AccordionSection } from "./AccordionSection";
import { GenerateButton } from "./GenerateButton";
import { PromptTextarea } from "./PromptTextarea";
import { SettingsRow } from "./SettingsRow";

type ControlPanelProps = {
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
  className?: string;
};

export function ControlPanel({
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
  className,
}: ControlPanelProps) {
  const [advanceOpen, setAdvanceOpen] = useState(false);
  const [stylesOpen, setStylesOpen] = useState(false);

  return (
    <aside
      aria-label="Generation controls"
      className={cn(
        "flex w-full shrink-0 flex-col gap-4 rounded-panel bg-panel-tint p-4 shadow-sm lg:w-80 xl:w-[340px]",
        className,
      )}
    >
      <div className="flex rounded-full bg-surface p-1" role="tablist" aria-label="Media type">
        {(["image", "video"] as const).map((type) => (
          <button
            key={type}
            type="button"
            role="tab"
            aria-selected={mediaType === type}
            onClick={() => onMediaTypeChange(type)}
            className={cn(
              "flex-1 rounded-full py-2 text-sm font-medium capitalize transition-colors duration-200",
              mediaType === type
                ? "bg-peach text-white shadow-sm"
                : "text-muted hover:text-primary",
            )}
          >
            {type}
          </button>
        ))}
      </div>

      <PromptTextarea value={prompt} onChange={onPromptChange} />

      <GenerateButton
        onClick={onGenerate}
        isLoading={isGenerating}
        disabled={!prompt.trim()}
      />

      <SettingsRow
        count={count}
        aspectRatio={aspectRatio}
        model={model}
        onCountChange={onCountChange}
        onAspectRatioChange={onAspectRatioChange}
        onModelChange={onModelChange}
      />

      <div className="flex flex-col gap-2">
        <AccordionSection
          title="Advance"
          isOpen={advanceOpen}
          onToggle={() => setAdvanceOpen((o) => !o)}
        >
          <p>Negative prompt, seed, and guidance scale controls.</p>
        </AccordionSection>
        <AccordionSection
          title="Styles"
          isOpen={stylesOpen}
          onToggle={() => setStylesOpen((o) => !o)}
        >
          <p>Photorealistic, illustration, anime, and cinematic presets.</p>
        </AccordionSection>
      </div>
    </aside>
  );
}

export function useControlPanelDefaults() {
  return {
    prompt: DEFAULT_PROMPT,
    mediaType: "image" as MediaType,
    count: 4,
    aspectRatio: "1:1",
    model: MODELS[0],
  };
}
