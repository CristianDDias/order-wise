import { InferSelectModel } from "drizzle-orm";
import { pgTable, timestamp, text, pgEnum, index, real } from "drizzle-orm/pg-core";

import { user } from "@/lib/db/schemas/auth";
import { product } from "@/lib/db/schemas/product";

export const enumOrderStatus = pgEnum("order_status", ["pending", "completed", "refunded"]);
export const enumOrderDeliveryMethod = pgEnum("order_delivery_method", ["delivery", "pickup"]);

export const order = pgTable(
  "order",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    status: enumOrderStatus("status").notNull(),
    total: real("total").notNull(),
    deliveryMethod: enumOrderDeliveryMethod("delivery_method"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (table) => [index("order_user_id_index").using("btree", table.userId)],
);
export type Order = InferSelectModel<typeof order>;

export const orderItem = pgTable(
  "order_item",
  {
    id: text("id").primaryKey(),
    orderId: text("order_id")
      .notNull()
      .references(() => order.id),
    productId: text("product_id")
      .notNull()
      .references(() => product.id),
    quantity: real("quantity").notNull(),
    price: real("price").notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (table) => [index("order_item_order_id_index").using("btree", table.orderId)],
);
export type OrderItem = InferSelectModel<typeof orderItem>;
