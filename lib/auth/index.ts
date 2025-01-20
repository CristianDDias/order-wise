import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "@/env";
import { db } from "@/lib/db";
import { schema } from "@/lib/db/schemas";

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: env.server.googleClientId,
      clientSecret: env.server.googleClientSecret,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  plugins: [nextCookies()],
  session: {
    cookieCache: {
      enabled: true,
    },
  },
});

export const authClient = createAuthClient({
  baseURL: env.server.betterAuthUrl,
});

export const getSession = async () => {
  return await auth.api.getSession({ headers: await headers() });
};

export const signIn = async () => {
  const { url } = await auth.api.signInSocial({
    headers: await headers(),
    body: { provider: "google" },
  });
  if (url) {
    redirect(url);
  }
};

export const signOut = async () => {
  return await auth.api.signOut({ headers: await headers() });
};
