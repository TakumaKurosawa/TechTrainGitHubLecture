import React from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ReviewList from "./components/features/ReviewList";
import ReviewForm from "./components/features/ReviewForm";

const App: React.FC = () => {
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/reviews/new" element={<ReviewForm />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

export default App;