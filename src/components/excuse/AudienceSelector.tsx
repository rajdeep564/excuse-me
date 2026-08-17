import { PRIMARY_AUDIENCES, type Audience } from "@/types/excuse";
import { OptionButton } from "./Option";

export function AudienceSelector({
  value,
  onChange,
}: {
  value: Audience;
  onChange: (v: Audience) => void;
}) {
  return (
    <section aria-labelledby="audience-heading">
      <h2
        id="audience-heading"
        className="font-display mb-3 text-xl font-extrabold tracking-tight sm:text-2xl"
      >
        Who are we lying to?
      </h2>
      <div className="flex flex-wrap gap-2">
        {PRIMARY_AUDIENCES.map((a) => (
          <OptionButton
            key={a.value}
            label={a.label}
            selected={value === a.value}
            onClick={() => onChange(a.value)}
            className="rounded-full px-4 py-2.5"
          >
            <span aria-hidden>{a.emoji}</span> {a.label}
          </OptionButton>
        ))}
      </div>
    </section>
  );
}
