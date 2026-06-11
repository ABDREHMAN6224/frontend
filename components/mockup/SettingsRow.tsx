"use client";

import { ChevronDown } from "lucide-react";
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

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly (string | number)[];
  onChange: (val: string) => void;
}) {
  return (
    <div className="relative flex-1">
      <label className="sr-only" htmlFor={label}>
        {label}
      </label>
      <select
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-panel-tint bg-surface py-2.5 pl-3 pr-8 text-xs font-medium text-primary outline-none transition-colors focus:border-peach"
      >
        {options.map((opt) => (
          <option key={String(opt)} value={String(opt)}>
            {label === "Image count" ? `# ${opt}` : label === "Aspect ratio" ? opt : `Model: ${opt}`}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
    </div>
  );
}

export function SettingsRow({
  count,
  aspectRatio,
  model,
  onCountChange,
  onAspectRatioChange,
  onModelChange,
}: SettingsRowProps) {
  return (
    <div className={cn("flex gap-2")}>
      <SelectField
        label="Image count"
        value={String(count)}
        options={IMAGE_COUNTS}
        onChange={(v) => onCountChange(Number(v))}
      />
      <SelectField
        label="Aspect ratio"
        value={aspectRatio}
        options={ASPECT_RATIOS}
        onChange={onAspectRatioChange}
      />
      <SelectField
        label="Model"
        value={model}
        options={MODELS}
        onChange={onModelChange}
      />
    </div>
  );
}
