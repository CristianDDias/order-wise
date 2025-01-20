import { CoreTool } from "ai";
import { z } from "zod";

import { aiEmbed } from "@/lib/ai";
import { getProductsBySimilarity } from "@/lib/db/queries";

const parameters = z.object({
  preferences: z.array(z.string()).describe("User's preferences"),
});

export const recommendProductsTool: CoreTool<typeof parameters> = {
  description: "Get product recommendations based on user's preferences.",
  parameters,
  execute: async (params) => {
    console.log(JSON.stringify({ tool: "recommendProducts", params }, null, 2));
    const { preferences } = params;

    try {
      const embeddings = await Promise.all(preferences.map((preference) => aiEmbed(preference)));
      const products = await Promise.all(embeddings.map((embedding) => getProductsBySimilarity({ embedding })));
      const productsFlat = products.flat();
      if (!productsFlat.length) {
        return { error: "Products not found" };
      }

      return productsFlat;
    } catch (error) {
      return { error: "Failed to recommend products. Please try again." };
    }
  },
};
