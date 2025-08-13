import React from 'react';
import { ThemeProvider } from '@/styles';
import { SamplePage } from './pages/SamplePage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SamplePage />
    </ThemeProvider>
  );
};

export default App;