import { sql, cosineDistance, gt, desc, eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { productEmbedding } from "~/lib/db/schema";

export const queryProducts = async (
  embeddedQuery: number[],
  options = { minSimilarity: 0.3, maxResults: 20 }
) => {
  const similarity = sql`1 - (${cosineDistance(
    productEmbedding.embedding,
    embeddedQuery
  )})`;

  return db
    .select({
      productNumber: productEmbedding.productNumber,
      productName: productEmbedding.productName,
      manufacturerName: productEmbedding.manufacturerName,
      productDescription: productEmbedding.productDescription,
      technicalDescription: productEmbedding.technicalDescription,
      rawContent: productEmbedding.rawContent,
      imageIds: productEmbedding.imageIds,
      similarity,
    })
    .from(productEmbedding)
    .where(gt(similarity, options.minSimilarity))
    .orderBy((t) => desc(t.similarity))
    .limit(options.maxResults);
};

export const queryProductByProductNumber = async (productNumber: string) => {
  return db
    .select({
      productNumber: productEmbedding.productNumber,
      productName: productEmbedding.productName,
      manufacturerName: productEmbedding.manufacturerName,
      productDescription: productEmbedding.productDescription,
      technicalDescription: productEmbedding.technicalDescription,
      rawContent: productEmbedding.rawContent,
      imageIds: productEmbedding.imageIds,
    })
    .from(productEmbedding)
    .where(eq(productEmbedding.productNumber, productNumber));
};
