export interface Paper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  year: number;
  topics: string[];
  paperType: "journal" | "conference" | "preprint" | "workshop";
  publicationVenue: string;
  citations?: number;
  pdfUrl?: string;
}

export interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  results: Paper[];
  loading: boolean;
  error: string | null;
  filters: FiltersOptions;
  setFilters: (filters: FiltersOptions) => void;
  selectedPapers: string[];
  togglePaperSelection: (paperId: string) => void;
  clearSelectedPapers: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  totalPages: number;
}

export interface FiltersOptions {
  topics: string[];
  years: number[];
  paperTypes: string[];
  authors: string[];
}