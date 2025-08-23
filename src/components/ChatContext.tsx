import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { AIMessage } from '../types/ai';
import { useChat } from '../hooks/useChat';

interface ChatContextType {
  messages: AIMessage[];
  loading: boolean;
  error: string | null;
  sendMessage: (content: string, paperIds: string[]) => Promise<void>;
  clearMessages: () => void;
  removeMessage: (id: string) => void;
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const chat = useChat();
  const [isOpen, setIsOpen] = useState(true);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  const contextValue: ChatContextType = {
    ...chat,
    isOpen,
    openChat,
    closeChat,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};