import { tool as createTool } from "ai";
import { z } from "zod";
import { findRelevantProduct } from "~/lib/find-relevant-product";

export const searchForProducts = createTool({
  description:
    "Use this tool when the user is asking about electrical products or equipment. This tool searches for products in our database and returns the most relevant matches. It works best when the user provides specific details about the product they're looking for, such as product type, color, size, or functionality. The tool uses advanced filtering to ensure only the most relevant products are returned. Examples of when to use this tool: 'I need a black cable', 'What switches do you have?', 'Find me some lighting products', 'I'm looking for a 16A circuit breaker', 'Do you have plastic tubes?', 'I need white strip ties'.",
  parameters: z.object({
    question: z
      .string()
      .describe(
        "The question or request from the user about products. Include all details mentioned by the user to improve search relevance, especially product type, color, material, and dimensions."
      ),
  }),
  execute: async ({ question }) => {
    console.log(`Product search query: ${question}`);
    const products = await findRelevantProduct(question);
    return products;
  },
});
