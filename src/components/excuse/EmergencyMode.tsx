import { useState } from "react";
import { Flame, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OptionButton } from "./Option";
import type { Audience, ExcuseRequest, Situation } from "@/types/excuse";
import { chaosFields } from "@/types/excuse";

const EMERGENCY_SITUATIONS: { value: Situation; label: string }[] = [
  { value: "late_to_work", label: "Late" },
  { value: "forgot_bday", label: "Forgot" },
  { value: "didnt_reply", label: "Didn't reply" },
  { value: "unfinished_task", label: "Missed something" },
  { value: "mood_off", label: "Other" },
];

const EMERGENCY_WHO: { value: Audience; label: string }[] = [
  { value: "boss", label: "Boss" },
  { value: "friend", label: "Friend" },
  { value: "partner", label: "Partner" },
  { value: "teacher", label: "Teacher" },
];

export function EmergencyMode({
  open,
  onOpenChange,
  onGenerate,
  loading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (request: ExcuseRequest) => void;
  loading: boolean;
}) {
  const [situation, setSituation] = useState<Situation>("late_to_work");
  const [audience, setAudience] = useState<Audience>("boss");

  function cook() {
    onGenerate({
      situation,
      audience,
      language: "hinglish",
      ...chaosFields("safe"),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl border-border bg-card sm:rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-extrabold">
            I need an excuse now
          </DialogTitle>
          <DialogDescription>Two taps. We&apos;ll handle the rest.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div>
            <p className="mb-2 text-xs font-bold tracking-wide text-muted-foreground uppercase">
              What happened?
            </p>
            <div className="flex flex-wrap gap-2">
              {EMERGENCY_SITUATIONS.map((s) => (
                <OptionButton
                  key={s.value}
                  label={s.label}
                  selected={situation === s.value}
                  onClick={() => setSituation(s.value)}
                  className="rounded-full px-3 py-2"
                >
                  {s.label}
                </OptionButton>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold tracking-wide text-muted-foreground uppercase">
              Who?
            </p>
            <div className="flex flex-wrap gap-2">
              {EMERGENCY_WHO.map((w) => (
                <OptionButton
                  key={w.value}
                  label={w.label}
                  selected={audience === w.value}
                  onClick={() => setAudience(w.value)}
                  className="rounded-full px-3 py-2"
                >
                  {w.label}
                </OptionButton>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={cook}
            disabled={loading}
            className="glow-ring flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-extrabold text-primary-foreground disabled:opacity-80"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Cooking...
              </>
            ) : (
              <>
                <Flame className="size-4" aria-hidden />
                COOK MY EXCUSE
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
