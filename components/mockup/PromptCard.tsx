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
        "flex aspect-[3/4] flex-col justify-between rounded-2xl bg-peach/30 p-5 dark:bg-peach/20",
        className,
      )}
    >
      <p className="line-clamp-[12] text-sm leading-relaxed text-primary">{prompt}</p>
      <div className="flex justify-end">
        <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-primary shadow-sm">
          {model}
        </span>
      </div>
    </div>
  );
}
