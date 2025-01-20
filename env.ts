import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  server: z.object({
    postgresUrl: z.string(),
    openaiApiKey: z.string(),
    googleClientId: z.string(),
    googleClientSecret: z.string(),
    betterAuthUrl: z.string(),
  }),
  client: z.object({}),
});

export const env = envSchema.parse({
  server: {
    postgresUrl: process.env.POSTGRES_URL,
    openaiApiKey: process.env.OPENAI_API_KEY,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    betterAuthUrl: process.env.BETTER_AUTH_URL,
  },
  client: {},
});
