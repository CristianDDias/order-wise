import { Message } from "ai";
import { InferSelectModel } from "drizzle-orm";
import { pgTable, timestamp, json, text, index } from "drizzle-orm/pg-core";

import { user } from "@/lib/db/schemas/auth";

export const chat = pgTable(
  "chat",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    messages: json("messages").notNull(),
    createdAt: timestamp("created_at").notNull(),
  },
  (table) => [index("chat_user_id_index").using("btree", table.userId)],
);
export type Chat = InferSelectModel<typeof chat> & { messages: Message[] };
