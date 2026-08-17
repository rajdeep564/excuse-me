import { CHAOS, type Chaos } from "@/types/excuse";
import { OptionButton } from "./Option";

export function VibeSelector({ value, onChange }: { value: Chaos; onChange: (v: Chaos) => void }) {
  return (
    <section aria-labelledby="chaos-heading">
      <h2
        id="chaos-heading"
        className="font-display mb-1 text-xl font-extrabold tracking-tight sm:text-2xl"
      >
        How cooked are we?
      </h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Pick a risk level. We&apos;ll cook accordingly.
      </p>
      <div className="grid grid-cols-3 gap-3">
        {CHAOS.map((c) => (
          <OptionButton
            key={c.value}
            label={c.label}
            selected={value === c.value}
            onClick={() => onChange(c.value)}
            className="flex flex-col items-start gap-1 py-4"
          >
            <span className="text-xl" aria-hidden>
              {c.emoji}
            </span>
            <span className="text-sm font-extrabold tracking-wide">{c.label}</span>
            <span className="text-xs leading-snug font-medium text-muted-foreground">
              {c.description}
            </span>
          </OptionButton>
        ))}
      </div>
    </section>
  );
}
