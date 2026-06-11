import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

type GenerateButtonProps = {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
};

export function GenerateButton({
  onClick,
  isLoading = false,
  disabled = false,
  className,
}: GenerateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-full bg-peach py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100",
        className,
      )}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <Sparkles className="h-4 w-4" aria-hidden="true" />
      )}
      {isLoading ? "Generating…" : "Generate"}
    </button>
  );
}
