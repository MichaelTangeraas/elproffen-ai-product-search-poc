import { azure } from "@ai-sdk/azure";
import { embed, embedMany } from "ai";

export const generateEmbeddingAzure = async (
  value: string
): Promise<number[]> => {
  const { embedding } = await embed({
    model: azure.textEmbeddingModel("text-embedding-3-small"),
    value,
  });
  return embedding;
};

export const generateEmbeddingsAzure = async (
  value: string
): Promise<number[]> => {
  const { embeddings } = await embedMany({
    model: azure.textEmbeddingModel("text-embedding-3-small"),
    values: [value],
  });
  return embeddings[0];
};
