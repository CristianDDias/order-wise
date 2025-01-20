import { CoreTool } from "ai";
import { z } from "zod";

import { getSession } from "@/lib/auth";
import { getOrder } from "@/lib/db/queries";

const parameters = z.object({
  orderId: z.string().describe("Order ID"),
});

export const getOrderTool: CoreTool<typeof parameters> = {
  description: "Get details of an order.",
  parameters,
  execute: async (params) => {
    console.log(JSON.stringify({ tool: "getOrder", params }, null, 2));
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

      return order;
    } catch (error) {
      return { error: "Failed to get order. Please try again." };
    }
  },
};
