import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStore } from './store/appStore';
import { Heart } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: Inter, sans-serif;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-align: center;
  opacity: 0.9;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  margin: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const App: React.FC = () => {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);

  return (
    <Router>
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Title
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  TechTrain GitHub Lecture
                </Title>
                <Subtitle
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  React + TypeScript + Styled Components + Framer Motion
                </Subtitle>
                <Card
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Heart size={24} />
                    <span>Dependencies successfully installed!</span>
                  </div>
                  <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
                    Click count (Zustand): {count}
                  </p>
                  <button
                    onClick={increment}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      marginTop: '1rem',
                    }}
                  >
                    Increment
                  </button>
                </Card>
              </>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;