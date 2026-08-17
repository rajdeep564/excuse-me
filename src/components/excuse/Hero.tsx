import { motion } from "motion/react";
import { Flame, Siren } from "lucide-react";

export function Hero({ onStart, onEmergency }: { onStart: () => void; onEmergency: () => void }) {
  return (
    <header className="grain relative overflow-hidden px-5 pt-16 pb-14 sm:pt-24 sm:pb-20">
      <div className="mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="font-display mb-6 text-sm font-bold tracking-[0.18em] text-muted-foreground uppercase"
        >
          Not an apology. An explanation.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-5xl leading-[0.9] font-extrabold tracking-tighter text-balance sm:text-7xl lg:text-8xl"
        >
          YOU HAVE A PROBLEM.
          <br />
          <span className="text-primary">WE HAVE AN EXCUSE.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          Because &ldquo;my bad&rdquo; isn&apos;t gonna cut it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <button
            type="button"
            onClick={onStart}
            className="glow-ring inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-extrabold tracking-tight text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95 motion-reduce:transform-none"
          >
            <Flame className="size-5" aria-hidden />
            COOK MY EXCUSE
          </button>
          <button
            type="button"
            onClick={onEmergency}
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-accent"
          >
            <Siren className="size-4" aria-hidden />I NEED AN EXCUSE NOW
          </button>
        </motion.div>
      </div>
    </header>
  );
}
