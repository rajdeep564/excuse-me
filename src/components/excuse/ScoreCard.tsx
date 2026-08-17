import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export function ScoreCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "primary" | "accent" | "warning";
}) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const steps = 40;
    const id = setInterval(() => {
      frame += 1;
      setDisplay(Math.round((value * frame) / steps));
      if (frame >= steps) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [value, reduced]);

  const barColor =
    tone === "primary" ? "bg-primary" : tone === "accent" ? "bg-accent" : "bg-warning";

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[11px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
          {label}
        </span>
        <span className="text-sm font-extrabold tabular-nums">{display}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-secondary"
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: reduced ? 0 : 0.9, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
