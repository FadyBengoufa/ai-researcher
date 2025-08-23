import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Summarize,
  Topic,
  Compare,
  TrendingUp,
} from '@mui/icons-material';
import { useSearch } from '../contexts/SearchContext';
import { useAI } from '../hooks/useAI';
import { useAI as useAIContext } from '../contexts/AIContext';

const AnalysisActions: React.FC = () => {
  const { selectedPapers, results } = useSearch();
  const { addAnalysis } = useAIContext();
  const { loading, error, summarizePaper, extractTopics, comparePapers, analyzeTrends } = useAI();

  const getSelectedPapersData = () => {
    return results.filter(paper => selectedPapers.includes(paper.id));
  };

  const handleSummarize = async () => {
    const papers = getSelectedPapersData();
    if (papers.length !== 1) return;

    try {
      const response = await summarizePaper(papers[0]);
      // TODO Extract type as an ENUM
      addAnalysis({
        type: 'summary',
        prompt: `Summarize: ${papers[0].title}`,
        response,
        papers: [papers[0].id]
      });
    } catch (err) {
      console.error('Summarization error:', err);
    }
  };

  const handleExtractTopics = async () => {
    const papers = getSelectedPapersData();
    if (papers.length !== 1) return;

    try {
      const response = await extractTopics(papers[0]);
      addAnalysis({
        type: 'topics',
        prompt: `Extract topics from: ${papers[0].title}`,
        response,
        papers: [papers[0].id]
      });
    } catch (err) {
      console.error('Topic extraction error:', err);
    }
  };

  const handleCompare = async () => {
    const papers = getSelectedPapersData();
    if (papers.length < 2) return;

    try {
      const response = await comparePapers(papers);
      addAnalysis({
        type: 'comparison',
        prompt: `Compare ${papers.length} papers`,
        response,
        papers: papers.map(p => p.id)
      });
    } catch (err) {
      console.error('Comparison error:', err);
    }
  };

  const handleAnalyzeTrends = async () => {
    const papers = getSelectedPapersData();
    if (papers.length < 2) return;

    try {
      const response = await analyzeTrends(papers);
      addAnalysis({
        type: 'insights',
        prompt: `Analyze trends in ${papers.length} papers`,
        response,
        papers: papers.map(p => p.id)
      });
    } catch (err) {
      console.error('Trend analysis error:', err);
    }
  };

  const selectedCount = selectedPapers.length;
  const papersData = getSelectedPapersData();

  return (
    <Box sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        AI Analysis
      </Typography>
      
      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          Error: {error}
        </Typography>
      )}

      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        {selectedCount === 0 
          ? 'Select papers to enable AI analysis'
          : `${selectedCount} paper(s) selected`}
      </Typography>

      <ButtonGroup variant="outlined" fullWidth disabled={loading}>
        <Tooltip title="Summarize selected paper">
          <span>
            <Button
              onClick={handleSummarize}
              disabled={selectedCount !== 1 || loading}
              startIcon={loading ? <CircularProgress size={16} /> : <Summarize />}
            >
              Summarize
            </Button>
          </span>
        </Tooltip>

        <Tooltip title="Extract topics from selected paper">
          <span>
            <Button
              onClick={handleExtractTopics}
              disabled={selectedCount !== 1 || loading}
              startIcon={<Topic />}
            >
              Topics
            </Button>
          </span>
        </Tooltip>

        <Tooltip title="Compare selected papers">
          <span>
            <Button
              onClick={handleCompare}
              disabled={selectedCount < 2 || loading}
              startIcon={<Compare />}
            >
              Compare
            </Button>
          </span>
        </Tooltip>

        <Tooltip title="Analyze trends in selected papers">
          <span>
            <Button
              onClick={handleAnalyzeTrends}
              disabled={selectedCount < 2 || loading}
              startIcon={<TrendingUp />}
            >
              Trends
            </Button>
          </span>
        </Tooltip>
      </ButtonGroup>

      {papersData.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="textSecondary">
            Selected: {papersData.map(p => p.title).join(', ')}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AnalysisActions;