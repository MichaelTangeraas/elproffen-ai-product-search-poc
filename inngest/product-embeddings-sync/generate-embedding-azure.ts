import { createAzure } from "@ai-sdk/azure";
import { embed, embedMany } from "ai";

// This azure resource is for the US region to gain access to the embedding-small model
const azureClient = createAzure({
  apiKey: process.env.AZURE_US_API_KEY,
  resourceName: process.env.AZURE_US_RESOURCE_NAME,
});

export const generateEmbeddingAzure = async (
  value: string
): Promise<number[]> => {
  const { embedding } = await embed({
    model: azureClient.textEmbeddingModel("text-embedding-3-small"),
    value,
  });
  return embedding;
};

export const generateEmbeddingsAzure = async (
  value: string
): Promise<number[]> => {
  const { embeddings } = await embedMany({
    model: azureClient.textEmbeddingModel("text-embedding-3-small"),
    values: [value],
  });
  return embeddings[0];
};
