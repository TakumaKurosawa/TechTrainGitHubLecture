import type React from 'react';
import { ThemeProvider } from 'styled-components';
import ThemeDemoPage from './pages/ThemeDemoPage';
import { GlobalStyle, theme } from './styles';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ThemeDemoPage />
    </ThemeProvider>
  );
};

export default App;
