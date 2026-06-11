import { cn } from "@/lib/cn";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  label: string;
};

export function IconButton({
  active = false,
  label,
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl text-primary transition-colors hover:bg-panel-tint",
        active && "bg-panel-tint",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
