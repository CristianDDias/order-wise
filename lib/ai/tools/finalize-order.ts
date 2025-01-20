import { CoreTool } from "ai";
import { z } from "zod";

import { getSession } from "@/lib/auth";
import { getOrder, updateOrder } from "@/lib/db/queries";

const parameters = z.object({
  orderId: z.string().describe("Order ID"),
  deliveryMethod: z.enum(["delivery", "pickup"]).describe("Delivery method"),
});

export const finalizeOrderTool: CoreTool<typeof parameters> = {
  description: "Finalize an order.",
  parameters,
  execute: async (params) => {
    console.log(JSON.stringify({ tool: "finalizeOrder", params }, null, 2));
    const { orderId, deliveryMethod } = params;

    try {
      const session = await getSession();
      if (!session) {
        return { error: "User is unauthorized" };
      }

      const order = await getOrder({ orderId, userId: session.user.id });
      if (!order) {
        return { error: "Order not found" };
      }
      if (order.status !== "pending") {
        return { error: `It's not allowed to finalize an order with status "${order.status}"` };
      }

      order.deliveryMethod = deliveryMethod;
      order.status = "completed";
      order.updatedAt = new Date();

      await updateOrder(order);

      return order;
    } catch (error) {
      return { error: "Failed to finalize order. Please try again." };
    }
  },
};
