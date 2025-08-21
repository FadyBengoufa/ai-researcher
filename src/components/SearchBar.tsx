import React from 'react';
import { TextField } from '@mui/material';
import { useSearch } from '../contexts/SearchContext';

const SearchBar: React.FC = () => {
  const { query, setQuery } = useSearch();

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search research papers..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      sx={{ mb: 2 }}
    />
  );
};

export default SearchBar;