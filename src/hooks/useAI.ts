import { useState } from 'react';
import { type Paper } from '../types/paper';
import type { ChatMessage } from '../types/ai';

interface AIRequestOptions {
  retries?: number;
  retryDelay?: number;
}

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callCohereChatAPI = async (messages: ChatMessage[], options: AIRequestOptions = {}) => {
    const { retries = 3, retryDelay = 1000 } = options;

    const apiUrl = import.meta.env.VITE_COHERE_API_URL;
    const apiKey = import.meta.env.VITE_COHERE_API_KEY;

    if (!apiKey) {
      throw new Error('Cohere API key not found. Please add VITE_COHERE_API_KEY to your environment variables.');
    }

    let attempt = 0;

    while (attempt <= retries) {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${apiUrl}/chat`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'command-a-03-2025',
            messages,
            stream: false,
          })
        });

        if (response.status === 429) {
          attempt++;
          if (attempt > retries) {
            throw new Error('Rate limit exceeded. Please try again later.');
          }
          await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
          continue;
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `API error: ${response.status}`);
        }

        const data: {
          message: {
            content: Array<{ type: string, text: string }>;
          };
          finish_reason: string;
        } = await response.json();
        // console.log('data', data);
        
        // Extract text from the response
        const textContent = data.message.content
          .filter((part: {
            type: string;
            text: string;
          }) => part.type === 'text')
          .map((part: {
            type: string;
            text: string;
          }) => part.text)
          .join('\n');

        return textContent;

      } catch (err) {
        attempt++;
        if (attempt > retries) {
          const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
          setError(errorMessage);
          throw err;
        }
        await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
      } finally {
        if (attempt > retries || attempt === 0) {
          setLoading(false);
        }
      }
    }
  };

  const summarizePaper = async (paper: Paper) => {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You are a research assistant specialized in summarizing academic papers. Provide comprehensive 3-4 paragraph summaries that cover main contributions, methodology, and findings.'
      },
      {
        role: 'user',
        content: `Please summarize this research paper:

Title: ${paper.title}
Authors: ${paper.authors.join(', ')}
Abstract: ${paper.abstract}

Provide a detailed summary that would help researchers understand the paper's key contributions.`
      }
    ];
    
    return await callCohereChatAPI(messages);
  };

  const extractTopics = async (paper: Paper) => {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You are a research assistant that extracts key topics and themes from academic papers. Provide a bulleted list of main topics, concepts, and methodologies.'
      },
      {
        role: 'user',
        content: `Extract the main topics and key themes from this research paper:

Title: ${paper.title}
Abstract: ${paper.abstract}

Please provide a structured bulleted list of the main topics and methodologies.`
      }
    ];
    
    return await callCohereChatAPI(messages);
  };

  const comparePapers = async (papers: Paper[]) => {
    const papersText = papers.map(paper => 
      `Paper: ${paper.title}
Authors: ${paper.authors.join(', ')}
Abstract: ${paper.abstract}
---`
    ).join('\n\n');

    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You are a research assistant that compares and contrasts academic papers. Identify common themes, differences in methodology, and complementary findings in essay format.'
      },
      {
        role: 'user',
        content: `Compare and contrast these research papers:

${papersText}

Please provide a detailed comparison highlighting similarities, differences, and overall insights.`
      }
    ];
    
    return await callCohereChatAPI(messages);
  };

  const analyzeTrends = async (papers: Paper[]) => {
    const papersText = papers.map(paper => 
      `- ${paper.title} (${paper.year}): ${paper.topics.join(', ')}`
    ).join('\n');

    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You are a research analyst that identifies emerging trends, popular methodologies, and research gaps from collections of papers.'
      },
      {
        role: 'user',
        content: `Analyze research trends from these papers:

${papersText}

Identify emerging trends, popular methodologies, research gaps, and provide insights about the evolution of this field.`
      }
    ];
    
    return await callCohereChatAPI(messages);
  };

  const chatAboutPapers = async (userMessage: string, papers: Paper[], conversationHistory: ChatMessage[] = []) => {
    const papersContext = papers.map(paper => 
      `Title: ${paper.title}
Abstract: ${paper.abstract}
Topics: ${paper.topics.join(', ')}`
    ).join('\n\n');

    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: `You are a research assistant. Answer questions based on the provided research papers context. If a question cannot be answered from the papers, politely indicate this.

Research Papers Context:
${papersContext}`
      },
      ...conversationHistory,
      {
        role: 'user',
        content: userMessage
      }
    ];
    
    return await callCohereChatAPI(messages);
  };

  return {
    loading,
    error,
    summarizePaper,
    extractTopics,
    comparePapers,
    analyzeTrends,
    chatAboutPapers,
    callCohereChatAPI
  };
};