import { FORMATS, type ExcuseFormat } from "@/types/excuse";
import { OptionButton } from "./Option";

export function FormatSelector({
  value,
  onChange,
}: {
  value: ExcuseFormat;
  onChange: (v: ExcuseFormat) => void;
}) {
  return (
    <section aria-labelledby="format-heading">
      <h2
        id="format-heading"
        className="font-display mb-1 text-xl font-extrabold tracking-tight sm:text-2xl"
      >
        DROP FORMAT
      </h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Chat, story, or full cringe meme mode.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {FORMATS.map((f) => (
          <OptionButton
            key={f.value}
            label={f.label}
            selected={value === f.value}
            onClick={() => onChange(f.value)}
            className="flex flex-col gap-1.5 py-4"
          >
            <span className="text-sm font-extrabold tracking-wide">{f.label}</span>
            <span className="text-xs leading-snug font-medium text-muted-foreground">
              {f.description}
            </span>
          </OptionButton>
        ))}
      </div>
    </section>
  );
}
