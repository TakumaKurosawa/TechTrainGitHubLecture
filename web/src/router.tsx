import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home, About, FormDemo, TopPage, ReviewsListPage, ReviewDetailPage, NewReviewPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/form',
    element: <FormDemo />
  },
  {
    path: '/app',
    element: <TopPage />
  },
  {
    path: '/reviews',
    element: <ReviewsListPage />
  },
  {
    path: '/reviews/:id',
    element: <ReviewDetailPage />
  },
  {
    path: '/reviews/new',
    element: <NewReviewPage />
  }
]);

const AppRouter: React.FC = () => {
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
};

export default AppRouter;