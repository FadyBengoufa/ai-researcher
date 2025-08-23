import { useState, useCallback } from "react";
import { useAI } from "./useAI";
import { getPapersByIds } from "../utils/mockData";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  paperContext?: string[];
}

interface UseChatReturn {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  sendMessage: (content: string, paperIds: string[]) => Promise<void>; 
  clearMessages: () => void;
  removeMessage: (id: string) => void;
}

export const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { chatAboutPapers } = useAI();

  const sendMessage = useCallback(
    async (content: string, paperIds: string[]) => {
      if (!content.trim() || paperIds.length === 0) return;

      const papers = getPapersByIds(paperIds);

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
        paperContext: paperIds,
      };

      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);
      setError(null);

      try {
        const conversationHistory = messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        const response = await chatAboutPapers(
          content,
          papers,
          conversationHistory
        );

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response || "I'm sorry, I didn't understand that.",
          timestamp: new Date(),
          paperContext: papers.map((p) => p.id),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to send message";
        setError(errorMessage);

        // Add error message to chat
        const errorMessageObj: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `Sorry, I encountered an error: ${errorMessage}`,
          timestamp: new Date(),
          paperContext: papers.map((p) => p.id),
        };
        setMessages((prev) => [...prev, errorMessageObj]);
      } finally {
        setLoading(false);
      }
    },
    [messages, chatAboutPapers]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages,
    removeMessage,
  };
};
