"use client";

import { useChat } from "ai/react";
import { StopButton } from "./stop-button";
import { RegenerateButton } from "./regenerate-button";

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
    maxSteps: 3,
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
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="text-sm font-medium mb-1">
                  {message.role === "user" ? "You" : "Proffen AI"}
                </div>
                <div className="text-sm whitespace-pre-wrap">
                  <p>
                    {message.content.length > 0 ? (
                      message.content
                    ) : (
                      <span className="italic font-light">
                        {"Søker etter produkter... Venligst vent"}
                      </span>
                    )}
                  </p>
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
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
