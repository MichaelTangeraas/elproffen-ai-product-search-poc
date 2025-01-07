import { azure } from "@ai-sdk/azure";
import { streamText } from "ai";
import { systemPrompt } from "~/lib/system-prompt";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: azure("gpt-4o"),
    system: systemPrompt,
    // context: "The user likes chicken nuggets",
    temperature: 0.7,
    messages,
  });

  return result.toDataStreamResponse();
}
