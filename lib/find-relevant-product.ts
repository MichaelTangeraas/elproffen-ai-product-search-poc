import { generateEmbeddingAzure } from "~/inngest/product-embeddings-sync/generate-embedding-azure";
import { queryProducts } from "./queries";

export const findRelevantProduct = async (question: string) => {
  const embeddedQuery = await generateEmbeddingAzure(question);
  console.log("embeddedQuery", embeddedQuery);
  const products = await queryProducts(embeddedQuery);
  console.log("products", products);
  return products;
};
