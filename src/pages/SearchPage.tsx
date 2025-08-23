import React from "react";
import { Typography, Box, Tooltip, IconButton } from "@mui/material";
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
import Grid from '@mui/material/GridLegacy';

const SearchPage: React.FC = () => {
  const { results, loading, error, totalPages } = useSearch();
  const { openChat } = useChatContext();

  return (
    <>
      <Grid container sx={{ m: 8, justifyContent: "center" }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          AI Research Explorer
        </Typography>

         <Tooltip title="Open Research Assistant">
          <IconButton
            onClick={openChat}
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
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

        <Grid container spacing={3} sx={{ width: "100%" }}>
          {/* Filters Panel */}
          <Grid item md={3} xs={12}>
            <FilterPanel />
          </Grid>

          {/* Results Panel */}
          <Grid item md={9} xs={12} sx={{ flexGrow: 1 }}>
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
