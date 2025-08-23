export interface AIMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  paperContext?: string[];
}

export interface AIAnalysis {
  type: 'summary' | 'topics' | 'comparison' | 'insights' | 'chat';
  prompt: string;
  response?: string;
  papers: string[];
  timestamp: Date;
}

export interface ChatContextType {
  messages: AIMessage[];
  addMessage: (message: Omit<AIMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  loading: boolean;
  error: string | null;
  getChatHistory: () => Array<ChatMessage>;
}

export interface AIContextType {
  analyses: AIAnalysis[];
  addAnalysis: (analysis: Omit<AIAnalysis, 'timestamp'>) => void;
  chat: ChatContextType;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}