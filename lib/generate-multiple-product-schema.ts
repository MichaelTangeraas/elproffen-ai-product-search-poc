import { azure } from "@ai-sdk/azure";
import { generateObject } from "ai";
import { z } from "zod";

import { systemPrompt } from "~/lib/ai/system-prompt";

interface Products {
  productNumber: string;
  rawContent: string;
  similarity: unknown;
}

export default async function generateMultipleProductSchema(
  products: Products[]
) {
  const { object } = await generateObject({
    model: azure("gpt-4o"),
    system: systemPrompt,
    schema: z.object({
      products: z.array(
        z.object({
          productNumber: z.string(),
          productName: z.string(),
          manufacturer: z.string(),
          technicalDescription: z.string(),
        })
      ),
    }),
    prompt: `Use the following product information to generate a schema for each product. If there are no products, return an empty array: ${products
      .map((product) => `\n${product.productNumber}\n${product.rawContent}`)
      .join("\n")}`,
  });

  return object.products;
}
