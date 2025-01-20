import { InferSelectModel } from "drizzle-orm";
import { pgTable, timestamp, text, vector, index, real } from "drizzle-orm/pg-core";

export const product = pgTable(
  "product",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    price: real("price").notNull(),
    embedding: vector("embedding", { dimensions: 1536 }).notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (table) => [index("product_embedding_index").using("hnsw", table.embedding.op("vector_cosine_ops"))],
);
export type Product = InferSelectModel<typeof product>;
