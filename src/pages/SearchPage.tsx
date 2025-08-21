import React from "react";
import {Typography, Box, Grid } from "@mui/material";
import SearchBar from "../components/SearchBar";
import PaperCard from "../components/PaperCard";
import { useSearch } from "../contexts/SearchContext";

const SearchPage: React.FC = () => {
  const { results, loading, error } = useSearch();

  return (
    <Grid container sx={{ mx: 16, justifyContent: "center" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2}}>
        AI Research Explorer
      </Typography>

      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 3 }}
      >
        <SearchBar />
      </Box>

      {error && (
        <Typography color="error" align="center" sx={{ width: "100%", mb: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && results.length === 0 && (
        <Typography align="center" sx={{ width: "100%", mb: 2 }}>
          No results found. Try a different search term.
        </Typography>
      )}

      <Box sx={{ width: "100%" }}>
        {results.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </Box>
    </Grid>
  );
};

export default SearchPage;
