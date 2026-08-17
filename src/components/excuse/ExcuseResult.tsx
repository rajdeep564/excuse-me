import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, Copy, MessageCircle, RefreshCw, Share2 } from "lucide-react";
import { toast } from "sonner";
import type { ExcuseRequest, ExcuseResult as ExcuseResultType, Personality } from "@/types/excuse";
import { ScoreCard } from "./ScoreCard";
import { believabilityLabel, vibeFields } from "@/types/excuse";

const IG_HANDLE = "mat_karr.rajdeep";

function buildSharePack(result: ExcuseResultType) {
  return `I just generated the world's worst excuse 😂\n\n"${result.excuse}"\n\n— EXCUSE ME?\nby @${IG_HANDLE}`;
}

const VOICES: { id: string; label: string; patch: Partial<ExcuseRequest> }[] = [
  { id: "normal", label: "Normal", patch: { personality: "professional" as Personality } },
  { id: "genz", label: "Gen-Z", patch: { personality: "gen_z" as Personality } },
  { id: "corporate", label: "Corporate", patch: vibeFields("corporate") },
  { id: "hinglish", label: "Hinglish", patch: { language: "hinglish" } },
  { id: "chaotic", label: "Chaotic", patch: vibeFields("insane") },
];

export function ExcuseResult({
  result,
  loading,
  onRetry,
  onTransform,
}: {
  result: ExcuseResultType;
  loading: boolean;
  onRetry: () => void;
  onTransform: (overrides: Partial<ExcuseRequest>) => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const sharePack = buildSharePack(result);
  const score = result.scores.believability;

  async function copyExcuse() {
    try {
      await navigator.clipboard.writeText(result.excuse);
      setCopied(true);
      toast.success("COPIED. GO SAVE YOURSELF. 🫡");
    } catch {
      toast.error("Couldn't copy. Your clipboard said no.");
    }
  }

  function shareWhatsApp() {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(sharePack)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  async function share() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "EXCUSE ME?", text: sharePack });
        return;
      } catch {
        /* cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(sharePack);
      toast.success("Share text copied.");
    } catch {
      toast.error("Sharing didn't work out.");
    }
  }

  const primaryClass =
    "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-extrabold tracking-wide text-primary-foreground uppercase disabled:opacity-50";
  const chipClass =
    "rounded-full border border-border bg-card/70 px-3 py-2 text-xs font-bold tracking-wide uppercase transition-colors hover:border-primary/60 hover:text-primary disabled:opacity-50";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="glass-card grain rounded-3xl border-2 border-primary/30 p-6 sm:p-8"
      aria-live="polite"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-lg font-extrabold tracking-tight sm:text-xl">
          YOUR EXCUSE IS READY.
        </h2>
        <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-bold text-accent">
          {result.category}
        </span>
      </div>

      <p className="font-display mt-5 text-xl leading-snug font-extrabold tracking-tight text-balance whitespace-pre-line sm:text-2xl">
        &ldquo;{result.excuse}&rdquo;
      </p>
      <p className="mt-3 text-sm text-muted-foreground">{result.shortVersion}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="meme-stamp text-primary">EXCUSE STATUS: READY</span>
        <span className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
          BELIEVABILITY: {score}%
        </span>
      </div>

      <div className="mt-4">
        <ScoreCard label="Believability" value={score} tone="primary" />
        <p className="mt-2 text-xs font-bold tracking-wide text-muted-foreground uppercase">
          {believabilityLabel(score)}
        </p>
      </div>

      {result.verdict ? (
        <p className="mt-5 rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm font-semibold">
          {result.verdict}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <button type="button" onClick={() => void copyExcuse()} className={primaryClass}>
          {copied ? (
            <Check className="size-3.5" aria-hidden />
          ) : (
            <Copy className="size-3.5" aria-hidden />
          )}
          {copied ? "Copied" : "Copy this excuse"}
        </button>
        <button type="button" onClick={onRetry} disabled={loading} className={primaryClass}>
          <RefreshCw className="size-3.5" aria-hidden />
          That sounds sus. Try again.
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={shareWhatsApp} className={chipClass}>
          <MessageCircle className="mr-1 inline size-3.5" aria-hidden />
          WhatsApp
        </button>
        <button type="button" onClick={() => void share()} className={chipClass}>
          <Share2 className="mr-1 inline size-3.5" aria-hidden />
          Share
        </button>
      </div>

      <p className="mt-7 mb-2 text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
        Remix it
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={loading}
          onClick={() => onTransform({ ...vibeFields("believable") })}
          className={chipClass}
        >
          More believable
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => onTransform({ ...vibeFields("insane") })}
          className={chipClass}
        >
          More chaotic
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => onTransform({ ...vibeFields("cringe") })}
          className={chipClass}
        >
          Funnier
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => onTransform({ language: "hinglish" })}
          className={chipClass}
        >
          Hinglish
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => onTransform({ ...vibeFields("corporate") })}
          className={chipClass}
        >
          Corporate
        </button>
      </div>

      <p className="mt-6 mb-2 text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
        Make it sound like...
      </p>
      <div className="flex flex-wrap gap-2">
        {VOICES.map((v) => (
          <button
            key={v.id}
            type="button"
            disabled={loading}
            onClick={() => onTransform(v.patch)}
            className={chipClass}
          >
            {v.label}
          </button>
        ))}
      </div>
    </motion.article>
  );
}
