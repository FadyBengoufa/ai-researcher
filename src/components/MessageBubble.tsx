import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import {
  Person as UserIcon,
  SmartToy as AIIcon,
  ContentCopy,
  Delete
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { useSearch } from '../contexts/SearchContext';
import type { AIMessage } from '../types/ai';

interface MessageBubbleProps {
  message: AIMessage;
  onCopy?: (content: string) => void;
  onDelete?: (id: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  onCopy, 
  onDelete 
}) => {
  const { results } = useSearch();
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    onCopy?.(message.content);
  };

  const getPaperNames = () => {
    if (!message.paperContext || message.paperContext.length === 0) return [];
    
    return message.paperContext
      .map(paperId => results.find(p => p.id === paperId)?.title)
      .filter(Boolean) as string[];
  };

  const paperNames = getPaperNames();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
        mx: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isUser ? 'row-reverse' : 'row',
          alignItems: 'flex-start',
          gap: 1,
          maxWidth: '80%'
        }}
      >
        <Avatar
          sx={{
            bgcolor: isUser ? 'primary.main' : 'secondary.main',
            width: 32,
            height: 32
          }}
        >
          {isUser ? <UserIcon /> : <AIIcon />}
        </Avatar>

        <Paper
          elevation={1}
          sx={{
            p: 2,
            bgcolor: isUser ? 'primary.light' : 'background.paper',
            color: isUser ? 'primary.contrastText' : 'text.primary',
            borderRadius: 2,
            position: 'relative',
            minWidth: '200px'
          }}
        >
          {/* Message content */}
          <Box sx={{ mb: paperNames.length > 0 ? 1 : 0, fontSize: '0.9rem' }}>
            <ReactMarkdown>
              {message.content}
            </ReactMarkdown>
          </Box>

          {/* Paper context chips */}
          {paperNames.length > 0 && (
            <Box sx={{ mb: 1 }}>
              {paperNames.map((paperName, index) => (
                <Chip
                  key={index}
                  label={paperName}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    mr: 0.5, 
                    mb: 0.5,
                    fontSize: '0.7rem',
                    bgcolor: isUser ? 'primary.light' : 'grey.100'
                  }}
                />
              ))}
            </Box>
          )}

          {/* Timestamp */}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              color: isUser ? 'primary.contrastText' : 'text.secondary',
              opacity: 0.7,
              mt: 0.5
            }}
          >
            {message.timestamp.toLocaleTimeString()}
          </Typography>

          {/* Action buttons */}
          <Box
            sx={{
              position: 'absolute',
              top: 4,
              right: isUser ? 'auto' : 4,
              left: isUser ? 4 : 'auto',
              opacity: 0,
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 1 }
            }}
          >
            <Tooltip title="Copy message">
              <IconButton
                size="small"
                onClick={handleCopy}
                sx={{ 
                  color: isUser ? 'primary.contrastText' : 'text.primary',
                  bgcolor: isUser ? 'primary.dark' : 'grey.200',
                  '&:hover': {
                    bgcolor: isUser ? 'primary.main' : 'grey.300'
                  }
                }}
              >
                <ContentCopy fontSize="small" />
              </IconButton>
            </Tooltip>

            {onDelete && (
              <Tooltip title="Delete message">
                <IconButton
                  size="small"
                  onClick={() => onDelete(message.id)}
                  sx={{ 
                    ml: 0.5,
                    color: isUser ? 'primary.contrastText' : 'text.primary',
                    bgcolor: isUser ? 'primary.dark' : 'grey.200',
                    '&:hover': {
                      bgcolor: isUser ? 'primary.main' : 'grey.300'
                    }
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default MessageBubble;