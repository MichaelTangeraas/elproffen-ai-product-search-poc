import { sql, cosineDistance, gt, desc } from "drizzle-orm";
import { db } from "~/db";
import { productEmbedding } from "~/db/schema";

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
