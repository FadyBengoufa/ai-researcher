import React from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Collapse,
  Chip,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  Summarize,
  Topic,
  Compare,
  TrendingUp,
} from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import { useAI } from "../contexts/AIContext";

const AnalysisResults: React.FC = () => {
  const { analyses } = useAI();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  if (analyses.length === 0) return null;

  // TODO Add enum
  const getIcon = (type: string) => {
    switch (type) {
      case "summary":
        return <Summarize />;
      case "topics":
        return <Topic />;
      case "comparison":
        return <Compare />;
      case "insights":
        return <TrendingUp />;
      default:
        return null;
    }
  };

  const getTitle = (type: string) => {
    switch (type) {
      case "summary":
        return "Summary";
      case "topics":
        return "Key Topics";
      case "comparison":
        return "Comparison";
      case "insights":
        return "Research Insights";
      default:
        return "Analysis";
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        AI Analysis Results
      </Typography>

      {analyses.map((analysis, index) => (
        <Paper key={index} sx={{ mb: 2, overflow: "hidden" }}>
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "background.default",
              cursor: "pointer",
            }}
            onClick={() =>
              setExpandedId(
                expandedId === analysis.timestamp.toString()
                  ? null
                  : analysis.timestamp.toString()
              )
            }
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {getIcon(analysis.type)}
              <Typography variant="subtitle1">
                {getTitle(analysis.type)}
              </Typography>
              <Chip
                label={new Date(analysis.timestamp).toLocaleTimeString()}
                size="small"
                variant="outlined"
              />
            </Box>
            <IconButton size="small">
              {expandedId === analysis.timestamp.toString() ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </IconButton>
          </Box>

          <Collapse in={expandedId === analysis.timestamp.toString()}>
            <Box sx={{ p: 2 }}>
              <ReactMarkdown>{analysis.response}</ReactMarkdown>
            </Box>
          </Collapse>
        </Paper>
      ))}
    </Box>
  );
};

export default AnalysisResults;
