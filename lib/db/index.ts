import { AsyncLocalStorage } from "async_hooks";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
import { schema } from "@/lib/db/schemas";

const client = postgres(env.server.postgresUrl, { prepare: false });
const database = drizzle({ client, schema });

const transactionStorage = new AsyncLocalStorage<typeof db>();

export const db = new Proxy(database, {
  get(target, prop, receiver) {
    const transaction = transactionStorage.getStore();
    if (transaction) {
      return transaction[prop as keyof typeof db];
    }
    return Reflect.get(target, prop, receiver);
  },
});

export async function transaction<T>(callback: () => Promise<T>) {
  const transaction = transactionStorage.getStore();
  if (transaction) {
    return await callback();
  }
  return await db.transaction(async (transaction) => {
    return await transactionStorage.run(transaction as any, async () => {
      return await callback();
    });
  });
}
