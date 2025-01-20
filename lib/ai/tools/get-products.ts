import { CoreTool } from "ai";
import { z } from "zod";

import { aiEmbed } from "@/lib/ai";
import { getProductsBySimilarity } from "@/lib/db/queries";

const parameters = z.object({
  query: z.string().describe("Query to search for products"),
});

export const getProductsTool: CoreTool<typeof parameters> = {
  description: "Get product details like ID, name, price, etc.",
  parameters,
  execute: async (params) => {
    console.log(JSON.stringify({ tool: "getProducts", params }, null, 2));
    const { query } = params;

    try {
      const products = await getProductsBySimilarity({ embedding: await aiEmbed(query) });
      if (!products.length) {
        return { error: "Products not found" };
      }

      return products;
    } catch (error) {
      return { error: "Failed to get products. Please try again." };
    }
  },
};
