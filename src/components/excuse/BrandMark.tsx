import { cn } from "@/lib/utils";

export function QuestionGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="currentColor">
      <path d="M9 11.2C9 6.9 12.5 3.4 16.8 3.4c4.3 0 7.8 3.5 7.8 7.8 0 3.1-1.7 5.2-4.7 7.2l-2.1 1.4V22.6c0 .9-.8 1.6-1.7 1.6s-1.7-.7-1.7-1.6v-3.9c0-.6.3-1.1.8-1.4l2.5-1.6c2.1-1.4 3.2-2.6 3.2-4.5 0-2.5-2-4.5-4.5-4.5s-4.5 2-4.5 4.5c0 1.1-.9 1.9-2 1.9s-1.9-.8-1.9-1.9Z" />
      <rect x="13.4" y="25.2" width="5.2" height="5.2" rx="1.5" />
    </svg>
  );
}

const SIZE = {
  sm: "text-sm tracking-tight",
  nav: "text-[15px] tracking-tight sm:text-base",
  footer: "text-2xl tracking-tighter sm:text-3xl",
  hero: "text-3xl tracking-tighter sm:text-4xl",
} as const;

export function BrandMark({
  variant = "wordmark",
  size = "nav",
  glow = true,
  className,
}: {
  variant?: "wordmark" | "mark";
  size?: keyof typeof SIZE;
  glow?: boolean;
  className?: string;
}) {
  if (variant === "mark") {
    const px =
      size === "sm"
        ? "size-5"
        : size === "nav"
          ? "size-5"
          : size === "footer"
            ? "size-10"
            : "size-12";
    return (
      <span className={cn("inline-flex text-primary", glow && "mark-glow", className)} aria-hidden>
        <QuestionGlyph className={px} />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "font-display inline-flex items-baseline font-extrabold text-foreground",
        SIZE[size],
        className,
      )}
      aria-label="EXCUSE ME?"
    >
      <span>EXCUSE ME</span>
      <span className="brand-q" aria-hidden>
        ?
      </span>
    </span>
  );
}
