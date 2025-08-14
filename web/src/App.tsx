import { AnimatePresence } from 'framer-motion';
import type React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RouterLayout } from './components';
import {
  NewReviewPage,
  ReviewDetailPage,
  ReviewsListPage,
  TopPage,
  InternshipSearchPage,
} from './pages';
import { GlobalStyle, theme } from './styles';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<TopPage />} />
        <Route path="/reviews" element={<ReviewsListPage />} />
        <Route path="/reviews/:id" element={<ReviewDetailPage />} />
        <Route path="/reviews/new" element={<NewReviewPage />} />
        <Route path="/internships" element={<InternshipSearchPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <RouterLayout>
          <AppRoutes />
        </RouterLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
