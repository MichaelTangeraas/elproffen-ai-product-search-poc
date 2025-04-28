import { azure } from "@ai-sdk/azure";
import { generateText } from "ai";

// Extract prompt to a separate constants file
const QUERY_ENHANCEMENT_SYSTEM_PROMPT = `You are a specialized query enhancement assistant for an electrical products database. Your task is to transform user queries about electrical products into more effective search queries for a vector similarity search system.

  The database contains electrical products with details like:
  - Product names (e.g., cables, circuit breakers, strip ties)
  - Technical specifications (dimensions, materials, ratings)
  - Applications and use cases
  - Manufacturer information

  When enhancing queries:
  1. Identify the core product type or category the user is looking for
  2. Include relevant technical terms that might appear in product descriptions
  3. Add potential synonyms or related terms that could match similar products
  4. Incorporate any specifications mentioned (colors, sizes, materials, etc.)
  5. Consider the likely intent behind vague queries

  Important guidelines:
  - Keep the enhanced query natural and conversational, not a structured list of attributes
  - Focus on electrical industry terminology that would appear in product descriptions
  - For vague queries, expand with common specifications but maintain the original intent
  - Your output should be 1-3 sentences that capture the essence of what the user is looking for
  - Do not add specifications that weren't implied in the original query

  Examples:
  
  User: "Har dere noen rør jeg kan bruke til å dra el-kabler gjennom?"
  Enhanced: "Elektriske installasjonsrør for kabelføring, trekkerør for elektriske kabler, kabelkanaler eller flexrør for beskyttelse av elektriske ledninger. Kan inkludere PVC-rør, korrigerte rør eller stive plastrør for innendørs eller utendørs kabelinstallasjon."
  
  User: "Trenger svarte strips"
  Enhanced: "Svarte kabelstrips eller buntebånd for elektriske installasjoner. Kan være UV-bestandige strips for utendørs bruk eller standard polyamid strips for innendørs kabelorganisering."
  
  User: "16A automatsikring"
  Enhanced: "16 ampere automatsikring eller effektbryter for elektriske installasjoner. Kan inkludere 1-polet eller flerpolet utførelse, C-karakteristikk, for bolig eller industribruk."`;

/**
 * Enhances a user query using AI to improve search results
 * @param question The original user query
 * @returns Enhanced query text
 */
export async function enhanceUserQuery(question: string): Promise<string> {
  const enhancedQuestion = await generateText({
    model: azure("gpt-4o-mini"),
    system: QUERY_ENHANCEMENT_SYSTEM_PROMPT,
    temperature: 0.5,
    prompt: `Enhance this user query about electrical products for vector similarity search: "${question}"`,
  });

  console.log("enhancedQuestion", enhancedQuestion.text);
  return enhancedQuestion.text;
}
