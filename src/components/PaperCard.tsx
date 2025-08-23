import React from 'react';
import { Card, CardContent, Typography, Box, Chip, FormControlLabel, Checkbox } from '@mui/material';
import { type Paper } from '../types/paper';
import { useSearch } from '../contexts/SearchContext';

interface PaperCardProps {
  paper: Paper;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper }) => {

  const { selectedPapers, togglePaperSelection } = useSearch();

  const isSelected = selectedPapers.includes(paper.id);

  return (
    <Card sx={{ mb: 2, position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 8, right: 0 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isSelected}
              onChange={() => togglePaperSelection(paper.id)}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            />
          }
          label=""
        />
      </Box>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {paper.title}
        </Typography>
        
        <Typography color="textSecondary" gutterBottom>
          {paper.authors.join(', ')} • {paper.year} • {paper.publicationVenue}
        </Typography>
        
        <Typography variant="body2" paragraph>
          {paper.abstract}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {paper.topics.map(topic => (
            <Chip key={topic} label={topic} size="small" variant="outlined" />
          ))}
        </Box>
        
        {paper.citations && (
          <Typography variant="caption" color="textSecondary">
            {paper.citations} citations
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PaperCard;