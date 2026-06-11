import { cn } from "@/lib/cn";

type PromptTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function PromptTextarea({ value, onChange, className }: PromptTextareaProps) {
  return (
    <textarea
      id="prompt"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Describe your imaginations to be converted to piece of art..."
      rows={6}
      aria-label="Generation prompt"
      className={cn(
        "w-full resize-none rounded-2xl border border-panel-tint bg-surface px-4 py-3 text-sm text-primary placeholder:text-muted outline-none transition-colors focus:border-peach",
        className,
      )}
    />
  );
}
