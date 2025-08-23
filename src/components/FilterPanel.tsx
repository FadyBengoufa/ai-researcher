import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Chip,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearch } from '../contexts/SearchContext';
import { getAvailableAuthors, getAvailablePaperTypes, getAvailableTopics, getAvailableYears } from '../utils/mockData';

const FilterPanel: React.FC = () => {
  const { filters, setFilters, selectedPapers, clearSelectedPapers } = useSearch();
  
  const availableTopics = getAvailableTopics();
  const availableYears = getAvailableYears();
  const availableAuthors = getAvailableAuthors();
  const availablePaperTypes = getAvailablePaperTypes();

  const handleTopicChange = (topic: string) => {
    const newTopics = filters.topics.includes(topic)
      ? filters.topics.filter(t => t !== topic)
      : [...filters.topics, topic];
    
    setFilters({ ...filters, topics: newTopics });
  };

  const handleYearChange = (year: number) => {
    const newYears = filters.years.includes(year)
      ? filters.years.filter(y => y !== year)
      : [...filters.years, year];
    
    setFilters({ ...filters, years: newYears });
  };

  const handleAuthorChange = (author: string) => {
    const newAuthors = filters.authors.includes(author)
      ? filters.authors.filter(a => a !== author)
      : [...filters.authors, author];
    
    setFilters({ ...filters, authors: newAuthors });
  };

  const handlePaperTypeChange = (paperType: string) => {
    const newPaperTypes = filters.paperTypes.includes(paperType)
      ? filters.paperTypes.filter(pt => pt !== paperType)
      : [...filters.paperTypes, paperType];
    
    setFilters({ ...filters, paperTypes: newPaperTypes });
  };

  const clearAllFilters = () => {
    setFilters({
      topics: [],
      years: [],
      authors: [],
      paperTypes: []
    });
  };

  return (
    <Box sx={{ width: '300px', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Filters</Typography>
        <Button size="small" onClick={clearAllFilters}>
          Clear All
        </Button>
      </Box>

      {selectedPapers.length > 0 && (
        <Box mb={2} p={1}>
          <Typography variant="body2">
            {selectedPapers.length} paper(s) selected
          </Typography>
          <Button size="small" onClick={clearSelectedPapers} sx={{ mt: 1 }}>
            Clear Selection
          </Button>
        </Box>
      )}

      {/* Topics Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Topics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" gap={1}>
            {availableTopics.map(topic => (
              <FormControlLabel
                key={topic}
                control={
                  <Checkbox
                    checked={filters.topics.includes(topic)}
                    onChange={() => handleTopicChange(topic)}
                    size="small"
                  />
                }
                label={topic}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Years Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Years</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" gap={1}>
            {availableYears.map(year => (
              <FormControlLabel
                key={year}
                control={
                  <Checkbox
                    checked={filters.years.includes(year)}
                    onChange={() => handleYearChange(year)}
                    size="small"
                  />
                }
                label={year.toString()}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Authors Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Authors</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" gap={1}>
            {availableAuthors.map(author => (
              <FormControlLabel
                key={author}
                control={
                  <Checkbox
                    checked={filters.authors.includes(author)}
                    onChange={() => handleAuthorChange(author)}
                    size="small"
                  />
                }
                label={author}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Paper Types Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Paper Types</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" gap={1}>
            {availablePaperTypes.map(type => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={filters.paperTypes.includes(type)}
                    onChange={() => handlePaperTypeChange(type)}
                    size="small"
                  />
                }
                label={type.charAt(0).toUpperCase() + type.slice(1)}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Active Filters */}
      {(filters.topics.length > 0 || filters.years.length > 0 || 
        filters.authors.length > 0 || filters.paperTypes.length > 0) && (
        <Box mt={2}>
          <Typography variant="subtitle2" gutterBottom>
            Active Filters:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={0.5}>
            {filters.topics.map(topic => (
              <Chip
                key={topic}
                label={topic}
                size="small"
                onDelete={() => handleTopicChange(topic)}
              />
            ))}
            {filters.years.map(year => (
              <Chip
                key={year}
                label={year.toString()}
                size="small"
                onDelete={() => handleYearChange(year)}
              />
            ))}
            {filters.authors.map(author => (
              <Chip
                key={author}
                label={author}
                size="small"
                onDelete={() => handleAuthorChange(author)}
              />
            ))}
            {filters.paperTypes.map(type => (
              <Chip
                key={type}
                label={type}
                size="small"
                onDelete={() => handlePaperTypeChange(type)}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FilterPanel;