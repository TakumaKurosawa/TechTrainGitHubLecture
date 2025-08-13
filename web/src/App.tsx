import type React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RouterLayout } from './components';
import {
  NewReviewPage,
  ReviewDetailPage,
  ReviewsListPage,
  TopPage,
} from './pages';
import { GlobalStyle, theme } from './styles';

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
