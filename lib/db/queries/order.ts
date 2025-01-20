import { and, eq, inArray } from "drizzle-orm";

import { db } from "@/lib/db/";
import { schema } from "@/lib/db/schemas";
import type { Order, OrderItem } from "@/lib/db/schemas";

export async function createOrder(order: Order) {
  try {
    await db.insert(schema.order).values(order);
  } catch (error) {
    console.error("Failed to create order");
    throw error;
  }
}

export async function updateOrder(order: Order & { items?: OrderItem[] }) {
  try {
    await db.transaction(async (transaction) => {
      let itemsToDelete: string[] = [];
      let itemsToInsert: OrderItem[] = [];
      let itemsToUpdate: OrderItem[] = [];

      if (order.items) {
        const newItems = order.items;
        const newItemById = newItems.reduce(
          (acc, item) => {
            acc[item.id] = item;
            return acc;
          },
          {} as Record<string, OrderItem>,
        );
        const oldItems = await db.select().from(schema.orderItem).where(eq(schema.orderItem.orderId, order.id));
        const oldItemById = oldItems.reduce(
          (acc, item) => {
            acc[item.id] = item;
            return acc;
          },
          {} as Record<string, OrderItem>,
        );
        itemsToDelete = oldItems.filter((oldItem) => !newItemById[oldItem.id]).map((item) => item.id);
        itemsToInsert = newItems.filter((newItem) => !oldItemById[newItem.id]);
        itemsToUpdate = newItems.filter((newItem) => oldItemById[newItem.id]);
      }

      const queryUpdateOrder = transaction.update(schema.order).set(order).where(eq(schema.order.id, order.id));
      const queryDeleteItems = itemsToDelete.length
        ? transaction.delete(schema.orderItem).where(inArray(schema.orderItem.id, itemsToDelete))
        : undefined;
      const queryInsertItems = itemsToInsert.length
        ? transaction.insert(schema.orderItem).values(itemsToInsert)
        : undefined;
      const queryUpdateItems = itemsToUpdate.map((item) =>
        transaction.update(schema.orderItem).set(item).where(eq(schema.orderItem.id, item.id)),
      );

      await Promise.all([queryUpdateOrder, queryDeleteItems, queryInsertItems, ...queryUpdateItems]);
    });
  } catch (error) {
    console.error("Failed to update order");
    throw error;
  }
}

export async function getOrder({ orderId, userId }: { orderId: string; userId: string }, { lock = false } = {}) {
  try {
    if (lock) {
      await db
        .select()
        .from(schema.order)
        .where(and(eq(schema.order.id, orderId), eq(schema.order.userId, userId)))
        .for("update");
    }
    const rows = await db
      .select({
        order: schema.order,
        item: schema.orderItem,
      })
      .from(schema.order)
      .leftJoin(schema.orderItem, eq(schema.orderItem.orderId, schema.order.id))
      .where(and(eq(schema.order.id, orderId), eq(schema.order.userId, userId)));
    if (!rows.length) {
      return undefined;
    }
    return { ...rows[0].order, items: rows.map((row) => row.item!).filter((item) => item) };
  } catch (error) {
    console.error("Failed to get order", error);
    throw error;
  }
}
