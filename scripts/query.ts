import { generateEmbedding } from "~/inngest/product-embeddings-sync/generate-embedding";
import { queryProducts } from "~/lib/queries";

const INPUT = "Jeg trenger stripps som tåler kulde";

const main = async () => {
  const beforeEmbedding = performance.now();
  const embeddedQuery = await generateEmbedding(INPUT);
  console.log(`time embedding: ${performance.now() - beforeEmbedding} ms`);

  const beforeQuery = performance.now();
  const products = await queryProducts(embeddedQuery);
  console.log(`time query: ${performance.now() - beforeQuery} ms`);

  console.log("products", products);
};

main().catch(console.error);
