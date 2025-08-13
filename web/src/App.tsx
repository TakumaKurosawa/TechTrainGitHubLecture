import { AnimatePresence } from 'framer-motion';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { About, FormDemo, Home } from './pages';

const App = () => {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/form" element={<FormDemo />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default App;
