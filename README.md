# EXCUSE ME?

**Not an apology. An explanation.**

You have a problem. We have an excuse.

An AI-powered excuse generator. Pick a situation, an audience, a mode, a personality
and an intensity level, add optional context, and get a funny excuse with
believability / suspicion / corporate-BS scores.

## Stack

- TanStack Start (React 19 + Vite 7, file-based routing)
- TypeScript, Tailwind CSS v4 design tokens, shadcn/ui primitives
- Motion for animations, Lucide icons, Sonner toasts
- GPT OSS (`openai/gpt-oss-120b`) via Groq free API — server-side only

## Local development

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # production build
```

## Environment variables

Copy `.env.example` to `.env` and set:

- `GROQ_API_KEY` — free API key from [Groq Console](https://console.groq.com/keys)
  (no credit card). It is read only inside the server function handler and never
  shipped to the browser.

## Architecture

```
src/
  routes/index.tsx              landing page + generator
  components/excuse/*           Hero, Generator, selectors, result card, sections
  lib/excuse.functions.ts       createServerFn RPC entry point (thin wrapper)
  lib/excuse.server.ts          Groq API call, JSON parsing, rate limiting
  lib/prompts.ts                system + user prompt construction
  lib/validations.ts            zod schemas for request and AI response
  types/excuse.ts               shared types and option catalogs
```

- No database, no auth, no external services beyond Groq. Client-side state only.
- The AI is only called on explicit user action.
- In-memory IP rate limit: 30 generations per minute per instance (no Redis).
- AI output is validated with zod and rendered as plain text (never raw HTML).

## Deployment

The build must succeed (`npm run build`) and `GROQ_API_KEY` must be present
in the server environment.
