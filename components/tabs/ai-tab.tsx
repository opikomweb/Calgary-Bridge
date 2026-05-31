"use client";

import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { aiSuggestions, uiText } from "@/lib/data";
import { Send, Bot, User } from "lucide-react";

export default function AITab() {
  const { activeLanguage, chatMessages, addChatMessage } = useAppStore();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    addChatMessage({
      role: "user",
      content: message.trim(),
    });
    setInput("");
    setIsTyping(true);

    // Simulate AI response (mock for now)
    setTimeout(() => {
      const responses = [
        `Great question about "${message.trim()}"! Calgary has many resources to help you. I recommend checking the Immigrant Services Calgary or calling 311 for city services. They can provide personalized guidance based on your specific situation.`,
        `I understand you're asking about "${message.trim()}". In Calgary, you can start by visiting the City of Calgary website or connecting with local community organizations. The Calgary Public Library also offers many free programs and resources for residents.`,
        `For "${message.trim()}", I suggest exploring the resources in your Home tab - you can filter by your specific needs. If you need immediate assistance, the 211 line connects you to community resources 24/7.`,
      ];
      
      addChatMessage({
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
      });
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {chatMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              Calgary AI Guide
            </h2>
            <p className="mb-6 max-w-xs text-sm text-muted-foreground">
              Ask me anything about navigating Calgary - from transit to healthcare to community services.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                  message.role === "user"
                    ? "bg-primary"
                    : "bg-accent"
                }`}
              >
                {message.role === "user" ? (
                  <User className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <Bot className="h-4 w-4 text-accent-foreground" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "glass"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                <Bot className="h-4 w-4 text-accent-foreground" />
              </div>
              <div className="glass rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestions */}
      {chatMessages.length === 0 && (
        <div className="hide-scrollbar flex gap-2 overflow-x-auto px-4 pb-2">
          {aiSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion[activeLanguage])}
              className="glass-light flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium text-foreground transition-all active:scale-95 hover:bg-white/10"
            >
              {suggestion[activeLanguage]}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="glass-light m-4 flex items-center gap-2 rounded-2xl p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          placeholder={uiText.askQuestion[activeLanguage]}
          className="flex-1 bg-transparent px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          onClick={() => handleSend(input)}
          disabled={!input.trim() || isTyping}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all active:scale-95 disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
