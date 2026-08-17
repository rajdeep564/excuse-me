import { Slider } from "@/components/ui/slider";
import { intensityLabel } from "@/types/excuse";
import { motion } from "motion/react";

export function IntensitySlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <section aria-labelledby="intensity-heading">
      <h2
        id="intensity-heading"
        className="mb-1 text-xl font-extrabold tracking-tight sm:text-2xl"
      >
        EXCUSE INTENSITY
      </h2>
      <p className="mb-5 text-sm text-muted-foreground">
        0 = lowkey fine. 100 = you&apos;re cooked.
      </p>

      <Slider
        value={[value]}
        min={0}
        max={100}
        step={1}
        onValueChange={(v) => onChange(v[0] ?? 0)}
        aria-label="Excuse intensity"
      />

      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>Lowkey fine</span>
        <motion.span
          key={intensityLabel(value)}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-bold text-primary"
        >
          {value} — {intensityLabel(value)}
        </motion.span>
        <span className="hidden sm:inline">You&apos;re cooked</span>
      </div>

      {value === 100 && (
        <p className="mt-3 text-xs font-bold tracking-widest text-warning uppercase">
          ⚠️ Excuse engine overheating
        </p>
      )}
    </section>
  );
}
