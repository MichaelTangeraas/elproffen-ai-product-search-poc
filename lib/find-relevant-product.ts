import { generateEmbeddingAzure } from "~/inngest/product-embeddings-sync/generate-embedding-azure";
import { queryProducts } from "./queries";

import { generateText } from "ai";
import { azure } from "@ai-sdk/azure";
import { rerankProducts } from "./ai/reranker/embedding-reranker";

export const findRelevantProduct = async (question: string) => {
  const enhancedQuestion = await generateText({
    model: azure("gpt-4o-mini"),
    system: `You are a prompt-enhancement assistant designed to transform user inputs into detailed, context-rich search queries for a retrieval-augmented generation (RAG) system. The RAG system uses vector embeddings generated from raw product details that follow a structure similar to these examples:

      - Example 1: "Produktnummer: 1388750, Produktnavn: SKRUE TGS 50 4.2X25, Produsent: SCHNEIDER ELECTRIC NORGE AS, Bilde ID: 180284, Teknisk beskrivelse: Grabber TGS - Selvskjærende elektrikerskrue i herdet elforzinket stål. Monteres med stjerneskrujern eller Phillips bits nr. 2. Brukes i tre, sponplater, plugg og metall (selvborende opp til 0.9mm). Andre Grabberskruer: Finnes som selvskjærende med skivehode (TSC) eller selvborende med borspiss (TGE)., Tekniske spesifikasjoner: Hodeform: Andre. Materialkvalitet: Andre. Sportype: Phillips PH. Overflatebeskyttelse: Galvanisk/elektrolyttisk forsinket. Skaftdiameter: 4.2 mm. Materiale: Stål. Lengde: 25 mm. Herdet: Ja."

      - Example 2: "Produktnummer: 1221905, Produktnavn: Wago Koblingsklemmer, Produsent: WAGO NORGE AS, Bilde ID: 1761158, Teknisk beskrivelse: Wago Koblingsklemme 2,5mm² Grå for alle typer ledere. Tverrsnitt: 0,14-4mm² (fintrådet) / 0,2-4mm² (helkjerne/flertrådet), Nominell spenning: 450V, Nominell strøm: 32A, Temperatur: 105 grader, Pakning: 25 stk, … [flere spesifikasjoner]."

      - Example 3: "Produktnummer: 1342000, Produktnavn: BUNTNINGSBÅND, HVIT, Produsent: PANDUIT EEIG, Bilde ID: 584562, Teknisk beskrivelse: Kabelstrips med farge Natur, Modell/utførelse: Innvendig fortannet, Halogenfri, Båndlengde: 99 mm, Materialkvalitet: Polyamid PA, Driftstemperaturområde: -60°C til 85°C, … [flere spesifikasjoner]."

      When you receive a text input representing what the user is looking for, your task is to rewrite it into a clear, detailed query. The enhanced query should incorporate potential product attributes (such as product type, features, brand, size, and other relevant specifications) that align with the embedded data. This will improve the accuracy of the cosine similarity search in our RAG system.

      Important Instructions:
      - Output only the enhanced query—no additional commentary.
      - If the user's input is general or vague, generate a broad yet detailed query that will retrieve the most relevant products.
      - Your output will be used directly as the prompt for the RAG search.

      Your direct input will be used as the prompt for the RAG search, so it's important that the question is as specific as possible.`,
    temperature: 0.5,
    prompt: `This is the text input of the item or items the user is looking for: "${question}"`,
  });

  // Add context to the question to improve embedding quality
  console.log("enhancedQuestion", enhancedQuestion.text);

  // Generate embedding for the enhanced question
  const embeddedQuery = await generateEmbeddingAzure(enhancedQuestion.text);

  // Query products using the embedding
  const products = await queryProducts(embeddedQuery);

  console.log("products", products.length);

  const rerankedProducts = await rerankProducts(
    products.map((product) => product.rawContent),
    enhancedQuestion.text
  );

  console.log("rerankedProducts", rerankedProducts);

  const sortedProducts = rerankedProducts
    .filter((product) => product.relevanceScore > 0.5)
    .map((product) => {
      return products[product.index];
    });

  console.log("sortedProducts", sortedProducts);

  return sortedProducts;
};
