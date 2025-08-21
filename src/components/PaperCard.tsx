import React from "react";
import { Card, CardContent, Typography, Chip } from "@mui/material";
import type { MockPaper } from "../types/paper";

const PaperCard: React.FC<{ paper: MockPaper }> = ({ paper }) => (
  <Card sx={{ marginBottom: 2 }}>
    <CardContent>
      <Typography variant="h6">{paper.title}</Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        {paper.abstract}
      </Typography>
    </CardContent>
  </Card>
);

export default PaperCard;
