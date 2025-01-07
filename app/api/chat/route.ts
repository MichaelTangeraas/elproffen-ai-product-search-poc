import { azure } from "@ai-sdk/azure";
import { streamText, tool } from "ai";
import { z } from "zod";

import { conductSemanticSearch } from "~/lib/conduct-semantic-search";
import { systemPrompt } from "~/lib/system-prompt";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: azure("gpt-4o"),
    system: systemPrompt,
    temperature: 0.7,
    messages,
    tools: {
      searchForProducts: tool({
        description:
          "If the user asks a question about a product, search for the product and return the product details.",
        parameters: z.object({
          question: z.string().describe("The question the user asked"),
        }),
        execute: async ({ question }) => {
          const products = await conductSemanticSearch(question);
          return products;
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
