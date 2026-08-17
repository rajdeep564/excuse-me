import { PRIMARY_SITUATIONS, type Situation } from "@/types/excuse";
import { OptionButton } from "./Option";

export function SituationSelector({
  value,
  onChange,
}: {
  value: Situation;
  onChange: (v: Situation) => void;
}) {
  return (
    <section aria-labelledby="situation-heading">
      <h2
        id="situation-heading"
        className="font-display mb-1 text-xl font-extrabold tracking-tight sm:text-2xl"
      >
        What&apos;s the crime?
      </h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Pick your situation. We&apos;ll handle the rest.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PRIMARY_SITUATIONS.map((s) => (
          <OptionButton
            key={s.value}
            label={s.label}
            selected={value === s.value}
            onClick={() => onChange(s.value)}
            className="flex min-h-[7.5rem] flex-col gap-1.5 px-3 py-4"
          >
            <span className="text-2xl" aria-hidden>
              {s.emoji}
            </span>
            <span className="leading-tight text-foreground">{s.label}</span>
            <span className="text-xs font-medium leading-snug text-muted-foreground">
              {s.micro}
            </span>
          </OptionButton>
        ))}
      </div>
    </section>
  );
}
