import { CoreTool } from "ai";
import { z } from "zod";

import { getSession } from "@/lib/auth";
import { getOrder, updateOrder } from "@/lib/db/queries";

const parameters = z.object({
  orderId: z.string().describe("Order ID"),
});

export const refundOrderTool: CoreTool<typeof parameters> = {
  description: "Refund an order.",
  parameters,
  execute: async (params) => {
    console.log(JSON.stringify({ tool: "refundOrder", params }, null, 2));
    const { orderId } = params;

    try {
      const session = await getSession();
      if (!session) {
        return { error: "User is unauthorized" };
      }

      const order = await getOrder({ orderId, userId: session.user.id });
      if (!order) {
        return { error: "Order not found" };
      }
      if (order.status !== "completed") {
        return { error: `It's not allowed to refund an order with status "${order.status}"` };
      }

      order.status = "refunded";
      order.updatedAt = new Date();

      await updateOrder(order);

      return order;
    } catch (error) {
      return { error: "Failed to refund order. Please try again." };
    }
  },
};
