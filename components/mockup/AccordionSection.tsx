"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type AccordionSectionProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
};

export function AccordionSection({ title, isOpen, onToggle, children }: AccordionSectionProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-panel-tint bg-surface">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between px-4 py-3.5 text-sm font-medium text-primary transition-colors hover:bg-panel-tint"
      >
        {title}
        <ChevronDown
          className={cn("h-4 w-4 text-muted transition-transform duration-200", isOpen && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-panel-tint px-4 py-3 text-sm text-muted">
            {children ?? <p>Additional options coming soon.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
