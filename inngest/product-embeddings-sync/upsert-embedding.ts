import { db } from "~/db";
import { productEmbedding } from "~/db/schema";
import { ProductEmbeddingInsert } from "~/db/types";

type UpsertEmbeddingParams = {
  productNumber: string;
  productName: string;
  manufacturerName: string;
  productDescription: string;
  technicalDescription: string;
  imageIds: string[];
  rawContent: string;
  embedding: number[];
};

export const upsertEmbedding = async ({
  productNumber,
  productName,
  manufacturerName,
  productDescription,
  technicalDescription,
  imageIds,
  rawContent,
  embedding,
}: UpsertEmbeddingParams) => {
  const newProductEmbedding = {
    productNumber,
    productName,
    manufacturerName,
    productDescription,
    technicalDescription,
    imageIds,
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
