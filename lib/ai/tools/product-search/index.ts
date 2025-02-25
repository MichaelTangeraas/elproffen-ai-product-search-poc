import { tool as createTool } from "ai";
import { z } from "zod";
import { findRelevantProduct } from "~/lib/find-relevant-product";

export const searchForProducts = createTool({
  description:
    "If the user asks a question about a product or more than one product, use this tool to search for the products.",
  parameters: z.object({
    question: z.string().describe("The question the user asked"),
  }),
  execute: async ({ question }) => {
    const products = await findRelevantProduct(question);
    console.log(products);
    return products;
  },
});
