import { randomUUID } from "crypto";

import { CoreTool } from "ai";
import { z } from "zod";

import { getSession } from "@/lib/auth";
import { createOrder } from "@/lib/db/queries";

const parameters = z.object({});

export const createOrderTool: CoreTool<typeof parameters> = {
  description: "Create an order in pending status.",
  parameters,
  execute: async (params) => {
    console.log(JSON.stringify({ tool: "createOrder", params }, null, 2));

    try {
      const session = await getSession();
      if (!session) {
        return { error: "User is unauthorized" };
      }

      const id = randomUUID();

      await createOrder({
        id: id,
        userId: session.user.id,
        status: "pending",
        total: 0,
        deliveryMethod: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return { id };
    } catch (error) {
      return { error: "Failed to create order. Please try again." };
    }
  },
};
