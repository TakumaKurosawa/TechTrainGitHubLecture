import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { GlobalStyle } from "./styles/GlobalStyle";
import { Layout } from "./components/layout";
import { TopPage, ReviewsListPage, ReviewDetailPage, NewReviewPage } from "./pages";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<TopPage />} />
              <Route path="/reviews" element={<ReviewsListPage />} />
              <Route path="/reviews/new" element={<NewReviewPage />} />
              <Route path="/reviews/:id" element={<ReviewDetailPage />} />
            </Routes>
          </AnimatePresence>
        </Layout>
      </Router>
    </>
  );
};

export default App;