import { SYSTEM_PROMPT, buildUserPrompt } from "./prompts";
import { excuseResultSchema } from "./validations";
import type { ExcuseRequest, ExcuseResult } from "@/types/excuse";

/** Groq free tier — OpenAI-compatible, no credit card. */
const GATEWAY_URL = "https://api.groq.com/openai/v1/chat/completions";
/** Best chat model available on this Groq key (JSON mode + strong quality). */
const MODEL = "openai/gpt-oss-120b";

/** Lightweight in-memory IP rate limit (per server instance). No Redis by design. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 30;
const hits = new Map<string, number[]>();

export class ExcuseError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

export function checkRateLimit(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    throw new ExcuseError(
      "Whoa. The excuse department needs a breather. Try again in a minute.",
      429,
    );
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
}

function extractJson(text: string): unknown {
  const cleaned = text
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end <= start) throw new ExcuseError("Malformed AI response");
    return JSON.parse(cleaned.slice(start, end + 1));
  }
}

export async function generateExcuse(input: ExcuseRequest): Promise<ExcuseResult> {
  const apiKey = process.env["GROQ_API_KEY"];
  if (!apiKey) throw new ExcuseError("AI is not configured");

  let response: Response;
  try {
    response = await fetch(GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.8,
        max_tokens: 2000,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(input) },
        ],
      }),
    });
  } catch {
    throw new ExcuseError("Network failure talking to the excuse department");
  }

  if (response.status === 429) {
    throw new ExcuseError("Too many excuses at once. Give it a second.", 429);
  }
  if (!response.ok) {
    console.error("Groq API error", response.status, await response.text());
    throw new ExcuseError("AI request failed");
  }

  const payload = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) throw new ExcuseError("Empty AI response");

  const parsed = excuseResultSchema.safeParse(extractJson(content));
  if (!parsed.success) throw new ExcuseError("Malformed AI response");

  const r = parsed.data;
  return {
    excuse: r.excuse,
    shortVersion: r.shortVersion,
    verdict: r.verdict,
    category: r.category,
    scores: {
      believability: Math.round(r.scores.believability),
      suspicion: Math.round(r.scores.suspicion),
      corporateBS: Math.round(r.scores.corporateBS),
    },
  };
}
