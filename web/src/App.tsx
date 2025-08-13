import type React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles';
import { RouterLayout } from './components';
import {
  TopPage,
  ReviewsListPage,
  ReviewDetailPage,
  NewReviewPage,
} from './pages';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <RouterLayout>
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/reviews" element={<ReviewsListPage />} />
            <Route path="/reviews/:id" element={<ReviewDetailPage />} />
            <Route path="/reviews/new" element={<NewReviewPage />} />
          </Routes>
        </RouterLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
