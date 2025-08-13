import type React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { GlobalStyle } from '@/styles/GlobalStyle';
import Layout from '@/components/layout/Layout';
import TopPage from '@/pages/TopPage';
import ReviewsListPage from '@/pages/ReviewsListPage';
import ReviewDetailPage from '@/pages/ReviewDetailPage';
import NewReviewPage from '@/pages/NewReviewPage';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<TopPage />} />
        <Route path="/reviews" element={<ReviewsListPage />} />
        <Route path="/reviews/:id" element={<ReviewDetailPage />} />
        <Route path="/reviews/new" element={<NewReviewPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </>
  );
};

export default App;