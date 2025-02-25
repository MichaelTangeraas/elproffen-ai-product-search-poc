import { db } from "~/db";
import { productEmbedding } from "~/db/schema";
import { ProductEmbeddingInsert } from "~/db/types";

type UpsertEmbeddingParams = {
  productNumber: string;
  productName: string;
  manufacturerName: string;
  technicalDescription: string;
  rawContent: string;
  embedding: number[];
};

export const upsertEmbedding = async ({
  productNumber,
  productName,
  manufacturerName,
  technicalDescription,
  rawContent,
  embedding,
}: UpsertEmbeddingParams) => {
  const newProductEmbedding = {
    productNumber,
    productName,
    manufacturerName,
    technicalDescription,
    rawContent,
    embedding,
  } satisfies ProductEmbeddingInsert;

  console.log("newProductEmbedding", newProductEmbedding);

  await db
    .insert(productEmbedding)
    .values(newProductEmbedding)
    .onConflictDoUpdate({
      target: [productEmbedding.productNumber],
      set: newProductEmbedding,
    });
};
