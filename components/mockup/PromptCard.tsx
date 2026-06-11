import { cn } from "@/lib/cn";

type PromptCardProps = {
  prompt: string;
  model: string;
  className?: string;
};

export function PromptCard({ prompt, model, className }: PromptCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl bg-peach/30 p-5 dark:bg-peach/20 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-primary sm:line-clamp-2">
        {prompt}
      </p>
      <span className="shrink-0 self-end rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-primary shadow-sm sm:self-auto">
        {model}
      </span>
    </div>
  );
}
