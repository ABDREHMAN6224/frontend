"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type SelectOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

type CustomSelectProps = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

export function CustomSelect({
  label,
  value,
  options,
  onChange,
  icon,
  open: controlledOpen,
  onOpenChange,
  className,
}: CustomSelectProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const rootRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    const handlePointer = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, setOpen]);

  return (
    <div ref={rootRef} className={cn("relative min-w-0", className)}>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={cn(
          "group flex w-full flex-col gap-1.5 rounded-2xl border bg-surface px-3.5 py-3 text-left shadow-sm transition-all duration-200",
          open
            ? "border-peach/50 shadow-md ring-2 ring-peach/15"
            : "border-panel-tint hover:border-peach/30 hover:shadow-md",
        )}
      >
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
          {icon && (
            <span className="text-peach/80 transition-colors group-hover:text-peach">{icon}</span>
          )}
          {label}
        </span>
        <span className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-semibold leading-tight text-primary">
            {selected?.label ?? value}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted/70 transition-all duration-200 group-hover:text-peach",
              open && "rotate-180 text-peach",
            )}
            aria-hidden="true"
          />
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-labelledby={id}
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-52 overflow-auto rounded-2xl border border-panel-tint/80 bg-surface p-1.5 shadow-xl backdrop-blur-sm animate-fade-in-up"
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                    isSelected
                      ? "bg-peach/12 font-semibold text-primary"
                      : "text-primary hover:bg-panel-tint",
                  )}
                >
                  {option.icon && (
                    <span className={cn("shrink-0", isSelected ? "text-peach" : "text-muted")}>
                      {option.icon}
                    </span>
                  )}
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  {isSelected && <Check className="h-4 w-4 shrink-0 text-peach" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
