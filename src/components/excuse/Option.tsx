import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-3 text-xs font-bold tracking-[0.18em] text-muted-foreground uppercase">
      {children}
    </h3>
  );
}

export function OptionButton({
  selected,
  onClick,
  children,
  className,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={label}
      className={cn(
        "rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all duration-200 motion-reduce:transform-none motion-reduce:transition-none",
        selected
          ? "glow-ring border-primary bg-primary/15 text-foreground"
          : "border-border bg-card/60 text-muted-foreground hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}
