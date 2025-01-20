import { cosineDistance, desc, eq, sql, gt } from "drizzle-orm";

import { db } from "@/lib/db";
import { schema } from "@/lib/db/schemas";

export async function getProduct({ id }: { id: string }) {
  try {
    const rows = await db.select().from(schema.product).where(eq(schema.product.id, id));
    if (!rows.length) {
      return undefined;
    }
    return rows[0];
  } catch (error) {
    console.error("Failed to get product");
    throw error;
  }
}

export async function getProductsBySimilarity({ embedding }: { embedding: number[] }) {
  try {
    const similarity = sql<number>`1 - (${cosineDistance(schema.product.embedding, embedding)})`;
    return await db
      .select({
        id: schema.product.id,
        name: schema.product.name,
        description: schema.product.description,
        price: schema.product.price,
        similarity,
      })
      .from(schema.product)
      .where(gt(similarity, 0.3))
      .orderBy((col) => desc(col.similarity))
      .limit(5);
  } catch (error) {
    console.error("Failed to get products by similarity");
    throw error;
  }
}
