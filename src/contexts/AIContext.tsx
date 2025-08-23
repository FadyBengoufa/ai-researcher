import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type AIContextType, type AIAnalysis, type AIMessage, type ChatContextType, type ChatMessage } from '../types/ai';

const AIContext = createContext<AIContextType | undefined>(undefined);

interface AIProviderProps {
  children: ReactNode;
}

export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const [analyses, setAnalyses] = useState<AIAnalysis[]>([]);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [chatLoading] = useState(false);
  const [chatError] = useState<string | null>(null);

  const addAnalysis = (analysis: Omit<AIAnalysis, 'timestamp'>) => {
    const newAnalysis: AIAnalysis = {
      ...analysis,
      timestamp: new Date()
    };
    console.log('newAnalysis', newAnalysis);
    setAnalyses(prev => [...prev, newAnalysis]);
  };

  const addMessage = (message: Omit<AIMessage, 'id' | 'timestamp'>) => {
    const newMessage: AIMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const getChatHistory = (): ChatMessage[] => {
    return messages.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content
    }));
  };

  const chatContext: ChatContextType = {
    messages,
    addMessage,
    clearMessages,
    loading: chatLoading,
    error: chatError,
    getChatHistory
  };

  const contextValue: AIContextType = {
    analyses,
    addAnalysis,
    chat: chatContext
  };

  return (
    <AIContext.Provider value={contextValue}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};