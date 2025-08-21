import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { type Paper } from '../types/paper';

interface PaperCardProps {
  paper: Paper;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper }) => {
  return (
    <Card sx={{ mb: 2 }}>
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