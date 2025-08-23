import React from "react";
import {
  Box,
  Typography,
  Checkbox,
  Chip,
  Button,
  Autocomplete,
  TextField,
  Divider,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useSearch } from "../contexts/SearchContext";
import {
  getAvailableAuthors,
  getAvailablePaperTypes,
  getAvailableTopics,
  getAvailableYears,
} from "../utils/mockData";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FilterPanel: React.FC = () => {
  const { filters, setFilters, selectedPapers, clearSelectedPapers } =
    useSearch();

  const availableTopics = getAvailableTopics();
  const availableYears = getAvailableYears();
  const availableAuthors = getAvailableAuthors();
  const availablePaperTypes = getAvailablePaperTypes();

  const handleTopicChange = (
    _event: React.SyntheticEvent,
    newValue: string[]
  ) => {
    setFilters({ ...filters, topics: newValue });
  };

  const handleYearChange = (
    _event: React.SyntheticEvent,
    newValue: number[]
  ) => {
    setFilters({ ...filters, years: newValue });
  };

  const handleAuthorChange = (
    _event: React.SyntheticEvent,
    newValue: string[]
  ) => {
    setFilters({ ...filters, authors: newValue });
  };

  const handlePaperTypeChange = (
    _event: React.SyntheticEvent,
    newValue: string[]
  ) => {
    setFilters({ ...filters, paperTypes: newValue });
  };

  const clearAllFilters = () => {
    setFilters({
      topics: [],
      years: [],
      authors: [],
      paperTypes: [],
    });
  };

  return (
    <Box
      sx={{
        width: "300px",
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 1,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
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
      <Autocomplete
        multiple
        options={availableTopics}
        value={filters.topics}
        onChange={handleTopicChange}
        disableCloseOnSelect
        renderOption={(props, option, { selected }) => (
          <li {...props} key={option}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              checked={selected}
            />
            {option}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Topics" placeholder="Select topics" />
        )}
        sx={{ mb: 2 }}
      />

      {/* Years Filter */}
      <Autocomplete
        multiple
        options={availableYears}
        value={filters.years}
        onChange={handleYearChange}
        disableCloseOnSelect
        getOptionLabel={(option) => option.toString()}
        renderOption={(props, option, { selected }) => (
          <li {...props}  key={option}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Years" placeholder="Select years" />
        )}
        sx={{ mb: 2 }}
      />

      {/* Authors Filter */}
      <Autocomplete
        multiple
        options={availableAuthors}
        value={filters.authors}
        onChange={handleAuthorChange}
        disableCloseOnSelect
        renderOption={(props, option, { selected }) => (
          <li {...props} key={option}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Authors" placeholder="Select authors" />
        )}
        sx={{ mb: 2 }}
      />

      {/* Paper Types Filter */}
      <Autocomplete
        multiple
        options={availablePaperTypes}
        value={filters.paperTypes}
        onChange={handlePaperTypeChange}
        disableCloseOnSelect
        getOptionLabel={(option) =>
          option.charAt(0).toUpperCase() + option.slice(1)
        }
        renderOption={(props, option, { selected }) => (
          <li {...props} key={option}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Paper Types"
            placeholder="Select paper types"
          />
        )}
        sx={{ mb: 2 }}
      />

      <Divider sx={{ my: 2 }} />

      {/* Active Filters */}
      {(filters.topics.length > 0 || filters.years.length > 0 || 
        filters.authors.length > 0 || filters.paperTypes.length > 0) && (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Active Filters:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={0.5}>
            {filters.topics.map(topic => (
              <Chip
                key={topic}
                label={topic}
                size="small"
                onDelete={() => {
                  handleTopicChange({} as React.SyntheticEvent, filters.topics.filter(t => t !== topic));
                }}
              />
            ))}
            {filters.years.map(year => (
              <Chip
                key={year}
                label={year.toString()}
                size="small"
                onDelete={() => {
                  handleYearChange({} as React.SyntheticEvent, filters.years.filter(y => y !== year));
                }}
              />
            ))}
            {filters.authors.map(author => (
              <Chip
                key={author}
                label={author}
                size="small"
                onDelete={() => {
                  handleAuthorChange({} as React.SyntheticEvent, filters.authors.filter(a => a !== author));
                }}
              />
            ))}
            {filters.paperTypes.map(type => (
              <Chip
                key={type}
                label={type}
                size="small"
                onDelete={() => {
                  handlePaperTypeChange({} as React.SyntheticEvent, filters.paperTypes.filter(t => t !== type));
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FilterPanel;