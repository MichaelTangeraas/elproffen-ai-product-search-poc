import { azure } from "@ai-sdk/azure";
import { streamText } from "ai";

import { searchForProducts, weatherTool } from "~/lib/ai/tools";
import { systemPrompt } from "~/lib/ai/system-prompt";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: azure("gpt-4o"),
    system: systemPrompt,
    temperature: 0.7,
    messages,
    maxSteps: 1,
    tools: {
      searchForProducts,
      weatherTool,
    },
  });

  return result.toDataStreamResponse();
}
