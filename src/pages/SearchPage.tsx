import React from "react";
import { Typography, Box, Tooltip, IconButton, Grid } from "@mui/material";
import SearchBar from "../components/SearchBar";
import PaperCard from "../components/PaperCard";
import { useSearch } from "../contexts/SearchContext";
import FilterPanel from "../components/FilterPanel";
import Pagination from "../components/Pagination";
import AnalysisActions from "../components/AnalysisActions";
import AnalysisResults from "../components/AnalysisResults";
import ChatWindow from "../components/ChatWindow";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useChatContext } from "../components/ChatContext";

const SearchPage: React.FC = () => {
  const { results, loading, error, totalPages } = useSearch();
  const { openChat } = useChatContext();

  return (
    <>
      <Grid container sx={{ m: { xs: 3, md: 8 }, justifyContent: "center" }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          AI Research Explorer
        </Typography>

         <Tooltip title="Open Research Assistant">
          <IconButton
            onClick={openChat}
            size="large"
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              bgcolor: 'primary.main',
              color: 'white',
              zIndex: 999,
              '&:hover': {
                bgcolor: 'primary.dark'
              }
            }}
          >
            <SmartToyIcon />
          </IconButton>
        </Tooltip>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <SearchBar />
        </Box>

        <Grid container spacing={4} sx={{ width: "100%" }}>
          {/* Filters Panel */}
          <Grid size={{ xs: 12, md: 3 }}>
            <FilterPanel />
          </Grid>

          {/* Results Panel */}
          <Grid size={{ xs: 12, md: 9 }}>
            {/* Analysis Actions */}
            <AnalysisActions />

            {/* Analysis Results */}
            <AnalysisResults />

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

      {/* Chat Window */}
      <ChatWindow />
    </>
  );
};

export default SearchPage;
