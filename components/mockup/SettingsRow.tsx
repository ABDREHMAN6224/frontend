"use client";

import { useState } from "react";
import { Hash, Sparkles } from "lucide-react";
import { CustomSelect } from "@/components/shared/CustomSelect";
import { ASPECT_RATIOS, IMAGE_COUNTS, MODELS } from "@/lib/constants";
import { cn } from "@/lib/cn";

type SettingsRowProps = {
  count: number;
  aspectRatio: string;
  model: string;
  onCountChange: (count: number) => void;
  onAspectRatioChange: (ratio: string) => void;
  onModelChange: (model: string) => void;
};

function AspectRatioIcon({ ratio }: { ratio: string }) {
  const shape: Record<string, string> = {
    "1:1": "h-3.5 w-3.5",
    "4:3": "h-3 w-4",
    "3:4": "h-4 w-3",
    "16:9": "h-2.5 w-4",
    "9:16": "h-4 w-2.5",
  };

  return (
    <span
      className={cn(
        "inline-block shrink-0 rounded-[3px] border-[1.5px] border-current",
        shape[ratio] ?? "h-3.5 w-3.5",
      )}
      aria-hidden="true"
    />
  );
}

type OpenField = "count" | "ratio" | "model" | null;

export function SettingsRow({
  count,
  aspectRatio,
  model,
  onCountChange,
  onAspectRatioChange,
  onModelChange,
}: SettingsRowProps) {
  const [openField, setOpenField] = useState<OpenField>(null);

  const countOptions = IMAGE_COUNTS.map((value) => ({
    value: String(value),
    label: value === 1 ? "1 image" : `${value} images`,
    icon: (
      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-peach/10 text-[11px] font-bold text-peach">
        {value}
      </span>
    ),
  }));

  const ratioOptions = ASPECT_RATIOS.map((value) => ({
    value,
    label: value,
    icon: <AspectRatioIcon ratio={value} />,
  }));

  const modelOptions = MODELS.map((value) => ({
    value,
    label: value,
  }));

  return (
    <div className="rounded-2xl bg-surface/50 p-2 ring-1 ring-panel-tint/80">
      <div className="grid grid-cols-2 gap-2">
        <CustomSelect
          label="Count"
          value={String(count)}
          options={countOptions}
          onChange={(value) => onCountChange(Number(value))}
          icon={<Hash className="h-3 w-3" strokeWidth={2.5} />}
          open={openField === "count"}
          onOpenChange={(open) => setOpenField(open ? "count" : null)}
        />
        <CustomSelect
          label="Ratio"
          value={aspectRatio}
          options={ratioOptions}
          onChange={onAspectRatioChange}
          icon={<AspectRatioIcon ratio={aspectRatio} />}
          open={openField === "ratio"}
          onOpenChange={(open) => setOpenField(open ? "ratio" : null)}
        />
        <CustomSelect
          label="Model"
          value={model}
          options={modelOptions}
          onChange={onModelChange}
          icon={<Sparkles className="h-3 w-3" strokeWidth={2.5} />}
          open={openField === "model"}
          onOpenChange={(open) => setOpenField(open ? "model" : null)}
          className="col-span-2"
        />
      </div>
    </div>
  );
}
