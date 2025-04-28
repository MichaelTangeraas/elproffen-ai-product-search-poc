import { generateEmbeddingAzure } from "~/inngest/product-embeddings-sync/generate-embedding-azure";
import { queryProducts, queryProductByProductNumber } from "./queries";

import { rerankProducts } from "./ai/reranker/embedding-reranker";
import { enhanceUserQuery } from "./ai/prompt-enhancer/product-prompt-enhancer";

export const findRelevantProduct = async (
  productQuery: string,
  originalUserQuery: string,
  productNumber?: string
) => {
  if (productNumber) {
    console.log("Starting product number search");
    console.log("productNumber", productNumber);
    const product = await queryProductByProductNumber(productNumber);
    console.log("product", product);
    return product;
  }

  const enhancedQuestion = await enhanceUserQuery(productQuery);

  // Add context to the question to improve embedding quality
  console.log("enhancedQuestion", enhancedQuestion);

  // Generate embedding for the enhanced question
  const embeddedQuery = await generateEmbeddingAzure(enhancedQuestion);

  // Query products using the embedding
  const products = await queryProducts(embeddedQuery);

  console.log("products", products.length);

  // With the reranker we use the original question/prompt to rerank the products
  const rerankedProducts = await rerankProducts(
    products.map((product) => product.rawContent),
    originalUserQuery
  );

  console.log("rerankedProducts", rerankedProducts);

  const sortedProducts = rerankedProducts
    .filter((product) => product.relevanceScore > 0.4)
    .map((product) => {
      return products[product.index];
    });

  console.log("sortedProducts", sortedProducts);

  return sortedProducts;
};
