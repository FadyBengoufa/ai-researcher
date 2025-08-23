import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import SearchBar from "../components/SearchBar";
import PaperCard from "../components/PaperCard";
import { useSearch } from "../contexts/SearchContext";
import FilterPanel from "../components/FilterPanel";
import Pagination from "../components/Pagination";

const SearchPage: React.FC = () => {
  const { results, loading, error, totalPages } = useSearch();

  return (
    <Grid container sx={{ mx: 16, justifyContent: "center" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        AI Research Explorer
      </Typography>

      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 3 }}
      >
        <SearchBar />
      </Box>

      <Grid container gap={3} sx={{ width: "100%" }}>
        {/* Filters Panel */}
        <Grid item md={3}>
          <FilterPanel />
        </Grid>

        {/* Results Panel */}
        <Grid item md={9} sx={{ flexGrow: 1 }}>
          {!loading && !error && results.length === 0 && (
            <Typography align="center" sx={{ width: "100%", mb: 2 }}>
              No results found. Try a different search term.
            </Typography>
          )}
          {error && (
            <Typography
              color="error"
              align="center"
              sx={{ width: "100%", mb: 2 }}
            >
              {error}
            </Typography>
          )}
          <Box>
            {results.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </Box>

          {/* Pagination */}
          {totalPages > 1 && <Pagination />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchPage;
