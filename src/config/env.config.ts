import { config } from "dotenv";
import { resolve } from "node:path";
import { envSchema } from "./env.zod.js";
import { z } from "zod";

enum Env {
  development = "development",
  production = "production",
}

const nodeEnv = process.env.NODE_ENV ?? Env.development;

if (!Object.values(Env).includes(nodeEnv as Env)) {
  throw new Error(`Invalid NODE_ENV: ${nodeEnv}`);
}

const envFiles = {
  [Env.development]: ".env.development",
  [Env.production]: ".env.production",
} satisfies Record<Env, string>;

const envFile = envFiles[nodeEnv as Env];

if (!envFile) {
  throw new Error(
    `Invalid NODE_ENV: ${nodeEnv} , Expected: development or production`,
  );
}

const result = config({ path: resolve(process.cwd(), envFile) });

if (result.error) {
  throw new Error(`Failed to load environment file: ${envFile}`, {
    cause: result.error,
  });
}

const parsedEnv = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  TRUSTED_ORIGINS: process.env.TRUSTED_ORIGINS,
  JSON_PAYLOAD_LIMIT: process.env.JSON_PAYLOAD_LIMIT,
});

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");
  console.error(z.prettifyError(parsedEnv.error));

  process.exit(1);
}

export const { NODE_ENV, PORT, TRUSTED_ORIGINS, JSON_PAYLOAD_LIMIT } =
  parsedEnv.data;
