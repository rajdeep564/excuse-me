import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { excuseRequestSchema } from "./validations";
import type { ExcuseRequest, ExcuseResult } from "@/types/excuse";

export const createExcuse = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): ExcuseRequest => excuseRequestSchema.parse(input))
  .handler(async ({ data }): Promise<ExcuseResult> => {
    const { generateExcuse, checkRateLimit, ExcuseError } = await import("./excuse.server");
    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    try {
      checkRateLimit(ip);
      return await generateExcuse(data);
    } catch (error) {
      if (error instanceof ExcuseError && error.status === 429) {
        throw new Error("RATE_LIMIT");
      }
      console.error("createExcuse failed", error);
      throw new Error("EXCUSE_FAILED");
    }
  });
