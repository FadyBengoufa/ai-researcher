import React from "react";
import SearchPage from "./pages/SearchPage";
import { lightTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SearchProvider } from "./contexts/SearchContext";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <SearchProvider>
        <SearchPage />
      </SearchProvider>
    </ThemeProvider>
  );
};

export default App;
