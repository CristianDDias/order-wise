import { randomUUID } from "crypto";

import { CoreTool } from "ai";
import { z } from "zod";

import { getSession } from "@/lib/auth";
import { transaction } from "@/lib/db";
import { getOrder, getProduct, updateOrder } from "@/lib/db/queries";

const parameters = z.object({
  orderId: z.string().describe("Order ID"),
  items: z
    .object({
      productId: z.string().describe("Product ID"),
      quantity: z.number().positive().optional().describe("Quantity"),
      action: z
        .enum(["increase_quantity", "decrease_quantity", "set_quantity", "remove"])
        .describe("Action to perform"),
    })
    .array()
    .describe("List of items and actions to perform"),
});

export const updateOrderTool: CoreTool<typeof parameters> = {
  description:
    "Update an order. It's necessary to get the product IDs from the system using the `getProducts` tool or `recommendProducts` tool before calling this tool.",
  parameters,
  execute: async (params) => {
    console.log(JSON.stringify({ tool: "updateOrder", params }, null, 2));
    const { orderId, items } = params;

    try {
      const session = await getSession();
      if (!session) {
        return { error: "User is unauthorized" };
      }

      return await transaction(async () => {
        const order = await getOrder({ orderId, userId: session.user.id }, { lock: true });
        if (!order) {
          return { error: "Order not found" };
        }
        if (order.status !== "pending") {
          return { error: `It's not allowed to update an order with status "${order.status}"` };
        }

        for (const item of items) {
          const orderItem = order.items.find((orderItem) => orderItem.productId === item.productId);
          if (["set_quantity", "increase_quantity", "decrease_quantity"].includes(item.action) && !item.quantity) {
            return { error: `Action "${item.action}" requires a quantity` };
          }
          if (["increase_quantity", "decrease_quantity", "remove"].includes(item.action) && !orderItem) {
            return { error: `Action "${item.action}" requires a product ID "${item.productId}" in the order` };
          }
          if (item.action === "set_quantity" && !orderItem) {
            const product = await getProduct({ id: item.productId });
            if (!product) {
              return { error: `Product ID ${item.productId} not found` };
            }
            order.items.push({
              id: randomUUID(),
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity!,
              price: product.price,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          } else {
            if (item.action === "set_quantity") {
              orderItem!.quantity = item.quantity!;
            } else if (item.action === "increase_quantity") {
              orderItem!.quantity += item.quantity!;
            } else if (item.action === "decrease_quantity") {
              orderItem!.quantity -= item.quantity!;
            }
            if (item.action === "remove" || orderItem!.quantity <= 0) {
              order.items = order.items.filter((orderItem) => orderItem.productId !== item.productId);
            }
          }
        }

        order.total = order.items.reduce((total, orderItem) => {
          return total + orderItem.quantity * orderItem.price;
        }, 0);
        order.updatedAt = new Date();

        await updateOrder(order);

        return order;
      });
    } catch (error) {
      return { error: "Failed to update order. Please try again." };
    }
  },
};
