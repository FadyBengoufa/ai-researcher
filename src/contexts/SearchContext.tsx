import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Paper, SearchContextType } from "../types/paper";
import { mockPapers } from "../utils/mockData";

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Paper[]>(mockPapers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setLoading(true);
    setError(null);

    try {
      if (!searchQuery.trim()) {
        // Show all papers when search is empty
        setResults(mockPapers);
      } else {
        // Simple case-insensitive search by title
        const filtered = mockPapers.filter((paper) =>
          paper.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filtered);
      }
    } catch (err) {
      setError("An error occurred during search");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const contextValue: SearchContextType = {
    query,
    setQuery: handleSearch,
    results,
    loading,
    error,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
