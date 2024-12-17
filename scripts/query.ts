import { generateEmbeddingAzure } from "~/inngest/product-embeddings-sync/generate-embedding-azure";
import { queryProducts } from "~/lib/queries";

const PROMPT = "Jeg trenger stripps som tåler kulde";

const main = async () => {
  const beforeEmbedding = performance.now();
  const embeddedQuery = await generateEmbeddingAzure(PROMPT);
  console.log(`time embedding: ${performance.now() - beforeEmbedding} ms`);

  const beforeQuery = performance.now();
  const products = await queryProducts(embeddedQuery);
  console.log(`time query: ${performance.now() - beforeQuery} ms`);

  console.log("products", products);
};

main().catch(console.error);
