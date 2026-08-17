import { BrandMark } from "./BrandMark";

export function SiteNav() {
  return (
    <nav
      className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md"
      aria-label="EXCUSE ME?"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <a href="#generator" className="inline-flex items-center gap-2">
          <BrandMark variant="mark" size="nav" className="hidden sm:inline-flex" />
          <BrandMark variant="wordmark" size="nav" />
        </a>
        <div className="flex items-center gap-3">
          <a
            href="#how-it-works"
            className="text-xs font-bold tracking-wide text-muted-foreground uppercase hover:text-primary"
          >
            How it works
          </a>
          <span className="hidden items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-primary uppercase sm:inline-flex">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            Excuse lab open
          </span>
        </div>
      </div>
    </nav>
  );
}
