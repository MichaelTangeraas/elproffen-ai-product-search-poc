import { CohereClient } from "cohere-ai";
import { CohereRerank } from "@langchain/cohere";

const cohereClient = new CohereClient({
  token: process.env.COHERE_API_KEY,
  environment: process.env.COHERE_ENVIRONMENT,
});

const cohereReranker = new CohereRerank({
  client: cohereClient,
  model: "Cohere-rerank-v3-5-test",
});

export const rerankProducts = async (products: string[], question: string) => {
  const rerankedProducts = await cohereReranker.rerank(products, question, {
    topN: 5,
  });

  return rerankedProducts;
};
