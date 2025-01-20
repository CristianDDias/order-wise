import { CoreTool } from "ai";
import { z } from "zod";

import { getSession } from "@/lib/auth";
import { getOrder } from "@/lib/db/queries";

const parameters = z.object({
  orderId: z.string().describe("Order ID"),
});

export const checkOrderStatusTool: CoreTool<typeof parameters> = {
  description: "Check the status of an order.",
  parameters,
  execute: async (params) => {
    console.log(JSON.stringify({ tool: "checkOrderStatus", params }, null, 2));
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

      return { status: order.status };
    } catch (error) {
      return { error: "Failed to check order status. Please try again." };
    }
  },
};
