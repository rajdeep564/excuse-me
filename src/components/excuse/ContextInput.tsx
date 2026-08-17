const MAX = 400;

export function ContextInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <section>
      <label htmlFor="context" className="sr-only">
        GOT MORE LORE?
      </label>
      <textarea
        id="context"
        value={value}
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
