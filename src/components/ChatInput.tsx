import React, { useState, useRef } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Tooltip,
  CircularProgress,
  Typography
} from '@mui/material';
import {
  Send,
  Clear,
  Attachment
} from '@mui/icons-material';
import { useSearch } from '../contexts/SearchContext';
import { useChatContext } from './ChatContext';

interface ChatInputProps {
  disabled?: boolean;
  onSend?: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { selectedPapers } = useSearch();
  const { sendMessage, loading } = useChatContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || selectedPapers.length === 0 || loading) return;

    try {
        await sendMessage(message, selectedPapers);
        setMessage('');
      
        // Reset textarea height
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleClear = () => {
    setMessage('');
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  const selectedCount = selectedPapers.length;
  const isSendDisabled = !message.trim() || selectedCount === 0 || loading;

  return (
    <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            multiline
            maxRows={4}
            fullWidth
            variant="outlined"
            placeholder={
              selectedCount === 0 
                ? "Select papers to start chatting..." 
                : "Ask about the selected papers..."
            }
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyPress={handleKeyPress}
            inputRef={textareaRef}
            disabled={disabled || selectedCount === 0}
            InputProps={{
              startAdornment: selectedCount > 0 && (
                <Tooltip title={`${selectedCount} paper(s) selected`}>
                  <Attachment 
                    color="primary" 
                    sx={{ mr: 1, opacity: 0.7 }}
                  />
                </Tooltip>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                alignItems: 'flex-end',
                paddingRight: 1,
              }
            }}
          />

          {message && (
            <Tooltip title="Clear message">
              <IconButton
                onClick={handleClear}
                disabled={disabled}
                size="small"
              >
                <Clear />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip 
            title={
              selectedCount === 0 
                ? "Select papers to chat" 
                : "Send message"
            }
          >
            <span>
              <IconButton
                type="submit"
                disabled={isSendDisabled}
                color="primary"
                sx={{ 
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  },
                  '&:disabled': {
                    bgcolor: 'grey.300'
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <Send />
                )}
              </IconButton>
            </span>
          </Tooltip>
        </Box>

        {selectedCount > 0 && (
          <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
            Chatting about {selectedCount} paper(s): {selectedPapers.slice(0, 3).map(p => p.title).join(', ')}
            {selectedCount > 3 && '...'}
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default ChatInput;