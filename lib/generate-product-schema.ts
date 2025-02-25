import { azure } from "@ai-sdk/azure";
import { generateObject } from "ai";
import { z } from "zod";

import { systemPrompt } from "~/lib/ai/system-prompt";

export default async function generateProductSchema(productText: string) {
  const { object } = await generateObject({
    model: azure("gpt-4o"),
    system: systemPrompt,
    schema: z.object({
      product: z.object({
        productNumber: z.string(),
        productName: z.string(),
        manufacturer: z.string(),
        technicalDescription: z.string(),
      }),
    }),
    prompt: `Use the following product information to generate a schema: ${productText}`,
  });

  return object.product;
}
