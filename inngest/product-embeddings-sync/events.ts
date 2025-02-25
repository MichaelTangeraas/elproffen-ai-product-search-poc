import {
  inngest,
  syncProductEmbeddingsMultipleSchema,
  syncProductEmbeddingsSchema,
} from "../client";
import { createProductText } from "./create-product-text";
import { generateEmbeddingAzure } from "./generate-embedding-azure";
import { getEfoProductData } from "./get-efo-product-data";
import { upsertEmbedding } from "./upsert-embedding";
import generateProductSchema from "~/lib/generate-product-schema";

export const syncProductEmbeddingsMultiple = inngest.createFunction(
  { id: "sync-product-embeddings-multiple" },
  { event: "product/embeddings.sync.multiple" },
  async ({ event, step }) => {
    const { productNumbers } = syncProductEmbeddingsMultipleSchema.parse(
      event.data
    );

    await step.sendEvent(
      "sync-product-embeddings",
      productNumbers.map((productNumber) => ({
        name: "product/embeddings.sync",
        data: { productNumber },
      }))
    );
  }
);

export const syncProductEmbeddings = inngest.createFunction(
  { id: "sync-product-embeddings" },
  { event: "product/embeddings.sync" },
  async ({ event, step }) => {
    const { productNumber } = syncProductEmbeddingsSchema.parse(event.data);

    // 1. retrieve up to date product data and create a comprehensive product text
    const productText = await step.run("Get product text", async () => {
      // TODO: a. retrieve product data from EFO
      const productData = await getEfoProductData(productNumber);
      // TODO: b. create a comprehensive product text from EFO data
      return createProductText(productData);
    });

    // 2. generate a product schema from the product text
    const productSchema = await step.run(
      "Generate product schema",
      async () => {
        return generateProductSchema(productText);
      }
    );

    // 3. use the product text to generate and upsert embeddings
    await step.run("Upsert embeddings", async () => {
      // TODO: a. generate embeddings
      const embedding = await generateEmbeddingAzure(productText);

      // TODO: b. check if the product number matches
      if (productSchema.productNumber !== productNumber) {
        console.warn(
          `Product number mismatch: expected ${productNumber}, got ${productSchema.productNumber}`
        );
        return;
      }

      // TODO: c. upsert embeddings to Neon with pgvector
      await upsertEmbedding({
        productNumber: productNumber,
        productName: productSchema.productName,
        manufacturerName: productSchema.manufacturer,
        technicalDescription: productSchema.technicalDescription,
        rawContent: productText,
        embedding,
      });
    });
  }
);
