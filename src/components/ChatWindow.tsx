import {
  Box,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { useChatContext } from "./ChatContext";
import { Close, DeleteSweep } from "@mui/icons-material";
import MessageBubble from "./MessageBubble";

const ChatWindow: React.FC = () => {
  const {
    messages,
    loading,
    error,
    clearMessages,
    removeMessage,
    isOpen,
    closeChat,
  } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  if (!isOpen) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        width: 400,
        height: 500,
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Research Assistant</Typography>

        <Box>
          {messages.length > 0 && (
            <Tooltip title="Clear conversation">
              <IconButton
                size="small"
                onClick={clearMessages}
                sx={{ color: 'primary.contrastText', mr: 1 }}
              >
                <DeleteSweep fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Close chat">
            <IconButton
              size="small"
              onClick={closeChat}
              sx={{ color: "primary.contrastText" }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Messages area */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 1,
          bgcolor: "grey.50",
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              p: 3,
              color: "text.secondary",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Research Assistant
            </Typography>
            <Typography variant="body2">
              Select papers and ask questions about them. I can help you
              summarize, compare, and analyze research papers.
            </Typography>
            <Divider sx={{ my: 2, width: "100%" }} />
            <Typography variant="caption">
              Try asking:
              <br />
              "What are the main findings?"
              <br />
              "Compare the methodologies"
              <br />
              "What trends do you see?"
            </Typography>
          </Box>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onCopy={(content) => console.log("Copied:", content)}
                onDelete={removeMessage}
              />
            ))}

            {loading && (
              <MessageBubble
                message={{
                  id: "thinking",
                  role: "assistant",
                  content: "Thinking...",
                  timestamp: new Date(),
                }}
              />
            )}

            {error && (
              <MessageBubble
                message={{
                  id: "error",
                  role: "assistant",
                  content: `Error: ${error}`,
                  timestamp: new Date(),
                }}
              />
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </Box>

      {/* Input area */}
      <ChatInput disabled={loading} />
    </Paper>
  );
};

export default ChatWindow;
