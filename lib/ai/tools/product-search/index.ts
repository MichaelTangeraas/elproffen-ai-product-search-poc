import { tool as createTool } from "ai";
import { z } from "zod";
import { findRelevantProduct } from "~/lib/find-relevant-product";

export const searchForProducts = createTool({
  description: `Use this tool when the user is asking about electrical products or equipment. 
    This tool searches for products in our database and returns the most relevant matches. 
    It works best when the user provides specific details about the product they're looking for, such as product type, color, size, or functionality. 
    The tool uses advanced filtering to ensure only the most relevant products are returned. Examples of when to use this tool: 'I need a black cable', 'What switches do you have?', 'Find me some lighting products', 'I'm looking for a 16A circuit breaker', 'Do you have plastic tubes?', 'I need white strip ties'.
    The user might ask for a specific product by its product number as well. If the user asks for multiple product numbers, include all of them in a comma-separated list.`,
  parameters: z.object({
    productQuery: z
      .string()
      .describe(
        "The question or request from the user about products. Include all details mentioned by the user to improve search relevance, especially product type, color, material, and dimensions."
      ),
    productNumbers: z
      .string()
      .describe(
        "The product number(s) of the product(s) the user is looking for. If multiple product numbers are mentioned, include all of them in a comma-separated list. Keep empty if the user is not asking for specific products by their product numbers."
      ),
    originalUserQuery: z
      .string()
      .describe(
        "The original user query, with no enhancements or edits. This is used to rerank the products."
      ),
  }),
  execute: async ({ productQuery, productNumbers, originalUserQuery }) => {
    console.log(`Product search query: ${productQuery}`);
    console.log(`Original user query: ${originalUserQuery}`);
    console.log(`Product numbers: ${productNumbers}`);

    if (productNumbers) {
      const numbers = productNumbers.split(",").map((num) => num.trim());
      if (numbers.length > 1) {
        // Handle multiple product numbers
        const productPromises = numbers.map((num) =>
          findRelevantProduct(productQuery, num)
        );
        const productsArrays = await Promise.all(productPromises);
        // Flatten the array of arrays and filter out empty results
        const allProducts = productsArrays.flat().filter(Boolean);
        return allProducts;
      } else {
        // Single product number
        return findRelevantProduct(productQuery, productNumbers);
      }
    } else {
      // No product number specified
      return findRelevantProduct(productQuery, originalUserQuery);
    }
  },
});
