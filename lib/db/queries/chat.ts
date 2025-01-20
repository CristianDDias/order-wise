import { desc, eq } from "drizzle-orm";

import { db } from "@/lib/db/";
import { schema } from "@/lib/db/schemas";

export async function saveChat({ id, userId, messages }: { id: string; userId: string; messages: any }) {
  try {
    const rows = await db.select().from(schema.chat).where(eq(schema.chat.id, id));
    if (rows.length) {
      await db
        .update(schema.chat)
        .set({ messages: JSON.stringify(messages) })
        .where(eq(schema.chat.id, id));
    } else {
      await db.insert(schema.chat).values({
        id,
        userId,
        messages: JSON.stringify(messages),
        createdAt: new Date(),
      });
    }
  } catch (error) {
    console.error("Failed to save chat");
    throw error;
  }
}

export async function getChat({ id }: { id: string }) {
  try {
    const rows = await db.select().from(schema.chat).where(eq(schema.chat.id, id));
    if (!rows.length) {
      return undefined;
    }
    return rows[0];
  } catch (error) {
    console.error("Failed to get chat");
    throw error;
  }
}

export async function getChats({ userId }: { userId: string }) {
  try {
    return await db
      .select()
      .from(schema.chat)
      .where(eq(schema.chat.userId, userId))
      .orderBy(desc(schema.chat.createdAt));
  } catch (error) {
    console.error("Failed to get chats");
    throw error;
  }
}

export async function deleteChat({ id }: { id: string }) {
  try {
    await db.delete(schema.chat).where(eq(schema.chat.id, id));
  } catch (error) {
    console.error("Failed to delete chat");
    throw error;
  }
}
