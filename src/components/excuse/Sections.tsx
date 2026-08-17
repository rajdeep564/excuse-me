import { useMemo, useState } from "react";
import { Instagram, Shuffle } from "lucide-react";
import { BrandMark } from "./BrandMark";

const IG_URL = "https://www.instagram.com/mat_karr.rajdeep?igsh=b3FpdzltOW11NXpt";
const IG_HANDLE = "@mat_karr.rajdeep";

const EXAMPLES = [
  {
    title: "Late to work",
    text: "Sir cab wale ne galat flyover le liya, 12 min mein desk pe hun.",
    score: 72,
  },
  {
    title: "Didn't reply",
    text: "Saw it, mentally replied, forgot to send the physical version.",
    score: 64,
  },
  {
    title: "Ghosted someone",
    text: "POV: you left her on read because your roommate hijacked the aux.",
    score: 44,
  },
  {
    title: "Didn't study",
    text: "Attendance app hang ho gaya. Main class mein thi, naam nahi laga.",
    score: 61,
  },
  {
    title: "Missed gym",
    text: "My body entered an unexpected maintenance window.",
    score: 58,
  },
  {
    title: "Forgot something",
    text: "I calendar'd it in my head. The head did not sync.",
    score: 51,
  },
];

export function ExampleExcuses() {
  const [seed, setSeed] = useState(0);
  const shown = useMemo(() => {
    const rotated = [
      ...EXAMPLES.slice(seed % EXAMPLES.length),
      ...EXAMPLES.slice(0, seed % EXAMPLES.length),
    ];
    return rotated.slice(0, 4);
  }, [seed]);

  return (
    <section aria-labelledby="examples-heading" className="mx-auto w-full max-w-5xl px-5 py-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2
          id="examples-heading"
          className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl"
        >
          Excuses that escaped the lab
        </h2>
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold tracking-wide text-muted-foreground uppercase hover:text-primary"
        >
          <Shuffle className="size-3.5" aria-hidden />
          Shuffle
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {shown.map((e) => (
          <article key={e.title} className="glass-card rounded-2xl border border-primary/15 p-5">
            <h3 className="text-[11px] font-bold tracking-[0.16em] text-primary uppercase">
              {e.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
              &ldquo;{e.text}&rdquo;
            </p>
            <p className="mt-4 text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
              Believability
            </p>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary" style={{ width: `${e.score}%` }} />
            </div>
            <p className="mt-1 text-xs font-semibold tabular-nums text-muted-foreground">
              {e.score}%
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = ["Pick the mess", "Tell us who", "Choose your chaos", "Send it"];
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="mx-auto w-full max-w-5xl scroll-mt-20 px-5 py-12"
    >
      <h2
        id="how-heading"
        className="font-display mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl"
      >
        How it works
      </h2>
      <ol className="grid gap-3 sm:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s} className="glass-card rounded-2xl border border-border p-5">
            <span className="font-display text-3xl font-extrabold text-primary/80">{i + 1}</span>
            <p className="mt-2 text-sm font-semibold">{s}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t-2 border-border px-5 py-10 text-center">
      <div className="flex justify-center">
        <BrandMark variant="wordmark" size="footer" />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Not an apology. An explanation.</p>
      <a
        href={IG_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-accent/40 bg-accent/10 px-4 py-2 text-sm font-bold text-accent transition-transform hover:scale-[1.03]"
      >
        <Instagram className="size-4" aria-hidden />
        Made by {IG_HANDLE}
      </a>
    </footer>
  );
}
