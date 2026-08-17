import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Flame } from "lucide-react";
import { BrandMark } from "./BrandMark";

const LOADING_MESSAGES = [
  "COOKING THE STORY...",
  "Checking the alibi...",
  "Removing suspicious details...",
  "Making it sound believable...",
  "Consulting absolutely nobody...",
];

export function GenerateButton({
  loading,
  onGenerate,
  sticky,
}: {
  loading: boolean;
  onGenerate: () => void;
  sticky?: boolean;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!loading) {
      setIndex(0);
      return;
    }
    const id = setInterval(() => setIndex((i) => (i + 1) % LOADING_MESSAGES.length), 900);
    return () => clearInterval(id);
  }, [loading]);

  return (
    <div className={sticky ? "sticky bottom-3 z-30 sm:static sm:bottom-auto" : undefined}>
      <motion.button
        type="button"
        onClick={onGenerate}
        disabled={loading}
        whileTap={{ scale: 0.97 }}
        className="glow-ring flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-extrabold tracking-tight text-primary-foreground shadow-lg transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-80 motion-reduce:transform-none"
      >
        {loading ? (
          <>
            <BrandMark
              variant="mark"
              size="sm"
              glow={false}
              className="text-primary-foreground animate-pulse motion-reduce:animate-none"
            />
            <span aria-live="polite">{LOADING_MESSAGES[index]}</span>
          </>
        ) : (
          <>
            <Flame className="size-5" aria-hidden />
            COOK MY EXCUSE
          </>
        )}
      </motion.button>
    </div>
  );
}
