import { index, integer, pgTable, text, vector } from "drizzle-orm/pg-core";

export const productEmbedding = pgTable(
  "ProductEmbedding",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    productNumber: text("product_number").notNull().unique(), // EFO product number / ID
    productName: text("product_name").notNull(),
    manufacturerName: text("manufacturer_name").notNull(),
    technicalDescription: text("technical_description").notNull(),
    rawContent: text("raw_content").notNull(),
    embedding: vector("embedding", { dimensions: 1536 }).notNull(),
    productId: integer("product_id"),
  },
  (table) => [index().using("hnsw", table.embedding.op("vector_cosine_ops"))]
);
