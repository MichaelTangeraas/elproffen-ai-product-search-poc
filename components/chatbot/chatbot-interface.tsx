"use client";

import { useChat } from "ai/react";
import { StopButton } from "./stop-button";
import { RegenerateButton } from "./regenerate-button";
import { Weather } from "~/lib/ai/tools/display-weather/weather";
import { MemoizedMarkdown } from "./memoized-markdown";
import ProductCard from "./product-card";

export default function Page() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
  } = useChat({
    maxSteps: 1,
    experimental_throttle: 50,
  });

  const handleStop = (e: React.MouseEvent) => {
    e.preventDefault();
    stop();
  };

  const handleRegenerate = (e: React.MouseEvent) => {
    e.preventDefault();
    reload();
  };

  return (
    <div className="flex justify-center w-full bg-gray-100 min-h-screen">
      <div className="flex flex-col h-[calc(100vh-2rem)] w-[768px] min-h-[600px] my-4 p-4 bg-gray-50 rounded-xl shadow-md">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Proffen Chatbot PoC
          </h2>
        </div>

        <div className="flex-1 min-h-[400px] overflow-y-auto space-y-4 mb-4 p-4 bg-white rounded-lg shadow-sm">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>Start a conversation by typing a message below</p>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-button text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="text-sm font-bold mb-1">
                  {message.role === "user" ? "Bruker" : "Proffen AI"}
                </div>
                <div className="text-sm whitespace-normal">
                  <div
                    className={`prose prose-base max-w-none ${
                      message.role === "user" ? "text-white" : "text-gray-800"
                    } prose-headings:mt-3 prose-headings:mb-1 prose-p:my-1 prose-li:my-0.5 prose-ul:my-1 prose-ol:my-1`}
                  >
                    <MemoizedMarkdown
                      id={message.id}
                      content={message.content}
                    />
                  </div>

                  <div>
                    {message.toolInvocations?.map((toolInvocation) => {
                      const { toolName, toolCallId, state } = toolInvocation;

                      if (state === "result") {
                        if (toolName === "weatherTool") {
                          const { result } = toolInvocation;
                          return (
                            <div key={toolCallId}>
                              <Weather {...result} />
                            </div>
                          );
                        }
                        if (toolName === "searchForProducts") {
                          const { result } = toolInvocation;
                          return (
                            <div key={toolCallId}>
                              {Array.isArray(result) ? (
                                <div className="space-y-4">
                                  {result.length === 0 ? (
                                    <p>Ingen produkter funnet</p>
                                  ) : (
                                    result.map((product) => (
                                      <ProductCard
                                        key={product.productNumber}
                                        {...product}
                                      />
                                    ))
                                  )}
                                </div>
                              ) : (
                                <ProductCard {...result} />
                              )}
                            </div>
                          );
                        }
                      } else {
                        return (
                          <div key={toolCallId}>
                            {toolName === "weatherTool" ? (
                              <span>Laster inn værdata...</span>
                            ) : toolName === "searchForProducts" ? (
                              <span>Laster inn produkt...</span>
                            ) : (
                              <span>Laster inn data...</span>
                            )}
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <input
                name="prompt"
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-button hover:bg-button hover:opacity-80 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                Send
              </button>
            </div>
            {isLoading ? (
              <StopButton onStop={handleStop} />
            ) : (
              <RegenerateButton
                onRegenerate={handleRegenerate}
                disabled={isLoading}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
