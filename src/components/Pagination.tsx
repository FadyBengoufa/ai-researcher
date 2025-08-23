// In src/components/Pagination.tsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useSearch } from '../contexts/SearchContext';

const Pagination: React.FC = () => {
  const { currentPage, setCurrentPage, totalPages } = useSearch();

  if (totalPages <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={3} gap={2}>
      <Button
        variant="outlined"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </Button>
      
      <Typography variant="body2">
        Page {currentPage} of {totalPages}
      </Typography>
      
      <Button
        variant="outlined"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;