import { MODES, type Mode } from "@/types/excuse";
import { OptionButton } from "./Option";

export function ModeSelector({
  value,
  onChange,
}: {
  value: Mode;
  onChange: (v: Mode) => void;
}) {
  return (
    <section aria-labelledby="mode-heading">
      <h2 id="mode-heading" className="mb-1 text-xl font-extrabold tracking-tight sm:text-2xl">
        HOW BAD SHOULD THIS BE?
      </h2>
      <p className="mb-4 text-sm text-muted-foreground">Choose your level of chaos.</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {MODES.map((m) => (
          <OptionButton
            key={m.value}
            label={m.label}
            selected={value === m.value}
            onClick={() => onChange(m.value)}
            className="flex flex-col gap-1.5 py-4"
          >
            <span className="text-sm font-extrabold tracking-wide">{m.label}</span>
            <span className="text-xs leading-snug font-medium text-muted-foreground">
              {m.description}
            </span>
          </OptionButton>
        ))}
      </div>
    </section>
  );
}
