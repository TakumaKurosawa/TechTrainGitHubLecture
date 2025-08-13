import type React from 'react';
import { ThemeProvider } from 'styled-components';
import AppRouter from './router';
import { GlobalStyle, theme } from './styles';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
