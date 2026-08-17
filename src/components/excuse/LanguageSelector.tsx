import { LANGUAGES, type Language } from "@/types/excuse";
import { OptionButton } from "./Option";

export function LanguageSelector({
  value,
  onChange,
}: {
  value: Language;
  onChange: (v: Language) => void;
}) {
  return (
    <section aria-labelledby="language-heading">
      <h2
        id="language-heading"
        className="mb-2 text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase"
      >
        Language
      </h2>
      <div className="flex flex-wrap gap-2">
        {LANGUAGES.map((lang) => (
          <OptionButton
            key={lang.value}
            label={lang.label}
            selected={value === lang.value}
            onClick={() => onChange(lang.value)}
            className="rounded-full px-4 py-2"
          >
            {lang.label}
          </OptionButton>
        ))}
      </div>
    </section>
  );
}
