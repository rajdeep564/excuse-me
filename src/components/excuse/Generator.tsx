import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import { ChevronDown, RefreshCw } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { toast } from "sonner";
import { createExcuse } from "@/lib/excuse.functions";
import type {
  Chaos,
  ExcuseRequest,
  ExcuseResult as ExcuseResultType,
  Situation,
} from "@/types/excuse";
import { chaosFields } from "@/types/excuse";
import { SituationSelector } from "./SituationSelector";
import { AudienceSelector } from "./AudienceSelector";
import { VibeSelector } from "./VibeSelector";
import { LanguageSelector } from "./LanguageSelector";
import { ContextInput } from "./ContextInput";
import { GenerateButton } from "./GenerateButton";
import { ExcuseResult } from "./ExcuseResult";
import { EmergencyMode } from "./EmergencyMode";

const ERROR_TITLE = "WE FUMBLED THE EXCUSE.";
const ERROR_BODY = "Try again. The lab is having a moment.";

export function Generator({
  emergencyOpen,
  onEmergencyOpenChange,
}: {
  emergencyOpen: boolean;
  onEmergencyOpenChange: (open: boolean) => void;
}) {
  const [state, setState] = useState<ExcuseRequest>({
    situation: "late_to_work",
    audience: "boss",
    language: "hinglish",
    context: "",
    ...chaosFields("safe"),
  });
  const [chaos, setChaos] = useState<Chaos>("safe");
  const [loreOpen, setLoreOpen] = useState(false);
  const [result, setResult] = useState<ExcuseResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);
  const generate = useServerFn(createExcuse);

  const applyChaos = useCallback((next: Chaos) => {
    setChaos(next);
    setState((s) => ({ ...s, ...chaosFields(next) }));
  }, []);

  const run = useCallback(
    async (overrides?: Partial<ExcuseRequest>) => {
      if (loading) return;
      const next = { ...state, ...overrides };
      setState(next);
      setLoading(true);
      setError(null);
      try {
        const context = next.context?.trim();
        const data = await generate({
          data: {
            situation: next.situation,
            audience: next.audience,
            mode: next.mode,
            personality: next.personality,
            intensity: next.intensity,
            language: next.language,
            format: next.format,
            ...(context ? { context } : {}),
          },
        });
        setResult(data);
        onEmergencyOpenChange(false);
        setCount((c) => {
          const total = c + 1;
          if (total === 10) {
            toast("You've generated 10 excuses.", {
              description: "At this point the problem isn't your excuses. It's your life.",
            });
          }
          return total;
        });
        requestAnimationFrame(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      } catch (e) {
        const rateLimited = e instanceof Error && e.message.includes("RATE_LIMIT");
        setError(
          rateLimited
            ? "Whoa. Slow down. The excuse department caps you at 30 per minute."
            : ERROR_BODY,
        );
      } finally {
        setLoading(false);
      }
    },
    [generate, loading, onEmergencyOpenChange, state],
  );

  function onSituation(situation: Situation) {
    setState((s) => ({ ...s, situation }));
    if (situation === "mood_off") setLoreOpen(true);
  }

  return (
    <div id="generator" className="mx-auto w-full max-w-3xl scroll-mt-20 px-5 pb-8">
      <EmergencyMode
        open={emergencyOpen}
        onOpenChange={onEmergencyOpenChange}
        loading={loading}
        onGenerate={(req) => void run(req)}
      />

      <div className="glass-card grain space-y-8 rounded-3xl p-5 sm:p-8">
        <SituationSelector value={state.situation} onChange={onSituation} />
        <AudienceSelector
          value={state.audience}
          onChange={(audience) => setState((s) => ({ ...s, audience }))}
        />
        <VibeSelector value={chaos} onChange={applyChaos} />

        <div>
          <button
            type="button"
            onClick={() => setLoreOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-primary"
            aria-expanded={loreOpen}
          >
            <ChevronDown
              className={`size-4 transition-transform ${loreOpen ? "rotate-180" : ""}`}
            />
            GOT MORE LORE? 👀
          </button>
          {loreOpen ? (
            <div className="mt-4 space-y-5">
              <ContextInput
                value={state.context ?? ""}
                onChange={(context) => setState((s) => ({ ...s, context }))}
              />
              <LanguageSelector
                value={state.language}
                onChange={(language) => setState((s) => ({ ...s, language }))}
              />
            </div>
          ) : null}
        </div>

        <GenerateButton sticky loading={loading} onGenerate={() => void run()} />
      </div>

      <div ref={resultRef} className="mt-6">
        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="rounded-3xl border border-destructive/50 bg-destructive/10 p-6 text-center"
            >
              <p className="font-display text-lg font-extrabold">{ERROR_TITLE}</p>
              <p className="mt-2 text-sm text-muted-foreground">{error}</p>
              <button
                type="button"
                onClick={() => void run()}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold uppercase hover:border-primary/50"
              >
                <RefreshCw className="size-3.5" aria-hidden />
                Try again
              </button>
            </motion.div>
          ) : result ? (
            <ExcuseResult
              key="result"
              result={result}
              loading={loading}
              onRetry={() => void run()}
              onTransform={(overrides) => void run(overrides)}
            />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 rounded-3xl border border-dashed border-border p-10 text-center"
            >
              <BrandMark variant="mark" size="footer" className="text-muted-foreground" />
              <p className="font-display font-bold">Your alibi lands here.</p>
              <p className="text-sm text-muted-foreground">
                Pick a situation above.
                <br />
                We&apos;ll do the lying.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
