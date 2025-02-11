import { defineConfig } from "drizzle-kit";

import { env } from "@/env";

export default defineConfig({
  schema: "./lib/db/schemas/*",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.server.postgresUrl,
  },
});
