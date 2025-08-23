import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { FiltersOptions, Paper, SearchContextType } from "../types/paper";
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
  const [selectedPapers, setSelectedPapers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [filters, setFilters] = useState<FiltersOptions>({
    topics: [],
    years: [],
    paperTypes: [],
    authors: [],
  });

  // Apply search and filters
  const applySearchAndFilters = () => {
    setLoading(true);
    setError(null);

    try {
      let filtered = [...mockPapers];

      // Apply text search
      if (query.trim()) {
        filtered = filtered.filter(
          (paper) =>
            paper.title.toLowerCase().includes(query.toLowerCase()) ||
            paper.abstract.toLowerCase().includes(query.toLowerCase()) ||
            paper.authors.some((author) =>
              author.toLowerCase().includes(query.toLowerCase())
            )
        );
      }

      // Apply topic filters
      if (filters.topics.length > 0) {
        filtered = filtered.filter((paper) =>
          paper.topics.some((topic) => filters.topics.includes(topic))
        );
      }

      // Apply year filters
      if (filters.years.length > 0) {
        filtered = filtered.filter((paper) =>
          filters.years.includes(paper.year)
        );
      }

      // Apply author filters
      if (filters.authors.length > 0) {
        filtered = filtered.filter((paper) =>
          paper.authors.some((author) => filters.authors.includes(author))
        );
      }

      // Apply paper type filters
      if (filters.paperTypes.length > 0) {
        filtered = filtered.filter((paper) =>
          filters.paperTypes.includes(paper.paperType)
        );
      }

      setResults(filtered);
    } catch (err) {
      setError("An error occurred during search");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

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

  const togglePaperSelection = (paperId: string) => {
    setSelectedPapers(prev => 
      prev.includes(paperId) 
        ? prev.filter(id => id !== paperId) 
        : [...prev, paperId]
    );
  };

  const clearSelectedPapers = () => {
    setSelectedPapers([]);
  };

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const paginatedResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    applySearchAndFilters();
  }, [query, filters]);

  useEffect(() => {
  setCurrentPage(1);
  }, [results]);


  const contextValue: SearchContextType = {
    query,
    setQuery: handleSearch,
    results: paginatedResults,
    loading,
    error,
    filters,
    setFilters,
    selectedPapers,
    togglePaperSelection,
    clearSelectedPapers,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalPages
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
