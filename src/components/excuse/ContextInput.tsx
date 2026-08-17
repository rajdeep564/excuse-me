const MAX = 400;

export function ContextInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <section aria-labelledby="context-heading">
      <label
        id="context-heading"
        htmlFor="context"
        className="font-display mb-1 block text-xl font-extrabold tracking-tight sm:text-2xl"
      >
        GOT MORE LORE? 👀
      </label>
      <p className="mb-3 text-sm text-muted-foreground">
        Spill the details. The AI cooks from this.
      </p>
      <textarea
        id="context"
        value={value}
        required
        maxLength={MAX}
        rows={3}
        onChange={(e) => onChange(e.target.value.slice(0, MAX))}
        placeholder="Boss already knows I was out late..."
        className="w-full resize-none rounded-2xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
      />
      <div className="mt-1 text-right text-xs text-muted-foreground" aria-live="polite">
        {value.length}/{MAX}
      </div>
    </section>
  );
}
