import { AnimatePresence } from 'framer-motion';
import type React from 'react';
import { useEffect } from 'react';
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
  StoresDemoPage,
  TopPage,
} from './pages';
import { GlobalStyle, theme } from './styles';
import { useAppStore } from './store';
import { initializeStoreWithMockData, logStoreState } from './utils/storeInitializer';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<TopPage />} />
        <Route path="/stores-demo" element={<StoresDemoPage />} />
        <Route path="/reviews" element={<ReviewsListPage />} />
        <Route path="/reviews/:id" element={<ReviewDetailPage />} />
        <Route path="/reviews/new" element={<NewReviewPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const { currentUser, setCurrentStep } = useAppStore();

  useEffect(() => {
    // Initialize stores with mock data on app start
    if (!currentUser) {
      initializeStoreWithMockData();
      setCurrentStep('initial');
    }

    // Log store state for development
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        logStoreState();
      }, 1000);
    }
  }, [currentUser, setCurrentStep]);

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
