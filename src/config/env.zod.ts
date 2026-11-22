import { z } from "zod";

const portValidator = z.coerce
  .number({
    error: (err): string => {
      if (err.code === "invalid_type") {
        return "PORT must be a number";
      }
      return "PORT must be a valid number";
    },
  })
  .int("PORT must be an integer")
  .positive("PORT must be a positive integer")
  .min(1, "PORT must be greater than 0")
  .max(65535, "PORT must be less than 65536")
  .default(3000);

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: portValidator,
  TRUSTED_ORIGINS: z
    .string()
    .transform((value) => {
      return value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);
    })
    .pipe(z.array(z.string())),

  JSON_PAYLOAD_LIMIT: z.string().default("10kb"),
  API_PREFIX: z.string().default("/api/v1"),
});
