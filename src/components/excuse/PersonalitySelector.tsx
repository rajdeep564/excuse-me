import { PERSONALITIES, type Personality } from "@/types/excuse";
import { OptionButton } from "./Option";

export function PersonalitySelector({
  value,
  onChange,
}: {
  value: Personality;
  onChange: (v: Personality) => void;
}) {
  return (
    <section aria-labelledby="personality-heading">
      <h2
        id="personality-heading"
        className="mb-1 text-xl font-extrabold tracking-tight sm:text-2xl"
      >
        PICK A PERSONALITY
      </h2>
      <p className="mb-4 text-sm text-muted-foreground">Who are you being today?</p>
      <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:overflow-visible">
        {PERSONALITIES.map((p) => (
          <OptionButton
            key={p.value}
            label={p.label}
            selected={value === p.value}
            onClick={() => onChange(p.value)}
            className="flex shrink-0 snap-start items-center gap-2 rounded-full px-4 py-2 whitespace-nowrap"
          >
            <span aria-hidden>{p.emoji}</span>
            {p.label}
          </OptionButton>
        ))}
      </div>
    </section>
  );
}
