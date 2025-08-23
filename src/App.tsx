import React from "react";
import SearchPage from "./pages/SearchPage";
import { lightTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SearchProvider } from "./contexts/SearchContext";
import { AIProvider } from "./contexts/AIContext";
import { ChatProvider } from "./components/ChatContext";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <SearchProvider>
        <AIProvider>
          <ChatProvider>
            <SearchPage />
          </ChatProvider>
        </AIProvider>
      </SearchProvider>
    </ThemeProvider>
  );
};

export default App;
