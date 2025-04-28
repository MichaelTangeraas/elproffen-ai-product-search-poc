import { azure, createAzure } from "@ai-sdk/azure";
import { streamText, smoothStream } from "ai";

import { searchForProducts, weatherTool } from "~/lib/ai/tools";
import { systemPrompt } from "~/lib/ai/system-prompt";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: azure("gpt-4o"),
    system: systemPrompt,
    temperature: 0.7,
    messages,
    maxSteps: 2,
    tools: {
      searchForProducts,
      weatherTool,
    },
  });

  return result.toDataStreamResponse();
}

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   const azureClient = createAzure({
//     apiKey: process.env.AZURE_OPENAI_API_KEY,
//     baseURL: process.env.AZURE_OPENAI_BASE_URL,
//     apiVersion: "2025-02-01-preview",
//   });

//   const result = streamText({
//     model: azureClient("o3-mini-2025-01-31", {
//       reasoningEffort: "medium",
//     }),
//     messages,
//     experimental_transform: smoothStream(),
//     onError: (error) => {
//       console.error("Error:", error);
//     },
//   });

//   return result.toDataStreamResponse({
//     sendReasoning: true,
//     sendUsage: true,
//   });
// }
