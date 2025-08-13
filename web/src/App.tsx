import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './styles';
import ThemeDemoPage from './pages/ThemeDemoPage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ThemeDemoPage />
    </ThemeProvider>
  );
};

export default App;
