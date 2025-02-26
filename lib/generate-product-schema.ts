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
        productDescription: z.string(),
        technicalDescription: z.string(),
        imageIds: z.array(z.string()),
      }),
    }),
    prompt: `Use the following product information to generate a schema: ${productText}. 
    The productDescription is refered to as "Teknisk beskrivelse", while the technicalDescription is refered to as "Tekniske spesifikasjoner" in the ${productText}. 
    The ImageIds is refered to as "Bilde ID" in the ${productText}. `,
  });

  return object.product;
}
